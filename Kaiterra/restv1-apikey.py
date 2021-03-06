#!/usr/bin/env python3
#
# https://github.com/kaiterra/api/examples/restv1-urlkey.py
#
# This script demonstrates getting the latest data from a Laser Egg and Sensedge using the API.
#
# To use the script, do the following:
#  1. Use pip to install packages in requirements.txt (usually pip -r requirements.txt)
#  2. Change API_KEY to the key you created for your Kaiterra account on http://dashboard.kaiterra.cn/.
#  3. Run the script.  It will make the request, printing out information about the auth process
#     along the way.

from datetime import datetime, timezone
import sys
import requests
import time
import ast


#Envío de datos
from pymongo import MongoClient
import paho.mqtt.client as mqtt

MONGO_URI = 'mongodb+srv://CO2:co2123@cluster0.w68qc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
cliente = MongoClient(MONGO_URI)

db = cliente['co2']
collection = db['local']


######################################## MQTT ########################################################################


#Connection success callback
def on_connect(client, userdata, flags, rc):
    print('Connected with result code '+str(rc))
    client.subscribe('testtopic/#')

# Message receiving callback
def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))

client = mqtt.Client()

# Specify callback function
client.on_connect = on_connect
client.on_message = on_message

# Establish a connection
client.connect('emqx-broker.eastus.cloudapp.azure.com', 1883, 60)
# Publish a message







################################################################################################################


API_BASE_URL = "https://api.kaiterra.cn/v1/"

# TODO: replace this with the API key from your Kaiterra account
API_KEY = "ZDEyZTc4ZDE4YTY3NDBlMGJhMmQxZWE4ZWUzY2QzOWZjMmVl"

# Create a session object to reuse TCP connections to the server
session = requests.session()

def do_get(relative_url, *, params={}, headers={}):
    '''
    Executes an HTTP GET against the given resource.  The request is authorized using the given URL key.
    '''
    import json

    params['key'] = API_KEY

    url = API_BASE_URL.strip("/") + relative_url

    ##print("http: Fetching:   {}".format(url))
    ##print("http: Parameters: {}".format(params))
    ##print("http: Headers:  {}".format(headers))
    ##print()
    
    response = session.get(url, params=params, headers=headers)
    
    ##print("http: Status ({}), {} bytes returned:".format(response.status_code, len(response.content)))
    content_str = ''
    if len(response.content) > 0:
        content_str = response.content.decode('utf-8')
        ##print(content_str)
        diccionario =ast.literal_eval(content_str)
        valor_co2= diccionario['info.aqi']['data']['rco2 (ppm)']
        client.publish('emqtt',payload=valor_co2,qos=0)
        print(valor_co2)
        #collection.insert_one({"name":"Kaiterra","value":valor_co2})

    response.raise_for_status()
        
    if len(content_str) > 0:
        return json.loads(content_str)

    return None


def get_laser_egg(id: str):
    return do_get("/lasereggs/" + id)



def summarize_laser_egg(id: str):
    '''
    Prints the most recently reported reading from a Laser Egg.
    '''
    data = get_laser_egg(id)

    latest_data = data.get('info.aqi')
    if latest_data:
        ##print("Laser Egg data returned:")

        ts = parse_rfc3339_utc(latest_data['ts'])
        ts_ago = (datetime.now(timezone.utc) - ts).total_seconds()
        ##print("  Updated: {} seconds ago".format(int(ts_ago)))

        pm25 = latest_data['data'].get('pm25')
        ##if pm25:
            ##print("  PM2.5:   {} µg/m³".format(pm25))
        ##else:
            ##print("  PM2.5:   no data")

    else:
        print("Laser Egg hasn't uploaded any data yet")

    print()


def check_available(name):
    import importlib
    try:
        _ = importlib.import_module(name, None)
    except ImportError:
        print("Missing module '{}'.  Please run this command and try again:".format(name))
        print("   pip -r requirements.txt")
        sys.exit(1)


def parse_rfc3339_utc(ts: str) -> datetime:
    '''
    Parses and returns the timestamp as a timezone-aware time in the UTC time zone.
    '''
    return datetime.strptime(ts, '%Y-%m-%dT%H:%M:%SZ').replace(tzinfo=timezone.utc)


if __name__ == "__main__":
    contador=0
    while contador<=999999999:
        check_available("requests")
        from datetime import datetime, timezone
        summarize_laser_egg("dd85475c-a5ef-4a15-b00f-206e408528b2")
        contador+=1
        time.sleep(5)

client.loop_forever()
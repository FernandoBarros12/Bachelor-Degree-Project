#include <Arduino.h>
#include "cm1106_uart.h"
#include <ESP8266WiFi.h>
#include <PubSubClient.h>


/*Wifi Settings*/

const char* ssid = "....."; // Network name
const char* password = "......"; // Network password
const char* mqtt_server = "......."; // IP or DNS of the mqtt broker

WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE (50)
char msg_co2[MSG_BUFFER_SIZE];


#ifdef USE_SOFTWARE_SERIAL
    // Modify if CM1106 is connected using softwareserial
    #define CM1106_RX_PIN D7                                   // Rx pin which the CM1106 Tx pin is attached to
    #define CM1106_TX_PIN D8                                   // Tx pin which the CM1106 Rx pin is attached to
    SoftwareSerial CM1106_serial(CM1106_RX_PIN, CM1106_TX_PIN);
#else
    // Modify if CM1106 is attached to a hardware port
    #define CM1106_serial Serial2
#endif

#ifdef NODEMCUV2
    #define CONSOLE_BAUDRATE 74880
#else    
    #define CONSOLE_BAUDRATE 115200
#endif    

/*Function Wifi*/
void setup_wifi(){
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid,password);
  while (WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  randomSeed(micros());
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
}

void callback(char* topic, byte* payload, unsigned int length){
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("]");
  for (int i = 0; i <length; i++){
    Serial.print((char)payload[i]);
  }
  Serial.println();
  if((char)payload[0] == '1'){
    digitalWrite(BUILTIN_LED,LOW);
  }else{
    digitalWrite(BUILTIN_LED,HIGH);
  }
}

void reconnect(){
  while (!client.connected()){
    Serial.print("Attempting MQTT connection... ");
    String clientId = "ESP8266Client-E1";
    if(client.connect(clientId.c_str())){
      Serial.println("Connected");
      client.publish("temp_topic", "loading...");
      client.subscribe("inTopic");
    }else{
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
  
}
/*CM1106 Variable*/
CM1106_UART *sensor_CM1106;
CM1106_sensor sensor;
CM1106_ABC abc;


void setup() {

    // Initialize console serial communication
    Serial.begin(CONSOLE_BAUDRATE);
    Serial.println("");

    Serial.println("Init");

    // Initialize sensor
    CM1106_serial.begin(CM1106_BAUDRATE);
    sensor_CM1106 = new CM1106_UART(CM1106_serial);

    // Check if CM1106 is available
    sensor_CM1106->get_software_version(sensor.softver);
    int len = strlen(sensor.softver);
    if (len > 0) {
        if (len >= 10 && !strncmp(sensor.softver+len-5, "SL-NS", 5)) {
            Serial.println("CM1106SL-NS detected");
        } else if (!strncmp(sensor.softver, "CM", 2)) {
            Serial.println("CM1106 detected");
        } else {
            Serial.println("CM1106 unknown version");
        }
    } else {
        Serial.println("CM1106 not found!");
        while (1) { delay(1); };
    }     

    // Show sensor info
    Serial.println(">>> Cubic CM1106 NDIR CO2 sensor <<<");  
    sensor_CM1106->get_serial_number(sensor.sn);
    Serial.printf("Serial number: %s\n", sensor.sn);
    Serial.printf("Software version: %s\n", sensor.softver);

    // Setup ABC parameters
    Serial.println("Setting ABC parameters...");
    sensor_CM1106->set_ABC(CM1106_ABC_OPEN, 7, 415);    // 7 days cycle, 415 ppm for base

    // Getting ABC parameters
    if (sensor_CM1106->get_ABC(&abc)) {
        Serial.println("ABC parameters:");
        if (abc.open_close == CM1106_ABC_OPEN) {
            Serial.println("Auto calibration is enabled");
        } else if (abc.open_close == CM1106_ABC_CLOSE) {
            Serial.println("Auto calibration is disabled");
        }
        Serial.printf("Calibration cycle: %d\n", abc.cycle);
        Serial.printf("Calibration baseline: %d\n", abc.base);
    }

    // Start calibration
    Serial.println("Starting calibration...");
    sensor_CM1106->start_calibration(400);

    Serial.println("Setup done!");
    setup_wifi();
    client.setServer(mqtt_server,1883);
    client.setCallback(callback);
}


void loop() {

    sensor.co2 = sensor_CM1106->get_co2();
    if(!client.connected()){
      reconnect();
    }
    client.loop();

    unsigned long now = millis();

    if(now - lastMsg > 30000){
      lastMsg = now;
      snprintf(msg_co2,MSG_BUFFER_SIZE,"%d",sensor.co2);
      client.publish("co2_topic",msg_co2);
    }
}
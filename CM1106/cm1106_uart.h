/*
    CM1106 Library for serial communication (UART)
Copyright (c) 2021 Josep Comas
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/    

#ifndef _CM1106_UART
    #define _CM1106_UART

    #if defined ARDUINO_ARCH_SAMD || defined ARDUINO_ARCH_SAM21D || defined ARDUINO_ARCH_ESP32 || defined ARDUINO_SAM_DUE || ARDUINO_ARCH_APOLLO3
        #undef USE_SOFTWARE_SERIAL
    #else
        #define USE_SOFTWARE_SERIAL
    #endif

    #include "Arduino.h"

    #ifdef USE_SOFTWARE_SERIAL       
        #include <SoftwareSerial.h>
    #endif

    #define CM1106_LOG_LEVEL_NONE       (0)
    #define CM1106_LOG_LEVEL_ERROR      (1)
    #define CM1106_LOG_LEVEL_WARN       (2)
    #define CM1106_LOG_LEVEL_INFO       (3)
    #define CM1106_LOG_LEVEL_DEBUG      (4)
    #define CM1106_LOG_LEVEL_VERBOSE    (5)

    #ifdef CORE_DEBUG_LEVEL
        #define CM1106_LOG_LEVEL CORE_DEBUG_LEVEL
    #else
        #define CM1106_LOG_LEVEL CM1106_LOG_LEVEL_NONE
    #endif


    #if (CM1106_LOG_LEVEL > CM1106_LOG_LEVEL_NONE)

        /* Serial port for debug */

        // Uncomment if you use softwareserial for debug
        //#define CM1106_DEBUG_SOFTWARE_SERIAL
        
        #ifdef CM1106_DEBUG_SOFTWARE_SERIAL
            /* Modify if you use softwareserial for debug */
            #define CM1106_DEBUG_SERIAL_RX 13
            #define CM1106_DEBUG_SERIAL_TX 15
        #else
            /* Modify if you use hardware serial for debug */
            #define CM1106_DEBUG_SERIAL Serial
        #endif

        /* Debug format */
        #define CM1106_LOG(format, ...) CM1106_DEBUG_SERIAL.printf(format, ##__VA_ARGS__)
    #else
        #define CM1106_LOG(format, ...)
    #endif

    #define CM1106_BAUDRATE 9600         // Device to CM1106 Serial baudrate (should not be changed)

    //#define CM1106_ADVANCED_FUNC  1      // Don't uncomment, can be dangerous, internal use functions


    #define CM1106_TIMEOUT  5     // Timeout for communication

    #define CM1106_ABC_OPEN   0   // Open ABC (enable auto calibration)
    #define CM1106_ABC_CLOSE  2   // Close ABC (disable auto calibration)

    #define CM1106_LEN_SN       20   // Length of serial number
    #define CM1106_LEN_SOFTVER  10   // Length of software version

    #define CM1106_LEN_BUF_MSG  20   // Max length of buffer for communication with the sensor
    #define CM1106_MSG_IP     0x11   // Packet identifier byte of sensor communication response 
    #define CM1106_MSG_ACK    0x16   // ACK byte of sensor communication response 
    #define CM1106_MSG_NAK    0x06   // NAK byte of sensor communication response 

    /* messages to send to the sensor*/
    #define CM1106_CMD_GET_CO2                0x01   // Ask CO2 measure of sensor
    #define CM1106_CMD_START_CALIBRATION      0x03   // Ask to start calibration
    #define CM1106_CMD_GET_ABC                0x0F   // Ask ABC parameters
    #define CM1106_CMD_SET_ABC                0x10   // Set ABC parameters
    #define CM1106_CMD_GET_SOFTWARE_VERSION   0x1E   // Ask software version of sensor
    #define CM1106_CMD_GET_SERIAL_NUMBER      0x1F   // Ask serial number of sensor

    /* For low power version CM1106SL-N */
    #define CM1106_CMD_STORE_ABC_DATA         0x11   // Ask ABC calibration storing data
    #define CM1106_CMD_MEASUREMENT_PERIOD     0x50   // Set/check measurment period and number of smoothed data
    #define CM1106_CMD_WORKING_STATUS         0x51   // Set/check working status

    #define CM1106_SINGLE_MEASUREMENT            0   // Single measurement mode (command A)
    #define CM1106_CONTINUOUS_MEASUREMENT        1   // Continuous measurment mode (command B)


    struct CM1106_ABC {
        uint8_t open_close;
        uint8_t cycle; 
        int16_t base;
    };

    struct CM1106_sensor {
        char sn[CM1106_LEN_SN + 1];
        char softver[CM1106_LEN_SOFTVER + 1];
        int16_t co2;
    };


    class CM1106_UART
    {
        public:
            CM1106_UART(Stream &serial);                                        // Initialize
            void get_serial_number(char sn[]);                                  // Get serial number
            void get_software_version(char softver[]);                          // Get software version
            int16_t get_co2();                                                  // Get CO2 value in ppm
            bool start_calibration(int16_t concentration);                      // Start single point calibration
                                                                                   // Before calibration, please make sure CO2 concentration in current ambient 
                                                                                   // is calibration target value. Keeping this CO2 concentration for two 2 minutes,
                                                                                   // and then began calibration.
            bool set_ABC(uint8_t open_close, uint8_t cycle, int16_t base);      // Set ABC parameters (enable (open)/disable(close) auto calibration, cycle days, baseline co2)
            bool get_ABC(CM1106_ABC *abc);                                      // Get ABC parameters

            /* For low power version CM1106SL-N */
            bool set_measurement_period(int16_t period, uint8_t smoothed);      // Set measurement period and number of smoothed data
            bool get_measurement_period(int16_t *period, uint8_t *smoothed);    // Get measurement period and number of smoothed data
            bool set_working_status(uint8_t mode);                              // Set working status
            bool get_working_status(uint8_t *mode);                             // Get working status
            bool store_ABC_data();                                              // Store ABC data
//            void test_cmd();

#ifdef CM1106_ADVANCED_FUNC
            void detect_commands();                                             // Detect implemented commands
            void test_implemented();                                            // Check implemented commands
#endif

        private:
            Stream* mySerial;                                                   // Communication serial with the sensor
            uint8_t buf_msg[CM1106_LEN_BUF_MSG];                                // Buffer for communication messages with the sensor

            void serial_write_bytes(uint8_t size);                              // Send bytes to sensor
            uint8_t serial_read_bytes(uint8_t max_bytes, int timeout_seconds);  // Read received bytes from sensor
            bool valid_response(uint8_t cmd, uint8_t nb);                       // Check if response is valid according to sent command
            bool valid_response_len(uint8_t cmd, uint8_t nb, uint8_t len);      // Check if response is valid according to sent command and checking expected total length
            void send_cmd(uint8_t cmd);                                         // Send command without additional data
            void send_cmd_data(uint8_t cmd, uint8_t size);                      // Send command with additional data
            uint8_t calculate_cs(uint8_t nb);                                   // Calculate checksum of packet
            void print_buffer(uint8_t size);                                    // Show buffer in hex bytes

    };

#endif
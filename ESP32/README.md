Used Libraries: <br />
https://github.com/mobizt/ESP-Mail-Client <br />
https://github.com/madhephaestus/ESP32Servo <br />
https://github.com/mobizt/Firebase-ESP-Client <br />

#define AUTHOR_EMAIL "<your email>" //email <br />
#define AUTHOR_PASSWORD "<your password>" //email password <br />
#define API_KEY "<Your firebase API Key>"; //Firebase api key <br />
#define DATABASE_URL "<Your rtdb URL>"; //Firebase realtime database url <br />
auth.user.email = "<user auth email>"; //set user email to authenticate <br />
auth.user.password = "<user auth password>"; //set user password to authenticate <br />
 
 Change these for set up

# **User Guide**<br/>

1. Download the following libraries: <br/>
Used Libraries: <br />
https://github.com/mobizt/ESP-Mail-Client <br />
https://github.com/madhephaestus/ESP32Servo <br />
https://github.com/mobizt/Firebase-ESP-Client
 
2. Download the .ino file and edit the following lines: <br/>
#define AUTHOR_EMAIL "<your email>" //email <br />
#define AUTHOR_PASSWORD "<your password>" //email password <br />

#define API_KEY "<Your firebase API Key>"; //Firebase api key <br />
#define DATABASE_URL "<Your rtdb URL>"; //Firebase realtime database url <br />

auth.user.email = "<user auth email>"; //set user email to authenticate <br />
auth.user.password = "<user auth password>"; //set user password to authenticate <br />

3. Wire based on the circuit diagram  

![Image not found!](https://github.com/XenonNgo/ProjectStudyPod/blob/main/ESP32/images/circuitdiagram.png?raw=true)

4. Connect ESP32 and upload the .ino file onto the ESP32 

5. Power the ESP32

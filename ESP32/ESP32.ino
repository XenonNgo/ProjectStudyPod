
#include <WiFiClientSecure.h>
#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>
#include <ESP_Mail_Client.h>
#include <ESP32Servo.h>

const char* ssid = "<>"; //Your wifi ssid
const char* password = "<>"; //Your wifi password

String RECIPIENT_EMAIL = "";
String OTP_Hash = "";
String OTP_String = "";

#define SMTP_HOST "smtp.office365.com"
#define SMTP_PORT 587

#define AUTHOR_EMAIL "<your email>" //email
#define AUTHOR_PASSWORD "<your password>" //email password

#define RED_LED 18    // ESP32 pin GIOP18, connected to red RGB
#define GREEN_LED 19  // ESP32 pin GIOP19, connected to green RGB
#define SERVO_PIN 13

#define API_KEY "<Your firebase API Key>"; //Firebase api key
#define DATABASE_URL "<Your rtdb URL>"; //Firebase realtime database url

int doorStatus = 0;
int valueStatus = 0;
int OTP_value = 000000;

bool OTP_Check = true;
bool first_check = false;

unsigned long startMillis;
unsigned long currentMillis;
const unsigned long period = 60000; // 1 minute in ms
// Define the Firebase Data object
FirebaseData fbdo;
// Define the FirebaseAuth data for authentication data
FirebaseAuth auth;
// Define the FirebaseConfig data for config data
FirebaseConfig config;

SMTPSession smtp;

void smtpCallback(SMTP_Status status);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  randomSeed(69420);
  delay(4000);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");

  servoMotor.attach(SERVO_PIN);
  firebase_setup();
}

void loop() {
  // put your main code here, to run repeatedly:
  read_value();
  if (OTP_Check) {
    if (valueStatus == 1) {  //Check for user OTP
      OTP_value = random(100000, 999999);
      read_string_recipient();
      firebase_otp_send();
      smtp_setup();
      OTP_Check = false;
      first_check = true;
      startMillis = millis();
    }
  }

  if ((OTP_Check == false) && (valueStatus == 1)) {  //Check if user is logged in
    getDoorStatus();
    if (doorStatus == 1) {  //&& (first_check == true)){ //Check if user opening door for first time
      Serial.println("Opening Door");
      door_open();
      currentMillis = millis();
      delay(30000); //check if more than 1 min
      Serial.println("Closing Door");
      door_close();
      first_check = false;
      startMillis = currentMillis;
      /*
    if ((doorStatus == 1) && (first_check == false)){ // open door if prompted
      door_open();
    }
    */
      if (doorStatus == 0) {  //check if user closes door
        door_close();
        first_check = false;
      }
    }

    if (valueStatus == 0) {
      OTP_Check = true;
      OTP_value = 000000;
    }
    delay(5000);
  }
}

void door_open() {
  digitalWrite(RED_LED, LOW);     //OFF Red LED
  digitalWrite(GREEN_LED, HIGH);  //ON Green LED
  servoMotor.write(90);           //Motor move to 90 degree/open the door
}

void door_close() {
  digitalWrite(RED_LED, HIGH);   //On Red LED
  digitalWrite(GREEN_LED, LOW);  //Off Green LED
  servoMotor.write(0);           //Motor move to 0 degree / close door
  Serial.printf("Set int... %s\n", Firebase.RTDB.setInt(&fbdo, F("door/int"), 0) ? "ok" : fbdo.errorReason().c_str());
}

void firebase_setup() {
  /* Assign the api key (required) */
  config.api_key = API_KEY;
  /* Assign the RTDB URL (required) */
  /*===================Authentication============================= */

  auth.user.email = "<user auth email>"; //set user email to authenticate
  auth.user.password = "<user auth password>"; //set user password to authenticate

  auth.token.uid.clear();
  //==================================================
  config.database_url = DATABASE_URL;
  Firebase.reconnectWiFi(true);
  //config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);
}

void getDoorStatus() {
  Serial.println("Getting Status...");
  if (Firebase.RTDB.getInt(&fbdo, "/door/int")) {

    if (fbdo.dataTypeEnum() == fb_esp_rtdb_data_type_integer) {
      Serial.println(fbdo.to<int>());
      doorStatus = fbdo.to<int>();
    }
  } else {
    Serial.println(fbdo.errorReason());
  }
}

void read_value() {
  Serial.println("Getting value status...");
  if (Firebase.RTDB.getInt(&fbdo, "/connections/value1")) {

    if (fbdo.dataTypeEnum() == fb_esp_rtdb_data_type_integer) {
      Serial.println(fbdo.to<int>());
      valueStatus = fbdo.to<int>();
    }
  } else {
    Serial.println(fbdo.errorReason());
  }
}

void read_string_recipient() {
  Serial.println("Getting recipient String...");
  if (Firebase.RTDB.getString(&fbdo, "/connections/value2")) {

    if (fbdo.dataTypeEnum() == fb_esp_rtdb_data_type_string) {
      Serial.println(fbdo.to<String>());
      RECIPIENT_EMAIL = fbdo.to<String>();
    }
  } else {
    Serial.println(fbdo.errorReason());
  }
}

void firebase_otp_send() {
  Serial.println("Setting value status...");
  OTP_String = String(OTP_value);
  char *OTP_Str = new char[OTP_String.length() + 1];
  strcpy(OTP_Str, OTP_String.c_str());
  OTP_Hash = hashing256(OTP_Str);
  Serial.printf("Set string... %s\n", Firebase.RTDB.setString(&fbdo, F("/connections/value4"), OTP_Hash) ? "ok" : fbdo.errorReason().c_str());
  delete [] OTP_Str;
}

void smtp_setup() {
  /** Enable the debug via Serial port
   * none debug or 0
   * basic debug or 1
  */
  smtp.debug(1);
  /* Set the callback function to get the sending results */
  smtp.callback(smtpCallback);
  /* Declare the session config data */
  ESP_Mail_Session session;
  /* Set the session config */
  session.server.host_name = SMTP_HOST;
  session.server.port = SMTP_PORT;
  session.login.email = AUTHOR_EMAIL;
  session.login.password = AUTHOR_PASSWORD;
  session.login.user_domain = "";

  /* Declare the message class */
  SMTP_Message message;

  /* Set the message headers */
  message.sender.name = "ESP";
  message.sender.email = AUTHOR_EMAIL;
  message.subject = "OTP Test Email";
  message.addRecipient("Test", RECIPIENT_EMAIL);

  //Send raw text message
  String textMsg = "Login into your account using your OTP: ";
  textMsg += OTP_value;
  message.text.content = textMsg.c_str();
  message.text.charSet = "us-ascii";
  message.text.transfer_encoding = Content_Transfer_Encoding::enc_7bit;

  message.priority = esp_mail_smtp_priority::esp_mail_smtp_priority_low;
  message.response.notify = esp_mail_smtp_notify_success | esp_mail_smtp_notify_failure | esp_mail_smtp_notify_delay;
  if (!smtp.connect(&session))
    return;

  /* Start sending Email and close the session */
  if (!MailClient.sendMail(&smtp, &message))
    Serial.println("Error sending Email, " + smtp.errorReason());
}

void servo_dooropen() {
  
}

void smtpCallback(SMTP_Status status) {
  /* Print the current status */
  Serial.println(status.info());

  /* Print the sending result */
  if (status.success()) {
    Serial.println("----------------");
    ESP_MAIL_PRINTF("Message sent success: %d\n", status.completedCount());
    ESP_MAIL_PRINTF("Message sent failled: %d\n", status.failedCount());
    Serial.println("----------------\n");
    struct tm dt;

    for (size_t i = 0; i < smtp.sendingResult.size(); i++) {
      /* Get the result item */
      SMTP_Result result = smtp.sendingResult.getItem(i);
      time_t ts = (time_t)result.timestamp;
      localtime_r(&ts, &dt);

      ESP_MAIL_PRINTF("Message No: %d\n", i + 1);
      ESP_MAIL_PRINTF("Status: %s\n", result.completed ? "success" : "failed");
      ESP_MAIL_PRINTF("Date/Time: %d/%d/%d %d:%d:%d\n", dt.tm_year + 1900, dt.tm_mon + 1, dt.tm_mday, dt.tm_hour, dt.tm_min, dt.tm_sec);
      ESP_MAIL_PRINTF("Recipient: %s\n", result.recipients.c_str());
      ESP_MAIL_PRINTF("Subject: %s\n", result.subject.c_str());
    }
    Serial.println("----------------\n");
  }
}

String hashing256(char* payload) {
  byte shaResult[32];

  mbedtls_md_context_t ctx;
  mbedtls_md_type_t md_type = MBEDTLS_MD_SHA256;

  const size_t payloadLength = strlen(payload);

  mbedtls_md_init(&ctx);
  mbedtls_md_setup(&ctx, mbedtls_md_info_from_type(md_type), 0);
  mbedtls_md_starts(&ctx);
  mbedtls_md_update(&ctx, (const unsigned char *)payload, payloadLength);
  mbedtls_md_finish(&ctx, shaResult);
  mbedtls_md_free(&ctx);

  Serial.println("Hash: ");
  String hashed_value = "";
  for (int i = 0; i < sizeof(shaResult); i++) {
    char str[3];
    sprintf(str, "%02x", (int)shaResult[i]);
    hashed_value += str;
  }
  Serial.println(hashed_value);
  return hashed_value;
}

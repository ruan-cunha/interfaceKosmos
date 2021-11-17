/*
 Enviar dados para a firebase usando o arduino
 Board: Arduino Uno WiFi Rev2
 
 External libraries:
 – Arduino_LSM6DS3 by Arduino V1.0.0
 – Firebase Arduino based on WiFiNINA by Mobizt V1.1.4
 
 
#include <Arduino_.h>
#include <Firebase_Arduino_WiFiNINA.h>
*/
#define FIREBASE_HOST "interfacekosmos.firebaseio.com"
#define FIREBASE_AUTH "3gqzdmLq1fWSv67a4bYq8Sj7U1ZBdRoecl40vLiF"
#define WIFI_SSID "Your WiFi SSID"
#define WIFI_PASSWORD "Your WiFi Password"
 
FirebaseData firebaseData;
 
String path = "/IMU_LSM6DS3"; /* Sensor */
String jsonStr;
 
void setup()
{
 Serial.begin(9600);
 delay(1000);
 Serial.println();
 
 Serial.print("Inicializando sensor…");
 if (!IMU.begin()) {
 Serial.println(" Falha!");
 while (1);
 }
 Serial.println(" Concluído");
 Serial.print(" = ");
 Serial.print(IMU.accelerationSampleRate());
 Serial.println(" Hz");
 
 Serial.print("Connecting to WiFi…");
 int status = WL_IDLE_STATUS;
 while (status != WL_CONNECTED) {
 status = WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
 Serial.print(".");
 delay(300);
 }
 Serial.print(" IP: ");
 Serial.println(WiFi.localIP());
 Serial.println();
 
 Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH, WIFI_SSID, WIFI_PASSWORD);
 Firebase.reconnectWiFi(true);
}
 
void loop()
{
 float x, y, z;
 
 // Ler dados do sensor
 if (IMU.accelerationAvailable()) {
 IMU.readAcceleration(x, y, z);
 
 // Enviar dados para a firebase com um caminho especifíco
 if (Firebase.setFloat(firebaseData, path + "/1-setFloat/X", x)) {
 Serial.println(firebaseData.dataPath() + " = " + x);
 }
 if (Firebase.setFloat(firebaseData, path + "/1-setFloat/Y", y)) {
 Serial.println(firebaseData.dataPath() + " = " + y);
 }
 if (Firebase.setFloat(firebaseData, path + "/1-setFloat/Z", z)) {
 Serial.println(firebaseData.dataPath() + " = " + z);
 }
 
 // Mover dados usando o Json
 jsonStr = "{\"X\":" + String(x,6) + ",\"Y\":" + String(y,6) + ",\"Z\":" + String(z,6) + "}";
 
 if (Firebase.pushJSON(firebaseData, path + "/2-pushJSON", jsonStr)) {
 Serial.println(firebaseData.dataPath() + " = " + firebaseData.pushName());
 }
 else {
 Serial.println("Error: " + firebaseData.errorReason());
 }
 
 Serial.println();
 delay(2000);
 }
}

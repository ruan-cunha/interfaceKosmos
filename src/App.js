import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import { firebase } from "./initFirebase";
import { enableIndexedDbPersistence } from "firebase/firestore";
import { useRouter, } from "next/router";

const db = firebase.database();
function Home() {
  const [time, setTime] = useState("Time");
  const [temp, setTemp] = useState("Temp");
  const [altitude, setAltitude] = useState("Altitude");
  const [yaw, setYaw] = useState("Yaw");
  const router = useRouter();

  return (
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const launchRef = db.ref("launch1");
          const newLaunchRef = launchRef.push();
          newLaunchRef.set({
            time,
            temp,
            altitude,
            yaw,
          });
          
        }}
      >
        <h1>Inserir dados</h1>
        
        <input
          placeholder="Tempo"
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <input
          placeholder="Temperatura"
          type="number"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
        />

        <input
          placeholder="Altitude"
          type="number"
          value={altitude}
          onChange={(e) => setAltitude(e.target.value)}
        />

        <input
          placeholder="Yaw"
          type="number"
          value={yaw}
          onChange={(e) => setYaw(e.target.value)}
        />

        <button type="submit">Confirmar</button>
      </form>
    </main>
  );

}

const App = () => {
  const launchRef = db.ref("launch1");

  const [temperatureData, setTemperatureData] = useState({});
  const [altitudeData, setAltitudeData] = useState({});
  const [yawData, setYawData] = useState({});
  useEffect(() => {
    
      const onValueChange = launchRef.on("value", function (snapshot) {
        var tempo = [], temperatura = [], altitude = [], yaw = []
        snapshot.forEach(function(childSnapshot) {
        
         tempo.push(childSnapshot.val().time);
         temperatura.push(childSnapshot.val().temp);
         altitude.push(childSnapshot.val().altitude);
         yaw.push(childSnapshot.val().yaw);
         
         console.log(tempo,temperatura)
         
        });
        setTemperatureData({
          datasets: [
            {
              label: 'Temperatura',
              data: temperatura,
              backgroundColor: 'rgba(255, 99, 132, 1)',
              hoverBackgroundColor: "rgba(255, 99, 132, 1)",
              hoverBorderColor: "black",
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2
            }
          ], 
          labels: tempo
        });
        setAltitudeData({
          datasets: [
            {
              label: 'Altitude',
              data: altitude,
              backgroundColor: 'rgba(19, 240, 14, 1)',
              hoverBackgroundColor: 'rgba(19, 240, 14, 1)',
              hoverBorderColor: "black",
              borderColor: 'rgba(19, 240, 14, 1)',
              borderWidth: 2
            }
          ], 
          labels: tempo
        });
        setYawData({
          datasets: [
            {
              label: 'Yaw',
              data: yaw,
              backgroundColor: 'rgba(139, 0, 249, 1)',
              hoverBackgroundColor: 'rgba(139, 0, 249, 1)',
              hoverBorderColor: "black",
              borderColor: 'rgba(139, 0, 249, 1)',
              borderWidth: 2
            }
          ], 
          labels: tempo
        });
      });   
    return () => launchRef.off("value",onValueChange);
  }, [])
  
  const temperatureOptions = {
    elements: {
        point:{
            radius: 1
        }
    },
    scales: {
      y: {
          ticks: {
              callback: function(value, index, values) {
                  return value + "°C";
              }
          },
      }
    },
    responsive:false
  }
  const altitudeOptions = {
    elements: {
        point:{
            radius: 1
        }
    },
    scales: {
      y: {
          ticks: {
              callback: function(value, index, values) {
                  return value + "m";
              }
          },
      }
    },
    responsive:false
  }
  const yawOptions = {
    elements: {
        point:{
            radius: 1
        }
    },
    scales: {
      y: {
          ticks: {
              callback: function(value, index, values) {
                  return value + "";
              }
          },
      }
    },
    responsive:false
  }
  
  return <>
    <Line id="chart" width="1500" height="320" data={temperatureData} options={temperatureOptions}/> 
    <Line id="chart" width="1500" height="320" data={altitudeData} options={altitudeOptions}/> 
    <Line id="chart" width="1500" height="320" data={yawData} options={yawOptions}/> 
  </>
}

export {Home, App};
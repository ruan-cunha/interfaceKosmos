<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.0/chart.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.3.2"></script>
    <link rel="stylesheet" href="../src/index.css">
    <title>Interface</title>
  </head>
  <body>
    <canvas id="chart" width="1500" height="320"></canvas>
    <canvas id="chart2" width="1500" height="320"></canvas>
    <canvas id="chart3" width="1500" height="320"></canvas>
    <script>
      async function run(){
        const globalTemps = await getData();  
        const ctx = document.getElementById('chart').getContext('2d');
        const data = {
                  labels: globalTemps.tempo,
                  datasets: [
                    {
                      label: 'Temperatura',
                      data: globalTemps.temperatura,
                      backgroundColor: 'rgba(255, 99, 132, 1)',
                      hoverBackgroundColor: "rgba(255, 99, 132, 1)",
                      hoverBorderColor: "black",
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 2
                  }
                ]
              }
        const scales = {
                  y: {
                      ticks: {
                          callback: function(value, index, values) {
                              return value + "°C";
                          }
                      },
                  }
        }
        const ctx2 = document.getElementById('chart2').getContext('2d');
        const data2 = {
                  labels: globalTemps.tempo,
                  datasets: [
                    {
                      label: 'Altitude',
                      data: globalTemps.altitude,
                      backgroundColor: 'rgba(19, 240, 14, 1)',
                      hoverBackgroundColor: 'rgba(19, 240, 14, 1)',
                      hoverBorderColor: "black",
                      borderColor: 'rgba(19, 240, 14, 1)',
                      borderWidth: 2
                  }
                ]
              }
        const scales2 = {
                  y: {
                      ticks: {
                          callback: function(value, index, values) {
                              return value + "m";
                          }
                      }
                  },
                }
        const ctx3 = document.getElementById('chart3').getContext('2d');
        const data3 = {
                  labels: globalTemps.tempo,
                  datasets: [
                    {
                      label: 'Yaw',
                      data: globalTemps.yaw,
                      backgroundColor: 'rgba(139, 0, 249, 1)',
                      hoverBackgroundColor: 'rgba(139, 0, 249, 1)',
                      hoverBorderColor: "black",
                      borderColor: 'rgba(139, 0, 249, 1)',
                      borderWidth: 2
                  }
                ]
              } 
        const scales3 = {
                  y: {
                      ticks: {
                          callback: function(value, index, values) {
                              return value + "";
                          }
                      }
                  },
                }
        grafico(ctx, data, scales);
        grafico(ctx2, data2, scales2);
        grafico(ctx3, data3, scales3);
        
        async function grafico(ctx, data, scales){
          
  
          const chart = new Chart(ctx, {
              type: 'line',
              data,
              options: {
                elements: {
                    point:{
                        radius: 0
                    }
                },
                scales,
                responsive:false
              }
          });  
        }

        async function getData(){       

          const response = await fetch('dados.json');
          const data = await response.text();

          const tempo = [];
          const temperatura = [];
          const altitude = [];
          const yaw = [];
          const velocidadeMedia = [];

          const rows = data.split('\n').slice(1);
          rows.forEach(row => {
            const columns = row.split(',');
            tempo.push(columns[0]);
            temperatura.push(columns[1]);
            altitude.push(columns[2]);
            yaw.push(columns[3])
                
          });

          return { tempo, temperatura, altitude, yaw };

        }; 

        function addData() {
          globalTemps.tempo.push('99');
          globalTemps.temperatura.push('99');
          globalTemps.altitude.push('99');
          globalTemps.yaw.push('99');
          console.log('abrora');
        }

    } 
run();    
      
    </script>
    
    <input class="botao" type="button" onclick="addData()" value="Iniciar">
    <input class="botao" type="button" value="Finalizar">
    <div id="root"></div>
  </body>
</html>


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import { firebase } from "./initFirebase";

const App = () => {
  const [temperatureData, setTemperatureData] = useState({});
  const [altitudeData, setAltitudeData] = useState({});
  const [yawData, setYawData] = useState({});
  useEffect(() => {
    const loadData = async () => {
      /**const response = await fetch('dados.json');
      const text = await response.text();**/

      const tempo = [3,10,50,2];
      const temperatura = [4,3,2,5];
      const altitude = [52,51,5];
      const yaw = [6,12,9];

      /**const rows = text.split('\n').slice(1);
      rows.forEach(row => {
        const columns = row.split(',');
        tempo.push(columns[0]);
        temperatura.push(columns[1]);
        altitude.push(columns[2]);
        yaw.push(columns[3])   
            
      });**/

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
    }
    
    loadData();
    
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
    <button id="botao">Iniciar</button>
    <button id="botao">Finalizar</button>
  </>
}

export default App;

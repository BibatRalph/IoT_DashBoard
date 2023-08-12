import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { debounceTime } from 'rxjs/operators';

import firebase from 'firebase/app';
import 'firebase/firestore';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
// DHT11
    public canvasHumidity: any;                             // HTML canvas
    public ctxHumidity: any;                                // context for the HTML canvas
    public chartHumidity: any;                              // chart object for Chart.js

    public humiditySensorReading: any;                      // form input of new sensor value
    public temperatureSensorReading: any;
    
    public historicalHumidity: any[];                       // stored data from Firebase (or hardcoded for testing)
    public currentSensorReadings: any;                      // current sensor readings for a given collection
 
//VIB
public canvasVib: any;                             
public ctxVib: any;                              
public chartVib: any;                              

public VibSensorReading: any;                     


public historicalVib: any[];                      
public currentVibSensorReadings: any;   
//ITemp
public canvasITemp: any;                             
public ctxITemp: any;                              
public chartITemp: any;                              

public ITempSensorReading: any;                     


public historicalITemp: any[];                      
public currentITempSensorReadings: any;  
//Sound
public canvasSound: any;                             
public ctxSound: any;                              
public chartSound: any;                              

public SoundSensorReading: any;                     


public historicalSound: any[];                      
public currentSoundSensorReadings: any;                        


    constructor(private firestore: AngularFirestore) {
        this.historicalHumidity = [];
        this.historicalVib = [];
        this.historicalITemp = [];
        this.historicalSound = [];
    }


    ngOnInit(): void {
       
        
        this.initHumidityChart();

       
    


        let docNameCurrent = 'current';                                                                                 // only storing the current sensor readings
        let docNameHistoric = this.buildHistoricDocName();                                                              // storing an array of all sensor readings for the time bucket
        // DHT11
        this.currentSensorReadings = this.firestore.collection('Dht11').doc(docNameCurrent).valueChanges();
              // attach to the observable so the html can be updated      
        this.firestore.collection('Dht11').doc(docNameCurrent).valueChanges().pipe(                              // pipe so we can have a callback to put the new readings in the chart                                                                                  // discard miltiple emitted values within n milliseconds
        )   
            .subscribe(data => {
                
               
                
                if (data && data.hasOwnProperty('humidity'))
                    this.addDataToChart(this.chartHumidity, '', data['humidity']);  // when the 'current' doc changes, place the new humidity value in the chart
                   
                    var date = firebase.firestore.Timestamp.now().toDate()
                
                                     
                      this.firestore.collection('Dht11').doc()
                    .set({
                      
                        'humidity': data['humidity'],
                        'temperature': data['temperature'],
                            
                         'date': date
                       
                    },
                        { merge: true });     

            }); 
            console.log('docNameHistoric', docNameHistoric);
            this.firestore.collection('Dht11').doc(docNameHistoric).ref.get().then((doc) => {        // get the current hour's historical readings just once (without an observable)
                if (doc.exists) {
                    let data = doc.data();
                    let measurements = data['historicalMeasurements'];
    
                    console.log('measurements', measurements);
    
                    for (let i = 0; i < measurements.length; i++) {
                        let measurement = measurements[i];
                        let humidity = measurement['humidity'];
                        this.addDataToChart(this.chartHumidity, '', humidity);
                        
                    }
                }
            }).catch((error) => {
                console.log('Error getting historical doc:', error);
            });
    
       

//SW420

this.initchartVib();


        this.currentVibSensorReadings = this.firestore.collection('SW420').doc(docNameCurrent).valueChanges();
        // attach to the observable so the html can be updated      
        this.firestore.collection('SW420').doc(docNameCurrent).valueChanges().pipe(                              // pipe so we can have a callback to put the new readings in the chart                                                                                  // discard miltiple emitted values within n milliseconds
  )   
          .subscribe(data => {
              
             
              
              if (data && data.hasOwnProperty('Vibration'))
                  this.addDataToChart(this.chartVib, '', data['Vibration']);  // when the 'current' doc changes, place the new humidity value in the chart
                 
                  var date2 = firebase.firestore.Timestamp.now().toDate()
                  
                  this.firestore.collection('SW420').doc()
                      .set({
                      
                        'vibration': data['Vibration'],         
                        'date': date2
                    
                       
                    },
                        { merge: true });       

          }); 
          console.log('docNameHistoric', docNameHistoric);
          this.firestore.collection('SW420').doc(docNameHistoric).ref.get().then((doc) => {        // get the current hour's historical readings just once (without an observable)
              if (doc.exists) {
                  let data = doc.data['vibration']();
                  let measurements = data['historicalMeasurements'];
  
                  console.log('measurements', measurements);
  
                  for (let i = 0; i < measurements.length; i++) {
                      let measurement = measurements[i];
                      let Vibration = measurement['Vibration'];
                      this.addDataToChart(this.chartVib, '', Vibration);
                      
                  }
              }
          }).catch((error) => {
              console.log('Error getting historical doc:', error);
          });
  
         

 
          this.initchartITemp();
        // ITemp
        this.currentITempSensorReadings = this.firestore.collection('LM35').doc(docNameCurrent).valueChanges();
              // attach to the observable so the html can be updated      
        this.firestore.collection('LM35').doc(docNameCurrent).valueChanges().pipe(                              // pipe so we can have a callback to put the new readings in the chart                                                                                  // discard miltiple emitted values within n milliseconds
        )   
            .subscribe(data => {
                
               
                
                if (data && data.hasOwnProperty('ITemp'))
                    this.addDataToChart(this.chartITemp, '', data['ITemp']);  // when the 'current' doc changes, place the new humidity value in the chart
                   
                    var date3 = firebase.firestore.Timestamp.now().toDate()
                    
                 this.firestore.collection('LM35').doc()
                 .set({
                      
                    'ITemp': data['ITemp'],
                    'date': date3
                       
                   
                },
                    { merge: true });    

            }); 
            console.log('docNameHistoric', docNameHistoric);
            this.firestore.collection('LM35').doc(docNameHistoric).ref.get().then((doc) => {        // get the current hour's historical readings just once (without an observable)
                if (doc.exists) {
                    let data = doc.data();
                    let measurements = data['historicalMeasurements'];
    
                    console.log('measurements', measurements);
    
                    for (let i = 0; i < measurements.length; i++) {
                        let measurement = measurements[i];
                        let ITemp = measurement['ITemp'];
                        this.addDataToChart(this.chartITemp, '', ITemp);
                        
                    }
                }
            }).catch((error) => {
                console.log('Error getting historical doc:', error);
            });


            this.initchartSound();
            // Sound
            this.currentSoundSensorReadings = this.firestore.collection('LM386').doc(docNameCurrent).valueChanges();
                  // attach to the observable so the html can be updated      
            this.firestore.collection('LM386').doc(docNameCurrent).valueChanges().pipe(                              // pipe so we can have a callback to put the new readings in the chart                                                                                  // discard miltiple emitted values within n milliseconds
            )   
                .subscribe(data => {
                    
                   
                    
                    if (data && data.hasOwnProperty('Sound'))
                        this.addDataToChart(this.chartSound, '', data['Sound']);  // when the 'current' doc changes, place the new humidity value in the chart
                       
                      
                        var date4 = firebase.firestore.Timestamp.now().toDate()

                     this.firestore.collection('LM386').doc()
                     .set({
                      
                        'sound': data['sound'],
                        
                        'date': date4
                           
                       
                    },
                        { merge: true });    
    
                }); 
                console.log('docNameHistoric', docNameHistoric);
                this.firestore.collection('LM386').doc(docNameHistoric).ref.get().then((doc) => {        // get the current hour's historical readings just once (without an observable)
                    if (doc.exists) {
                        let data = doc.data();
                        let measurements = data['historicalMeasurements'];
        
                        console.log('measurements', measurements);
        
                        for (let i = 0; i < measurements.length; i++) {
                            let measurement = measurements[i];
                            let Sound = measurement['Sound'];
                            this.addDataToChart(this.chartSound, '', Sound);
                            
                        }
                    }
                }).catch((error) => {
                    console.log('Error getting historical doc:', error);
                });       
    
    }
    

    initHumidityChart() {
        this.canvasHumidity = document.getElementById('chartHumidity');
        this.ctxHumidity = this.canvasHumidity.getContext('2d');
        this.chartHumidity = new Chart(this.ctxHumidity, {
            type: 'line',
            data: {
                // labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
                labels: [],
                datasets: [{
                    label: 'Data',
                    data: [],
                    fill: false,
                    borderColor: 'rgb(51, 104, 255)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
    plugins: {
      title: {
        display: true,
        
      },
    },
    interaction: {
        mode: 'index',
        intersect: false
    },
                scales: {
                 
                      
                    y: {
                        display: true,
                        title: {
                          display: true,
                          text: 'Value'
                        }
                     
                    }
                }
            }
        });
    }
    initchartVib() {
        this.canvasVib = document.getElementById('chartVib');
        this.ctxVib = this.canvasVib.getContext('2d');
        this.chartVib = new Chart(this.ctxVib, {
            type: 'line',
            data: {
                // labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
                labels: [],
                datasets: [{
                    label: 'Data',
                    data: [],
                    fill: false,
                    borderColor: 'rgb(51, 104, 255)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
    plugins: {
      title: {
        display: true,
        
      },
    },
    interaction: {
        mode: 'index',
        intersect: false
    },
                scales: {
                 
                      
                    y: {
                        display: true,
                        title: {
                          display: true,
                          text: 'Value'
                        }
                     
                    }
                }
            }
        });
    }
    initchartSound() {
        this.canvasSound = document.getElementById('chartSound');
        this.ctxSound= this.canvasSound.getContext('2d');
        this.chartSound = new Chart(this.ctxSound, {
            type: 'line',
            data: {
                // labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
                labels: [],
                datasets: [{
                    label: 'Data',
                    data: [],
                    fill: false,
                    borderColor: 'rgb(51, 104, 255)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
    plugins: {
      title: {
        display: true,
        
      },
    },
    interaction: {
        mode: 'index',
        intersect: false
    },
                scales: {
                 
                      
                    y: {
                        display: true,
                        title: {
                          display: true,
                          text: 'Value'
                        }
                     
                    }
                }
            }
        });
    }
    initchartITemp() {
        this.canvasITemp = document.getElementById('chartITemp');
        this.ctxITemp = this.canvasITemp.getContext('2d');
        this.chartITemp = new Chart(this.ctxITemp, {
            type: 'line',
            data: {
                // labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
                labels: [],
                datasets: [{
                    label: 'Data',
                    data: [],
                    fill: false,
                    borderColor: 'rgb(51, 104, 255)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
    plugins: {
      title: {
        display: true,
        
      },
    },
    interaction: {
        mode: 'index',
        intersect: false
    },
                scales: {
                 
                      
                    y: {
                        display: true,
                        title: {
                          display: true,
                          text: 'Value'
                        }
                     
                    }
                }
            }
        });
    }


   

    

    buildHistoricDocName() {
        let now = new Date();

        let year = now.getFullYear();
        let month = (now.getMonth() + 1) + '';                                          // javascript months are zero-based, so add 1
        let day = now.getDate() + '';
        let hour = now.getHours() + '';

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        if (hour.length < 2)
            hour = '0' + hour;
        hour = 'h' + hour;

        return [year, month, day, hour].join('_');                                      // ex: '2021_05_13_h09'
    }

    addDataToChart(chart, label, data) {
        console.log('chart - ' + data);
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }
    
     
    
    
}





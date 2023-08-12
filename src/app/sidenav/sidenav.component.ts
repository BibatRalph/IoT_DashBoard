import { Component, OnInit, Query } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
Chart.register(...registerables);



import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/firestore';
import { query } from '@angular/animations';
import { snapshotChanges } from '@angular/fire/database';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {


	
	constructor(private firestore: AngularFirestore) {
     
  
    }
	

	async ngOnInit(): Promise<void> {
		

const db = firebase.firestore();
//DHT11
var labelsArray = [];
var dataArray = [];

//COUNT 
var size: number;
var size2: number;
var size3: number;
    db.collection('SW420').get().then(function (snap) {
            size = snap.size; // will return the collection size

        });
   
    db.collection('LM35').get().then(snap => {
         size2 = snap.size // will return the collection size
       
      });
      db.collection('Dht11').get().then(snap => {
        size3 = snap.size // will return the collection size
      
     });
    

   
     await (db.collection("LM35").get())
   

    //TRY
    
    
//DISPLAY
db.collection('Dht11').orderBy('date').get(	).then((snapshot) => {
    snapshot.docs.forEach(doc => {
        var Item = doc.data();
	
        var X = Item.humidity;
        dataArray.push(X);
    //DATE
        var Item = doc.data();
	
        var Y = Item.date; 
        const d = Y.toDate();
        
        const R = d.getDate()+
        "/"+(d.getMonth()+1)+
        "/"+d.getFullYear()+
        " "+d.getHours()+
        ":"+d.getMinutes()+
        ":"+d.getSeconds();

        labelsArray.push(R);

       
        myChart.update( );
    });
});


var myChart = new Chart("myChart", {
    type: 'line',
    data: {
        // labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        labels: labelsArray,
        datasets: [{
            label: 'Data',
            data: dataArray,
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

//vib
var labelsArrayvib = [];
var dataArrayvib = [];



       

db.collection('SW420').orderBy('date').get(	).then((snapshot) => {
    snapshot.docs.forEach(doc => {
        var Item = doc.data();
        var X = Item.vibration;
        dataArrayvib.push(X);
      //DATE
        var Item = doc.data();
	
        var Y = Item.date; 
        const d = Y.toDate();
        
        const R = d.getDate()+
        "/"+(d.getMonth()+1)+
        "/"+d.getFullYear()+
        " "+d.getHours()+
        ":"+d.getMinutes()+
        ":"+d.getSeconds();

        labelsArrayvib.push(R);

       
        myChart1.update( );
    });
});


var myChart1 = new Chart("myChart1", {
    type: 'line',
    data: {
        labels: labelsArrayvib,
        datasets: [{
            label: 'Data',
            data: dataArrayvib,
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

//LM386
var labelsArraysound = [];
var dataArraysound = [];



       

db.collection('LM386').orderBy('date').get(	).then((snapshot) => {
    snapshot.docs.forEach(doc => {
        var Item = doc.data();
	
        var X = Item.sound;
        dataArraysound.push(X);
    //DATE
        var Item = doc.data();
	
        var Y = Item.date; 
        const d = Y.toDate();
        
        const R = d.getDate()+
        "/"+(d.getMonth()+1)+
        "/"+d.getFullYear()+
        " "+d.getHours()+
        ":"+d.getMinutes()+
        ":"+d.getSeconds();

        labelsArraysound.push(R);

       
        myChart2.update( );
    });
});


var myChart2 = new Chart("myChart2", {
    type: 'line',
    data: {
        // labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        labels: labelsArraysound,
        datasets: [{
            label: 'Data',
            data: dataArraysound,
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
//LM35
var labelsArrayITemp = [];
var dataArrayITemp = [];

db.collection('LM35').orderBy('date').get(	).then((snapshot) => {
    snapshot.docs.forEach(doc => {
        var Item = doc.data();
	
        var X = Item.ITemp;
        dataArrayITemp.push(X);
    //DATE
        var Item = doc.data();
	
        var Y = Item.date; 
        const d = Y.toDate();
        
        const R = d.getDate()+
        "/"+(d.getMonth()+1)+
        "/"+d.getFullYear()+
        " "+d.getHours()+
        ":"+d.getMinutes()+
        ":"+d.getSeconds();

        labelsArrayITemp.push(R);

       
        myChart3.update( );
    });
});


var myChart3 = new Chart("myChart3", {
    type: 'line',
    data: {
        // labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        labels: labelsArrayITemp,
        datasets: [{
            label: 'Data',
            data: dataArrayITemp,
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

//PIE CHART

var myChartPie = new Chart("myChartPie", {
    type: "pie",
    data: {
        labels: [
            'Red',
            'Blue',
            'Yellow'
          ],
      datasets: [{
    label: 'My First Dataset',
    data: [size, size2, size3],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
    },
   
  });

//PLOT CHART
const data = {
  datasets: [{
    label: 'Scatter Dataset',
    data: [{
      x: -10,
      y: 0
    }, {
      x: 0,
      y: 10
    }, {
      x: 10,
      y: 5
    }, {
      x: 0.5,
      y: 5.5
    }],
    backgroundColor: 'rgb(255, 99, 132)'
  }],
};



//TEST SCAT
const dataset = dataArrayITemp.map((x, i) => {
    return {
      x: x,
      y: dataArrayvib[i]
    };
  });
  console.log(dataset);

var x = []; 
var y = []; 
 var c = []; 
    var randomNumber = Math.random()*190;
        function getRandomDataPoint(x){
            if (x == "x"){
                var _return
                return Math.random()*20;
            }
            else if (x == "y"){
                return Math.random()*10 + randomNumber; 
            } 
            else{

            } 
        }
        var xPoints = [];
        var yPoints = [];
        var storage = [];
        for(var i=0;i<100;i++)
        { 
            xPoints[i] = Math.random()*20;
            yPoints[i] = Math.random()*10 + randomNumber;
            x = xPoints[i];
            y = yPoints[i];
            var json = {x: x, y: y};
            storage.push(json); 
            console.log();
        }

        var concatenatedArray = xPoints.concat(yPoints);



       
var myChartScat = new Chart("myChartScat", { 
    type: 'scatter',
    data: {
        datasets: [{label: 'Data Set', data: dataset}],
  
    },
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
    });

//VOID
}


	



	

//END
}

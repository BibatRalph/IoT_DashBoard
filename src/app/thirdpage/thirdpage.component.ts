import { Component, OnInit, Query } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
Chart.register(...registerables);

import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/firestore';
import { query } from '@angular/animations';
import { BindingScope } from '@angular/compiler/src/render3/view/template';

Chart.register(...registerables);
@Component({
  selector: 'app-thirdpage',
  templateUrl: './thirdpage.component.html',
  styleUrls: ['./thirdpage.component.css']
})
export class ThirdpageComponent implements OnInit {
 
	
  chart;
  chart2 = [];
  data1 = [];
	constructor(private firestore: AngularFirestore) {
     
  
  }

  ngOnInit() {
var labelsArray = [];
var dataArray = [];
var dateArray = [];
    const db = firebase.firestore();
    db.collection('SW420').orderBy('date').get(	).then((snapshot) => {
      snapshot.docs.forEach(doc => {
          var Item = doc.data();
          var X = Item.vibration;
          dataArray.push(X);
        //DATE
          var Item = doc.data();
	
          var Z = Item.date; 
          const d = Z.toDate();
          
          const R = d.getDate()+
          "/"+(d.getMonth()+1)+
          "/"+d.getFullYear()+
          " "+d.getHours()+
          ":"+d.getMinutes()+
          ":"+d.getSeconds();
  
          dateArray.push(R);
          chart.update();
      });
  });
  db.collection('LM35').orderBy('date').get(	).then((snapshot) => {
    snapshot.docs.forEach(doc => {
        var Item = doc.data();
        var Y = Item.ITemp; 
        labelsArray.push(Y);
        chart.update();

    });
});
var data = [];


        

  
//ADD MAX COLOR
  const dataArraycolor = [];
  const max = Math.max(...dataArray);
  const highestVcolor = dataArray.map((dataArrays, index)=>{
    const color = dataArrays === max ? 'rgba(153, 102, 255, 1)' : 'Black';
    dataArraycolor.push(color)
  })

    var chart = new Chart('bar', {
      type: 'bar',
      options: {
        responsive: true,
     
      },
      data: {
        labels: dateArray,
        datasets: [
          {
            type: 'bar',
            label: 'My First dataset',
            data: labelsArray,
            backgroundColor: dataArraycolor,
            borderColor: 'rgba(255,0,255,0.4)',
           
          },
          // {
          //   type: 'line',
          //   label: 'Dataset 2',
          //   backgroundColor: 'rgba(0,0,255,0.4)',
          //   borderColor: 'rgba(0,0,255,0.4)',
          //   data: [
          //     443, 256, 165, 100, 56, 65, 35, 543
          //   ],
          //   fill: true,
          // },
          {
            type: 'bar',
            label: 'My Second dataset',
            data: dataArray.reverse(),
            backgroundColor: 'rgba(0,0,255,0.4)',
            borderColor: 'rgba(0,0,255,0.4)',
           
          }
        ]
      }
    });

    let options = {
      // aspectRatio: 1,
      // legend: false,
      tooltips: false,

      elements: {
        point: {
          borderWidth: function (context) {
            return Math.min(Math.max(1, context.datasetIndex + 1), 8);
          },
          hoverBackgroundColor: 'transparent',
          hoverBorderColor: function (context) {
            return "red";
          },
          hoverBorderWidth: function (context) {
            var value = context.dataset.data[context.dataIndex];
            return Math.round(8 * value.v / 1000);
          },
          radius: function (context) {
            var value = context.dataset.data[context.dataIndex];
            var size = context.chart.width;
            var base = Math.abs(value.v) / 1000;
            return (size / 24) * base;
          }
        }
      }
    };

   


   

}
}





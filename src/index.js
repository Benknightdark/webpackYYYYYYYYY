import _ from 'lodash';
// import {appendChild} from "three";
// import * as gui from "dat.gui";
// import * as stats from 'stats-js';
import printMe from './print.js';
import '../assets/css/style.css'


function component() {
    let element = document.createElement('div');
    let btn = document.createElement('button');
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');  
    btn.innerHTML = 'Click me and check the console!';
   btn.onclick = printMe;

   element.appendChild(btn);
    return element;
  }
  
  document.body.appendChild(component());

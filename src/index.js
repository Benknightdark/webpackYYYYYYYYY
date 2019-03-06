import _ from 'lodash';
import {appendChild} from "three";
import * as gui from "dat.gui";
import * as stats from 'stats-js';


function component() {
    let element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');  
    
    return element;
  }
  
  document.body.appendChild(component());

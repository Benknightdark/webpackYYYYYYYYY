//import _ from 'lodash';
// import * from "three";
// import * as gui from "dat.gui";
// import * as stats from 'stats-js';
// import printMe from './print.js';
import '../assets/css/style.css'
import { draw } from './CustomThreeJS/CreateView.js'

function component() {
  let element = document.createElement('div');
  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = `
    <div id="loading-overlay" class="loading-overlay-hidden">
    <div id="loading-bar">
        <span id="progress">      
        </span>
    </div>
    </div>
  <div id="statsDashboard"></div>
  <div id="loadingInfo"></div>
  <div id="chart"></div>
`;


  return element;
}

document.body.appendChild(component());
draw("https://raw.githubusercontent.com/jscad/sample-files/fe410b44bca54c2194e17d5deb544854e14e82ec/stl/UM2CableChain_BedEnd.STL");
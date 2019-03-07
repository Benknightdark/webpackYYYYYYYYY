import '../assets/css/style.css'
import { draw } from './CustomThreeJS/CreateView.js'
((d,w) => {

  const component = () => {
    let element = document.createRange().createContextualFragment(` <div id="loading-overlay" class="loading-overlay-hidden">
    <div id="loading-bar">
        <span id="progress">      
        </span>
    </div>
    </div>
  <div id="loadingInfo"></div>
  <div id="chart"></div>
  <div id="statsDashboard" style="display:absolute!important"></div>`);
   


    return element;
  }

  document.body.appendChild(component());
  let queryString = w.location.search.split("=")[1];
  if(queryString !== undefined || queryString !== "" ){
    draw(queryString);
  }
  // example url 
  // https://raw.githubusercontent.com/jscad/sample-files/fe410b44bca54c2194e17d5deb544854e14e82ec/stl/UM2CableChain_BedEnd.STL
  // console.log(d.baseURI)


  

console.log(queryString)
})(document,window)

import '../assets/css/style.css'
import { draw } from './CustomThreeJS/CreateView'
((d,w) => {

  const component = () => {
    let element = d.createRange().createContextualFragment(` <div id="loading-overlay" class="loading-overlay-hidden">
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

  d.body.appendChild(component());
  let queryString = w.location.search.split("=")[1];
  if(queryString !== undefined && queryString !== "" ){
    console.log(queryString)
    draw(queryString);
  }else{
    draw("https://raw.githubusercontent.com/jscad/sample-files/fe410b44bca54c2194e17d5deb544854e14e82ec/stl/UM2CableChain_BedEnd.STL")
  }
  // example url 
  // https://raw.githubusercontent.com/jscad/sample-files/fe410b44bca54c2194e17d5deb544854e14e82ec/stl/UM2CableChain_BedEnd.STL
  // console.log(d.baseURI)


  

console.log(queryString)
})(document,window)

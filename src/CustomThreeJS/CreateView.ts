import * as dat from "dat.gui";
import * as THREE from 'three';
import {
    STLLoader
} from './Loaders/STLLoader.js';
import { TrackballControls } from "./Controls/TrackBallControls.js";
import { initProgressBar } from "./ProgressLoadingBar";
import { Detector } from "./Detector.js";
import * as Stats from 'stats.js'
let renderer:THREE.WebGLRenderer,
     stats:any,
      camera:THREE.PerspectiveCamera,
       scene:THREE.Scene, 
       light:THREE.DirectionalLight, 
       controls:TrackballControls, 
       gui, 
       options, 
       manager:THREE.LoadingManager, 
       mesh, 
       progressBarComponent:any;
// 初始化Stats Performance Dashboard
const initStats = () => {
    stats = new  Stats();
    stats.setMode(0); // 0: fps, 1: ms
    stats.domElement.style.position = 'block';
    stats.domElement.style.left = '50px';
    stats.domElement.style.right = '20px';
    stats.domElement.style.top = '20px';
    stats.domElement.style.width = '200px';
    document.getElementById("statsDashboard").appendChild(stats.domElement);
}

// 初始化Render 物件
const initRender = () => {
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("chart").appendChild(renderer.domElement);

    // document.body.appendChild(renderer.domElement);
}

// 初始化Camera
const initCamera = () => {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.focus = 10;
    camera.filmGauge = 35
    camera.position.set(2.3, 5.7, -15)
    // var q = new THREE.Quaternion();
    // q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), 100);
    // camera.position.applyQuaternion(q);

}

// 初始化場景
const initScene = () => {
    scene = new THREE.Scene();
}


// 初始化燈光
const initLight = () => {
    scene.add(new THREE.AmbientLight(0x404040));

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);
    scene.add(new THREE.HemisphereLight(0x443333, 0x222233, 4));

}

// 初始化Loading Manger
const initManger = () => {
    // toastr.options.positionClass = "toast-bottom-right";
    // toastr.options.hideDuration = 10000000;
    manager = new THREE.LoadingManager();
    progressBarComponent = initProgressBar();
    manager.onStart = (url, itemsLoaded, itemsTotal) => {
        progressBarComponent.animateBar();

    };

    manager.onLoad = () => {
        progressBarComponent.hideBar();

    };


    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
        //console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    };

    manager.onError = (url) => {
        //   toastr.error('There was an error loading ' + url)
        alert('There was an error loading ' + url)
        console.log('There was an error loading ' + url);
    };

}

//初始化3D模型
const initModel = (url:string) => {
    let loader = new STLLoader(manager);
    let material;
    loader.load(url, function (geometry:any) {
        if (geometry.hasColors) {
            material = new THREE.MeshPhongMaterial({
                opacity: geometry.alpha,
                vertexColors: THREE.VertexColors
            });
        } else {
            material = new THREE.MeshPhongMaterial({
                color: 0x0e2045,
                specular: 0x111111,
                shininess: 200
            });
        }

        mesh = new THREE.Mesh(geometry, material);

        mesh.scale.set(.08, .08, .08);

        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.geometry.center();
        scene.add(mesh);
        console.log(mesh.position)

        window.onresize = onWindowResize;


    });


}

//初始化模型觸發事件

const initControls = () => {
    controls = new TrackballControls(camera, renderer.domElement);
    //旋转速度
    controls.rotateSpeed = 5;
    //变焦速度
    controls.zoomSpeed = 3;
    //平移速度
    controls.panSpeed = 0.8;
    //是否不变焦
    controls.noZoom = false;
    //是否不平移
    controls.noPan = false;
    //是否开启移动惯性
    controls.staticMoving = false;
    //动态阻尼系数 就是灵敏度
    controls.dynamicDampingFactor = 0.3;
    controls.reset()
    //未知，占时先保留
    //controls.keys = [ 65, 83, 68 ];
    // controls.addEventListener('change', render);
}

// 設定場景
const render = () => {
    renderer.setClearColor(0x999999);
    renderer.render(scene, camera);
    //  localStorage.setItem('c',JSON.stringify(camera))
    // console.log(camera);
    // console.log(camera.position);
}

//設定響印式視窗事件
const onWindowResize = () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    controls.handleResize();
    render();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

// 設定動畫事件
const animate = () => {
    stats.update();
    //更新控制器
    controls.update();
    render();
    requestAnimationFrame(animate);
}

// 初始化dat ui
const initGUI = () => {
    options = {
        rest: function () {
            controls.reset()
        }
    }
    gui = new dat.GUI()

    gui.add(options, 'rest');
    let camp = gui.addFolder("Camera Postition");
    camp.add(camera.position, "x", -100, 100).listen();
    camp.add(camera.position, "y", -100, 100).listen();
    camp.add(camera.position, "z", -100, 100).listen();
    //   camp.open();
    // let camr = gui.addFolder("Camera quaternion");
    //  camr.add(camera.quaternion, "w", 0, 5).listen();
    // camr.add(camera.quaternion, "x", 0, 5).listen();
    // camr.add(camera.quaternion, "y", 0, 5).listen();
    // camr.add(camera.quaternion, "z", 0, 5).listen();
    //  camr.open();
    camera.lookAt(scene.position)


}

// 執行所有threejs相關function
export const draw = (url:string) => {
    if (Detector.webgl) {
        initStats();
        initScene();
        initCamera();
        initLight();
        initManger();
        initModel(url);
        initRender();
        initControls();
        animate();
        initGUI();
    }else{
        Detector.addGetWebGLMessage(Detector.getWebGLErrorMessage())
        ;
    }


}
   // draw();


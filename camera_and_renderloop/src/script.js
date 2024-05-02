import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
// initialize the scene
const scene = new THREE.Scene()

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"})

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)
scene.add(cubeMesh)

const camera = new THREE.PerspectiveCamera(
  25, //fov
  window.innerWidth / window.innerHeight,//aspect ratio
  0.1,//near
  200) // far
const aspectRation = innerWidth/innerHeight
// const camera = new THREE.OrthographicCamera(-1*aspectRation,1,1,-1,0.1,200) //this can be used for first person view
camera.position.z = 5

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias:true // to make the pixels spliting not noticeable
})

renderer.setSize(window.innerWidth, window.innerHeight) //setting window size to the renderer
const maxPixelRatio = Math.min(window.devicePixelRatio,2);
renderer.setPixelRatio(maxPixelRatio)// to make the pixels spliting not noticeable

const controls = new OrbitControls(camera,canvas) // have controls on the object to make it 3d 
controls.enableDamping = true; //to make it smooth
// controls.autoRotate = true;

window.addEventListener('resize',()=>{ //to adjust cam and renderer in resizing
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
})

const renderloop=()=>{ //update the canvas according to refresh rate
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(renderloop)
}

renderloop()
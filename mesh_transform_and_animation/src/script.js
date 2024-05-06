import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
// initialize the scene
const scene = new THREE.Scene()

// add objects to the scene
const cubeGeometry = new THREE.SphereGeometry(1,10,10,56)
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red",wireframe:false})

//creating custom geometry
const vertices = new Float32Array([
  0,0,0,
  0,2,0,
  2,0,0,
])
const bufferAttribute = new THREE.BufferAttribute(vertices,3)
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position',bufferAttribute);

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)
// const cubeMesh2 = new THREE.Mesh(
//   cubeGeometry,
//   cubeMaterial
// )
// const cubeMesh3 = new THREE.Mesh(
//   cubeGeometry,
//   cubeMaterial
// )
// cubeMesh.rotation.reorder('XYZ') //the order the rotations
// cubeMesh.rotation.x = THREE.MathUtils.degToRad(25)
// cubeMesh.rotation.z = THREE.MathUtils.degToRad(25)
// cubeMesh.rotation.y = THREE.MathUtils.degToRad(15)
// cubeMesh2.position.x = 2
// cubeMesh3.position.x = -2
const group = new THREE.Group();
group.add(cubeMesh)
// group.add(cubeMesh2)
// group.add(cubeMesh3)
scene.add(cubeMesh)
group.scale.y =2 // we can use the group to apply the properties to all the objects
group.scale.setScalar(2) // we can use the group to apply the properties to all the objects
const camera = new THREE.PerspectiveCamera(
  75, //fov
  window.innerWidth / window.innerHeight,//aspect ratio
  0.1,//near
  200) // far
const aspectRation = innerWidth/innerHeight
// const camera = new THREE.OrthographicCamera(-1*aspectRation,1,1,-1,0.1,200) //this can be used for first person view
camera.position.z = 5

const axesHelper = new THREE.AxesHelper(2);
cubeMesh.add(axesHelper)

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

// animation

const clock = new THREE.Clock();
let previousTime = 0  

const renderloop=()=>{ //update the canvas according to refresh rate
  const currentTime = clock.getElapsedTime()
  const delta = currentTime - previousTime; //this is to make it smooth  animations
  previousTime = currentTime;
  // cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 10 ; 
  //we can make use of sine wave which changes to 1 to -1
  // cubeMesh.scale.x = (Math.sin(currentTime) * 0.5 +2)
  controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(renderloop)
}

renderloop()
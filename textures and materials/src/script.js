import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import { Pane } from 'tweakpane';
// initialize the scene
const pane = new Pane();
const scene = new THREE.Scene()

// add objects to the scene
const geometry = new THREE.BoxGeometry(1,1,1)
const planeGeometry = new THREE.PlaneGeometry(1,1,1)
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5,0.15,100,16)
const sphereGeometry = new THREE.SphereGeometry(0.5,32,32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5,0.5,1,32)
// const material = new THREE.MeshBasicMaterial()

// const material = new THREE.MeshLambertMaterial() //there is also meshPhong which is more shinny material than lambard
const material = new THREE.MeshStandardMaterial();
material.color = new THREE.Color("green")
pane.addBinding(material,'metalness',{
  min:0,
  max:1,
  step:0.01
})
pane.addBinding(material,'roughness',{
  min:0,
  max:1,
  step:0.01
})

// pane.addBinding(material,'clearcoat',{
//   min:0,
//   max:1,
//   step:0.01
// })
// pane.addBinding(material,'reflectivity',{
//   min:0,
//   max:1,
//   step:0.01
// })

const light = new THREE.AmbientLight(0xffffff,1.5) // ambient light light up everything in scene
scene.add(light)
const pointLight = new THREE.PointLight(0xffffff,0.9)
pointLight.position.set(3,0,2)
scene.add(pointLight)
//fogs ,material transparent , opacity
// const fog  = new THREE.Fog(0xffffff,1,10) //adds fogs to the scene
// scene.fog= fog
// scene.background = new THREE.Color(0xffffff)
const textureLoader = new THREE.TextureLoader()
const grassTexture = textureLoader.load('/textures/wispy-grass-meadow_height.png')
// grassTexture.repeat.set(100,100)
// grassTexture.wrapS = THREE.RepeatWrapping
// grassTexture.wrapT = THREE.RepeatWrapping // there is also mirrorRepeatWrapping : repeatWrapping is 0->100,0->100,mirror : 0->100,100->0
pane.addBinding(grassTexture,'offset',{
  min:-1,
  max:1,
  step:0.1,
  label:"offset"
})

const cube = new THREE.Mesh(
  geometry,
  material
  )
  const knot = new THREE.Mesh(
    torusKnotGeometry,
    material
    )
    knot.position.x = 1.5
    
    const plane = new THREE.Mesh(planeGeometry,material)
    plane.position.x = -1.5 //plane is one sided 
    // plane.rotation.x = -(Math.PI * 0.5)
    // plane.scale.set(100,100)
    
    const sphere = new THREE.Mesh()
    sphere.geometry = sphereGeometry;
    sphere.material = material;
    sphere.position.y = 1.5
    
    const cylinder = new THREE.Mesh()
    cylinder.geometry = cylinderGeometry;
    cylinder.material = material
    cylinder.position.y = -1.5
    
    
    material.side = THREE.DoubleSide; //to make it double side
    const group = new THREE.Group()
    group.add(cube,knot,plane,sphere,cylinder)
    material.map =grassTexture//adding different textures to the mesh
    scene.add(group)
    
    pane.addBinding(cube.scale,'x',{
      min:0,
  max:10,
  step:0.1,
  label:"scale x"
})
const camera = new THREE.PerspectiveCamera(
  35, //fov
  window.innerWidth / window.innerHeight,//aspect ratio
  0.1,//near
  200) // far
camera.position.z = 5
camera.position.y = 5
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
  group.children.forEach((child)=>{
   if(child instanceof THREE.Mesh ) child.rotation.y +=0.01
  })
  // group.rotation.y +=0.1
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(renderloop)
}

renderloop()
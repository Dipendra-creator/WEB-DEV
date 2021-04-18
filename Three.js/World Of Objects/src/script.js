import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Color } from 'three'
import { DoubleSide } from 'three'

// Textures
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
 const material = new THREE.MeshNormalMaterial({
    //  wireframe: true,
    //  map: doorColorTexture
    // opacity: 0.5,
    // transparent: true,
    // side: DoubleSide
})
// material.wireframe = true
const count = 500

for(let i = 0; i < count; i++) {

    console.log(i)

    const sphere = new THREE.Mesh(
        new THREE.SphereBufferGeometry(0.5, 16, 16),
        material
    )
    
    const torus = new THREE.Mesh(
     new THREE.TorusBufferGeometry(0.5, 0.2, 16, 32),
     material
    )

    const cube = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1, 1, 1),
        material
    )

    var min=-50;
    var max=50; 
    var randomX = Math.floor(Math.random() * (+max - +min) + +min)
    var randomY = Math.floor(Math.random() * (+max - +min) + +min)
    var randomZ = Math.floor(Math.random() * (+max - +min) + +min)
    
    sphere.position.set(randomX, randomY, randomZ)

    var randomX = Math.floor(Math.random() * (+max - +min) + +min)
    var randomY = Math.floor(Math.random() * (+max - +min) + +min)
    var randomZ = Math.floor(Math.random() * (+max - +min) + +min)

    torus.position.set(randomX, randomY, randomZ)

    cube.position.set(randomX * 0.5, randomY * 0.4, randomZ * 0.9)

    scene.add(sphere, torus, cube)
}

//  const plane = new THREE.Mesh(
//      new THREE.PlaneBufferGeometry(1, 1),
//      material
//  )
 
//  const torus = new THREE.Mesh(
//      new THREE.TorusBufferGeometry(0.5, 0.2, 16, 32),
//      material
//  )
//  torus.position.x = 1.5
// scene.add(text)
//  scene.add(plane, torus)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update
    // sphere.rotation.y = 0.1 * elapsedTime
    // plane.rotation.y = 0.1 * elapsedTime
    // torus.rotation.y = 0.1 * elapsedTime

    // sphere.rotation.x = 0.15 * elapsedTime
    // plane.rotation.x = 0.15 * elapsedTime
    // torus.rotation.x = 0.15 * elapsedTime
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
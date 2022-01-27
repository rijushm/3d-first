var controller = new ScrollMagic.Controller();
//loading
const textureLoader = new THREE.TextureLoader()
const normaltexture = textureLoader.load('maps/crust.png')

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64 );

// Materials

const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
material.metalness = 0.9
material.normalMap = normaltexture
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0x0984e3, 3.5)
pointLight.position.set(-5,4, -2.5)
scene.add(pointLight)
const pointLight2 = new THREE.PointLight(0xe84118, 3.5)
pointLight2.position.set(5,-4, -2.5)
scene.add(pointLight2)
const pointLight3 = new THREE.PointLight(0xffffff, 0.5)
pointLight3.position.set(0,0.2,0.5)
scene.add(pointLight3)

// gui
// const light1 = gui.addFolder('Light 1');
// light1.add(pointLight.position, 'x').min(-10).max(10).step(0.01)
// light1.add(pointLight.position, 'y').min(-10).max(10).step(0.01)
// light1.add(pointLight.position, 'z').min(-10).max(10).step(0.01)
// light1.add(pointLight, 'intensity').min(0).max(10).step(0.01)
// const light2 = gui.addFolder('Light 2');
// light2.add(pointLight2.position, 'x').min(-10).max(10).step(0.01)
// light2.add(pointLight2.position, 'y').min(-10).max(10).step(0.01)
// light2.add(pointLight2.position, 'z').min(-10).max(10).step(0.01)
// light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

// const lightColor2 ={
//     color: 0xe84118
// }
// light2.addColor(lightColor2, 'color').onChange(()=>{
//     pointLight2.color.set(lightColor2.color)
// })

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
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)
let mouseX = 0
let mouseY = 0
let tagretX = 0
let tagretY = 0

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

const clock = new THREE.Clock()

const tick = () =>
{
    tagretX = mouseX * .001
    tagretY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    // sphere.rotation.x = .5 * elapsedTime

    sphere.rotation.y += .5 * (tagretX - sphere.rotation.y)
    sphere.rotation.x += .5 * (tagretY - sphere.rotation.x)
    sphere.position.z += .5 * (tagretY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// scroll animation with gsap
scene.rotation.set(50, 9.8, 0)

// Slide 2
gsap.registerPlugin(ScrollTrigger);
let car_anim = gsap.timeline()
car_anim.to(scene.rotation, {y: 4.79, ease: "power1.inOut", scrollTrigger: {
      
            trigger: "#hero",
            scrub: 1,

            endTrigger: "#section2",
            end: "top bottom",

    }})

const planetTween11 = new TimelineMax()
.to(pointLight2.position, 0.5, {y: 0, ease: Linear.easeNone})
.from(pointLight2, 0.5, {'intensity': 2, ease: Linear.easeNone});
const planetTween12 = new TimelineMax()
.to(pointLight.position, 0.5, {y: 0, ease: Linear.easeNone})
.from(pointLight, 0.5, {'intensity': 2, ease: Linear.easeNone});
const planetTweentext11 = new TimelineMax()
.from(".txt-left", 0.5, {y: '-100%', ease: Linear.easeNone});
const planetTweentext12 = new TimelineMax()
.from(".txt-right", 0.5, {y: '100%', ease: Linear.easeNone});
//scene 
const planetScene11 = new ScrollMagic.Scene({
    triggerElement: "#hero",
    duration: "100%",
    triggerHook: 0
}).setTween(planetTween11).setPin("#hero").addTo(controller)
//scene 
const planetScene12 = new ScrollMagic.Scene({
    triggerElement: "#hero",
    duration: "100%",
    triggerHook: 0
}).setTween(planetTween12).addTo(controller)
//scene 
const planetSceneTxt11 = new ScrollMagic.Scene({
    triggerElement: "#hero",
    duration: "100%",
    triggerHook: 0
}).setTween(planetTweentext11).addTo(controller)
//scene 
const planetSceneTxt12 = new ScrollMagic.Scene({
    triggerElement: "#hero",
    duration: "100%",
    triggerHook: 0
}).setTween(planetTweentext12).addTo(controller)
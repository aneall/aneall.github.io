// .js file for Three.js 3D graphic renderings

// Declare the 'scene', 'camera', 'renderer', 'models' array as global variables:
let scene, camera, renderer;
let models = [];

init(); // Call init() to initialize the scene, camera, renderer, and models
animate(); // Call animate() to execute the rendering loop

// Define init() to setup the content in my scene:
function init() {
  scene = new THREE.Scene(); // Define scene
  const WIDTH = window.innerWidth, HEIGHT = window.innerHeight; // Set scene size

  renderer = new THREE.WebGLRenderer({antialias: true}); // Define renderer w/ antialiasing
  renderer.setSize(WIDTH, HEIGHT); // Define renderer viewport size
  document.body.appendChild(renderer.domElement); // Append renderer's canvas element to DOM

  camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000); // Define perspective camera (45 FOV, aspect ratio, near plane, far plane)
  camera.position.set(0, 0, 18); // Define camera's 3D position (x, y, z)
  scene.add(camera); // Add camera to scene (makes the camera's FOV the FOV for the viewport)

  // Define event listener that resizes the renderer with the browser window
  window.addEventListener('resize', function() {
    var WIDTH = window.innerWidth, HEIGHT = window.innerHeight; // Retrieve width and height of browser window
    
    renderer.setSize(WIDTH, HEIGHT); // Set the renderer viewport's size based on browser window
    camera.aspect = WIDTH / HEIGHT; // Set the camera's aspect ratio based on the browser window
    camera.updateProjectionMatrix(); // Compute the camera's perspective projection matrix with the new aspect ratio value
  });

  // Set scene's background color:
  renderer.setClearColor(0xffffff, 1);
  // change to 0xffc7f5 once done!

  // Setting up scene light(s):
  let light = new THREE.PointLight(0xffffff); // Declare and initalize a point light
  light.position.set(-100,200,100); // Set the point light's 3D position
  scene.add(light); // Add point light to scene

  // Declare and initialize orbit 'controls' to pan around the scene with our mouse / trackpad
  // const controls = new OrbitControls(camera, renderer.domElement); // Based on the OrbitControls.js script
  // controls.target.set(0, 0, 0); // Adjust these values as needed

  // TODO: MAKE THE TRANSPARENT PINK LAYER MATCH UP W OTHER SECTIONS

  // Declare and initialize loader:
  const gltfLoader = new THREE.GLTFLoader();
  
  // Set up 2D 'grid' of 3D objects:
  for (let x = -10; x <= 10; x += 5) { // looping through x-axis positions
    for (let y = -10; y <= 10; y += 5) { // looping through y-axis positions 
        // Cube geometry:
        let cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // Declare and initialize cube's geometry
        let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff57cf}); // Declare and initialize cube's material
        let cube = new THREE.Mesh(cubeGeometry, cubeMaterial); // Creates the cube as a 3D object
        cube.position.set(x, y, 0); // Set cube's 3D position
            // Previous bigger grid (15 models): cube.position.set(x, y, 0);
        models.push(cube); // Adds the first cube to my 'models' array
        scene.add(cube); // Add cube to scene

        // Teapot geometry (from imported glb):
        gltfLoader.load('assets/teapot.glb', function(gltf) {
            const teapot = gltf.scene; // Declare and initialize the 3D model
            teapot.position.set(1.3*x, 1.5*y, 0); // Define model's 3D position (x, y, z)
            teapot.scale.set(.4, .4, .4); // Define model's scale (x, y, z)
            models.push(teapot);
            scene.add(teapot); // Add model to scene
        }, undefined, function(error) { // Checking if there's loading errors
          console.error(error);
        });

    }
  }
}

// Define animate() to continuously re-render my content:
function animate() {
    requestAnimationFrame(animate); // Recursion to continuously call animate()
    
    // Rotating models (objects in the 'models' array) around their axes (local rotations):
    models.forEach(function(m, i) {
        m.rotation.x += 0.02; // increment local rotation about x-axis
        m.rotation.y += 0.0225; // increment local rotation bout y-axis
        m.rotation.z += 0.0175; // increment local rotation about z-axis
  });

  renderer.render(scene, camera); // Re-render the scene
}
console.log();
// .js file for Three.js 3D graphic renderings
// Use https://unpkg.com/browse/three@0.128.0/ to find more Three.js addons!

// Declare the 'scene', 'camera', 'renderer' as global variables:
let scene, camera, renderer, controls // CONTROLS ADDED

// Declare the 'bunnies', 'teapots', and 'oldwells' object arrays as global variables:
let bunnies = [];
let teapots = [];
let oldwells = [];

init(); // Call init() to initialize the scene, camera, renderer, and 3D objects
animate(); // Call animate() to execute the rendering loop

// Define init() to setup the content in my scene:
function init() {
  scene = new THREE.Scene(); // Define scene
  const WIDTH = window.innerWidth, HEIGHT = window.innerHeight; // Set scene size

  renderer = new THREE.WebGLRenderer({antialias: true}); // Define renderer w/ antialiasing
  renderer.setSize(WIDTH, HEIGHT); // Define renderer viewport size
  document.body.appendChild(renderer.domElement); // Append renderer's canvas element to DOM

  camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000); // Define perspective camera (45 FOV, aspect ratio, near plane, far plane)
  console.log(); // DEBUGGING FOR CONTROLS
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  camera.position.set(0, 0, 18); // Define camera's 3D position (x, y, z)
  scene.add(camera); // Add camera to scene (makes the camera's FOV the FOV for the viewport)
  controls.update();

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

  // TODO: MAKE THE TRANSPARENT BLUE LAYER MATCH UP W OTHER SECTIONS

  // Declare and initialize loader:
  const gltfLoader = new THREE.GLTFLoader();
  
  // Set up 2D 'grid' of bunnny objects:
    // No longer instantiating cubes, using bunnies instead!
  for (let x = -10; x <= 10; x += 5) { // looping through x-axis positions
    for (let y = -10; y <= 10; y += 5) {
        // Bunny geometry (from imported glb):
        gltfLoader.load('assets/bunny.glb', function(gltf) {
          const bunny = gltf.scene; // Declare and initialize the 3D model
          bunny.position.set(x, 4+y, 0); // Define model's 3D position (x, y, z)
          bunny.scale.set(.35, .35, .35); // Define model's scale (x, y, z)
          bunnies.push(bunny);
          scene.add(bunny); // Add model to scene
        }, undefined, function(error) { // Checking if there's loading errors
          console.error(error);
        });
    }
  }

  // Set up 2D 'grid' of teapot objects:
  for (let x = -15; x <= 10; x += 5) { // looping through x-axis positions
    for (let y = -15; y <= 10; y += 5) { // looping through y-axis positions 
        // Teapot geometry (from imported glb):
        gltfLoader.load('assets/teapot.glb', function(gltf) {
            const teapot = gltf.scene; // Declare and initialize the 3D model
            teapot.position.set(2.5+x, 1+y, 0); // Define model's 3D position (x, y, z)
            teapot.scale.set(.3, .3, .3); // Define model's scale (x, y, z)
            teapots.push(teapot);
            scene.add(teapot); // Add model to scene
        }, undefined, function(error) { // Checking if there's loading errors
            console.error(error);
        });
    }
  }

  // Set up 2D 'grid' of UNC old well objects:
  for (let x = -18; x <= 10; x += 5) { // looping through x-axis positions
    for (let y = -18; y <= 10; y += 5) { // looping through y-axis positions 
        // UNC Old Well geometry (from imported glb):
        gltfLoader.load('assets/oldwell.glb', function(gltf) {
            const oldwell = gltf.scene; // Declare and initialize the 3D model
            oldwell.position.set(5+x,5+y, 0); // Define model's 3D position (x, y, z)
            oldwell.scale.set(.1, .1, .1); // Define model's scale (x, y, z)
            oldwells.push(oldwell);
            scene.add(oldwell); // Add model to scene
        }, undefined, function(error) { // Checking if there's loading errors
          console.error(error);
        });
    }
  }
}

// Define animate() to continuously re-render my content:
function animate() {
    requestAnimationFrame(animate); // Recursion to continuously call animate()

    // CONTROLS TEST:
    controls.update();
    
    // Rotating bunnies (objects in the 'bunnies' array) around their axes (local rotations):
      // No loner rotating cubes, using bunnies instead!
     bunnies.forEach(function(b, i) {
      b.rotation.y += 0.02; // increment local rotation bout y-axis
    });

    // Rotating teapots (objects in the 'teapots' array) around their axes (local rotations):
    teapots.forEach(function(t, i) {
        t.rotation.x += 0.02; // increment local rotation about x-axis
        t.rotation.y += 0.0225; // increment local rotation bout y-axis
        t.rotation.z += 0.0175; // increment local rotation about z-axis
    });

    // Rotating wells (objects in the 'oldwells' array) around their axes (local rotations):
    oldwells.forEach(function(o, i) {
        o.rotation.y += 0.0025; // increment local rotation bout y-axis
        // o.rotation.z += 0.0175; // increment local rotation about z-axis
    });

  renderer.render(scene, camera); // Re-render the scene
}
console.log();
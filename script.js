const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Geometry (floating object)
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0x22c55e,
});

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Light
const light = new THREE.PointLight(0xffffff);
light.position.set(5, 5, 5);
scene.add(light);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.002;
  torus.rotation.y += 0.003;

  renderer.render(scene, camera);
}

animate();

function generateFlashcards() {
  console.log("Button clicked");

  const text = document.getElementById("inputText").value;
  const output = document.getElementById("output");

  if (!text) {
    output.innerHTML = "No text entered";
    return;
  }

  output.innerHTML = `
    <h3>Flashcard</h3>
    <p><b>Q:</b> What is this about?</p>
    <p><b>A:</b> ${text}</p>
  `;
}

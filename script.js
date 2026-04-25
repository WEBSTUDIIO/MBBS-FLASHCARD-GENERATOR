const API_KEY = "AIzaSyBZlQNI7Id3-mRASCHZ9HS3FCBcgsXNFUU";

/* =========================
   🌌 3D BACKGROUND
========================= */

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

// floating torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0x22c55e
});

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// light
const light = new THREE.PointLight(0xffffff);
light.position.set(5, 5, 5);
scene.add(light);

// animation loop
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.002;
  torus.rotation.y += 0.003;

  renderer.render(scene, camera);
}
animate();

/* resize fix */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


/* =========================
   🧠 AI FLASHCARDS (GEMINI)
========================= */

async function generateFlashcards() {
  const text = document.getElementById("inputText").value;
  const output = document.getElementById("output");

  if (!text.trim()) {
    output.innerHTML = "Please enter notes first";
    return;
  }

  output.innerHTML = "Generating AI flashcards... ⏳";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `
You are an expert MBBS professor.

Convert notes into HIGH-YIELD flashcards.

Format strictly:
Q: question
A: short answer (1–3 lines max)

Rules:
- No extra explanation
- Exam-focused only
- Medical accuracy required

Notes:
${text}
              `
            }]
          }]
        })
      }
    );

    const data = await response.json();

    const result =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    display(result);

  } catch (err) {
    console.log(err);
    output.innerHTML = "Error connecting to AI";
  }
}


/* =========================
   🧾 FLASHCARD RENDERING
========================= */

function display(text) {
  const output = document.getElementById("output");

  if (!text) {
    output.innerHTML = "No flashcards generated";
    return;
  }

  const lines = text.split("\n");

  let html = "";
  let block = "";

  lines.forEach(line => {
    if (line.startsWith("Q:")) {
      if (block) html += `<div class="card">${block}</div>`;
      block = `<b>${line}</b><br>`;
    } else if (line.startsWith("A:")) {
      block += `<b>${line}</b><br>`;
    } else {
      block += `${line}<br>`;
    }
  });

  if (block) html += `<div class="card">${block}</div>`;

  output.innerHTML = html;
}

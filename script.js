const API_KEY = "AIzaSyB6V4H8oMt5YzHGAjec3Hlon53mptipwfQ";

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

// floating object
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

// animation
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.002;
  torus.rotation.y += 0.003;

  renderer.render(scene, camera);
}
animate();


/* =========================
   🧠 AI FLASHCARDS (GEMINI)
========================= */

async function generateFlashcards() {
  const text = document.getElementById("inputText").value;
  const output = document.getElementById("output");

  if (!text.trim()) {
    output.innerHTML = "<p>Please enter notes first</p>";
    return;
  }

  output.innerHTML = "<p>Generating AI flashcards... ⏳</p>";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are an MBBS exam tutor.

Convert notes into HIGH-YIELD flashcards.

Format strictly:
Q: ...
A: ...

Keep answers short and exam-focused.

Notes:
${text}
                  `
                }
              ]
            }
          ]
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
    output.innerHTML = "<p>Error calling AI</p>";
  }
}


/* =========================
   🧾 DISPLAY FLASHCARDS
========================= */

function display(text) {
  const output = document.getElementById("output");

  const blocks = text.split("\n\n");

  output.innerHTML = blocks.map(b => `
    <div class="card">
      ${b.replace(/\n/g, "<br>")}
    </div>
  `).join("");
}

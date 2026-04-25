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

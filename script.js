function generateFlashcards() {
  const text = document.getElementById("inputText").value;
  const output = document.getElementById("output");

  // If empty input
  if (!text.trim()) {
    output.innerHTML = "<p style='color:red;'>Please enter some notes first.</p>";
    return;
  }

  // SIMPLE FLASHCARD LOGIC (for now, no AI)
  output.innerHTML = `
    <div class="card">
      <h3>Flashcard</h3>
      <p><b>Q:</b> What is the main idea of this topic?</p>
      <p><b>A:</b> ${text}</p>
    </div>
  `;
}

function displayPoem(response) {
  console.log("API response:", response);

  let poem = response.data?.answer || "No poem returned";

  poem = poem
    .replace(/```(html)?/gi, "")
    .replace(/```/g, "")
    .trim();

  poem = poem.replace(/<br\s*\/?>/gi, "\n");

  const lines = poem.split("\n").filter((line) => line.trim() !== "");

  const poemElement = document.querySelector("#poem");
  poemElement.innerHTML = "";

  new Typewriter("#poem", {
    strings: lines,
    autoStart: true,
    delay: 30,
    cursor: "",
  });
}

function generatePoem(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let apiKey = "7d9d8aed460317f0t10f235204bb13o9";
  let context =
    "You are a Slovak nature poem expert. Write a 4 line poem in basic HTML and separate each line with a <br />.";
  let prompt = `User instructions: Generate a poem about ${instructionsInput.value}`;

  let poemElement = document.querySelector("#poem");
  poemElement.classList.remove("hidden");
  poemElement.innerHTML = `⏳ Generating a Slovak poem about ${instructionsInput.value}...`;

  const apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${encodeURIComponent(apiKey)}`;

  axios

    .get(apiURL)
    .then(displayPoem)
    .catch((error) => {
      console.log("API ERROR 🚨", error);
      poemElement.innerHTML = "❌ Error generating poem.";
    });
}

document
  .querySelector("#poem-generator-form")
  .addEventListener("submit", generatePoem);

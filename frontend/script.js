const repoUrlInput = document.getElementById("repoUrl");
const deployButton = document.getElementById("deployButton");
const deployStatus = document.getElementById("deployStatus");

deployButton.addEventListener("click", () => {
  const repoUrl = repoUrlInput.value;
  if (repoUrl) {
    const data = { repoUrl };
    fetch("http://localhost:3000/deploy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          deployStatus.textContent = "Deployment successful!";
        } else {
          deployStatus.textContent = "Deployment failed.";
        }
      })
      .catch((error) => {
        deployStatus.textContent = "An error occurred during deployment.";
        console.error("Error:", error);
      });
  } else {
    deployStatus.textContent = "Please enter a GitHub repository URL.";
  }
});

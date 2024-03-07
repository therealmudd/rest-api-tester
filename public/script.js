function newTab(){
  const newButton = document.createElement('button');
  newButton.classList.add('tab');
  newButton.innerText = "Untitled request";
  document.getElementById("tabs").appendChild(newButton);
}

document.getElementById("url").addEventListener('input' ,() => {
  const tabs = document.getElementById("tabs").children;
  let url = document.getElementById("url").value;
  for (let tab of tabs){
    if (url.startsWith("http://") || url.startsWith("https://")) {
      let text = url.replace("http://", "").replace("https://", "");    
      tab.innerText = document.getElementById("method").value + " " + text || "Untitled request";
    }
  }
});


document.addEventListener("DOMContentLoaded", () => {
  updateColor();
});

function updateColor() {
  var methodSelect = document.getElementById("method");
  var selectedColor = methodSelect.options[methodSelect.selectedIndex].style.color;
  methodSelect.style.color = selectedColor;
}

function make_request(event){
  event.preventDefault();

  // Show loading indicator
  document.getElementById("loading").style.display = "block";

  // Reset UI feedback
  resetUI();

  // Validate URL
  const urlInput = document.getElementById("url");
  const url = urlInput.value;
  const isValidUrl = validateUrl(url);

  // Display validation message if URL is invalid
  const urlValidationMessage = document.getElementById("url-validation-message");
  if (!isValidUrl) {
    urlValidationMessage.textContent = "Please enter a valid URL.";
    return;
  } else {
    urlValidationMessage.textContent = "";
  }

  let method = document.getElementById("method").value;
  let body = document.getElementById("body-content").value;
  let content_type = document.getElementById("content-type").value;

  switch (content_type) {
    case "Text": content_type = 'text/plain'; break;
    case "JSON": content_type = 'application/json'; break;
    case "JavaScript": content_type = 'text/javascript'; break;
    case "HTML": content_type = 'text/html'; break;
    default: content_type = '';
  }

  let request_body = {
    url: url,
    method: method,
    body: body,
    content_type: content_type
  };

  console.log(request_body);

  fetch("http://localhost:5123/make-request", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(request_body),
  })
  .then(response => {
    // Handle response body
    return response.json();
  })
  .then(data => {
    if (!data.success) {
      throw new Error(data.message);
    }

    // Format and display response body
    const responseContainer = document.getElementById("response");
    responseContainer.innerText = JSON.stringify(data.response.data, null, 2);

    // Extract status code
    document.getElementById("status-code").innerText = data.response.status || "-";
    document.getElementById("status-code").style.visibility = "visible";

    // Update UI for successful request
    updateUI(true);

    // Remove loading indicator
    document.getElementById("loading").style.display = "none";
  })
  .catch(error => {
    // Handle and display error
    const responseContainer = document.getElementById("response");
    responseContainer.innerText = `Error: ${error.message}`;

    // Update UI for failed request
    updateUI(false);

    // Remove loading indicator
    document.getElementById("loading").style.display = "none";
  });
}

// Function to reset UI feedback
function resetUI() {
  const responseContainer = document.getElementById("response");
  responseContainer.innerText = ""; // Clear response
}


// Function to update UI based on request status
function updateUI(success) {
  const statusContainer = document.getElementById("status-code");
  const responseContainer = document.getElementById("response");

  if (success) {
    statusContainer.style.color = "#4CAF50"; // Green for success
    responseContainer.style.borderColor = "#4CAF50";
  } else {
    statusContainer.style.color = "#F44336"; // Red for failure
    responseContainer.style.borderColor = "#F44336";
  }
}

function validateUrl(url) {
  // Regular expression for validating URL format
  const urlRegex = /^(http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
}
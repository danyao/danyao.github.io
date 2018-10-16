console.log("This is WebPass content_script.js");

function showToast() {
  var toast = document.getElementById("myToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "myToast";
    toast.innerText = "This is a toast!";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.style.display = "block";
}

function hideToast() {
  var toast = document.getElementById("myToast");
  toast.style.display = "none";
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Received message from ", sender);
    console.log("Request: ", request);
    // Only accept messages from the extension.
    if (!sender.tab) {
      if (request.show) {
        showToast();
      } else {
        hideToast();
      }
    }
    return true;
  });

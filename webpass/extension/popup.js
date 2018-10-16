let showToast = document.getElementById("showToast");
showToast.onclick = function () {
  sendMessage({show: true});
};

let hideToast = document.getElementById("hideToast");
hideToast.onclick = function() {
  sendMessage({show: false});
};

function sendMessage(request) {
  console.log("Send message: ", request);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, request, function(response) {
      console.log(response);
    });
  });
}

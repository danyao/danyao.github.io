console.log("This is WebPass content_script.js");

function showToast() {
  console.log("TODO: showToast");
}

function hideToast() {
  toggleVisibility("demoPaywall", false);
  toggleVisibility("demoWelcome", false);
}

function onLoad() {
  if (location.origin != "https://www.gutenberg.org") {
    return;
  }

  injectElements();
  toggleVisibility("demoPaywall", false);
  toggleVisibility("demoWelcome", false);
  console.log("Demo: onload ", location.href);
  if (hasAccess()) {
    toggleVisibility("demoWelcome", true);
  } else {
    toggleVisibility("demoPaywall", true);
  }
}

function toggleVisibility(id, visible) {
  document.getElementById(id).style.display = visible ? "block" : "none";
}

function injectElements() {
  var paywall = document.createElement("div");
  paywall.id = "demoPaywall";

  var checkoutButton = document.createElement("button");
  checkoutButton.className = "demoCheckoutButton";
  checkoutButton.onclick = onCheckout;
  checkoutButton.appendChild(document.createTextNode("Continue Reading"));
  paywall.appendChild(checkoutButton);
  document.body.appendChild(paywall);

  var welcome = document.createElement("div");
  welcome.id = "demoWelcome";
  welcome.innerText = "Thank you for supporting this article!";

  var refundButton = document.createElement("button");
  refundButton.className = "demoRefundButton";
  refundButton.onclick = onRefund;
  refundButton.appendChild(document.createTextNode("Refund"));
  welcome.appendChild(refundButton);
  document.body.appendChild(welcome);
}

function onCheckout() {
  console.log("/checkout ", location.href);
  if (window.PaymentRequest) {
    const request = new PaymentRequest([{
      supportedMethods: "https://pay.stillmuchtoponder.com/pay",
      data: {
        "articleId": location.href
      }
    }], {
      total: {
        label: location.href,
        amount: {
          value: "0.10",
          currency: "USD"
        }
      }
    });

    request.show()
      .then((paymentResponse) => {
        console.log("Got response: ", paymentResponse);
        recordAccess(paymentResponse);
        toggleVisibility("demoWelcome", true);
        toggleVisibility("demoPaywall", false);
        return paymentResponse.complete();
      })
      .catch((err) => {
        console.log("Got error: ", err);
      });
  } else {
    console.log("Payment Request not supported.");
  }
}

function onRefund() {
  console.log("TODO: refund");
}

function hasAccess() {
  return false;
}

/* Returns a Promise */
function getAccess() {
  var resolver = {};
  var accessPromise = new Promise((resolve, reject) => {
    resolver.resolve = resolve;
    resolver.reject = reject;
  });
  chrome.storage.local.get([location.href], function(result) {
    resolver.resolve(result[location.href]);
  });
  return accessPromise;
}

function recordAccess(paymentResponse) {
  var access = {
    articleId: location.href,
    hasAccess: true,
    paymentMethod: paymentResponse.methodName,
    requestId: paymentResponse.requestId
  };
  let key = location.href;
  let value = JSON.stringify(access);
  chrome.storage.local.set({key: value}, function() {
    console.log("Recorded access: ", access);
  });
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

onLoad();

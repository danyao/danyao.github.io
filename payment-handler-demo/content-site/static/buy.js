function onCheckout() {
  if (window.PaymentRequest) {
    const request = new PaymentRequest([{
      supportedMethods: "https://pay.stillmuchtoponder.com/pay",
      data: { articleId: location.href }
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
        toggleVisibility("welcome", true);
        toggleVisibility("paywall", false);
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
  var accessOptions = getAccessOptions();
  if (accessOptions) {
    console.log("Refunded ", location.href);
    localStorage.removeItem(location.href);
    toggleVisibility("welcome", false);
    toggleVisibility("paywall", true);
  }
}

function onLoad() {
  toggleVisibility("paywall", false);
  toggleVisibility("welcome", false);
  console.log("hasAccess: ", hasAccess());
  if (!hasAccess()) {
    toggleVisibility("paywall", true);
  } else {
    toggleVisibility("welcome", true);
  }
}

function hasAccess() {
  var accessOptions = getAccessOptions();
  return accessOptions && accessOptions.href === location.href && accessOptions.hasAccess;
}

function getAccessOptions() {
  var data = localStorage.getItem(location.href);
  if (data) {
    return JSON.parse(data);
  }
  return null;
}

function recordAccess(paymentResponse) {
  var access = {
    href: location.href,
    hasAccess: true,
    paymentMethod: paymentResponse.methodName,
    requestId: paymentResponse.requestId
  };
  localStorage.setItem(location.href, JSON.stringify(access));
  console.log("Recorded access: ", access);
}

function toggleVisibility(id, visibility) {
  document.getElementById(id).style.display = visibility ? "block" : "none";
}
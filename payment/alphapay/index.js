// URL of the payment handler service worker.
const kServiceWorkerURL = 'alphapay.js';

/**
 * Checks if AlphaPay payment handler is installed.
 */
function checkInstallStatus() {
  navigator.serviceWorker.getRegistration(kServiceWorkerURL)
    .then(registration => {
      if (registration) {
        // AlphaPay service worker is installed.
        if (registration.paymentManager()) {
          // Always update payment handler.
          registration.update();
        } else {
          // Unexpected configuration: uninstall service worker.
          uninstallHandler();
        }
      }
      updateInstallStatus(!registration);
    });
}

/**
 * Updates the UI based on |installStatus|.
 */
function updateInstallStatus(installed) {
  let installStatus = document.querySelector('#install-status');
  let installButton = document.querySelector('#install');
  let uninstallButton = document.querySelector('#uninstall');

  document.querySelector('#install-status').innerText = installed
      ? 'Payment handler is installed.'
      : 'Payment handler is not installed.';

  if (installed) {
    installStatus.innerText = 'Payment handler is installed';
    installButton.setAttribute('disabled', 'disabled');
    uninstallButton.removeAttribute('disabled');
  } else {
    installStatus.innerText = 'Payment handler is not installed';
    installButton.removeAttribute('disabled');
    uninstallButton.setAttribute('disabled', 'disabled');
  }
}

/**
 * Update error message.
 */
function showError(errorMessage) {
  document.querySelector('#error').innerText = errorMessage;
}

/**
 * Installs the payment handler.
 */
function installHandler() {
  navigator.serviceWorker.register(kServiceWorkerURL).then(registration => {
    if (!registration.paymentManager) {
      // Payment app functionality is unavailable for some reason. Unregister
      // right away.
      registration.unregister().then(success => {});
      showError('Payment app capability not present.');
      return;
    }
    addInstruments(registration).then(() => {
      updateInstallStatus(true);
    });
  }).catch(error => {
    showError(error);
  });
}

/**
 * Uninstalls the payment handler.
 */
function uninstallHanlder() {
  navigator.serviceWorker.getRegistration(kServiceWorkerURL)
    .then(registration => {
      registration.unregister().then(success => {
        updateInstallStatus(!success);
      });
    });
}

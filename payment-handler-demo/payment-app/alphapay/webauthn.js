/*
 * Minimalistic WebAuthn implementation.
 * Adapted from https://fidoalliance.org/webauthn-tutorial/
 */

/**
 * Returns a random 32-byte challenge.
 */
function randomChallenge(size) {
  let randomChallengeBuffer = new Uint8Array(size);
  window.crypto.getRandomValues(randomChallengeBuffer);
  return randomChallengeBuffer;
}

function registerCredential() {
  let publicKey = {
    challenge: randomChallenge(32),

    rp: {
      name: "AlphaPay Demo"
    },

    user: {
      id: Uint8Array.from('UZSL85T9AFC', c => c.charCodeAt(0)),
      name: 'test@alphapay.stillmuchtoponder.com',
      displayName: 'Danyao',
    },

    pubKeyCredParams: [
      { alg: -7, type: 'public-key' },
    ],

    authenticatorSelection: {
      authenticatorAttachment: 'cross-platform',
    },

    timeout: 60000,
    attestation: 'direct'
  };

  navigator.credentials.create({ publicKey }).then(credential => {
    document.querySelector('#webauthn-cred').value = credential.id;
    console.log(credential);
  }).catch(error => {
    console.log('Failed to creat credential: ', error);
  });
}

/**
 * Authenticates the user using the public key ID from #webauthn-cred.
 */
function authenticate() {
  const credentialId = document.querySelector('#webauthn-cred').value;
  const publicKey = {
    challenge: randomChallenge(32),
    allowCredentials: [{
      id: Uint8Array.from(credentialId, c => c.charCodeAt(0)),
      type: 'public-key',
      transports: ['usb', 'ble', 'nfc'],
    }],
    timeout: 60000
  };

  navigator.credentials.get({publicKey}).then(assertion => {
    console.log(assertion);
  }).catch(error => {
    console.log(error);
  });
}

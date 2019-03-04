# Ace Wallet

This is a prototype payment handler with the following functionalities:

- User authentication using Google OAuth integration
- Single tap re-authentication
- Adding payment credentials: e.g. card number, address
- Use fingerprint to authenticate a user
- Skip payment sheet flow

Other prototype goals:

- Better understand the painpoint of authentication inside a payment handler

# How to use

- <a href="install.html">Install proto-wallet</a>
- <a href="/payment/merchant/index.html">Test buying something</a>
- <a href="account.html">Manage your proto-wallet settings</a>

# Architecture

File structure:

```
proto-wallet
|-- images
|-- src
|-- test
|-- public
  |-- index.html
  |-- manifest.json
  |-- service-worker.js
|-- README.md
|-- package.json
```

Function components:

- Login: verifies the user's identity
- Account: interfaces with the server-side information stored under a user's identity.
- Pay: processes a payment request and returns a response.

UI views:

- /pay
- /login
- /add-card
- /account

# Life of a payment request

When proto-wallet receives a PaymentRequest:

1 [Login] checks if the current user is signed in.
  1 If yes, proceed to next step.
  1 If not, use Google OAuth to authenticate the user, and creates a new user
    profile if one doesn't yet exist.
1 [Account] fetches user's payment information from the backend.
1 [Pay] Presents a UI for user to choose from one of the payment methods to use.
1 [Pay] Contact backend to generate a payment token
1 [Pay] Sends PaymentRequestResponse to complete payment.

# Implementation plan

- Skeleton single-page app

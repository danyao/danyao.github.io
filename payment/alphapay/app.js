'use strict';

const express = require('express');
const app = express();

// Always returns a link header on all paths.
app.use((req, res, next) => {
  res.status(200).links({
    'payment-method-manifest': 'https://danyao.github.io/payment/alphapay/payment-manifest.json',
  });
  return next();
});

app.use(express.static('public'));

if (module === require.main) {
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
}

module.exports = app;

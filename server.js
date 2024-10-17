const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve a basic HTML form at the root URL
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h2>reCAPTCHA Test Form</h2>
        <form action="/submit" method="POST">
          <div class="g-recaptcha" data-sitekey="6LdAjGMqAAAAAFRF59RC5CZ6gpqLAx44AByB-o7S"></div>
          <br/>
          <input type="submit" value="Submit">
        </form>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      </body>
    </html>
  `);
});

// Post route to handle reCAPTCHA verification
app.post('/submit', (req, res) => {
  const recaptchaResponse = req.body['g-recaptcha-response'];

  if (!recaptchaResponse) {
    return res.status(400).json({ message: 'Please complete the reCAPTCHA.' });
  }

  // Verify the reCAPTCHA response with Google
  const secretKey = '6LdAjGMqAAAAAC1NLOZ6AVEw5MPP1nMfylKFp98U';
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;

  axios.post(verificationUrl)
    .then(response => {
      const { success } = response.data;
      if (success) {
        res.send('reCAPTCHA verified successfully.');
      } else {
        res.status(400).send('reCAPTCHA verification failed. Please try again.');
      }
    })
    .catch(error => {
      res.status(500).send('Error verifying reCAPTCHA. Please try again later.');
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

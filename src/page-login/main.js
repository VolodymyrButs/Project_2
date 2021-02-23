import 'normalize.css/normalize.css';

import '../css/dashboard.css';
import '../css/login.css';

const card = new ToDo('title', 'status', 'description', 11);

window.document.addEventListener('DOMContentLoaded', () => {
  window.document.body.innerHTML = `<p>${Object.entries(card)} <p/>
  <p>Registration</p>
  <a href='./index.html'>Index</a>
  <a href='./login.html'>Login</a>
  `;
});

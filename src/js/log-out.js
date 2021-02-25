import 'normalize.css/normalize.css';
import '../css/dashboard.css';
import '../css/login.css';

const logoutButton = document.querySelector('#iconLogOut');

logoutButton.addEventListener('click', () => {
  window.location.href = 'login.html';
}, false);

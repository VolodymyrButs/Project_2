import 'normalize.css/normalize.css';
import '../css/dashboard.css';
import '../css/login.css';
import pic from '../img/StartPic.png';

window.document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('start-pic').setAttribute('src', pic);
});

const loginlInput = document.querySelector('#login');
const passInput = document.querySelector('#password');
const formLogin = document.querySelector('#login-form');
const errorBlock = document.querySelector('#error');
// const submitButton = document.querySelector('#btn-login');

const authentification = () => {
  const data = {
    identifier: loginlInput.value,
    password: passInput.value,
  };
  fetch('https://radiant-temple-07706.herokuapp.com/auth/local', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        errorBlock.innerHTML = `${body.message[0].messages[0].message}`;
      } else {
        errorBlock.innerHTML = '';
        window.localStorage.setItem('token', body.jwt); // сохраняем полученный токен в localStorage
        window.localStorage.setItem('username', body.user.username);
        window.location.href = 'index.html';
      }
    });
};

const loginFormSubmit = (e) => {
  e.preventDefault();
  authentification();
};

formLogin.addEventListener('submit', loginFormSubmit);

import 'normalize.css/normalize.css';
import '../css/login.css';
import pic from '../img/StartPic.png';

window.document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('start-pic').setAttribute('src', pic);
});

const emailInput = document.querySelector('#email');
const nameInput = document.querySelector('#username');
const passInput = document.querySelector('#password');
const form = document.querySelector('#register-form');
const errorBlock = document.querySelector('#error');

const registration = () => {
  const data = {
    email: emailInput.value,
    username: nameInput.value,
    password: passInput.value,
  };

  fetch('https://radiant-temple-07706.herokuapp.com/auth/local/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        errorBlock.innerHTML = `${body.message[0].messages[0].message}`;
      } else {
        errorBlock.innerHTML = '';
        window.localStorage.setItem('token', body.jwt);
        window.localStorage.setItem('username', body.user.username);
        window.location.href = 'index.html';
      }
    });
};

const regFormSubmit = (e) => {
  e.preventDefault();
  registration();
};

form.addEventListener('submit', regFormSubmit);
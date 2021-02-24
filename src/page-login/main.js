import 'normalize.css/normalize.css';
import '../css/dashboard.css';
import '../css/login.css';
import pic from '../img/StartPic.png';

window.document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('start-pic').setAttribute('src', pic);
});

window.localStorage.setItem('username', body.user.username);

const loginlInput = document.querySelector('#login');
const passInput = document.querySelector('#password');
const form = document.querySelector('#login-form');
// const errorBlock = document.querySelector('#error');
// const submitButton = document.querySelector('#btn-login');

function saveToken(token) {
  localStorage.setItem('tokenData', JSON.stringify(token));
}

const authentication = () => {
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

  .then((response) => {
    if (response.status === 200) {
        const tokenData = response.json();
        saveToken(JSON.stringify(tokenData)); // сохраняем полученный токен в sessionStorage
        return Promise.resolve()
    }
    return Promise.reject();
  });
};

const loginFormSubmit = (e) => {
  e.preventDefault();
  authentication();
};

form.addEventListener('submit', loginFormSubmit);


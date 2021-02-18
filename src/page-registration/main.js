import ToDo from '../js/todo-component';
import 'normalize.css/normalize.css';
import '../css/main.css';
import './page.css';

const card = new ToDo('title', 'status', 'description', 11);

window.document.addEventListener('DOMContentLoaded', () => {
  window.document.body.innerHTML = `<p>${Object.entries(card)} <p/>
  <p>Registration</p>
  <a href='./index.html'>Index</a>
  <a href='./login.html'>Login</a>
  `;
});

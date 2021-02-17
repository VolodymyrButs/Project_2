import ToDo from './js/todo-component';
import './css/base.css';

const cart = new ToDo('title', 'status', 'description', 11);

window.document.body.innerHTML = `<p>${Object.entries(cart)}<p/>`;

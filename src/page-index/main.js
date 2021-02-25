//
// Created by Anna Vasylashko
//

import Card from '../js/card-component';
import '../css/mainPage.css';
import '../css/dashboard.css';
import '../css/card.css';
import '../css/newTask.css';
import iconTesting from '../img/iconTesting.png';
import iconAddTask from '../img/iconAddTask.png';
import iconDashboard from '../img/iconDashboard.png';
import iconDone from '../img/iconDone.png';
import iconInProgress from '../img/iconInProgress.png';
import iconToDo from '../img/iconToDo.png';
import trash from '../img/trash.png';
import iconLogOut from '../img/iconLogOut.png';

// -----SET ICONS ON THE PAGE-----

window.document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('iconTesting').setAttribute('src', iconTesting);
  document.getElementById('iconAddTask').setAttribute('src', iconAddTask);
  document.getElementById('iconDashboard').setAttribute('src', iconDashboard);
  document.getElementById('iconDone').setAttribute('src', iconDone);
  document.getElementById('iconInProgress').setAttribute('src', iconInProgress);
  document.getElementById('iconToDo').setAttribute('src', iconToDo);
  document.getElementById('icontrash').setAttribute('src', trash);
  document.getElementById('iconLogOut').setAttribute('src', iconLogOut);
});

// -----SET USER NAME ON DASHBOARD-----

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const username = window.localStorage.getItem('username');

document.querySelector(
  '#main-section-user-name'
).innerHTML = `Hi, ${capitalizeFirstLetter(username)}`;

// -----APPENDING CARDS IN SECTIONS-----

const toDoSection = document.getElementById('toDo');
const InProgressSection = document.getElementById('inProgress');
const testingSection = document.getElementById('testing');
const doneSection = document.getElementById('done');

const appendCard = (newCard) => {
  let section;

  switch (newCard.status) {
    case 'to_do':
      section = toDoSection;
      break;
    case 'in_progress':
      section = InProgressSection;
      break;
    case 'testing':
      section = testingSection;
      break;
    case 'done':
      section = doneSection;
      break;
    default:
      break;
  }

  newCard.onDelete = removeCard;
  newCard.onChange = openChangeCardMenu;

  section.appendChild(newCard.htmlRepresentation);
};

// -----POST, PUT, GET, DELETE AND REFRESH DATA TEMPLATES-----

// -----POST DATA-----

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

// -----PUT DATA-----

async function putData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

// -----GET DATA-----

async function getData(url = '') {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

// -----REFRESH DATA-----

const refreshTasks = () => {
  getData('https://radiant-temple-07706.herokuapp.com/cards').then((data) => {
    console.log(data);
    data.forEach((chunk) => {
      let id = chunk.id;
      let title = chunk.title;
      let description = chunk.description;
      let status = chunk.status;
      let card = new Card(id, title, description, status);
      console.log(card);
      appendCard(card);
    });
  });
};

// -----DELETE DATA-----

const removeCard = (id) => {
  fetch('https://radiant-temple-07706.herokuapp.com/cards/' + id, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
  })
    .then(() => {
      console.log('removed');
      location.reload();
    })
    .catch((err) => {
      console.error(err);
    });
};

// -----CHANGE OPTION-----

const openChangeCardMenu = (card) => {
  let newTaskStatus = document.querySelector('#status-options');

  createNewTask.style.display = 'flex';

  newTaskName.value = card.title;
  newTaskContent.value = card.description;
  newTaskStatus.value = card.status;

  newTaskName.contentEditable = true;
  newTaskContent.contentEditable = true;

  card.title = newTaskName.value;
  card.description = newTaskContent.value;
  card.status = newTaskStatus.value;

  createNewTask.onsubmit = () => {
    changeCard(card);

    createNewTask.onsubmit = {};

    return false;
  };
};

const changeCard = (card) => {
  card.title = newTaskName.value;
  card.description = newTaskContent.value;
  card.status = document.querySelector(
    'input[name="status-option"]:checked'
  ).value;

  if (card.title !== '' && card.description !== '') {
    putData(`https://radiant-temple-07706.herokuapp.com/cards/${card.id}`, card)
      .then((data) => {
        console.log(data);
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

// -----WORKING WITH NEW TASK-----

const btnAddTask = document.querySelector('.btn-add-task');
const btnCloseTask = document.querySelector('#new-task-close');
const createNewTask = document.querySelector('#new-task');
const newTaskName = document.querySelector('#new-task-name');
const newTaskContent = document.querySelector('#new-task-content');

// Open/close new task form

btnAddTask.addEventListener('click', () => {
  createNewTask.style.display = 'flex';
  document.getElementById('radioToDo').checked = true; // set default value

  createNewTask.onsubmit = () => {
    submitNewTask();

    createNewTask.onsubmit = {};
    return false;
  };
});

btnCloseTask.addEventListener('click', () => {
  newTaskName.value = '';
  newTaskContent.value = '';
  document.getElementById('radioToDo').checked = true; // set default value
  createNewTask.style.display = 'none';
});

// Submit new task

const submitNewTask = () => {
  const title = newTaskName.value;
  const description = newTaskContent.value;
  const status = document.querySelector('input[name="status-option"]:checked')
    .value;

  if (title !== '' && description !== '') {
    let card = new Card(null, title, description, status);
    console.log(card);
    postData('https://radiant-temple-07706.herokuapp.com/cards', card).then(
      (data) => {
        console.log(data);
        location.reload();
      }
    );
  }
};

// -----ROUTING-----

const boardTitle = document.querySelector('#section-title');
const dashboardPage = document.querySelector('#dashboard-page');
const toDoPage = document.querySelector('#to-do-page');
const inProgressPage = document.querySelector('#in-progress-page');
const testingPage = document.querySelector('#testing-page');
const donePage = document.querySelector('#done-page');

// -----DASHBOARD PAGE-----

dashboardPage.addEventListener('click', () => {
  boardTitle.innerHTML = 'Dashboard';

  dashboardPage.parentElement.classList.add('task-types-active');

  toDoPage.parentElement.classList.remove('task-types-active');
  inProgressPage.parentElement.classList.remove('task-types-active');
  testingPage.parentElement.classList.remove('task-types-active');
  donePage.parentElement.classList.remove('task-types-active');

  document.querySelector('#toDo .task-type-section-title').style.display =
    'block';
  document.querySelector('#inProgress .task-type-section-title').style.display =
    'block';
  document.querySelector('#testing .task-type-section-title').style.display =
    'block';
  document.querySelector('#done .task-type-section-title').style.display =
    'block';

  toDoSection.style.display = 'flex';
  InProgressSection.style.display = 'flex';
  testingSection.style.display = 'flex';
  doneSection.style.display = 'flex';
});

// -----TO DO PAGE-----

toDoPage.addEventListener('click', () => {
  boardTitle.innerHTML = 'To Do';

  toDoPage.parentElement.classList.add('task-types-active');

  dashboardPage.parentElement.classList.remove('task-types-active');
  inProgressPage.parentElement.classList.remove('task-types-active');
  testingPage.parentElement.classList.remove('task-types-active');
  donePage.parentElement.classList.remove('task-types-active');

  document.querySelector('#toDo .task-type-section-title').style.display =
    'none';

  toDoSection.style.display = 'flex';
  InProgressSection.style.display = 'none';
  testingSection.style.display = 'none';
  doneSection.style.display = 'none';
});

// -----IN PROGRESS PAGE-----

inProgressPage.addEventListener('click', () => {
  boardTitle.innerHTML = 'In Progress';

  inProgressPage.parentElement.classList.add('task-types-active');

  dashboardPage.parentElement.classList.remove('task-types-active');
  toDoPage.parentElement.classList.remove('task-types-active');
  testingPage.parentElement.classList.remove('task-types-active');
  donePage.parentElement.classList.remove('task-types-active');

  document.querySelector('#inProgress .task-type-section-title').style.display =
    'none';

  toDoSection.style.display = 'none';
  InProgressSection.style.display = 'flex';
  testingSection.style.display = 'none';
  doneSection.style.display = 'none';
});

// -----TESTING PAGE-----

testingPage.addEventListener('click', () => {
  boardTitle.innerHTML = 'Testing';

  testingPage.parentElement.classList.add('task-types-active');

  dashboardPage.parentElement.classList.remove('task-types-active');
  inProgressPage.parentElement.classList.remove('task-types-active');
  toDoPage.parentElement.classList.remove('task-types-active');
  donePage.parentElement.classList.remove('task-types-active');

  document.querySelector('#testing .task-type-section-title').style.display =
    'none';

  toDoSection.style.display = 'none';
  InProgressSection.style.display = 'none';
  testingSection.style.display = 'flex';
  doneSection.style.display = 'none';
});

// -----DONE PAGE-----

donePage.addEventListener('click', () => {
  boardTitle.innerHTML = 'Done';

  donePage.parentElement.classList.add('task-types-active');

  dashboardPage.parentElement.classList.remove('task-types-active');
  toDoPage.parentElement.classList.remove('task-types-active');
  testingPage.parentElement.classList.remove('task-types-active');
  InProgressSection.parentElement.classList.remove('task-types-active');

  document.querySelector('#done .task-type-section-title').style.display =
    'none';

  toDoSection.style.display = 'none';
  InProgressSection.style.display = 'none';
  testingSection.style.display = 'none';
  doneSection.style.display = 'flex';
});

refreshTasks();

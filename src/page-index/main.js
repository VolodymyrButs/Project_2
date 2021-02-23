import Card from '../js/card-component';
import '../css/mainPage.css';
import '../css/dashboard.css';
import '../css/taskTypes.css';
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
// -----EXAMPLE CARDS-----
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
const card1 = new Card(
  'Research',
  'Research and analize analogs of the app and how to make your project more usable and in demand',
  0,
);

const card2 = new Card(
  'Research',
  'Research and analize what kinds of designs are used for this kind of app',
  0,
);

const card3 = new Card(
  'Design',
  'Think of a better way to show task cards on the dashboard',
  1,
);

const card4 = new Card(
  'illustration',
  'Create icons for all kinds of tasks (dashboard, to-do, in-progres, testing and done)',
  1,
);

const card5 = new Card(
  'illustration',
  'Create logo, user representation, task bar visualisation',
  1,
);

const card6 = new Card(
  'illustration',
  'Presenting design prototypes to the project teammates',
  2,
);

const card7 = new Card(
  'Presenting',
  'Create the first version of main page design in the project app',
  3,
);

const card8 = new Card(
  'design',
  'Design the templates for: <br>- task cards <br>- tags <br>- task sections <br>- task bar',
  3,
);

// -----APPENDING CARDS IN SECTIONS-----

const toDoSection = document.getElementById('toDo');
const InProgressSection = document.getElementById('inProgress');
const testingSection = document.getElementById('testing');
const doneSection = document.getElementById('done');

const appendCard = (newCard) => {
  console.log('here');
  console.log(newCard);

  let section;

  switch (newCard.taskType) {
    case 0:
      console.log('0');
      section = toDoSection;
      break;
    case 1:
      console.log('1');
      section = InProgressSection;
      break;
    case 2:
      console.log('2');
      section = testingSection;
      break;
    case 3:
      console.log('3');
      section = doneSection;
      break;
    default:
  }

  section.appendChild(newCard.htmlRepresentation);
};

[card1, card2, card3, card4, card5, card6, card7, card8].forEach(appendCard);

// -----WORKING WITH NEW TASK-----

const btnAddTask = document.querySelector('.btn-add-task');
const btnCloseTask = document.querySelector('#new-task-close');
const createNewTask = document.querySelector('#new-task');
const submitNewTask = document.querySelector('#submit-new-task');
const newTaskName = document.querySelector('#new-task-name');
const newTaskContent = document.querySelector('#new-task-content');

btnAddTask.addEventListener('click', () => {
  createNewTask.style.display = 'flex';
  document.getElementById('radioToDo').checked = true;
});

btnCloseTask.addEventListener('click', () => {
  newTaskName.value = '';
  newTaskContent.value = '';
  document.getElementById('radioToDo').checked = true;
  createNewTask.style.display = 'none';
});

submitNewTask.addEventListener('click', () => {
  const name = newTaskName.value;
  const content = newTaskContent.value;
  const taskType = document.querySelector('input[name="status-option"]:checked')
    .value;

  alert(name);
  alert(content);
  alert(taskType);
  if (name !== '' && content !== '') return new Card(name, content, taskType);
});

import Card from '../js/card-component.js';

// -----EXAMPLE CARDS-----

let card1 = new Card(
  'Research',
  'Research and analize analogs of the app and how to make your project more usable and in demand',
  0
);

let card2 = new Card(
  'Research',
  'Research and analize what kinds of designs are used for this kind of app',
  0
);

let card3 = new Card(
  'Design',
  'Think of a better way to show task cards on the dashboard',
  1
);

let card4 = new Card(
  'illustration',
  'Create icons for all kinds of tasks (dashboard, to-do, in-progres, testing and done)',
  1
);

let card5 = new Card(
  'illustration',
  'Create logo, user representation, task bar visualisation',
  1
);

let card6 = new Card(
  'illustration',
  'Presenting design prototypes to the project teammates',
  2
);

let card7 = new Card(
  'Presenting',
  'Create the first version of main page design in the project app',
  3
);

let card8 = new Card(
  'design',
  `Design the templates for: <br>- task cards <br>- tags <br>- task sections <br>- task bar`,
  3
);

// -----APPENDING CARDS IN SECTIONS-----

let toDoSection = document.getElementById('toDo');
let InProgressSection = document.getElementById('inProgress');
let testingSection = document.getElementById('testing');
let doneSection = document.getElementById('done');

const appendCard = (newCard) => {
  console.log('here');
  console.log(newCard);

  var section;

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
  }

  section.appendChild(newCard.htmlRepresentation);
};

[card1, card2, card3, card4, card5, card6, card7, card8].forEach(appendCard);

// -----WORKING WITH NEW TASK-----

let btnAddTask = document.querySelector('.btn-add-task');
let btnCloseTask = document.querySelector('#new-task-close');
let createNewTask = document.querySelector('#new-task');
let submitNewTask = document.querySelector('#submit-new-task');
let newTaskName = document.querySelector('#new-task-name');
let newTaskContent = document.querySelector('#new-task-content');

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
  let name = newTaskName.value;
  let content = newTaskContent.value;
  let taskType = document.querySelector('input[name="status-option"]:checked')
    .value;

  alert(name);
  alert(content);
  alert(taskType);
  if (name !== '' && content !== '') return new Card(name, content, taskType);
});

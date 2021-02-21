let createCard = (name, content, taskType) => {
  let cardForm = document.createElement("div");
  cardForm.className = "card";

  let cardTop = document.createElement("div");
  cardTop.className = "card-top";

  let cardName = document.createElement("span");
  cardName.className = "card-name";
  cardName.innerHTML = name;

  let cardOptionsBtn = document.createElement("button");
  cardOptionsBtn.className = "card-options btn";

  for (let i = 0; i < 3; i++) {
    let dot = document.createElement("div");
    dot.className = "card-option-dot";

    cardOptionsBtn.appendChild(dot);
  }

  let cardContent = document.createElement("p");
  cardContent.className = "card-content";
  cardContent.innerHTML = content;

  cardTop.appendChild(cardName);
  cardTop.appendChild(cardOptionsBtn);
  cardForm.appendChild(cardTop);
  cardForm.appendChild(cardContent);

  let toDoSection = document.getElementById("toDo");
  let InProgressSection = document.getElementById("inProgress");
  let testingSection = document.getElementById("testing");
  let doneSection = document.getElementById("done");

  switch (taskType) {
    case 0:
      cardName.style.color = "#d7385e";
      cardName.style.background = "#ffe1e8";
      toDoSection.appendChild(cardForm);
      break;
    case 1:
      cardName.style.color = "#ff9345";
      cardName.style.background = "#ffe6d4";
      InProgressSection.appendChild(cardForm);
      break;
    case 2:
      cardName.style.color = "#ffb800";
      cardName.style.background = "#fef8d7";
      testingSection.appendChild(cardForm);
      break;
    case 3:
      cardName.style.color = "#37d050";
      cardName.style.background = "#daffd4";
      doneSection.appendChild(cardForm);
      break;
  }
};

createCard(
  "Research",
  "Research and analize analogs of the app and how to make your project more usable and in demand",
  0
);

createCard(
  "Research",
  "Research and analize what kinds of designs are used for this kind of app",
  0
);

createCard(
  "Design",
  "Think of a better way to show task cards on the dashboard",
  1
);

createCard(
  "illustration",
  "Create icons for all kinds of tasks (dashboard, to-do, in-progres, testing and done)",
  1
);

createCard(
  "illustration",
  "Create logo, user representation, task bar visualisation",
  1
);

createCard(
  "illustration",
  "Presenting design prototypes to the project teammates",
  2
);

createCard(
  "Presenting",
  "Create the first version of main page design in the project app",
  3
);

createCard(
  "design",
  `Design the templates for: <br>- task cards <br>- tags <br>- task sections <br>- task bar`,
  3
);

let btnAddTask = document.querySelector(".btn-add-task");
let btnCloseTask = document.querySelector("#new-task-close");
let createNewTask = document.querySelector("#new-task");
let submitNewTask = document.querySelector("#submit-new-task");
let newTaskName = document.querySelector("#new-task-name");
let newTaskContent = document.querySelector("#new-task-content");

btnAddTask.addEventListener("click", () => {
  createNewTask.style.display = "flex";
  document.getElementById("radioToDo").checked = true;
});

btnCloseTask.addEventListener("click", () => {
  newTaskName.value = "";
  newTaskContent.value = "";
  document.getElementById("radioToDo").checked = true;
  createNewTask.style.display = "none";
});

submitNewTask.addEventListener("click", () => {
  let name = newTaskName.value;
  let content = newTaskContent.value;
  let taskType = document.querySelector('input[name="status-option"]:checked')
    .value;

  alert(name);
  alert(content);
  alert(taskType);
  createCard(name, content, taskType);
});

export default class Card {
  constructor(name, content, taskType) {
    this.name = name;
    this.content = content;
    this.taskType = taskType;
  }

  // -----DECORATOR PATTERN-----

  get htmlRepresentation() {
    // Creating card, it's name, content and button for options (change/delete)

    let cardForm = document.createElement('div');
    cardForm.className = 'card';

    let cardTop = document.createElement('div');
    cardTop.className = 'card-top';

    let cardName = document.createElement('span');
    cardName.className = 'card-name';
    cardName.innerHTML = this.name;

    let cardOptionsBtn = document.createElement('button');
    cardOptionsBtn.className = 'card-options btn';

    for (let i = 0; i < 3; i++) {
      let dot = document.createElement('div');
      dot.className = 'card-option-dot';

      cardOptionsBtn.appendChild(dot);
    }

    let cardContent = document.createElement('p');
    cardContent.className = 'card-content';
    cardContent.innerHTML = this.content;

    // Creating card options (chage/delete)

    let cardOptions = document.createElement('div');
    cardOptions.className = 'card-options-form';

    let changeOption = document.createElement('button');
    changeOption.className = 'card-options-change btn';
    changeOption.innerHTML = 'Change';

    let deleteOption = document.createElement('button');
    deleteOption.className = 'card-options-delete btn';
    deleteOption.innerHTML = 'Delete';

    cardOptionsBtn.addEventListener('click', () => {
      if (cardOptions.style.display == 'flex') {
        cardOptions.style.display = 'none';
      } else {
        cardOptions.style.display = 'flex';
      }
    });

    deleteOption.addEventListener('click', () => {
      cardForm.remove();
    });

    // Appending card elements

    cardOptions.appendChild(changeOption);
    cardOptions.appendChild(deleteOption);

    cardTop.appendChild(cardName);
    cardTop.appendChild(cardOptionsBtn);
    cardForm.appendChild(cardTop);
    cardForm.appendChild(cardContent);
    cardForm.appendChild(cardOptions);

    // Applying card name colors according to task type

    switch (this.taskType) {
      case 0:
        cardName.style.color = '#d7385e';
        cardName.style.background = '#ffe1e8';
        break;
      case 1:
        cardName.style.color = '#ff9345';
        cardName.style.background = '#ffe6d4';
        break;
      case 2:
        cardName.style.color = '#ffb800';
        cardName.style.background = '#fef8d7';
        break;
      case 3:
        cardName.style.color = '#37d050';
        cardName.style.background = '#daffd4';
        break;
    }

    return cardForm;
  }
}

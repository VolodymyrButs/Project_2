//
// Created by Anna Vasylashko
//

export default class Card {
  constructor(id, title, description, status) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
  }

  // -----DECORATOR PATTERN-----

  get htmlRepresentation() {
    // Creating card, it's name, content and button for options (change/delete)

    const cardForm = document.createElement('div');
    cardForm.className = 'card';

    const cardTop = document.createElement('div');
    cardTop.className = 'card-top';

    const cardName = document.createElement('span');
    cardName.className = 'card-name';
    cardName.innerHTML = this.title;

    const cardOptionsBtn = document.createElement('button');
    cardOptionsBtn.className = 'card-options btn';

    for (let i = 0; i < 3; i += 1) {
      const dot = document.createElement('div');
      dot.className = 'card-option-dot';

      cardOptionsBtn.appendChild(dot);
    }

    const cardContent = document.createElement('p');
    cardContent.className = 'card-content';
    cardContent.innerHTML = this.description;

    // Creating card options (chage/delete)

    const cardOptions = document.createElement('div');
    cardOptions.className = 'card-options-form';

    const changeOption = document.createElement('button');
    changeOption.className = 'card-options-change btn';
    changeOption.innerHTML = 'Change';

    const deleteOption = document.createElement('button');
    deleteOption.className = 'card-options-delete btn';
    deleteOption.innerHTML = 'Delete';

    // Add method to implement delete option

    deleteOption.addEventListener('click', () => {
      if (this.onDelete) {
        this.onDelete(this.id);
      }
    });

    changeOption.addEventListener('click', () => {
      if (this.onChange) {
        this.onChange(this);
      }
    });

    // Show/hide card options

    cardOptionsBtn.addEventListener('click', () => {
      if (cardOptions.style.display === 'flex') {
        cardOptions.style.display = 'none';
      } else {
        cardOptions.style.display = 'flex';
      }
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

    switch (this.status) {
      case 'to_do':
        cardName.style.color = '#d7385e';
        cardName.style.background = '#ffe1e8';
        break;
      case 'in_progress':
        cardName.style.color = '#ff9345';
        cardName.style.background = '#ffe6d4';
        break;
      case 'testing':
        cardName.style.color = '#ffb800';
        cardName.style.background = '#fef8d7';
        break;
      case 'done':
        cardName.style.color = '#37d050';
        cardName.style.background = '#daffd4';
        break;
      default:
    }

    return cardForm;
  }
}

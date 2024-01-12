class Button {
  constructor(number) {
    this.element = document.createElement('div');
    this.element.className = 'button';
    this.number = number;
    this.setColorAndNumber();
  }

  setColorAndNumber() {
    this.element.style.backgroundColor = this.getRandomColor();
    this.element.textContent = `${this.number}`;
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

class Game {
  constructor() {
    this.numButtonsInput = document.getElementById('numButtons');
    this.buttonContainer = document.getElementById('buttonContainer');
    this.messageContainer = document.getElementById('messageContainer');
    this.buttons = [];
    this.buttonsCopy = [];
    this.scattering = false;
    this.goButton = document.getElementById('goButton');
    this.messageDisplayed = false;
  }

  createButtons() {
    this.scattering = false;
    this.messageDisplayed = false;
    const numButtons = parseInt(this.numButtonsInput.value);

    if (isNaN(numButtons) || numButtons < 3 || numButtons > 7) {
      alert(numberWarning);
      return;
    }

    goButton.style.display = 'none';

    this.clearButtons();
    this.clearMessage();

    this.renderButtons(numButtons);

    let completedScatterings = 0;

    setTimeout(() => {
      for (let i = 0; i < numButtons; i++) {
        setTimeout(() => {
          this.scattering = true;
          this.scatterButtons();

          completedScatterings++;

          if (completedScatterings === numButtons) {
            this.makeButtonsClickable();
            this.hideNumbers();
            goButton.style.display = 'block';
          }
        }, i * 2000);
      }
    }, 1000 * numButtons);
  }

  clearButtons() {
    this.buttonContainer.innerHTML = '';
    this.buttons = [];
  }

  clearMessage() {
    this.messageContainer.textContent = '';
  }

  renderButtons(numButtons) {
    for (let i = 0; i < numButtons; i++) {
      const button = new Button(i + 1);
      this.buttonContainer.appendChild(button.element);
      this.buttons.push(button);
    }
    this.buttonsCopy = [...this.buttons];
  }

  scatterButtons() {
    if (this.scattering) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      this.buttons.forEach(button => {
        const rect = button.element.getBoundingClientRect();
        const maxLeft = windowWidth - rect.width;
        const maxTop = windowHeight - rect.height;

        const newLeft = Math.random() * maxLeft;
        const newTop = Math.random() * maxTop;

        button.element.style.position = 'absolute';
        button.element.style.left = `${newLeft}px`;
        button.element.style.top = `${newTop}px`;
      });
    } else {
      this.buttons.forEach(button => {
        button.element.style.position = 'relative';
        button.element.style.left = '0';
        button.element.style.top = '0';
      });
    }
  }

  makeButtonsClickable() {
    if (!this.scattering) {
      return;
    }

    this.buttons.forEach(button => {
      button.element.addEventListener('click', () => this.checkOrder(button));
    });
  }

  hideNumbers() {
    this.buttons.forEach(button => {
      button.element.textContent = '';
    });
  }

  checkOrder(clickedButton) {
    let index = this.buttonsCopy.indexOf(clickedButton);
    if(!this.messageDisplayed){
      if (index === 0) {
        clickedButton.element.textContent = `${(this.buttons.length - this.buttonsCopy.length) + 1}`;
        this.buttonsCopy.splice(index, 1);

        if (this.buttonsCopy.length === 0) {
          this.displayMessage(correct);
          this.messageDisplayed = true;
        }
      } else {
        this.displayMessage(wrong);
        this.messageDisplayed = true;
        this.revealCorrectOrder();
      }
    }
  }

  revealCorrectOrder() {
    this.buttons.forEach((button, index) => {
      button.element.textContent = `${index + 1}`;
    });

    this.buttons.forEach((button) => {
      button.removeEventListener('click', () => this.checkOrder(button))
    });
    
    this.buttons = [];
  }

  displayMessage(message) {
    this.messageContainer.textContent = message;
  }
}

const buttonGenerator = new Game();

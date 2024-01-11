class ButtonGenerator {
    constructor() {
      this.numButtonsInput = document.getElementById('numButtons');
      this.buttonContainer = document.getElementById('buttonContainer');
      this.messageContainer = document.getElementById('messageContainer');
      this.buttons = [];
      this.buttonsCopy = [];
      this.scattering = false;
      this.goButton = document.getElementById('goButton');
    }
  
    createButtons() {
    
      this.scattering = false;

      goButton.style.display = 'none';

      // Get the number of buttons from the user input
      const numButtons = parseInt(this.numButtonsInput.value);
  
      // Validate input
      if (isNaN(numButtons) || numButtons < 3 || numButtons > 7) {
        alert(numberWarning);
        return;
      }
  
      // Clear previous buttons and messages
      this.clearButtons();
      this.clearMessage();
  
      // Create and append buttons
      this.renderButtons(numButtons);
  
      // Counter to track completed scatterings
      let completedScatterings = 0;
  
      setTimeout(() => {
        
        // Scatter buttons n times with a time interval of two seconds
        for (let i = 0; i < numButtons; i++) {
          setTimeout(() => {
            this.scattering = true;
            this.scatterButtons();
  
            // Increment the counter
            completedScatterings++;
  
            // Check if all scatterings are completed
            if (completedScatterings === numButtons) {
              // All scatterings are completed, make buttons clickable and hide numbers
              this.makeButtonsClickable();
              this.hideNumbers();
              goButton.style.display = 'block';
            }
          }, i * 2000);

        }
      }, 1000 * numButtons);

  
    }
  
    clearButtons() {
      // Clear previous buttons
      this.buttonContainer.innerHTML = '';
      this.buttons = [];
    }
  
    clearMessage() {
      // Clear previous messages
      this.messageContainer.textContent = '';
    }
  
    renderButtons(numButtons) {
      // Create and append buttons with random colors and numbers
      for (let i = 0; i < numButtons; i++) {
        const button = document.createElement('div');
        button.className = 'button';
        button.style.backgroundColor = this.getRandomColor();
        button.textContent = `${i + 1}`;
        this.buttonContainer.appendChild(button);
        this.buttons.push(button);
      }
      this.buttonsCopy = [...this.buttons];
      
    }
  
    scatterButtons() {
      if (this.scattering) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
    
        this.buttons.forEach(button => {
          const rect = button.getBoundingClientRect();
          const maxLeft = windowWidth - rect.width;
          const maxTop = windowHeight - rect.height;
  
          const newLeft = Math.random() * maxLeft;
          const newTop = Math.random() * maxTop;

          button.style.position = 'absolute';
          button.style.left = `${newLeft}px`;
          button.style.top = `${newTop}px`;
        });
      } else {
        this.buttons.forEach(button => {
          button.style.position = 'relative';
          button.style.left = '0';
          button.style.top = '0';
        });
      }
    }    
    

    makeButtonsClickable(){
      this.buttons.forEach(button => {
        button.addEventListener('click', () => this.checkOrder(button));
      })
    }
       
 
    hideNumbers() {
      // Hide numbers and make buttons clickable
      this.buttons.forEach(button => {
        button.textContent = '';
      });
    }

    checkOrder(clickedButton) {
      
      let index = this.buttonsCopy.indexOf(clickedButton);
    
      if (index === 0) {
        // Correct order, reveal the number and check next button
        clickedButton.textContent = `${(this.buttons.length - this.buttonsCopy.length) + 1}`;
        this.buttonsCopy.splice(index, 1); // Remove the checked button from the array
    
        if (this.buttonsCopy.length === 0) {
          this.displayMessage(correct);
        }
      } else {
        // Wrong order, reveal correct order and end the game
        this.displayMessage(wrong);
        this.revealCorrectOrder();
      }
    }    
    
  
    revealCorrectOrder() {
      // Reveal the correct order of all buttons
      this.buttons.forEach((button, index) => {
        button.textContent = `${index + 1}`;
      });
      this.buttons = []; // Clear the buttons array
    }
  
    displayMessage(message) {
      // Display a message in the message container
      this.messageContainer.textContent = message;
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
  
  const buttonGenerator = new ButtonGenerator();
  
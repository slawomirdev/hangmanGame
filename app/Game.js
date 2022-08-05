import { Quote } from './Quote.js';

class Game {
  currentStep = 0;
  lastStep = 7;

  quotes = [
    {
      text: 'pan tadeusz',
      category: 'Utwór literacki',
    },
    {
      text: 'janko muzykant',
      category: 'Utwór literacki',
    },
    {
      text: 'akademia pana kleksa',
      category: 'Film',
    },
    {
      text: 'ogniem i mieczem',
      category: 'Film',
    },
  ];

  constructor({ lettersWrapper, categoryWrapper, wordWrapper }) {
    this.lettersWrapper = lettersWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordWrapper = wordWrapper;

    this.shuffle();
  }

  guess(letter, event) {
    event.target.disabled = true;
    if (this.quote.guess(letter)) {
      this.drawQuote();
    } else {
      this.currentStep++;
      document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
      if(this.currentStep === this.lastStep){
        this.loosing();
      }
    }
  }

  shuffle(){
    const { text, category } = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.categoryWrapper.innerHTML = category;
    this.quote = new Quote(text);
  }

  drawLetters() {
    for (let i = 0; i < 26; i++) {
      const label = (i + 10).toString(36);
      const button = document.createElement('button');
      button.innerHTML = label;
      button.addEventListener('click', (event) => this.guess(label, event));
      this.lettersWrapper.appendChild(button);
    }
  }

  drawQuote() {
    const content = this.quote.getContent();
    this.wordWrapper.innerHTML = content;
    if(!content.includes('_')){
      this.winning()
    }
  }

  start() {
    document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
    this.drawLetters();
    this.drawQuote();
  }

  winning() {
    this.wordWrapper.innerHTML = 'GRATULACJE WYGRYWASZ! KONIEC GRY!';
    this.lettersWrapper.innerHTML = '';
    this.restart();
  }

  loosing() {
    this.wordWrapper.innerHTML = 'PRZEGRAŁEŚ! KONIEC GRY!';
    this.lettersWrapper.innerHTML = '';
    this.restart();
  }

  restart(){
    const button = document.createElement('button');
    button.innerHTML = 'Try again';
    button.addEventListener('click', () => {
      this.lettersWrapper.innerHTML = '';
      this.currentStep = 0;
      const elements = document.getElementsByClassName('step');
      for (let i = 0; i<elements.length; i++) {
        console.log(elements[i]);
        elements[i].style.opacity = 0.2;
      }
      this.shuffle();
      this.start();
    });
    this.lettersWrapper.appendChild(button);
  }
}

const game = new Game({
  lettersWrapper: document.getElementById('letters'),
  categoryWrapper: document.getElementById('category'),
  wordWrapper: document.getElementById('word'),
});
game.start();

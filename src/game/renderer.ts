export class Renderer {
  trainingNumber: HTMLElement;
  currentQuestionWrap: HTMLElement;
  totalQuestionWrap: HTMLElement;
  answerWrap: HTMLElement;
  lettersWrap: HTMLElement;

  constructor(readonly container: HTMLElement) {
    this.initStructure();
  }

  renderTitle(trainingIndex: number) {
    this.trainingNumber.innerText = `#${trainingIndex}`;
  }

  //renderRendering(training: GameTraining, onSelect: (index: number) => boolean): void {}

  private initStructure(): void {
    this.container.classList.add('d-flex', 'flex-column', 'align-items-center', 'w-100', 'text-center', 'mx-auto');
    //trainingTitle
    const mainTitle = document.createElement('h2');
    mainTitle.classList.add('mb-3');
    mainTitle.innerText = 'English Vocabulary Trainer ';
    this.container.appendChild(mainTitle);
    this.trainingNumber = document.createElement('span');
    this.trainingNumber.classList.add('badge', 'badge-secondary');
    mainTitle.appendChild(this.trainingNumber);
    //description
    const description = document.createElement('p');
    description.classList.add('lead', 'mb-1');
    description.innerText = `Form a valid English word using the given letters`;
    this.container.appendChild(description);
    const roundWrap = document.createElement('div');
    roundWrap.setAttribute('id', 'round');
    this.container.appendChild(roundWrap);
    //question
    const question = document.createElement('p');
    question.classList.add('mb-5');
    question.innerText = `Question `;
    roundWrap.appendChild(question);
    //currentQuestionWrap
    this.currentQuestionWrap = document.createElement('span');
    question.appendChild(this.currentQuestionWrap);
    //totalQuestionWrap
    this.totalQuestionWrap = document.createElement('span');
    question.appendChild(this.totalQuestionWrap);
    //answerWrap
    this.answerWrap = document.createElement('div');
    this.answerWrap.classList.add('bg-light', 'mx-1', 'mb-3');
    this.answerWrap.setAttribute('style', 'height: 46px; border-radius: 6px');
    roundWrap.appendChild(this.answerWrap);
    //lettersWrap
    this.lettersWrap = document.createElement('div');
    this.lettersWrap.classList.add('d-flex', 'justify-content-between');
    roundWrap.appendChild(this.lettersWrap);
  }
}

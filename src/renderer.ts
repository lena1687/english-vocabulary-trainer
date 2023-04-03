import { GameRound, GameTraining, IGameResults } from './game';

export class Renderer {
  roundWrap: HTMLElement;
  currentQuestionWrap: HTMLElement;
  totalQuestionWrap: HTMLElement;
  answerWrap: HTMLElement;
  lettersWrap: HTMLElement;
  lettersButtons: HTMLButtonElement[] = [];
  resultsWrap: HTMLElement;

  constructor(readonly container: HTMLElement) {
    this.initStructure();
  }

  askForContinueTraining(onAnswer: (result: boolean) => void): void {
    const result = confirm('Do you want to continue the training?');
    onAnswer(result);
  }

  renderTraining(training: GameTraining, onSelect: (index: number) => boolean): void {
    if (training.isFinished) {
      this.roundWrap.classList.add('d-none');
      this.lettersButtons = [];
      return;
    } else {
      this.roundWrap.classList.remove('d-none');
      this.currentQuestionWrap.innerHTML = String(training.currentRoundNumber + 1);
      this.totalQuestionWrap.innerHTML = ` from ${String(training.rounds.length)}`;
      this.renderAnswer(training.currentRound);
      this.renderLetterButtons(training.currentRound, onSelect);
    }
  }

  renderResults(results: IGameResults, training: GameTraining): void {
    if (training.isFinished) {
      this.resultsWrap.innerHTML = `<p>Words number without errors: ${results.correctWordsNumber}</p>
                                    <p>Errors number: ${results.errorsNumber}</p>
                                    <p>Word with the most errors: ${results.hardestWord.word}</p>`;
    } else {
      this.resultsWrap.replaceChildren();
    }
  }

  pressKeyButton(keyIndex: number): boolean {
    const keyButton = this.lettersButtons[keyIndex];
    if (keyButton) {
      keyButton.click();
      return true;
    } else {
      this.disableLettersButton(true);
      return false;
    }
  }

  private renderAnswer(round: GameRound): void {
    const answerLetters = (round.isFailed ? round.word : round.word.slice(0, round.progress)).split('');
    this.answerWrap.replaceChildren(
      ...this.renderLettersButtons(answerLetters).map((button, index) => {
        button.setAttribute('disabled', 'disabled');
        const isErrorButton = round.isFailed && index !== round.progress;
        button.classList.remove('btn-primary');
        button.classList.add(round.isFailed ? 'btn-danger' : 'btn-success');
        return button;
      })
    );
  }

  private renderLetterButtons(round: GameRound, onSelect: (index: number) => boolean): void {
    this.lettersButtons = round.isFinished
      ? []
      : this.renderLettersButtons(round.letters).map((button, index) => {
          button.addEventListener('click', () => {
            this.disableLettersButton();
            const result = onSelect(index);
            if (!result) {
              button.classList.remove('btn-primary');
              button.classList.add('btn-danger');
            }
          });
          return button;
        });
    this.lettersWrap.replaceChildren(...this.lettersButtons);
  }

  private renderLettersButtons(values: string[]): HTMLButtonElement[] {
    return values.map(value => {
      const button = document.createElement('button');
      button.classList.add('btn', 'btn-primary', 'mr-1');
      button.innerText = value;
      button.value = value;
      return button;
    });
  }

  private disableLettersButton(invalid?: boolean) {
    this.lettersButtons.forEach(button => {
      button.setAttribute('disabled', 'disabled');
      if (invalid) {
        button.classList.remove('btn-primary');
        button.classList.add('btn-danger');
      }
    });
  }

  private initStructure(): void {
    this.container.classList.add('d-flex', 'flex-column', 'align-items-center', 'w-100', 'text-center', 'mx-auto');
    //trainingTitle
    const mainTitle = document.createElement('h2');
    mainTitle.classList.add('mb-3');
    mainTitle.innerText = 'English Vocabulary Trainer ';
    this.container.appendChild(mainTitle);
    //description
    const description = document.createElement('p');
    description.classList.add('lead', 'mb-1');
    description.innerText = `Form a valid English word using the given letters`;
    this.container.appendChild(description);
    this.roundWrap = document.createElement('div');
    this.container.appendChild(this.roundWrap);
    //question
    const question = document.createElement('p');
    question.classList.add('mb-5');
    question.innerText = `Question `;
    this.roundWrap.appendChild(question);
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
    this.roundWrap.appendChild(this.answerWrap);
    //lettersWrap
    this.lettersWrap = document.createElement('div');
    this.lettersWrap.classList.add('d-flex', 'justify-content-between');
    this.roundWrap.appendChild(this.lettersWrap);
    //resultsWrap
    this.resultsWrap = document.createElement('div');
    this.resultsWrap.classList.add('mt-5');
    this.container.appendChild(this.resultsWrap);
  }
}

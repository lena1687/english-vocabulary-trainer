import { Renderer } from './renderer';
import { GameTraining, gameTrainingResult, generateTraining } from './game';
import { attemptsPerRoundNumber, roundsNumber } from './constants';
import { load, save } from './storage';

//application state
const state = {
  training: load(),
  renderer: new Renderer(document.getElementById('container') as HTMLElement)
};

function onSelect(buttonIndex: number): boolean {
  const training = state.training as GameTraining;
  const result = training.currentRound.select(buttonIndex);
  save(training);
  //For better user experience: user can see a clicked button for 200ms
  setTimeout(() => {
    render();
  }, 200);
  return result;
}

function render() {
  const training = state.training as GameTraining;
  state.renderer.renderTraining(training, onSelect);
  state.renderer.renderResults(gameTrainingResult(training), training);
  //User can see the result for 1 sec, for better user experience
  const round = training.currentRound;
  if (round.isFinished && !training.isFinished) {
    setTimeout(() => {
      training.nextTraining();
      save(training);
      render();
    }, 1000);
  }
}

export function initApp() {
  if (state.training && !state.training.isFinished) {
    state.renderer.askForContinueTraining(result => {
      if (result) {
        return render();
      }
      state.training = generateTraining(roundsNumber, attemptsPerRoundNumber);
      save(state.training);
      render();
    });
  } else {
    state.training = generateTraining(roundsNumber, attemptsPerRoundNumber);
    save(state.training);
    render();
  }
}

//listeners

document.addEventListener('keydown', event => {
  const training = state.training;
  if (
    !training ||
    training.currentRound.isFinished ||
    training.isFinished ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.metaKey ||
    !event.key.match(/^[A-Za-z]$/)
  ) {
    return;
  }
  const keyIndex = training.currentRound.letters.indexOf(event.key.toLowerCase());
  const clicked = state.renderer.pressKeyButton(keyIndex);
  if (!clicked) {
    onSelect(keyIndex);
  }
});

window.addEventListener('load', () => {
  initApp();
});

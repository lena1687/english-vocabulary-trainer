import { Renderer } from './renderer';
import { gameTrainingResult, generateTraining } from './game';
import { attemptsPerRoundNumber, roundsNumber } from './constants';
import { load, save } from './storage';

//application state
const state = {
  trainings: load(),
  trainingIndex: 0,
  renderer: new Renderer(document.getElementById('container') as HTMLElement)
};

function onSelect(buttonIndex: number): boolean {
  const training = state.trainings[state.trainingIndex];
  const result = training.currentRound.select(buttonIndex);
  save(state.trainings);
  //For better user experience: user can see a clicked button for 200ms
  setTimeout(() => {
    render();
  }, 200);
  return result;
}

function render() {
  const training = state.trainings[state.trainingIndex];
  state.renderer.renderTitle(state.trainings.length - state.trainingIndex);
  state.renderer.renderTraining(training, onSelect);
  state.renderer.renderResults(gameTrainingResult(training), training);
  //User can see the result for 1 sec, for better user experience
  const round = training.currentRound;
  if (round.isFinished && !training.isFinished) {
    setTimeout(() => {
      training.nextTraining();
      save(state.trainings);
      render();
    }, 1000);
  }
}

export function initApp() {
  if (state.trainings.length && !state.trainings[0].isFinished) {
    const result = confirm('Do you want to continue the training?');
    if (result) {
      return render();
    } else {
      state.trainings[0].isFinished = true;
    }
  }
  const training = generateTraining(roundsNumber, attemptsPerRoundNumber);
  state.trainings.unshift(training);
  save(state.trainings);
  return render();
}

//listeners

document.addEventListener('keydown', event => {
  const training = state.trainings[state.trainingIndex];
  if (
    training.currentRound.isFinished ||
    training.isFinished ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.metaKey ||
    !event.key.match(/[A-Za-z]/)
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

import { Renderer } from './game/renderer';
import { gameTrainingResult, generateTraining } from './game/models';
import { attemptsPerRoundNumber, roundsNumber } from './game/constants';

//application state
const state = {
  //trainings: load(),
  trainings: [],
  trainingIndex: 0,
  renderer: new Renderer(document.getElementById('container') as HTMLElement)
};

function onSelect(buttonIndex: number): boolean {
  const training = state.trainings[state.trainingIndex];
  const result = training.currentRound.select(buttonIndex);
  //save(state.trainings)
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
  if (round.isFinished && !training.isFinishedTraining) {
    setTimeout(() => {
      training.nextTraining();
      //save
      render();
    }, 1000);
  }
}

export function renderApp() {
  if (state.trainings.length && !this.state.trainings[0].isFinishedTraining) {
    const result = confirm('Do you want to continue the training?');
    result ? render() : (state.trainings[0].isFinishedTraining = true);
  }
  const training = generateTraining(roundsNumber, attemptsPerRoundNumber);
  console.log('1', state.trainings);
  state.trainings.unshift(training);
  console.log('2', state.trainings);
  //save(state.trainings)
  return render();
}

//listeners

document.addEventListener('keydown', event => {
  const training = state.trainings[state.trainingIndex];
  if (
    training.currentRound.isFinished ||
    training.isFinishedTraining ||
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
  renderApp();
});

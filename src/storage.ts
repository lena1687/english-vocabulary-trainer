import { GameTraining, IGameTraining } from './game';

export function save(trainings: GameTraining[]): void {
  localStorage.setItem('vocabularyTrainer', JSON.stringify(trainings));
}

export function load(): GameTraining[] {
  const trainings: IGameTraining[] = JSON.parse(localStorage.getItem('vocabularyTrainer') ?? '[]');
  return trainings.map(training => new GameTraining(training));
}

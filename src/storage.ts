import { GameTraining, IGameTraining } from './game';

export function save(training: GameTraining): void {
  localStorage.setItem('vocabularyTrainer', JSON.stringify(training));
}

export function load(): GameTraining | null {
  const training: IGameTraining | null = JSON.parse(localStorage.getItem('vocabularyTrainer') ?? 'null');
  return training ? new GameTraining(training ) : null;
}

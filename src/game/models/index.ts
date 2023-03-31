import { wordList } from '../constants';
import { GameTraining } from './gameTraining';
import { IGameRound } from './types';
import { shuffle } from '../utils';

export * from './gameRound';
export * from './gameTraining';
export * from './types';

export function generateTraining(roundsNumber: number, attempts: number): GameTraining {
  if (roundsNumber > wordList.length) {
    throw new Error('List of words is too small');
  }

  const rounds: IGameRound[] = shuffle(wordList)
    .slice(0, roundsNumber)
    .map(word => ({
      word,
      letters: shuffle(word.split('')),
      attempts,
      errors: 0
    }));

  return new GameTraining({ rounds, currentRoundNumber: 0, isFinishedTraining: false });
}

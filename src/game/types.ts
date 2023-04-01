import { GameRound } from './gameRound';

export interface IGameRound {
  word: string;
  letters: string[];
  attempts: number;
  errors: number;
}

export interface IGameTraining {
  rounds: IGameRound[];
  currentRoundNumber: number;
  isFinished: boolean;
}

export interface IGameResults {
  correctWordsNumber: number;
  errorsNumber: number;
  hardestWord: GameRound;
}

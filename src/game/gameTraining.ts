import { GameRound } from './gameRound';
import { IGameRound, IGameTraining } from './types';

export class GameTraining {
  readonly rounds: GameRound[];
  currentRoundNumber: number;
  isFinished: boolean;

  constructor({ rounds, currentRoundNumber, isFinished }: IGameTraining) {
    this.rounds = rounds.map((item: IGameRound) => new GameRound(item));
    this.currentRoundNumber = currentRoundNumber;
    this.isFinished = isFinished;
  }

  // getters

  get currentRound(): GameRound {
    return this.rounds[this.currentRoundNumber];
  }

  // methods

  nextTraining(): void {
    if (this.rounds.length === this.currentRoundNumber + 1) {
      this.isFinished = true;
      return;
    } else {
      this.currentRoundNumber++;
    }
  }
}

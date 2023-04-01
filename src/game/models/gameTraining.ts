import { GameRound } from './gameRound';
import { IGameRound, IGameTraining } from './types';

export class GameTraining {
  readonly rounds: GameRound[];
  currentRoundNumber: number;
  isFinishedTraining: boolean;

  constructor({ rounds, currentRoundNumber, isFinishedTraining }: IGameTraining) {
    this.rounds = rounds.map((item: IGameRound) => new GameRound(item));
    this.currentRoundNumber = currentRoundNumber;
    this.isFinishedTraining = isFinishedTraining;
  }

  // getters

  get currentRound(): GameRound {
    return this.rounds[this.currentRoundNumber];
  }

  // methods

  nextTraining(): void {
    if (this.rounds.length === this.currentRoundNumber + 1) {
      this.isFinishedTraining = true;
      return;
    } else {
      this.currentRoundNumber++;
    }
  }
}

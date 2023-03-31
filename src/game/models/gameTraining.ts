import { GameRound } from './gameRound';
import { IGameRound, IGameTraining } from './types';

export class GameTraining {
  readonly rounds: GameRound[];
  currentRoundNumber: number;
  isFinishedTraining: boolean;

  constructor({ rounds, currentNumber, finished }: IGameTraining) {
    this.rounds = rounds.map((item: IGameRound) => new GameRound(item));
    this.currentRoundNumber = currentNumber;
    this.isFinishedTraining = finished;
  }

  get getCurrentRoundNumber(): IGameRound {
    return this.rounds[this.currentRoundNumber];
  }

  nextTraining(): void {
    if (this.rounds.length === this.currentRoundNumber + 1) {
      this.isFinishedTraining = true;
      return;

    } else {
      this.currentRoundNumber++;
    }
  }
}

export interface IGameRound {
  word: string;
  letters: string[];
  attempts: number;
  errors: number;
}

export interface IGameTraining {
  rounds: IGameRound[];
  currentRoundNumber: number;
  isFinishedTraining: boolean;
}

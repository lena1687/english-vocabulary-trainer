import { IGameRound } from './types';

export class GameRound {
  readonly word: string;
  readonly letters: string[];
  readonly attempts: number;
  errors: number;

  constructor({ word, letters, attempts, errors }: IGameRound) {
    this.word = word;
    this.letters = letters;
    this.attempts = attempts;
    this.errors = errors;
  }

  // getters

  get progress(): number {
    return this.word.length - this.letters.length;
  }

  get isFailed(): boolean {
    return this.errors === this.attempts;
  }

  get isFinished(): boolean {
    return this.isFailed || this.letters.length === 0;
  }

  // methods

  select(index: number): boolean {
    if (this.isFinished) {
      throw new Error('Round is finished!');
    }
    if (this.word[this.progress] === this.letters[index]) {
      this.letters.splice(index, 1);
      return true;
    } else {
      this.errors++;
      return false;
    }
  }
}

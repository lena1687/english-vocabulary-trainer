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

  get getProgress(): number {
    return this.word.length - this.letters.length;
  }

  get isSuccessful(): boolean {
    return this.letters.length === 0;
  }

  get isFailed(): boolean {
    return this.errors === this.attempts;
  }

  get isFinished(): boolean {
    return this.isFailed || this.isSuccessful;
  }

  select(index: number): boolean {
    if (this.isFinished) {
      throw new Error('Round is finished!');
    }
    if (this.word[this.getProgress] === this.letters[index]) {
      this.letters.splice(index, 1);
      return true;
    } else {
      this.errors++;
      return false;
    }
  }
}

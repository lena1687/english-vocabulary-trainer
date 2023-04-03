import { GameRound, GameTraining, gameTrainingResult, generateTraining } from '../src/game';

describe('game', () => {
  it('Generate training properly', () => {
    const training = generateTraining(2, 4);
    expect(training.currentRoundNumber).toBe(0);
    expect(training.isFinished).toBeFalsy();
    expect(training.rounds.length).toBe(2);
    training.rounds.forEach(round => {
      expect(round.attempts).toBe(4);
      expect(round.errors).toBe(0);
      expect(round.word.split('').sort()).toEqual(round.letters.sort());
    });
  });

  describe('GameTraining', () => {
    it('next round', () => {
      const training = generateTraining(2, 4);
      expect(training.currentRoundNumber).toBe(0);
      expect(training.isFinished).toBeFalsy();
      expect(training.currentRound).toEqual(training.rounds[training.currentRoundNumber]);
      training.next();
      expect(training.currentRoundNumber).toBe(1);
      expect(training.isFinished).toBeFalsy();
      expect(training.currentRound).toEqual(training.rounds[training.currentRoundNumber]);
      training.next();
      expect(training.currentRoundNumber).toBe(1);
      expect(training.isFinished).toBeTruthy();
    });
  });

  it('Generate training result properly', () => {
    const training = new GameTraining({
      currentRoundNumber: 3,
      isFinished: true,
      rounds: [
        { word: 'abc', letters: ['a', 'b', 'c'], errors: 1, attempts: 2 },
        { word: 'bca', letters: [], errors: 0, attempts: 2 },
        { word: 'cba', letters: ['c', 'b', 'a'], errors: 2, attempts: 2 }
      ]
    });
    const results = gameTrainingResult(training);
    expect(results).toMatchObject({ correctWordsNumber: 1, errorsNumber: 3, hardestWord: training.rounds[2] });
  });

  describe('GameRound', () => {
    it('success', () => {
      const round = new GameRound({ word: 'test', attempts: 2, letters: ['t', 'e', 's', 't'], errors: 0 });
      expect(round.select(0)).toBeTruthy();
      expect(round).toMatchObject(
        expect.objectContaining({
          word: 'test',
          attempts: 2,
          progress: 1,
          letters: ['e', 's', 't'],
          errors: 0,
          isFinished: false,
          isFailed: false
        })
      );
      expect(round.select(1)).toBeFalsy();
      expect(round.select(0)).toBeTruthy();
      expect(round.select(0)).toBeTruthy();
      expect(round.select(0)).toBeTruthy();
      expect(round).toMatchObject(
        expect.objectContaining({
          word: 'test',
          attempts: 2,
          progress: 4,
          letters: [],
          errors: 1,
          isFinished: true,
          isFailed: false
        })
      );
    });

    it('failed', () => {
      const round = new GameRound({ word: 'test', attempts: 2, letters: ['t', 'e', 's', 't'], errors: 0 });
      expect(round.select(0)).toBeTruthy();
      expect(round.select(1)).toBeFalsy();
      expect(round.select(2)).toBeFalsy();
      expect(round).toMatchObject(
        expect.objectContaining({
          word: 'test',
          attempts: 2,
          progress: 1,
          letters: ['e', 's', 't'],
          errors: 2,
          isFinished: true,
          isFailed: true
        })
      );
    });
  });
});

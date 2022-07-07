export const weightedSample = (arr: any[], weights: number[]) => {
    let roll = Math.random(); //0~1 사이의 난수 생성
    return arr[
      weights
        .reduce(
          (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
          []
        )
        .findIndex((v: number, i: number, s: any[]) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
    ];
  };
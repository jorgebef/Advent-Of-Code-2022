import * as fs from 'fs';
import path from 'path';

type Match = Array<string>;

// A and X are ROCK
// B and Y are PAPER
// C and Z are SCISSORS

const inputContent = fs.readFileSync(
  // path.join(__dirname, 'test-input.txt'),
  path.join(__dirname, 'input.txt'),
  'utf-8'
);

const totalGamesArray = inputContent
  .split('\n')
  // Remove last item from the array by slicing all elements except last
  // because the last newline makes an additional element which is empty
  .slice(0, -1)
  .map(match => match.split(' '));

const outcomeMatrix = [
  // This is the outcome Matrix having the
  // columns: X,Y,Z
  // rows: A,B,C
  [3, 6, 0],
  [0, 3, 6],
  [6, 0, 3],
];

// ====================================
// PART A of the exercise
// ====================================

const optionToPointsTable: { [k: string]: number } = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

const calculateMatchScore_A = (matchArray: Match) => {
  const convertedMatch = matchArray.map(option => optionToPointsTable[option]);
  const optionCoordinateEquivalence = convertedMatch.map(k => k - 1);
  const matchResultPoints =
    outcomeMatrix[optionCoordinateEquivalence[0]][
    optionCoordinateEquivalence[1]
    ];
  const [shapePoints] = convertedMatch.splice(-1);

  return Number(matchResultPoints + shapePoints);
};

const allMatchScores_A = totalGamesArray.map(match =>
  calculateMatchScore_A(match)
);

console.log('=====Solution for part A of the exercise=====');
console.log(allMatchScores_A);
console.log(allMatchScores_A.reduce((a, b) => a + b, 0));

// ====================================
// PART B of the exercise
// ====================================

const decodedResults: { [k: string]: number } = {
  X: 0,
  Y: 3,
  Z: 6,
};

const calculateMatchScore_B = (matchArray: Match) => {
  const convertedMatch = matchArray.map(option => optionToPointsTable[option]);
  const optionCoordinateEquivalence = convertedMatch.map(k => k - 1);
  const matchResultScore = decodedResults[matchArray[matchArray.length - 1]];
  const optimalPlayScore = Number(
    outcomeMatrix[optionCoordinateEquivalence[0]].indexOf(matchResultScore) + 1
  );

  const optimalPlayValue = Object.keys(optionToPointsTable)
    .filter(
      key =>
        optionToPointsTable[key] ===
        Number(
          outcomeMatrix[optionCoordinateEquivalence[0]].indexOf(
            matchResultScore
          )
        ) +
        1
    )
    // To grab only the option we can actually play
    .pop();
  return Number(matchResultScore + optimalPlayScore);
};

console.log('\n');
console.log('=====Solution for part B of the exercise=====');
// console.log(calculateMatchScore_B(totalGamesArray[1]));

const totalMatchScores_B = totalGamesArray.map(match =>
  calculateMatchScore_B(match)
);

console.log(totalMatchScores_B.reduce((a, b) => a + b, 0));

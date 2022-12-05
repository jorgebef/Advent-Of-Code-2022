import * as fs from 'fs';
import path from 'path';

const content = fs.readFileSync(
  // path.join(__dirname, 'test-input.txt'),
  path.join(__dirname, 'input.txt'),
  'utf-8'
);

// const fullList = content.split('\n').slice(0, -1);

const fullListArray = content
  .split('\n')
  .slice(0, -1)
  .map(l => l.split(''));

// const fullListArray = fullList.map(l => l.split(''));

// ====================================
// PART A of the exercise
// ====================================

const duplicateFinder = (list: string[]) => {
  const compartment1 = list.slice(0, list.length / 2);
  const compartment2 = list.slice(list.length / 2, list.length);
  // const duplicates = compartment1.find(i1 => compartment2.includes(i1)) || '';
  const duplicates = compartment1.find(i1 => compartment2.includes(i1));
  return duplicates;
};

// const duplicatesFound = fullListArray.map(list => duplicateFinder(list));
const duplicatesFound = fullListArray.map(list => duplicateFinder(list));

// 52 letters in the alphabet
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const duplicatesValuesArray = duplicatesFound.map(letter =>
  letter ? Number(alphabet.indexOf(letter) + 1) : 0
);

const totalDuplicatesValue = duplicatesValuesArray.reduce((a, b) => a + b, 0);

console.log(totalDuplicatesValue);

// ====================================
// PART B of the exercise
// ====================================

const groupSize = 3;

const badgeFinder = (group: string[][]) => {
  let badges: string[] = [];
  // let badge: string;
  group.map(list =>
    list.map(item => {
      if (badges.find(b => b === item)) return;
      for (let j = 0; j < groupSize; j++) {
        if (group[j].find(k => k === item)) {
          if (j === groupSize - 1) {
            badges.push(item);
          } else {
            continue;
          }
        } else {
          break;
        }
      }
    })
  );
  return badges;
};

let totalBadgesArray: string[] = [];

for (let i = 0; i < fullListArray.length / groupSize; i++) {
  const group = fullListArray.slice(i * groupSize, (i + 1) * groupSize);
  // console.log(group);
  badgeFinder(group);
  totalBadgesArray.push(...badgeFinder(group));
}

console.log(totalBadgesArray);

const totalBadgesValues = totalBadgesArray.map(badge =>
  badge ? Number(alphabet.indexOf(badge) + 1) : 0
);

console.log(totalBadgesValues.reduce((a, b) => a + b, 0));

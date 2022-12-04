import { readFileSync } from 'fs';
import path from 'path';

const content = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8');
// const content = readFileSync(path.resolve(__dirname, 'test-input.txt'), 'utf-8');

const elfArraySplit = content
  .split('\n\n')
  .map(e => e.split('\n').map(food => Number(food)));

const caloriesPerElf = elfArraySplit.map(elf => {
  return elf.reduce((a, b) => a + b, 0);
});

const mostCaloriesAmount = Math.max(...caloriesPerElf);
const mostCaloriesElf = caloriesPerElf.indexOf(mostCaloriesAmount);
console.log('The most calories carried are: ' + mostCaloriesAmount);
console.log('Carried by the Elf number ' + Number(mostCaloriesElf + 1));

const topCalories = [...Array(3)].map(_ => {
  const top = Math.max(...caloriesPerElf);
  caloriesPerElf.splice(caloriesPerElf.indexOf(top), 1);
  return top;
});

const topCaloriesCombined = topCalories.reduce((a, b) => a + b, 0);

console.log(topCalories);
console.log(topCaloriesCombined);

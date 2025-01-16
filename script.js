'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Olaonipekun Muizz',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Sunday Matins',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Raheem Muizz',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Mr Sam',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovement = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  //.tectContent = 0;

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? `deposit` : `withdrawal`;
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}</div>
        </div> `;
    containerMovements.insertAdjacentHTML(`afterbegin`, html);
  });
};
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `$${acc.balance}`;
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `$${income}`;
  const out = acc.movements
    .filter(mov => 0 > mov)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `$${Math.abs(out)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposite => (deposite * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      /*console.log(arr);*/
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `$${interest}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name[0])
      .join(``);
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  //Dispay movement
  displayMovement(acc.movements);
  //Dispay balance
  calcDisplayBalance(acc);
  //Display summary
  calcDisplaySummary(acc);
};

//Event handler
let currentAccount;
btnLogin.addEventListener(`click`, function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and a welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(` `)[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginUsername.style.opacity = 0;
    inputLoginPin.style.opacity = 0;
    btnLogin.style.opacity = 0;

    //Clear input field
    inputLoginUsername.value = inputLoginPin.value = ``;
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener(`click`, function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = ``;
  if (
    amount > 0 &&
    reciverAcc &&
    currentAccount.balance >= amount &&
    reciverAcc?.username !== currentAccount
  ) {
    //Doing the transfer
    currentAccount.movements.push(-amount);
    reciverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener(`click`, function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener(`click`, function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    accounts.splice(index, 1);
    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = ' ';
  labelWelcome.textContent = `Log in to get started`;
});
let sorted = false;
btnSort.addEventListener(`click`, function (e) {
  e.preventDefault();
  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; /*

/////////////////////////////////////////////////
/*
//SLICE
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

//SPLICE
// console.log(arr.splice(2) );
arr.splice(-1);
console.log(arr);

//REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

//JOIN
console.log(letters.join(' ... '));
*/
/*
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log(`jonas`.at(-1));
*/
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You Deposit${movement}`);
  } else {
    console.log(`Movement ${i + 1}:You withdrew ${Math.abs(movement)}`);
  }
}

movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You Deposit${mov}`);
  } else {
    console.log(`Movement ${i + 1}:You withdrew ${Math.abs(mov)}`);
  }
});
*/
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

const currenciesUnique = new Set([`USD`, `GBP`, `USD`, `EUR`, `EUR`]);

currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}:${value}`);
});
*/
/*
const eurToUsd = 1.1;

const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movements);
console.log(movementsUSD);

const movementUSDfor = [];
for (const mov of movements) movementUSDfor.push(mov * eurToUsd);
console.log(movementUSDfor);

const movementDescriptions = movements.map((mov, i) => {
  `Movement ${i + 1}: You ${mov > 0 ? `Deposited` : `Withdrew`} ${Math.abs(
    mov
  )}`;
});
console.log(movementDescriptions);
*/
/*
const deposite = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposite);

const depositeFor = [];
for (const mov of movements) if (mov > 0) depositeFor.push(mov);
console.log(depositeFor);

const withdrawal = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawal);
*/
// Maximum value
/*const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[200]);
console.log(max);*/
/*
const CalcAverageHumanAge = function (ages) {
  const humanAges = ages.map(ages => (ages <= 2 ? 2 * ages : 16 + ages * 4));
  const adults = humanAges.filter(ages => ages >= 18);
  const Average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  return Average;
};

const average1 = CalcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
console.log(average1);
*/
/*
const euroToUsd = 1.1;

// PIPELINE
const totalDepositesUsd = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * euroToUsd;
  })
  // .map(mov => mov * euroToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositesUsd);
*/
/*
const calcAverageHumanAge = age => {
  const humanAge = age
    .map(age => (age <= 2 ? 2 * age : 16 + age + 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  return humanAge;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
console.log(avg1);
*/
/*
const account = accounts.find(acc => acc.owner === `Olaonipekun Muizz`);
console.log(account);

for (const acc of accounts) {
  if (acc.owner === `Olaonipekun Muizz`) {
    console.log(acc);
  }
}
  */
/*
console.log(movements);
const lastWithdrawal = movements.findLast(mov => mov < 0);
console.log(lastWithdrawal);
const lastwithdrawal = movements.findLastIndex(mov => mov < 0);
console.log(lastwithdrawal);

const latestLargeMovementIndex = movements.findLastIndex(
  mov => Math.abs(mov) > 1000
);
console.log(latestLargeMovementIndex);
*/
/*
console.log(movements);
console.log(movements.includes(-130));
// Some: Condition
const anyDeposit = movements.some(mov => mov > 0);
console.log(anyDeposit);

//EVERY
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

//Seperate call back
const deposit = mov => 0; 
console.log(movements.some);
*/
/*
// FLAT
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
console.log(accountMovements.flat().reduce((acc, mov) => mov + acc, 0));

//fLATMap
*/
/*
const breeds = [
  {
    breed: `German Shepherd`,
    avergeWeight: 32,
    activities: [`fetch`, `swimming`],
  },
  {
    breed: `Dalmatian`,
    avergeWeight: 24,
    activities: [`running`, `fetch`, `agility`],
  },
  {
    breed: `Labrador`,
    avergeWeight: 28,
    activities: [`swimming`, `fetch`],
  },
  {
    breed: `Beagle`,
    avergeWeight: `12`,
    activities: [`digging`, `fetch`],
  },
  {
    breed: `Husky`,
    avergeWeight: 26,
    activities: [`running`, ` agility`, `swimming`],
  },
  {
    breed: `Bulldog`,
    avergeWeight: 36,
    activities: [`sleeping`],
  },
  {
    breed: `Poodle`,
    avergeWeight: 18,
    activities: [`agility`, `fetch`],
  },
];
console.log(breeds);

const huskyWeight = breeds[4].avergeWeight;

const dogBothActivities = breeds.find(
  mov => (mov.activities = [`running`, `fetch`])
).breed;
console.log(dogBothActivities);

const allActivities = breeds.flatMap(mov => mov.activities);
console.log(allActivities);

const uniqueActivities = Array(new Set(allActivities));
console.log(uniqueActivities);
*/
const owner = [`Jonas`, `Zach`, `Adam`, `Martha`];
console.log(owner.sort());
console.log(owner);

//Numbers
console.log(movements);
movements.sort((a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
});
console.log(movements);

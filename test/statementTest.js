const test = require('ava');
const {statement} = require('../src/statement');
const invoice = {
  'customer': 'BigCo',
  'performances': [
    {
      'playID': 'hamlet',
      'audience': 55,
    },
    {
      'playID': 'as-like',
      'audience': 35,
    },
    {
      'playID': 'othello',
      'audience': 40,
    },
  ],
};


const plays = {
  'hamlet': {
    'name': 'Hamlet',
    'type': 'tragedy',
  },
  'as-like': {
    'name': 'As You Like It',
    'type': 'comedy',
  },
  'othello': {
    'name': 'Othello',
    'type': 'tragedy',
  },
};


test('statement case 1:Coustomer BigCo without performance', t => {
  const invoice = {
    'customer':'BigCo',
    'performances':[],
  }
  const result = statement(invoice,plays)
  t.is(result,'Statement for BigCo\nAmount owed is $0.00\nYou earned 0 credits \n')
});

test('statement case 1:Coustomer BigCo with as-like and audience 20', t => {
  const invoice = {
    'customer':'BigCo',
    'performances':[
      {
        'playID': 'as-like',
        'audience': 20,
      },
    ],
  }
  const result = statement(invoice,plays)
  console.log(result);
  t.is(result,'Statement for BigCo\n As You Like It: $360.00 (20 seats)\nAmount owed is $360.00\nYou earned 4 credits \n')
});



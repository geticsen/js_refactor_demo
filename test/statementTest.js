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




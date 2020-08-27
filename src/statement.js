function getAmount(play, perf) {
  let result = 0;
  switch (play.type) {
    case 'tragedy':
      result = 40000;
      if (perf.audience > 30) {
        result += 1000 * (perf.audience - 30);
      }
      break;
    case 'comedy':
      result = 30000;
      if (perf.audience > 20) {
        result += 10000 + 500 * (perf.audience - 20);
      }
      result += 300 * perf.audience;
      break;
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
  return result;
}
function calculateCredits(invoice, plays) {
  let result = 0;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    result += Math.max(perf.audience - 30, 0);
    if ('comedy' === play.type) result += Math.floor(perf.audience / 5);
  }
  return result;
}
function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;
  for (let line of data.textLine) {
    result +=` ${line.name}: ${usd(line.thisAmount)} (${line.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.volumeCredits} credits \n`;
  return result;
}
function usd(thisAmount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(thisAmount / 100);
}
function totalAllAmount(invoice, plays) {
  let totalAmount = 0;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    const thisAmount = getAmount(play, perf);
    totalAmount += thisAmount;
  }
  return totalAmount;
}
function renderHtmlStatement(data){

}
function createStatementData(invoice, plays) {
  let data = {
    customer:invoice.customer,
    totalAmount: totalAllAmount(invoice, plays),
    volumeCredits: calculateCredits(invoice, plays),
    textLine:[]
  }
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    const thisAmount = getAmount(play, perf);
    data.textLine.push({name:play.name,thisAmount:thisAmount,audience:perf.audience});
  }
  return data;
}
function renderStatement(invoice, plays){
  let data = createStatementData(invoice, plays)
  return renderPlainText(data);
}
function statement(invoice, plays) {
  return renderStatement(invoice, plays);
}

module.exports = {
  statement,
};

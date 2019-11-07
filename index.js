const coinranking = require('./coinranking'); 

const coins = [
    {
      id: 1,
      symbol: 'BTC',
      name: 'Bitcoin',
    },
    {
      id: 2,
      symbol: 'ETH',
      name: 'Ethereum',
    },
    {
      id: 3,
      symbol: 'XRP',
      name: 'XRP',
    },
];

const checkValue = (text) => {
  for (let c of coins) {
    if (new RegExp(`(${c.symbol})|(${c.name})`, 'i').test(text)) {
      const {
        data: { coin },
      } = await coinranking.getCoin(c.id);
      await context.sendText(`The prce of ${c.symbol} is ${coin.price} USD`);
      return;
    }
    else {
      await context.sendText('no result');
      return;
    }
  }
};

const handleError = () => {
  context.sendText('Plz specify the name of the digicoin');
};

const handOver = () => {
  context.passThreadControlToPageInbox(); // 把控制權轉給 Inbox
};

module.exports = async function App(context) {
    let text = '';
    if (context.isThreadOwner()) {
      if (context.event.isPayload) {
        if (context.event.payload === 'GET_STARTED') {
          await context.sendText('Just say name of the digicoin that you wish to know the value');
          return;
        }
        else {
          text = context.event.payload;
        }
      }
      else if (context.event.isText) {
        if (context.event.text === '叫你們老闆出來') {
          await handOver();
          return;
        } else {
          text = context.event.text;
        }
      }
      else await handleError();
      await checkValue(text);
      return;
    }
};
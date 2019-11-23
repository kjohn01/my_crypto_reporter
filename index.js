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

const getStart = (context) => {
  switch (context.platform) {
    case 'line':
      if (context.event.isFollow) {
        await context.sendText('真正高興能見到你，滿心歡喜的歡迎你～');
        return;
      } else if (context.event.isUnfollow) {
        // Remove user data
      }
      break;
    // For fb messenger
    case 'messenger':
      if (context.event.payload && context.event.payload === 'GET_STARTED') {
        await context.sendText('Just say name of the digicoin that you wish to know the value');
        return;
      }
      break;
    default:
      console.error('unidentified platform');
      break;
  }
};

const handleError = (context) => {
  switch (context.platform) {
    case 'line':
      context.sendText('Plz specify the name of the digicoin');
      break;
    // For fb messenger
    default:
      context.sendText('Plz specify the name of the digicoin');
      break;
  }
};

const checkValue = async (text, context) => {
  for (let c of coins) {
    if (new RegExp(`(${c.symbol})|(${c.name})`, 'i').test(text)) {
      const {
        data: { coin },
      } = await coinranking.getCoin(c.id);
      await context.sendText(`The prce of ${c.symbol} is ${coin.price} USD`);
      return;
    }
    else {
      await handleError(context);
      return;
    }
  }
};

// Handover to Inbox (fb only)
const handOver = (context) => {
  if (context.platform === 'messenger') {
    await context.passThreadControlToPageInbox();
  }
  else {
    await handleError(context);
    return
  } 
};

module.exports = async function App(context) {
    let text = '';
    if (context.isThreadOwner()) {
      await getStart(context);
      if (context.event.isPayload) text = context.event.payload;
      else if (context.event.isText) {
        if (context.event.text === '叫你們老闆出來') {
          await handOver(context);
          return;
        } else {
          text = context.event.text;
        }
      }
      // For unexpecting input
      else {
        await handleError(context);
        return
      }
      await checkValue(text, context);
      return;
    }
};
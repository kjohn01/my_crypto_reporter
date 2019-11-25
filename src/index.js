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

const quickReplyLine = {
  quickReply: {
    items: [
      {
        type: 'action',
        action: {
          type: 'message',
          label: 'BTC',
          text: 'BTC',
        },
      },
      {
        type: 'action',
        action: {
          type: 'message',
          label: 'ETH',
          text: 'ETH',
        },
      },
      {
        type: 'action',
        action: {
          type: 'message',
          label: 'XRP',
          text: 'XRP',
        },
      },
    ],
  },
};
const quickReplyFB = {
  quick_replies: [
    {
      content_type: 'text',
      title: 'BTC',
      payload: 'BTC',
    },
    {
      content_type: 'text',
      title: 'ETH',
      payload: 'ETH',
    },
    {
      content_type: 'text',
      title: 'XRP',
      payload: 'XRP',
    },
  ],
};

const getStart = async context => {
  switch (context.platform) {
    case 'line':
      if (context.event.isFollow) {
        await context.sendSticker({
          packageId: '11538',
          stickerId: '51626494',
        });
        await context.sendText(
          'Just say name of the digicoin that you wish to know the value',
          quickReplyLine
        );
        await context.setState({ greeting: true });
        return;
      } else if (context.event.isUnfollow) {
        // Remove user data
      }
      break;
    case 'messenger':
      if (context.event.payload && context.event.payload === 'GET_STARTED') {
        await context.sendText(
          'Just say name of the digicoin that you wish to know the value',
          quickReplyFB
        );
        await context.setState({ greeting: true });
        return;
      }
      break;
    default:
      console.error('unidentified platform');
      return;
  }
};

const handleError = async context => {
  switch (context.platform) {
    case 'line':
      await context.sendSticker({
        packageId: '11537',
        stickerId: '52002744',
      });
      await context.sendText(
        'Plz specify the name of the digicoin',
        quickReplyLine
      );
      break;
    // For fb messenger
    case 'messenger':
      await context.sendText(
        'Plz specify the name of the digicoin',
        quickReplyFB
      );
      break;
    // Telegram
    default:
      await context.sendText('Plz specify the name of the digicoin');
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
    } else {
      await handleError(context);
      return;
    }
  }
};

// Handover to Inbox (fb only)
const handOver = async context => {
  if (context.platform === 'messenger') {
    await context.passThreadControlToPageInbox();
  } else {
    await handleError(context);
    return;
  }
};

module.exports = async function App(context) {
  let text = '';
  if (context.platform === 'messenger' && !context.isThreadOwner()) return;
  await getStart(context);
  if (context.event.isPayload) text = context.event.payload;
  else if (context.event.isText) {
    if (context.event.text === '叫你們老闆出來') {
      await handOver(context);
      return;
    } else text = context.event.text;
  }
  // For unexpecting input
  else {
    await handleError(context);
    return;
  }
  if (context.state.greeting) await context.setState({ greeting: false });
  else await checkValue(text, context);
  return;
};

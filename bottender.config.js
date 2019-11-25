module.exports = {
  session: {
    driver: 'memory',
    stores: {
      memory: {
        maxSize: 500,
      },
      file: {
        dirname: '.sessions',
      },
      redis: {
        port: 6379,
        host: '127.0.0.1',
        password: 'auth',
        db: 0,
      },
      mongo: {
        url: 'mongodb://localhost:27017',
        collectionName: 'sessions',
      },
    },
  },
  initialState: {
    greeting: false,
  },
  channels: {
    messenger: {
      enabled: true,
      path: '/webhooks/messenger',
      pageId: process.env.MESSENGER_PAGE_ID,
      accessToken: process.env.MESSENGER_ACCESS_TOKEN,
      verifyToken: process.env.MESSENGER_VERIFY_TOKEN,
      appId: process.env.MESSENGER_APP_ID,
      appSecret: process.env.MESSENGER_APP_SECRET,
      profile: {
        get_started: {
          payload: 'GET_STARTED',
        },
        greeting: [
          {
            locale: 'default',
            text:
              'Hello {{user_first_name}}! Welcome to my quick cryto reporter~ ?',
          },
          {
            locale: 'zh_TW',
            text: '嗨 {{user_first_name}}！歡迎使用my quick cryto reporter～ ?',
          },
        ],
        persistent_menu: [
          {
            locale: 'default',
            composer_input_disabled: false,
            call_to_actions: [
              {
                type: 'postback',
                title: 'BTC',
                payload: 'btc',
              },
              {
                type: 'postback',
                title: 'ETH',
                payload: 'eth',
              },
              {
                type: 'postback',
                title: 'XRP',
                payload: 'xrp',
              },
            ],
          },
        ],
      },
    },
    line: {
      enabled: true,
      path: '/webhooks/line',
      accessToken: process.env.LINE_ACCESS_TOKEN,
      channelSecret: process.env.LINE_CHANNEL_SECRET,
      sendMethod: 'reply',
      shouldBatch: true,
    },
    telegram: {
      enabled: true,
      path: '/webhooks/telegram',
      accessToken: process.env.TELEGRAM_ACCESS_TOKEN,
    },
    slack: {
      enabled: true,
      path: '/webhooks/slack',
      accessToken: process.env.SLACK_ACCESS_TOKEN,
      verificationToken: process.env.SLACK_VERIFICATION_TOKEN,
    },
    viber: {
      enabled: true,
      path: '/webhooks/viber',
      accessToken: process.env.VIBER_ACCESS_TOKEN,
      sender: {
        name: 'xxxx',
      },
    },
  },
};

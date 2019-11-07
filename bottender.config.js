require('dotenv').config();

module.exports = {
  session: {
    driver: 'memory',
    stores: {
      memory: {
        maxSize: 500,
      },
    },
  },
  channels: {
    messenger: {
      enabled: true,
      path: '/',
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
            text: 'Hello {{user_first_name}}! Welcome to my quick cryto reporter~ ?',
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
                payload: 'btc'
              },
              {
                type: 'postback',
                title: 'ETH',
                payload: 'eth'
              },
              {
                type: 'postback',
                title: 'XRP',
                payload: 'xrp'
              },
            ],
          },
        ],
      },
    },
  },
};


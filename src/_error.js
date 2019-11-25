const HandleError = async (context, { error }) => {
  if (process.env.NODE_ENV === 'production') {
    await context.sendText(
      'Sorry there are some unexpected errors, plz try later.'
    );
  } else {
    await context.sendText(error.stack);
  }
};

module.exports = HandleError;

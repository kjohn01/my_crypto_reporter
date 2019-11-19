module.exports = async function HandleError(context, { error }) {
    if (process.env.NODE_ENV === 'production') {
      await context.sendText('Sorry there are some unexpected errors, plz try later.');
    } else {
      await context.sendText(error.stack);
    }
};
module.exports = (CommandFactory, Handler) => (request, response) => {
  const command = new CommandFactory().create();
  const handler = new Handler(request, response, command);

  handler.handle();
};

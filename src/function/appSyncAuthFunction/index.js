async function handler(event, context) {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const {
    authorizationToken,
    requestContext: { apiId, accountId },
  } = event;

  const response = {
    isAuthorized: true,
  };
  console.log('response', JSON.stringify(response, null, 2));
  return response;
}

module.exports = {
  handler,
};

export function subscribe(channel) {
  return `subscription MySubscription {
    subscribe(channelName: "${channel}") {
      data
      channelName
    }
  }`;
}

export function publishMessage(data, channelName) {
  const publishMessageResponse = `mutation MyMutation {
    publishMessage(data: "${data}", channelName: "${channelName}") {
      data
      channelName
    }
  }`;
  return publishMessageResponse;
}

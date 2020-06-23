let subscribers = new Map();

function unsubscribe(subscriber) {
  subscribers.delete(subscriber);
}

function subscribe(subscriber, callback) {
  subscribers.set(subscriber, callback);
}

function publish(params) {
  subscribers.forEach(callback => callback(params));
}

export {
  subscribe,
  unsubscribe,
  publish
};

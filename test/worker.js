self.onmessage = event => {
  console.log('Message received', event.data);
  self.postMessage('Worker done');
};

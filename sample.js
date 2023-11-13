const events = require('./macos-events');

events.start({ verbose: true });

events.on('event', (event) => {
  console.log("got event");
  console.log(event);
});

// events.on('NSWorkspaceDidActivateApplicationNotification', (event) => {
//   console.log('Got named event');
// })
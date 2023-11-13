## MacOS Shared Notification Center Events in node

MacOS exposes a few events such as `willSleepNotification` and `didWakeNotification`.

This is a small wrapper around a small binary. 

The binary will print the events in JSON format to STDOUT, and the nodejs wrapper will read these and conver them into JS events.

```js
const events = require('./macos-events');

events.start({ verbose: true });

events.on('event', (event) => {
  console.log("got event");
  console.log(event);
});
```

#### Setup

Run `npm install`.
Run `npm run build-binary` to build the binary. This requires certain build tools (`swiftc`) which is likely bundled with XCode if missing.


#### Native addon

I looked into using Node-API for building a native addon for this, but ran into problems with conflicting runloops. In order to get the above notifications it seemed that the native addon must run the native runloop which would block the node js runloop. If runnint the native runloop in a new thread, it does not seem to get the notifcations we care about.


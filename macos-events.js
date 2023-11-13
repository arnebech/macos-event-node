const child_process = require("child_process");
const path = require("path");
const EventEmitter = require("node:events");
const execPath = path.join(__dirname, "event-emitter", "event-emitter-bin");

class MacOsEventEmitter extends EventEmitter {
  processChild = null;

  start({ verbose } = {}) {
    if (this.processChild) {
      throw new Error("Already running");
    }

    let child = child_process.spawn(execPath);

    child.stdout.on("data", (data) => {
      try {
        const json = JSON.parse(data);
        json.time = new Date(json.time);
        verbose && console.log(json);
        this.emit("event", json);
        this.emit(json.name, json);
      } catch (err) {
        console.error("Hit error trying to parse JSON", err, data.toString());
      }
    });

    child.stderr.on("data", (data) => {
      throw new Error("Unexpected stderr", data.toString());
    });

    child.on("close", (code) => {
      throw new Error("Unexpected binary close", code);
    });

    this.processChild = child;
  }

  stop() {
    if (!this.processChild) {
      throw new Error("Not running");
    }

    this.processChild.kill();
    this.processChild = null;
  }
}

const macOsEventEmitter = new MacOsEventEmitter();

module.exports = macOsEventEmitter;

const { Readable } = require("stream");

const bufferToStream = (buffer) => {
  const readable = new Readable();
  readable._read = () => {}; // _read is required but can be empty
  readable.push(buffer);
  readable.push(null); // Signal end of stream
  return readable;
};

module.exports = { bufferToStream };

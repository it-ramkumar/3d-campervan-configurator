const helmet = require('helmet');

module.exports = helmet({
  contentSecurityPolicy: false, // Optional if your frontend loads external assets
  crossOriginEmbedderPolicy: false, // Optional for 3D or media-heavy apps
});

const dotenv = require('dotenv');

dotenv.config();

const { fixRequestBody } = require('http-proxy-middleware');

const onProxyReq = (proxyReq, req, res) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (req.body) {
      const bodyData = JSON.stringify(req.body);
      const reqContentType = req.header('Content-Type');

      if (reqContentType && reqContentType.startsWith('multipart/form-data')) {
        proxyReq.setHeader('Content-Type', reqContentType);
      } else {
        proxyReq.setHeader('Content-Type', 'application/json');
      }

      proxyReq.write(bodyData);
    }
  }
};

const muditaAPISettings = {
  target: process.env.MUDITA_API, // Ensure this is a valid URL
  changeOrigin: true,
  secure: false,
  pathRewrite: (path, req) => path,
  on: {
    proxyReq: fixRequestBody,
  },
};

module.exports = {
  muditaAPISettings,
};

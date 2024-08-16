const uuid = require('uuid');
const winston = require('winston');
const expressWinston = require('express-winston');
const get = require('lodash/get');

const winstonConsole = new winston.transports.Console({
  name: 'console',
  colorize: true,
  timestamp: true,
  prettyPrint: false,
});

const requestWhitelist = [
  'url',
  'headers',
  'method',
  'httpVersion',
  'originalUrl',
  'query',
  'referer',
  'requestId',
  'userId',
  'body',
];

exports.requestWhitelist = requestWhitelist;

exports.winston = (req, res, next) => {
  req.referer = req.get('referer');
  req.requestId = res ? res.get('x-request-id') : uuid();
  req.userId = get(req, ['user', 'nameID', 'userID'], 'anonymous');
  req.method = req.method !== undefined ? req.method : '';
  req.query = req.query !== undefined ? req.query : '';
  req.body = req.body !== undefined ? req.body : '';
  next();
};

exports.express = expressWinston.logger({
  transports: [winstonConsole],
  meta: true,
  requestWhitelist,
  colorStatus: true,
});

exports.request = (message, req, res, start) => {
  const end = process.hrtime(start);
  const responseTime = Math.ceil(end[0] * (1000 + end[1] / 1000000));
  this.info(message, { res, req, responseTime });
};

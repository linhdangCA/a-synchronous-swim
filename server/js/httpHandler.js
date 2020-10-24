const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const removeOne = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  // console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers); // sends a response header to the request
  if (req.method === 'GET') {
    let dequeue = removeOne.dequeue();
    console.log('dequeue:', dequeue);
    res.end(dequeue);
  }
  // res.writeHead(200, headers);
  // res.end(); // sends back to the client anything it receives
  // next(); // invoke next() at the end of a request to help with testing!
};

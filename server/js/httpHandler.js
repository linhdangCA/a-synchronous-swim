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
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  // if (req.method === 'GET') {
  //   let dequeue = removeOne.dequeue();
  //   console.log('dequeue:', dequeue);
  //   res.end(dequeue);
  // }
  if (req.method === 'GET') {
    // ifurl is forward slash
    if (req.url === '/') {
      let dequeue = removeOne.dequeue();
      console.log('dequeue:', dequeue);
      res.writeHead(200, headers); // sends a response header to the request
      res.end(dequeue);
      // res.end(randomCommand());
    }
    //if statement to route to background address
    if(req.url === '/background.jpg') {
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {
        if (err) {
          res.writeHead(404, headers);
          res.end();
        } else {
          res.writeHead(200, headers);
          res.write(data);
          res.end();
        }
      });
    }
  }
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }
  if (req.method === 'POST') {
    //read the file we got from the path to the background image
    fs.writeFile(module.exports.backgroundImageFile, req.data, (err, data) => {
      // response when we can't read the file
      if (err) {
        res.writeHead(404, headers);
        res.end();
      // response when we can read the file
      }
      else {
        res.writeHead(200, headers);
        // res.write(module.exports.backgroundImageFile);
        res.end();

        // fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
        //   if (err) throw err;
        //   console.log('Saved!');
        // });

      }
    });
  }


  next(); // invoke next() at the end of a request to help with testing!
};

let randomCommand = () => {
  let options = ['up', 'down', 'left', 'right'];
  let index = Math.floor(Math.random() * options.length);

  return options[index];
}
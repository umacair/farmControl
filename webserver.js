var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http) //require socket.io module and pass the http object (server)
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4 as output
var LIGHT1 = new Gpio(5,'out');
var LIGHT2 = new Gpio(6,'out');
var LIGHT3 = new Gpio(7,'out');
var WINCH1UP = new Gpio(8,'out');
var WINCH2UP = new Gpio(9,'out');
var WINCH3UP = new Gpio(10,'out');
var WINCH4UP = new Gpio(11,'out');
var WINCH5UP = new Gpio(12,'out');
var WINCH6UP = new Gpio(13,'out');
var WINCH1DW = new Gpio(8,'out');
var WINCH2DW = new Gpio(9,'out');
var WINCH3DW = new Gpio(10,'out');
var WINCH4DW = new Gpio(11,'out');
var WINCH5DW = new Gpio(12,'out');
var WINCH6DW = new Gpio(13,'out');

//var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled

http.listen(8080); //listen to port 8080

function handler (req, res) { //create server
  fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
}

io.sockets.on('connection', function (socket) {// WebSocket Connection
  var lightvalue = 0; //static variable for current status
  var light1value = 0;
  var light2value = 0;
  var light3value = 0;
  var winch1upvalue = 0;
  var winch2upvalue = 0;
  var winch3upvalue = 0;
  var winch4upvalue = 0;
  var winch5upvalue = 0;
  var winch6upvalue = 0;
  var winch1dwvalue = 0;
  var winch2dwvalue = 0;
  var winch3dwvalue = 0;
  var winch4dwvalue = 0;
  var winch5dwvalue = 0;
  var winch6dwvalue = 0;
  var winch1stvalue = 0;
  var winch2stvalue = 0;
  var winch3stvalue = 0;
  var winch4stvalue = 0;
  var winch5stvalue = 0;
  var winch6stvalue = 0;
 


  socket.on('light', function(data) { //get light switch status from client
    lightvalue = data;
    if (lightvalue != LED.readSync()) { //only change LED if status has changed
      LED.writeSync(lightvalue); //turn LED on or off
    }
  });

  socket.on('light1', function(data) { //get light switch status from client
    light1value = data;
    if (light1value != LIGHT1.readSync()) { //only change LED if status has changed
      LIGHT1.writeSync(light1value); //turn LED on or off
    }
  });
  socket.on('light2', function(data) { //get light switch status from client
    light2value = data;
    if (light2value != LIGHT2.readSync()) { //only change LED if status has changed
      LIGHT2.writeSync(light2value); //turn LED on or off
    }
  });

  socket.on('light3', function(data) { //get light switch status from client
    light3value = data;
    if (light3value != LIGHT3.readSync()) { //only change LED if status has changed
      LIGHT3.writeSync(light3value); //turn LED on or off
    }
  });

  socket.on('winch1Up', function(data) { //get light switch status from client
    winch1upvalue = data;
    if (winch1upvalue != WINCH1UP.readSync()) { //only change LED if status has changed
      WINCH1UP.writeSync(winch1upvalue); //turn LED on or off
      socket.emit('winch1Dw',0);
      socket.emit('winch1St',0);
    }
  });

  socket.on('winch1Dw', function(data) { //get light switch status from client
    winch1dwvalue = data;
    if (winch1dwvalue != WINCH1DW.readSync()) { //only change LED if status has changed
      WINCH1DW.writeSync(winch1dwvalue); //turn LED on or off
      socket.emit('winch1Up',0);
      socket.emit('winch1St',0);
    }
  });
  
  socket.on('winch2Up', function(data) { //get light switch status from client
    winch2upvalue = data;
    if (winch2upvalue != WINCH2UP.readSync()) { //only change LED if status has changed
      WINCH2UP.writeSync(winch2upvalue); //turn LED on or off
      WINCH2DW.writeSync(!winch2upvalue);
      socket.emit('winch2Dw',0);
      socket.emit('winch2St',0);
    }
  });

  socket.on('winch2Dw', function(data) { //get light switch status from client
    winch2dwvalue = data;
    if (winch2dwvalue != WINCH2DW.readSync()) { //only change LED if status has changed
      WINCH2DW.writeSync(winch2dwvalue); //turn LED on or off
      WINCH2UP.writeSync(!winch2dwvalue);
      socket.emit('winch2Up',0);
      socket.emit('winch2St',0);
    }
  });

  
  socket.on('winch3Up', function(data) { //get light switch status from client
    winch3upvalue = data;
    if (winch3upvalue != WINCH3UP.readSync()) { //only change LED if status has changed
      WINCH3UP.writeSync(winch3upvalue); //turn LED on or off
      WINCH3DW.writeSync(!winch3upvalue);
      socket.emit('winch3Dw',0);
      socket.emit('winch3St',0);
    }
  });

  socket.on('winch3Dw', function(data) { //get light switch status from client
    winch3dwvalue = data;
    if (winch3dwvalue != WINCH3DW.readSync()) { //only change LED if status has changed
      WINCH3DW.writeSync(winch3dwvalue); //turn LED on or off
      WINCH3UP.writeSync(!winch3dwvalue);
      socket.emit('winch3Up',0);
      socket.emit('winch3St',0);
    }
  });

  
  socket.on('winch4Up', function(data) { //get light switch status from client
    winch4upvalue = data;
    if (winch4upvalue != WINCH4UP.readSync()) { //only change LED if status has changed
      WINCH4UP.writeSync(winch4upvalue); //turn LED on or off
      WINCH4DW.writeSync(!winch4upvalue);
      socket.emit('winch4Dw',0);
      socket.emit('winch4St',0);
    }
  });

  socket.on('winch4Dw', function(data) { //get light switch status from client
    winch4dwvalue = data;
    if (winch4dwvalue != WINCH4DW.readSync()) { //only change LED if status has changed
      WINCH4DW.writeSync(winch4dwvalue); //turn LED on or off
      WINCH4UP.writeSync(!winch4dwvalue);
      socket.emit('winch4Up',0);
      socket.emit('winch4St',0);
    }
  });

  
  socket.on('winch5Up', function(data) { //get light switch status from client
    winch5upvalue = data;
    if (winch5upvalue != WINCH5UP.readSync()) { //only change LED if status has changed
      WINCH5UP.writeSync(winch5upvalue); //turn LED on or off
      WINCH5DW.writeSync(!winch5upvalue);
      socket.emit('winch5Dw',0);
      socket.emit('winch5St',0);
    }
  });

  socket.on('winch5Dw', function(data) { //get light switch status from client
    winch5dwvalue = data;
    if (winch5dwvalue != WINCH5DW.readSync()) { //only change LED if status has changed
      WINCH5DW.writeSync(winch5dwvalue); //turn LED on or off
      WINCH5UP.writeSync(!winch5dwvalue);
      socket.emit('winch5Up',0);
      socket.emit('winch5St',0);
    }
  });

  
  socket.on('winch6Up', function(data) { //get light switch status from client
    winch6upvalue = data;
    if (winch6upvalue != WINCH6UP.readSync()) { //only change LED if status has changed
      WINCH6UP.writeSync(winch6upvalue); //turn LED on or off
      WINCH6DW.writeSync(!winch6upvalue);
      socket.emit('winch6Dw',0);
      socket.emit('winch6St',0);
    }
  });

  socket.on('winch6Dw', function(data) { //get light switch status from client
    winch6dwvalue = data;
    if (winch6dwvalue != WINCH6DW.readSync()) { //only change LED if status has changed
      WINCH6DW.writeSync(winch6dwvalue); //turn LED on or off
      WINCH6UP.writeSync(!winch6dwvalue);
      socket.emit('winch6Up',0);
      socket.emit('winch6St',0);
    }
  });
  socket.on('winch1St', function(data) { //get light switch status from client
    winch1stvalue = data;
    if (winch1stvalue == 1) { //only change LED if status has changed
      WINCH1DW.writeSync(0); //turn LED on or off
      WINCH1UP.writeSync(0);
      socket.emit('winch1Dw',0);
      socket.emit('winch1Up',0);
    }
  });
  socket.on('winch2St', function(data) { //get light switch status from client
    winch2stvalue = data;
    if (winch2stvalue == 1) { //only change LED if status has changed
      WINCH2DW.writeSync(0); //turn LED on or off
      WINCH2UP.writeSync(0);
      socket.emit('winch2Dw',0);
      socket.emit('winch2Up',0);
    }
  });
  socket.on('winch3St', function(data) { //get light switch status from client
    winch3stvalue = data;
    if (winch3stvalue == 1) { //only change LED if status has changed
      WINCH3DW.writeSync(0); //turn LED on or off
      WINCH3UP.writeSync(0);
      socket.emit('winch3Dw',0);
      socket.emit('winch3Up',0);
    }
  });
  socket.on('winch4St', function(data) { //get light switch status from client
    winch4stvalue = data;
    if (winch4stvalue == 1) { //only change LED if status has changed
      WINCH4DW.writeSync(0); //turn LED on or off
      WINCH4UP.writeSync(0);
      socket.emit('winch4Dw',0);
      socket.emit('winch4Up',0);
    }
  });
  socket.on('winch5St', function(data) { //get light switch status from client
    winch5stvalue = data;
    if (winch5stvalue == 1) { //only change LED if status has changed
      WINCH5DW.writeSync(0); //turn LED on or off
      WINCH5UP.writeSync(0);
      socket.emit('winch5Dw',0);
      socket.emit('winch5Up',0);
    }
  });
  socket.on('winch6St', function(data) { //get light switch status from client
    winch6stvalue = data;
    if (winch6stvalue == 1) { //only change LED if status has changed
      WINCH6DW.writeSync(0); //turn LED on or off
      WINCH6UP.writeSync(0);
      socket.emit('winch6Dw',0);
      socket.emit('winch6Up',0);
    }
  });

  



});

process.on('SIGINT', function () { //on ctrl+c
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport LED GPIO to free resources
  LIGHT1.writeSync(0); // Turn LED off
  LIGHT1.unexport(); // Unexport LED GPIO to free resources
  LIGHT2.writeSync(0); // Turn LED off
  LIGHT2.unexport(); // Unexport LED GPIO to free resources
  LIGHT3.writeSync(0); // Turn LED off
  LIGHT3.unexport(); // Unexport LED GPIO to free resources
  WINCH1UP.writeSync(0); // Turn LED off
  WINCH1UP.unexport(); // Unexport LED GPIO to free resources
  WINCH2UP.writeSync(0); // Turn LED off
  WINCH2UP.unexport(); // Unexport LED GPIO to free resources
  WINCH3UP.writeSync(0); // Turn LED off
  WINCH3UP.unexport(); // Unexport LED GPIO to free resources
  WINCH4UP.writeSync(0); // Turn LED off
  WINCH4UP.unexport(); // Unexport LED GPIO to free resources
  WINCH5UP.writeSync(0); // Turn LED off
  WINCH5UP.unexport(); // Unexport LED GPIO to free resources
  WINCH6UP.writeSync(0); // Turn LED off
  WINCH6UP.unexport(); // Unexport LED GPIO to free resources

  WINCH1DW.writeSync(0); // Turn LED off
  WINCH1DW.unexport(); // Unexport LED GPIO to free resources
  WINCH2DW.writeSync(0); // Turn LED off
  WINCH2DW.unexport(); // Unexport LED GPIO to free resources
  WINCH3DW.writeSync(0); // Turn LED off
  WINCH3DW.unexport(); // Unexport LED GPIO to free resources
  WINCH4DW.writeSync(0); // Turn LED off
  WINCH4DW.unexport(); // Unexport LED GPIO to free resources
  WINCH5DW.writeSync(0); // Turn LED off
  WINCH5DW.unexport(); // Unexport LED GPIO to free resources
  WINCH6DW.writeSync(0); // Turn LED off
  WINCH6DW.unexport(); // Unexport LED GPIO to free resources  
  
  process.exit(); //exit completely
});
'use strict';
let express = require("express");
let app = express();
let socket = require("socket.io");
let server = app.listen(3030);
let io = socket(server);
 
// app.use(express.static("public/client.js"))
app.use(express.static("public"))
app.get("/", (req,res) => {
res.sendFile("index.html",{root : "public/"})
})
app.get("/receiver", (req,res) => {
  res.sendFile("r.html",{root : "public/"});
})
let gtts = require("gtts.js").gTTS
// const tts = new gtts("hello");
// tts.save("public/dodo.mp3");
let led,led2,led3,led4,p;
io.on("connection", socket => {
  socket.on("sound", value => {
   let tts = new gtts(value);
   tts.save("public/" + value + ".mp3");
   setTimeout(() => {
    app.get("/" + value + ".mp3",(req,res) => {
      res.sendFile(__dirname + value + ".mp3");
    })
    io.emit("play",{
      name: value + ".mp3"
    });
   },2000);
  })
    socket.on("forward", () => {
        led.on();
    })
    socket.on("backward", () => {
        led2.on();
    })
    socket.on("left", () => {
        led3.on();
    })
    socket.on("right", () => {
        led4.on();
    })
    socket.on("beep",() => {
        p.play({
            song: [
              ["C4", 1 / 4]
            ]
          });
    });
    socket.on("stop",() => {
        led.off();
        led2.off();
        led3.off();
        led4.off();

    })
})
const {
    EtherPortClient
  } = require('etherport-client');
  const five = require("johnny-five");
  const board = new five.Board({
      port : new EtherPortClient({
          host : "192.168.100.25",
          port : 3030
      }),
      repl : true
  });
  let superagent = require("superagent");
  async function d(){
      let {body} = await superagent.get('https://j5-carapi.glitch.me/api')
      if(body.direction === "forward"){
        led.on();
      }else if(body.direction === "backward"){
        led2.on();
      }else if(body.direction === "left"){
        led3.on();

      }else if(body.direction === "right"){
          led4.on();
      }else{
        led.off();
        led2.off();
        led3.off();
        led4.off();
      }
  }
  
  board.on("ready", () => {
    p = new five.Piezo(4);
    
// console.log(board.analogRead("A0"));
    // board.loop(20,function() {
    //     d();
    // });
    // p.frequency(587,1000);

led = new five.Led(15);
led2 = new five.Led(13);
led3 = new five.Led(12);
led4 = new five.Led(14);
// // led.on();
  })
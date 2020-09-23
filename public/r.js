let socket = io();
let sound,caca;
function setup(){
    userStartAudio();

    socket.on("play", data => {
            sound = loadSound("hello.mp3",() => {
                sound.play();
            });

// console.log(typeof data.name)
   });
}
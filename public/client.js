let socket = io();
let sound;  
function send(){
    if(document.getElementById('in').value !== ""){
        socket.emit("sound", document.getElementById('in').value);
        
    }
}
document.addEventListener("keydown", e => {

    if(e.keyCode === 87){
        socket.emit("forward");
    }else if(e.keyCode === 83){
        socket.emit("backward");  
        // console.log("ee")
    }else if(e.keyCode === 65){
        socket.emit("left");
        // console.log("ee")

    }else if(e.keyCode === 68){
        socket.emit("right");
    }else if(e.keyCode === 32){
        socket.emit("beep");
    }
})
document.addEventListener("keyup", () => {
socket.emit("stop");
})
function changeface(){
    socket.emit("changeface")
}
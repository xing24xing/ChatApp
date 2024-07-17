// const prompt = require('prompt-sync')();
const http = require("http");
const express = require("express");
const app = express();
const path = require('path');
const { socket } = require('socket.io');
const {Server} = require("socket.io");
app.use(express.static(path.resolve("./public")));

const server = http.createServer(app);
const io = new Server(server);
//  socsket
const users = {};
io.on("connection", (socket)=>{
    // console.log("new User has Connected",socket.id);
    socket.on("New-User-Joined",name =>{
        console.log("New User : ",name);
    users[socket.id] = name;
    socket.broadcast.emit("User-Joined",name);
})
socket.on("send",message =>{
    socket.broadcast.emit("receive",{message:message,name :users[socket.id]});
});
socket.on("disconnect",(message) =>{
    socket.broadcast.emit("leave",users[socket.id]);
    // socket.disconnect();
    delete users[socket.id];
});
})


app.get('/',(req,res)=>{
    return res.sendFile('./public/index.html')
})

server.listen(8002,()=>{
    console.log('server started at port 8002');
})



// node server which will handle socket io connection
// const io = require('socket.io')(8002);

// io.on('connection',(socket) =>{
//         socket.on("New-User-Joined",name =>{
//             console.log("New User : ",name);
//         users[socket.id] = name;
//         socket.broadcast.emit("User-Joined",name);
//     })
//     socket.on('send',message =>{
//         socket.broadcast.emit('receive',{message:message,name :users[socket.id]});
//     });
// })
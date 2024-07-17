const socket = io("http://localhost:8002");
const form = document.getElementById('send-container');
const mesinp = document.getElementById('msg-inp');
const msgcontainer = document.querySelector('.container');

// Create the audio element
const audio = new Audio("ding.mp3");

// Function to append a message to the container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    msgcontainer.append(messageElement);

    // Check if position is 'left' (incoming message)
    if (position === 'left') {
        audio.play();
    }; // Ensure that the event listener only triggers once

    } 

// Example usage:
// append("Hello, world!", "left"); // Assuming this appends a left-positioned message

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  const msg = mesinp.value;
  if(msg==="")
  {
     Error;
  }
  else{
  // console.log(msg);
  // socket.emit("user message",message);
  append(`You: ${msg}`,'right');
  socket.emit("send",msg);
  mesinp.value="";
  }
})
const name= prompt("Enter Your Name To join");
socket.emit('New-User-Joined',name);
socket.on("User-Joined",name =>{
  append(`${name} Join the chat`,'right');
  // audio.play();
})
socket.on("receive",data=>{
  append(`${data.message} -${data.name}`,'left')
})

socket.on("leave",name=>{
  append(`${name} :left the chat`,'right');
  
      audio.play();
   // Ensure that the event listener only triggers once

  })

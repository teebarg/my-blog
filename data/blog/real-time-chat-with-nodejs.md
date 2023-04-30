---
title: Real-Time Chat with Node.js
date: '2023-04-30'
tags: ['nodejs']
draft: false
trend: true
summary: Real-time chat has become an essential feature for many applications, from social media platforms to online marketplaces.
images: []
layout: PostNew
canonicalUrl: canonical/url
postImg: /static/images/chat.png
authors: ['beaf']
readTime: '8 min'
category: Backend
---

Real-time chat has become an essential feature for many applications, from social media platforms to online marketplaces. In this tutorial, we'll be building a real-time chat application using Node.js, a popular runtime environment for JavaScript, and MDX, a Markdown-based syntax for writing React components.

## Prerequisites

Before we dive into the tutorial, make sure you have the following installed on your system:

- Node.js
- npm (Node Package Manager)

## Setting up the Project

To get started, create a new directory for your project and navigate into it using your terminal. Then, run the following command to initialize a new Node.js project:

```csharp
npm init -y
```

This will create a `package.json` file, which is used to manage dependencies for your project. Next, we'll install the dependencies we need for our real-time chat application:

```lua
npm install express socket.io
```

We're using the `express` framework to create a simple web server and the `socket.io` library to handle real-time communication between clients.

## Creating the Server

Now that we have our dependencies installed, let's create a new file called server.js and add the following code:

```js
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
    io.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
```

This code sets up a basic web server using the `express` framework and creates a `socket.io` instance to handle real-time communication. We're also serving static files from a `public` directory, which we'll create shortly.

The `io.on('connection')` event is triggered whenever a new client connects to the server. We're logging a message to the console to indicate that a user has connected.

The `socket.on('chat message')` event is triggered whenever a client sends a message. We're logging the message to the console and emitting it to all connected clients using `io.emit('chat message')`.

The `socket.on('disconnect')` event is triggered whenever a client disconnects from the server. We're logging a message to the console to indicate that a user has disconnected.

Finally, we're starting the server and listening on port 3000.

## Creating the Client

Next, let's create a new directory called `public` and add a new file called `index.html`. Add the following code to this file:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Real-Time Chat</title>
  </head>
  <body>
    <ul id="messages"></ul>
    <form id="form" action="">
      <input id="input" type="text" autocomplete="off" />
      <button>Send</button>
    </form>
    <script src="/socket.io/socket.io.js"></script>
    <script>
      const socket = io()
      const form = document.getElementById('form')
      const input = document.getElementById('input')
      const messages = document.getElementById('messages')
      form.addEventListener('submit', (e) => {
        e.preventDefault()
        if (input.value) {
          socket.emit('chat message', input.value)
          input.value = ''
        }
      })

      socket.on('chat message', (msg) => {
        const li = document.createElement('li')
        li.textContent = msg
        messages.appendChild(li)
      })
    </script>
  </body>
</html>
```

This code creates a basic HTML form with an input field and a button to send messages. We're also including the `socket.io` client library and setting up a new `socket` instance to handle real-time communication with the server.

The `form.addEventListener('submit')` event is triggered whenever the user submits the form. We're preventing the default form submission behavior and emitting a `chat message` event to the server with the message input value.

The `socket.on('chat message')` event is triggered whenever a new message is received from the server. We're creating a new `li` element with the message text and appending it to the `messages` list.

## Running the Application

To run the application, navigate to the root directory of your project in the terminal and run the following command:

```js
node server.js
```

This will start the server and make it available at `<http://localhost:3000>`. Open this URL in your web browser, and you should see the real-time chat application.

## Conclusion

In this tutorial, we've built a simple real-time chat application using Node.js and MDX. While this is just a basic example, you can easily build on this foundation to create more complex chat applications with additional features like user authentication and message persistence.

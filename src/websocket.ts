import { Server } from "socket.io";
import http from "http";
import app from "./app";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
  },
});

const users: { [key: string]: string } = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join a room based on the user ID
  socket.on('joinRoom', (userId: string) => {
    socket.join(userId);
    users[socket.id] = userId;
    console.log(`${userId} joined the room`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    const userId = users[socket.id];
    if (userId) {
      console.log(`User ${userId} disconnected`);
      delete users[socket.id];
    }
  });
});


server.listen(8080, () => console.log("WebSocket server running on port 8080"));

export { io };

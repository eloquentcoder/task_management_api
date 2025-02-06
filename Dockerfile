# Use the official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose ports

#for application
EXPOSE 3000

# for websocket
EXPOSE 8080 

# Start the application
CMD ["npm", "run", "dev"]

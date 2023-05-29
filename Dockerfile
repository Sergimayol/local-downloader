# Base image with Node.js 16 and Python
FROM node:16

# Install FFmpeg and Python
RUN apt-get update && \
    apt-get install -y ffmpeg python3 python3-pip

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy requirements.txt to the container
COPY requirements.txt ./

# Install Python dependencies
RUN pip3 install -r requirements.txt

# Create a directory with a tmp subdirectory
RUN mkdir -p /tmp

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the desired port
EXPOSE 3000

# Specify the command to run when the container starts
CMD ["npm", "start"]

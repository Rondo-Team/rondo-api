FROM node:22-alpine

WORKDIR /app

ARG APP_VERSION
ENV APP_VERSION=${APP_VERSION}

ADD ./package.json ./package.json
ADD ./package-lock.json ./package-lock.json

# Install npm dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which the Node.js application will run
EXPOSE 3000

# Command to start the Node.js application

CMD ["npm", "start"]
FROM node:14

# Create app directory
WORKDIR /psn_ag

# Install app dependencies
COPY package.json /psn_ag/
RUN npm install

# Copy json
COPY psn.json /psn_ag/

# Bundle app source
COPY . /psn_ag/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]

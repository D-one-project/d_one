FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./


#CMD ["npx", "create-react-app", "frontend"]
RUN npm install bootstrap@4.6.0 reactstrap@8.9.0 --legacy-peer-deps
RUN npm install axios@0.21.1
# start app
CMD ["npm", "start"]
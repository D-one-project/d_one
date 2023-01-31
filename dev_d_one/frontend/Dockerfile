FROM node:18.12.1-alpine

# set working directory
RUN mkdir -p /app/frontend
COPY . /app/frontend/
WORKDIR /app/frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH ./node_modules/.bin:$PATH

# install app dependencies
#COPY package.json ./
#COPY package-lock.json ./
#RUN npm install --silent
#RUN npm install react-scripts@3.4.1 -g --silent

# add app

WORKDIR /app/frontend
RUN npm install --silent
#RUN npm install react-scripts@3.4.1 -g --silent

#CMD ["npx", "create-react-app", "frontend_saved_for_ref"]
#RUN npm install bootstrap@4.6.0 reactstrap@8.9.0 --legacy-peer-deps
#RUN npm install axios@0.21.1
#RUN npm install
# start app

# Get build argument and set environment variable
EXPOSE 8000 3000
ARG base_url
ENV REACT_APP_URI=${base_url}

#CMD ["npm","run", "dev"]
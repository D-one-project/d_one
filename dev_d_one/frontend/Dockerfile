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

ARG BACKEND_ENDPOINT
ENV REACT_APP_DJANGO_API_URL=${BACKEND_ENDPOINT}

ENV NEXT_PUBLIC_DJANGO_API_URL=${BACKEND_ENDPOINT}


#CMD ["npx", "create-react-app", "frontend_saved_for_ref"]
#RUN npm install bootstrap@4.6.0 reactstrap@8.9.0 --legacy-peer-deps
#RUN npm install axios@0.21.1
#RUN npm install
# start app
#CMD ["npm","run", "dev"]
CMD ["npm","run", "dev"]
#RUN npm run dev #This command is like keep running
EXPOSE 8000/udp 8000/tcp 3000/udp 3000/tcp

#https://github.com/peterkuria/django-react-in-docker-microservices/tree/master

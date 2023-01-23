FROM python:3.8.2
RUN mkdir -p /app/dev_d_one
WORKDIR /app

#RUN apt-get update && apt-get install --no-install-recommends -y \
#    build-essential \
#    freetds-bin \
#    freetds-dev \

COPY ./requirements/requirements_backend.txt /tmp/
RUN pip install -r /tmp/requirements_backend.txt

COPY ./dev_d_one/api_d_one/ ./dev_d_one/api_d_one

EXPOSE 8000/udp 8000/tcp

WORKDIR /app/dev_d_one/api_d_one
CMD ["python", "manage.py", "runserver"]
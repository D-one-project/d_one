FROM python:3.9.5
RUN mkdir -p /app/api_d_one
WORKDIR /app/api_d_one
COPY . ./


RUN apt-get -y update && apt-get install --no-install-recommends -y \
    build-essential \
    freetds-bin \
    freetds-dev \
    tdsodbc \
    unixodbc \
    unixodbc-dev \
    libsasl2-modules-gssapi-mit \
    && rm -rf /var/lib/apt/lists/*
RUN pip install --upgrade pip

RUN pip install -r requirements/requirements_backend.txt
#
#


ARG REACT_SERVICE_HOST
ENV REACT_SERVICE_HOST=${REACT_SERVICE_HOST}
#ENV DJANGO_SETTINGS_MODULE=api_d_one.settings.$SERVICE_ARG
#ENV SERVICE_ENV=$SERVICE_ARG

#
EXPOSE 8000/udp 8000/tcp 3000/udp 3000/tcp 80/udp 80/tcp
#
#WORKDIR /app/api_d_one
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000","--noreload"]
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

#CMD ["python", "manage.py", "makemigrations"]
CMD ["python", "manage.py", "migrate"]
CMD ["python", "manage.py", "collectstatic"]
CMD ["gunicorn", "-c", "gunicorn_config.py", "api_d_one.wsgi:application"]
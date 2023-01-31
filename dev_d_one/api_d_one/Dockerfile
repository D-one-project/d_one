FROM python:3.8.2
RUN mkdir -p /app/api_d_one
WORKDIR /app/api_d_one
COPY . ./

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

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
RUN pip install gunicorn
#
#
#
EXPOSE 8000 3000
#
#WORKDIR /app/api_d_one
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000","--noreload"]
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
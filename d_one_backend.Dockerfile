FROM python:3.8.2

WORKDIR /etc

RUN apt-get update && apt-get install --no-install-recommends -y \
    build-essential \
    freetds-bin \
    freetds-dev \

COPY ./requirements/requirements_backend.txt /tmp/
RUN pip install -r /tmp/requirements_backend.txt

COPY ./d_one_t/d_one_fw/ ./d_one_dev

EXPOSE 8000/udp 8000/tcp

CMD ["python", "manage.py", "runserver"]
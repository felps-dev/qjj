############################################################
# Dockerfile to build Python / Django / Mysql small container images
# Based on Linux
############################################################

FROM python:3.9.2-slim-buster

ENV PYTHONUNBUFFERED 1

RUN apt update
#    && apk add --virtual build-deps gcc python3-dev musl-dev \
#    && apk add --no-cache mariadb-connector-c-dev git
RUN apt-get install -y default-libmysqlclient-dev git gcc
# RUN pip install mysql
COPY ./requirements.txt /requirements.txt

RUN pip install --upgrade pip && pip install --no-cache-dir -r ./requirements.txt

# Limpa espaço em disco
#RUN apt del build-deps musl-dev gcc python3-dev
RUN apt-get remove -y git gcc
RUN rm -Rf ~/.cache

COPY . /app

WORKDIR /app

EXPOSE 8000

CMD ["sh", "./start_django.sh"]

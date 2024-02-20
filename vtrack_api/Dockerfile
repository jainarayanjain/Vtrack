FROM python:3.10-slim-bullseye

LABEL maintainer="Jai Jain <jai.jain@innovasolutions.com>"

WORKDIR /vtrack

RUN apt-get update
RUN apt-get install -y gcc libssl-dev libmariadb-dev wkhtmltopdf
RUN python3 -m pip install poetry gunicorn

COPY ./pyproject.toml ./poetry.lock /vtrack/

RUN poetry config virtualenvs.create false
RUN poetry install --no-root --no-interaction --no-ansi

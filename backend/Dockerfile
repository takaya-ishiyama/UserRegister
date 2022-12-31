FROM python:3.9.10
ENV PYTHONUNBUFFERED 1

WORKDIR /backend
COPY requirements.txt /backend/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . /backend/
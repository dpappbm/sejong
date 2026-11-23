# Text-to-speech environment of the sound files: Supertonic 3 on CPU. The model is not part of the image (see docker.mjs).
FROM python:3.12.16-slim-trixie
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg && rm -rf /var/lib/apt/lists/*
COPY requirements.txt /requirements.txt
RUN pip install --no-cache-dir -r /requirements.txt
ENV PYTHONDONTWRITEBYTECODE=1 HOME=/tmp
WORKDIR /scripts

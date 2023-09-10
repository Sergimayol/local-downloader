FROM python:3.11

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    software-properties-common \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8501

ENTRYPOINT [ "streamlit", "run" , "src/app.py", "--server.port", "8501", "--server.address=0.0.0.0"]

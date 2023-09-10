# Local audio downloader

This is a simple project to download audio from a youtube video and convert it to mp3 using [yt-dlp](https://github.com/yt-dlp/yt-dlp), [ffmpeg](https://ffmpeg.org/) and [streamlit](https://streamlit.io/).

## Prerequisites

-   [Python 3.10 or higher](https://www.python.org/downloads/)
-   [ffmpeg](https://ffmpeg.org/)

## How to use

1. Clone this repository

```bash
git clone https://github.com/Sergimayol/local-downloader.git
```

2. Install the requirements

```bash
pip install -r requirements.txt
```

3. Run the app

```bash
streamlit run src/app.py
# or
python -m streamlit run src/app.py
```

4. Access the app in your browser at `http://localhost:8501`

> Note: That this project is meant to be used locally, so it doesn't have any kind of security, so don't use it in a public server. If you don't want the UI, you can use the `scripts/download-audio.sh` script and pass the video url as an argument, it also needs the `ffmpeg` binary to be in the path and the `yt-dlp` python package installed.

## Run with docker

1. Clone this repository

```bash
git clone https://github.com/Sergimayol/local-downloader.git
```

2. Build the image

```bash
docker build -t local-downloader .
```

3. Run the container

```bash
docker run -p 8501:8501 local-downloader
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

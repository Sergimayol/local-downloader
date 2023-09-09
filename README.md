# Local audio downloader

This is a simple project to download audio from a youtube video and convert it to mp3 using [yt-dlp](https://github.com/yt-dlp/yt-dlp), [ffmpeg](https://ffmpeg.org/) and [streamlit](https://streamlit.io/).

## Prerequisites

-   [Python 3.10 or higher](https://www.python.org/downloads/)
-   [ffmpeg](https://ffmpeg.org/)

## How to use

1. Clone this repository
2. Install the requirements using `pip install -r requirements.txt`
3. Run the app using `streamlit run src/app.py` or ` python -m streamlit run src/app.py`

> Note: That this project is meant to be used locally, so it doesn't have any kind of security, so don't use it in a public server. If you don't want the UI, you can use the `scripts\download-audio.sh` script and pass the video url as an argument, it also needs the `ffmpeg` binary to be in the path and the `yt-dlp` python package installed.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

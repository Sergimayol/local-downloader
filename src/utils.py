import os
import yt_dlp

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEBUG = True


def validate_url(url: str) -> bool:
    # Check if the url contains youtube.com and "watch?v="
    return "youtube.com" in url and "watch?v=" in url


def get_audio_data(path: str) -> bytes:
    with open(path, "rb") as f:
        data = f.read()
    return data


def get_audio_name(path: str) -> str:
    return [file for file in os.listdir(path) if file.endswith(".mp3")][0]


def remove_possible_other_files(path: str, files_to_keep: list = [".gitkeep"]) -> None:
    """
    Remove possible other files in the path

    Args:
        path (str): path to remove files
    """
    for file in os.listdir(path):
        if file not in files_to_keep:
            if DEBUG: print(f"[DEBUG]: Removing {file=}")
            os.remove(os.path.join(path, file))


def download_audio(
    url: str, output_path: str, format: str = "bestaudio/best", verbose: bool = True
) -> bool:
    """
    Download audio from url and save to output_path and keeps the original name of the video

    Args:
        url (str): url of the video
        output_path (str): path to save the audio
        format (str, optional): format of the audio. Defaults to "bestaudio/best".
        verbose (bool, optional): verbose mode. Defaults to True.

    Returns:
        bool: True if the download was successful, False otherwise
    """
    ydl_opts = {
        "format": format,
        "outtmpl": output_path + "/%(title)s.%(ext)s",
        "extract_audio": True,
        "verbose": verbose,
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192",
            }
        ],
    }
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        return True
    except Exception as e:
        print(f"[ERROR]: An error occurred while downloading the audio: {e}")
        return False

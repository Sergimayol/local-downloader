#!/bin/sh

set -xe

VIDEO_ID=$1

[ -z "$VIDEO_ID" ] && echo "ERROR: No video ID specified" && exit 1

yt-dlp "https://www.youtube.com/watch?v=$VIDEO_ID" --extract-audio --audio-format mp3 --audio-quality 0 --output "./tmp/%(title)s.%(ext)s" 2>&1 | tee ./tmp/log.txt

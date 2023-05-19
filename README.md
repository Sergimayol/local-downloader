# Local audio downloader

This is a simple project to download audio from a youtube video and convert it to mp3 using [yt-dlp](https://github.com/yt-dlp/yt-dlp), [ffmpeg](https://ffmpeg.org/) and [nextjs 13](https://nextjs.org/).

## How to use

1. Clone this repository
2. Install dependencies with `yarn install` or `npm install` and `pip install -r requirements.txt` (you may need to install ffmpeg manually and depending on your system also yt-dlp)
3. Build the project with `yarn build` or `npm run build`
4. Run the project with `yarn start` or `npm run start`
5. Open your browser and go to `http://localhost:3000`
6. Paste the link of the video you want to download and click on the download button
7. Wait for the download to finish and enjoy your music!

> Note: That this project is meant to be used locally, so it doesn't have any kind of security, so don't use it in a public server. Also, is thought to be used in a Linux system, so it may not work in other systems. Or you may need to change the download-audio script in the `scripts` folder.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

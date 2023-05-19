import fs from "fs";
import path from "path";
import { exec } from "child_process";

export async function POST(request: Request) {
    const body = await request.json();
    console.log(body.url);
    // Execute the shell script to download the file
    const videoId = getIdFromVideoUrl(body.url);

    // Del all the .mp3 files in the tmp folder
    await new Promise((resolve) => {
        exec(`rm tmp/*.mp3`, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                resolve(false);
                return new Response(JSON.stringify({ message: "Error" }), {
                    headers: { "content-type": "application/json" },
                });
            }
            console.log(stdout);
            console.log(stderr);
        });
        resolve(true);
    });

    // Download the file, wait till it's done
    await new Promise((resolve) => {
        exec(
            `./scripts/download-audio.sh ${videoId}`,
            (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                    resolve(false);
                }
                console.log(stdout);
                console.log(stderr);
                resolve(true);
            }
        );
    });

    const videoTitle = await new Promise((resolve) => {
        // Get from tmp folder all the files ending with .mp3
        exec(`ls tmp/*.mp3`, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            console.log(stdout);
            console.log(stderr);
            const videoTitle = stdout.split("\n")[0].split("/")[1];
            resolve(videoTitle);
        });
    });

    return new Response(JSON.stringify({ video: videoTitle }), {
        headers: { "content-type": "application/json" },
    });
}

function getIdFromVideoUrl(url: string) {
    return new URL(url).searchParams.get("v");
}

export async function GET(request: Request) {
    const name = new URL(request.url).searchParams.get("n");
    console.log(name);
    if (!name) {
        return new Response(JSON.stringify({ message: "Error" }), {
            headers: { "content-type": "application/json" },
        });
    }
    const filePath = path.join(process.cwd(), "tmp", name);
    const fileStream = fs.createReadStream(filePath);
    const response = new Response(fileStream, {
        headers: {
            "content-type": "audio/mpeg",
            "Content-Disposition": `attachment; filename=${filePath}`,
        },
    });
    return response;
}

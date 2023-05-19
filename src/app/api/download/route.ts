import fs from "fs";
import path from "path";
import { exec } from "child_process";

export async function POST(request: Request) {
    const body = await request.json();
    console.log(body.url);
    const videoId = getIdFromVideoUrl(body.url);
    if (!videoId) {
        return new Response(JSON.stringify({ message: "Error" }), {
            headers: { "content-type": "application/json" },
        });
    }

    // Remove all files from tmp folder
    const r = await cmd(`rm tmp/*.mp3`, "Error");
    if (r === "Error") {
        return new Response(JSON.stringify({ message: "Error" }), {
            headers: { "content-type": "application/json" },
        });
    }

    // Download the file
    const r2 = await cmd(`./scripts/download-audio.sh ${videoId}`, "Error");
    if (r2 === "Error") {
        return new Response(JSON.stringify({ message: "Error" }), {
            headers: { "content-type": "application/json" },
        });
    }

    // Get the file name
    const videos: string | string[] = await cmd(`ls tmp/*.mp3`, "Error");
    if (videos === "Error") {
        return new Response(JSON.stringify({ message: "Error" }), {
            headers: { "content-type": "application/json" },
        });
    }

    const videoTitle = videos.split("\n")[0].split("/")[1];

    return new Response(JSON.stringify({ video: videoTitle }), {
        headers: { "content-type": "application/json" },
    });
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
    const response = new Response(fileStream as any, {
        headers: {
            "content-type": "audio/mpeg",
            "Content-Disposition": `attachment; filename=${filePath}`,
        },
    });
    return response;
}

function cmd(command: string, fallback: string): Promise<string> {
    return new Promise((resolve) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                resolve(fallback);
            }
            console.log(stdout);
            console.log(stderr);
            resolve(stdout);
        });
    });
}

function getIdFromVideoUrl(url: string) {
    return new URL(url).searchParams.get("v");
}

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CheckIcon from "@/components/ui/icons/check-icon";
import CrossIcon from "@/components/ui/icons/cross-icon";

export default function InputUrl() {
    const [feedback, setFeedback] = useState<string>("");
    const [feedbackType, setFeedbackType] = useState<"error" | "success">();
    const [video, setVideo] = useState<string>("");
    return (
        <div>
            <label
                htmlFor="url"
                className="block text-base font-medium text-gray-700"
            >
                URL del video
            </label>
            <Input type="url" placeholder="Itroduce la URL del video" />
            <Button
                variant="default"
                size="sm"
                className="w-full my-2"
                onClick={() => {
                    const url =
                        document.querySelector<HTMLInputElement>(
                            "input[type=url]"
                        )?.value;
                    if (!url) {
                        setFeedbackType("error");
                        setFeedback("Introduce una URL");
                        return;
                    }
                    setFeedbackType("success");
                    setFeedback("URL introducida correctamente");
                    fetch("/api/download", {
                        method: "POST",
                        body: JSON.stringify({ url }),
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            console.log(res);
                            if (res.error) {
                                setFeedbackType("error");
                                setFeedback(res.error);
                                setVideo("");
                                return;
                            }
                            setVideo(res.video);
                        })
                        .catch(console.error);
                }}
            >
                Introducir
            </Button>
            <div className="flex flex-row justify-center items-center">
                {feedbackType === "error" ? <CrossIcon /> : <CheckIcon />}
                <p className="text-center text-sm text-gray-500">{feedback}</p>
            </div>
            {video && (
                <div className="flex flex-col justify-center items-center">
                    <a href={`./tmp/${video}`} download>
                        <Button variant="default" size="sm" className="w-full">
                            Descargar
                        </Button>
                    </a>
                </div>
            )}
        </div>
    );
}

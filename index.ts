/*
 * 1. constantly record
 * 2. recognize speech from recordings
 * 3. check recognized speech for filler words
 * 4. play airhorn if filler words detected
 */

import { spawn, spawnSync } from "child_process";

let i = 0;

const record = (): string => {
  i++;
  const fileName = `/tmp/filler-${i}.aiff`;
  console.log(`Recording to ${fileName}`);
  spawnSync("rec", [fileName, "silence", "1", "0.1", "1%", "2", "1.0", "1%"]);

  return fileName;
};

const FILLER_REGEX = /\b(um|uh)\b/;

const playAirhorn = () => {
  spawn("play", ["/Users/ship/Downloads/airhorn.wav"]);
};

const recognize = async (fileName: string): Promise<string> => {
  const childProcess = spawn("whisper", [
    fileName,
    "--fp16=False",
    "--language=en",
    "--model=tiny.en",
    '--initial_prompt="Do not remove filler words like um and uh"',
    "-f=txt",
    "--output_dir=/tmp/",
  ]);

  let buffer = "";

  return new Promise((resolve) => {
    childProcess.stdout.on("data", (chunk) => {
      buffer += chunk;
    });

    childProcess.on("close", () => {
      resolve(buffer);
    });
  });
};

while (true) {
  const fileName = record();

  recognize(fileName).then((text) => {
    console.log(text);
    if (text.match(FILLER_REGEX)) {
      playAirhorn();
    }
  });
}

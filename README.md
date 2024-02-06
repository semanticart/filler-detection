# Filler Detection

Detect filler words (um, uh) as you speak.

## Dependencies

| name        | url                                      | install command                 |
| ----------- | ---------------------------------------- | ------------------------------- |
| sox         | https://github.com/chirlu/sox            | `brew install sox`              |
| whisper     | https://github.com/openai/whisper        | `pip install -U openai-whisper` |
| whisper.cpp | https://github.com/ggerganov/whisper.cpp | see below                       |

### whisper.cpp Instructions

See the GitHub project for the latest, but this should get you started:

```
git clone https://github.com/ggerganov/whisper.cpp.git
cd whisper.cpp
bash ./models/download-ggml-model.sh tiny.en
make
```

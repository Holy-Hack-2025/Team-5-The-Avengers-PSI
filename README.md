# GenAI Video Summarization API Workflow

This project utilizes multiple generative AI services to summarize files into an engaging video format with voice-over narration. The system ingests various inputs, processes them with AI models, and composes the final output.

## 📌 Workflow Overview

1. **Input Collection**

   - **File Inputs**: Extracted using
      - [Apache Tika](https://tika.apache.org/) for document parsing
      - [Ninja API](https://www.ninjaapi.com/) for additional content processing
   - **Voice Inputs**: Transcribed text from user-uploaded audio using [Vosk](https://alphacephei.com/vosk/)
   - **User Preferences**: Selected from a web interface, allowing customization of the summarization style

2. **Processing with OpenAI API**

   - Generates two distinct prompts:
      - **Sound Prompt**: Script for voice narration
      - **Video Prompt**: Description for generating a visual summary

3. **Content Generation**

   - **Voice Generation**: Uses [Eleven Labs](https://elevenlabs.io/) to synthesize the voice narration based on the script
   - **Video Generation**: Uses [RunwayML](https://runwayml.com/) to create an AI-generated video based on the visual summary

4. **Final Composition**

   - **Merging Sound and Video**: Uses [Segmind](https://segmind.com/) to combine the AI-generated visuals and narration into a final, cohesive video

## 📡 API Flow Diagram

```plaintext
+------------+       +------------+       +----------+       +---------+
|  User/Web  | ----> | Apache Tika| ----> | OpenAI   | ----> | Runway   |
|  Interface | ----> | Ninja API  | ----> | (Prompts)| ----> | (Video)  |
+------------+       +------------+       +----------+       +---------+
       |                     |                     |               |
       |                     |                     v               v
       |                     |              +-------------+     +-----------+
       |                     |              | Eleven Labs | --> | Segmind   |
       |                     |              | (Voice)     |     | (Merge)   |
       |                     |              +-------------+     +-----------+
       |                     |
       v                     v
  +----------+       +---------+
  |   Vosk   | ----> | OpenAI  |
  | (Speech) | ----> | (Prompt)|
  +----------+       +---------+
```

## 🛠️ API Endpoints

| API Service     | Purpose             | Input                           | Output                           |
| --------------- | ------------------- | ------------------------------- | -------------------------------- |
| **Apache Tika** | File Parsing        | PDF, DOCX, TXT, etc.            | Extracted text                   |
| **Ninja API**   | Content Processing  | Extracted text                  | Cleaned, structured content      |
| **Vosk**        | Speech-to-Text      | Audio file                      | Transcribed text                 |
| **OpenAI**      | Prompt Generation   | Text content + user preferences | Summarized script & video prompt |
| **RunwayML**    | AI Video Generation | Video prompt                    | AI-generated video               |
| **Eleven Labs** | Voice Generation    | Narration script                | AI-generated speech              |
| **Segmind**     | Video-Sound Merging | Video + Audio                   | Final video output               |

## 🛠️ Sample API Calls

### 1. Extract Text from File using Apache Tika

```sh
curl -X POST "https://api.tika.apache.org/tika" \
     -H "Content-Type: application/octet-stream" \
     --data-binary @"document.pdf"
```

### 2. Convert Audio to Text using Vosk

```python
import requests
files = { 'audio': open('audio.wav', 'rb') }
response = requests.post("http://vosk-server:2700", files=files)
print(response.json())
```

### 3. Generate Summary and Video Prompt using OpenAI

```python
import openai
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "Summarize the given text into a concise script."},
        {"role": "user", "content": "Your extracted text here..."}
    ]
)
print(response["choices"][0]["message"]["content"])
```

### 4. Generate AI Video using RunwayML

```sh
curl -X POST "https://api.runwayml.com/v1/videos" \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{ "prompt": "Your generated video prompt here..." }'
```

### 5. Generate Voice Narration using Eleven Labs

```sh
curl -X POST "https://api.elevenlabs.io/v1/text-to-speech" \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{ "text": "Your narration script here...", "voice": "your-preferred-voice" }'
```

### 6. Merge Video and Audio using Segmind

```sh
curl -X POST "https://api.segmind.com/v1/merge" \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{ "video": "video_url", "audio": "audio_url" }'
```

## 🛠️ Usage

1. Upload a file or provide an audio recording.
2. Select summarization style preferences on the web interface.
3. The system processes inputs and generates a video summary with narration.
4. Download or view the final AI-generated video.

---

This README provides an overview of the API workflow, including the flow of data, API calls, and integration details. Let us know if you'd like any refinements! 🚀


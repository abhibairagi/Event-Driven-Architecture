# Full-Stack Event Driven Architecture

## Overview

A full-stack event-driven application that integrates OpenAI for speech-to-text (STT) and Google Cloud for text-to-speech (TTS) functionalities. This application processes audio input, converts speech to text using OpenAI's advanced models, and then transforms the text back into speech utilizing Google Cloud's TTS services. The system is designed to handle real-time interactions, providing seamless and efficient speech-based communication

## Setup

- **Prerequisites**

  - Node (`v18.x`)
  - MongoDB
  - Kafka
  - Docker

- Clone repository `git clone https://github.com/abhibairagi/Event-Driven.git`
- Setup
  - Install packages `npm install`

## Commands

- Start Zookeper Container and expose PORT `2181`.

```bash
docker run -p 2181:2181 zookeeper
```

- Start Kafka Container, expose PORT `9092` and setup ENV variables.

```bash
docker run -p 9092:9092 \
-e KAFKA_ZOOKEEPER_CONNECT=<PRIVATE_IP>:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP>:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
confluentinc/cp-kafka
```

### Add OpenAI API Key and Google Service Account Credentials

To get started, you'll need to set up your OpenAI API key and Google Service Account credentials. Follow these steps:

#### 1. OpenAI API Key

1. Obtain your OpenAI API key from the [OpenAI Dashboard](https://platform.openai.com/account/api-keys).
2. Open the `.env` file located in the root directory of the project (create one if it doesn't exist).
3. Add the following line to the `.env` file, replacing `YOUR_OPENAI_API_KEY` with your actual OpenAI API key:

   ```env
   openai=YOUR_OPENAI_API_KEY
   ```

#### 1. Google Service Account Credentials

1. Go to the Google Cloud Console.
2. Select your project or create a new one.
3. Navigate to IAM & Admin > Service Accounts.
4. Click Create Service Account.
5. Follow the prompts to create the service account and download the JSON key file.
6. Save the JSON key file in a secure location.key:

   ```env
   GOOGLE_APPLICATION_CREDENTIALS=path/to/your/service-account-file.json

   ```

### Change IP Address in `client.js`

To get started, you'll need to update the IP address in the `client.js` file to match your own setup. Follow these steps:

1. Open the `client.js` file located in the `src` directory (or wherever your `client.js` file is located).
2. Find the line where the IP address is defined. It should look something like this:

   ```javascript
   const serverIp = "<Private IP>"; // Replace with your server's IP address
   ```

## Running

- front-end
  - npm start
    - [localhost:3000](http://localhost:3000)
  - main-server
    - npm start
    - [localhost:8080](http://localhost:8080)
  - speech-to-text
    - npm start
  - text-to-speech
    - npm start

## License

Copyright (c) 2024 Abhishek Bairagi

[GitHub](http://github.com/abhibairagi1) ·

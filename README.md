# Real time Node.js API Google Cloud Speech-to-text (Demo)

Este é um aplicativo simples que demonstra como usar a API Google Speech-to-Text. É um programa em Node.js para transcrever em tempo real uma entrada de microfone com API Speech-to-text.

Tutorias de referencia:
- https://cloud.google.com/speech-to-text/docs/transcribe-streaming-audio?hl=pt-br#speech-streaming-recognize-nodejs
- https://bebity.medium.com/node-real-time-speech-to-text-with-google-88678ca3ad


## Requisitos

- Node.js
- [Google Cloud Platform Lib](https://www.npmjs.com/package/@google-cloud/speech)
- [Node-record-lpcm-16 Lib](https://www.npmjs.com/package/node-record-lpcm16) + SoX (para reconhecer o microfone no Node.js)

Para instalar o o SoX no Windows utilize o [chocolately](https://chocolatey.org/install) como o seguinte comando:

`choco install sox.portable`

Obs: O SoX precisa está lista no PATH do S.O.


## How to run it

    $ npm install
    $ node index.js
const recorder = require('node-record-lpcm16');
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient({
  keyFilename: './credenciais.json'
});

// Frases chaves:
const keywords = [
  'teste de som', 
  'buscar por',
];

// Set Configs:
const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'pt-BR';
const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    enableSpeakerDiarization: true,
    model: 'latest_long',
    diarizationConfig: {
      enableSpeakerDiarization: true,
      minSpeakerCount: 2,
      maxSpeakerCount: 2,
    }
  },
  interimResults: false, // If you want interim results, set this to true
};

// Create a recognize stream
const recognizeStream = client
  .streamingRecognize(request)
  .on('error', console.error)
  .on('data', (data) => {
    if(data.results[0].isFinal) {
      let transcricaoAtual = data.results[0].alternatives[0].transcript;

      // Verificação de frases chaves:
      for(let element of keywords) {
        //pode ser por .match(/element/)?
        if(transcricaoAtual.includes(element)) {
          console.log(`[ALERTA]: ${transcricaoAtual}`);
          return; //ou break
        }
      }

      console.log(`Transcrição: ${transcricaoAtual}`);
    }
  });

// Start recording and send the microphone input to the Speech API.
// Ensure SoX is installed, see https://www.npmjs.com/package/node-record-lpcm16#dependencies
const audioStream = recorder.record({
  sampleRate: sampleRateHertz, // Sample rate (adjust as needed)
  channels: 1, // Mono audio
  audioType: 'raw', // Output audio type
}).stream();
audioStream.on('end', () => {
  recognizeStream.end();
});
audioStream.on('spawn', () => {
  console.log('spawn');
});
audioStream.pipe(recognizeStream);


console.log('Escutando, pressione Ctrl+C p/ parar.');
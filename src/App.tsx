import { useState } from "react";

export const startListening = async () => {
  const context = new AudioContext();

  const microphone = await navigator.mediaDevices.getUserMedia({
    audio: {
      latency: 0.02,
      autoGainControl: false,
      echoCancellation: false,
      noiseSuppression: false,
    },
  });
  const source = context.createMediaStreamSource(microphone);

  source.connect(context.destination);

  return microphone;
};

function App() {
  const [microphone, setMicrophone] = useState<MediaStream>();

  const handleOnClick = async () => {
    if (microphone) {
      setMicrophone(undefined);
      microphone.getTracks().forEach((track) => track.stop());
      return;
    }
    setMicrophone(await startListening());
  };

  return (
    <main>
      <button onClick={handleOnClick}>{microphone ? "Stop" : "Start"}</button>
      {microphone ? <progress /> : null}
    </main>
  );
}

export default App;

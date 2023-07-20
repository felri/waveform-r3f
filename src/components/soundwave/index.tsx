import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, SphereGeometry, MeshStandardMaterial, Mesh } from "three";
import { useControls } from "leva";

interface SoundwaveProps {
  audioFile: string;
  playing: boolean;
}

const LoadingSpinner: React.FC = () => {
  const mesh = useRef<Mesh | null>(null);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={mesh} position={[65, 0, -15]}>
      <boxGeometry args={[100, 100, 100]} />
      <meshStandardMaterial color={"hotpink"} />
    </mesh>
  );
};

const Soundwave: React.FC<SoundwaveProps> = ({ audioFile, playing }) => {
  const mesh = useRef<Group | null>(null);
  const analyser = useRef<AnalyserNode>();
  const data = useRef<Uint8Array>();
  const source = useRef<AudioBufferSourceNode>();
  const audioContext = useRef<AudioContext>(new window.AudioContext());
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const buffer = useRef<AudioBuffer>(); // add this line before useEffect
  const [startOffset, setStartOffset] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const request = new XMLHttpRequest();
    request.open("GET", audioFile, true);
    request.responseType = "arraybuffer";
    request.onload = function () {
      audioContext.current?.decodeAudioData(
        request.response,
        (decodedBuffer) => {
          buffer.current = decodedBuffer;

          if (!source.current) {
            source.current = audioContext.current?.createBufferSource();
            source.current.buffer = buffer.current;
            source.current.connect(audioContext.current?.destination);

            analyser.current = audioContext.current?.createAnalyser();
            analyser.current.fftSize = bars;
            source.current.connect(analyser.current);
            data.current = new Uint8Array(
              analyser.current?.frequencyBinCount as number
            );
            setLoaded(true);
            // double the discrepancy between the frequencyBinCount and the number of boxes
            // to make the soundwave look more interesting
            mesh.current?.children.forEach((child) => {
              child.scale.set(1, 0.5, 1);
            });
          }
        }
      );
    };
    request.send();
  }, [audioFile]);

  useEffect(() => {
    if (!hasStarted && playing && loaded) {
      source.current = audioContext.current?.createBufferSource();
      source.current.buffer = buffer.current as AudioBuffer;
      source.current.connect(audioContext.current?.destination);
      source.current.connect(analyser.current as AnalyserNode);

      source.current.start(0, startOffset);
      setHasStarted(true);
    }
    if (hasStarted && !playing) {
      source.current?.stop();

      const currentTime = audioContext.current?.currentTime || 0;
      setStartOffset(currentTime);

      source.current = undefined; // reset source so it can be started again
      setHasStarted(false);
    }
  }, [playing, hasStarted, loaded]);

  useFrame(() => {
    if (analyser.current && data.current && playing) {
      analyser.current.getByteFrequencyData(data.current);
      for (let i = 0; i < data.current.length; i++) {
        const value = data.current[i];
        // scale exponentially to make the soundwave look more interesting
        const scale = Math.pow(value / factor, 2);
        mesh.current?.children[i].scale.set(2, scale, scale);
      }
    }
  });

  const { color, randomColors, factor, bars } = useControls({
    color: {
      value: "#de7e00", // default color
      label: "Color",
    },
    randomColors: {
      value: false,
      label: "Random Colors",
    },
    factor: {
      value: 50,
      min: 25,
      max: 100,
      label: "Factor",
    },
    bars: {
      value: 128,
      min: 128,
      max: 1024,
      label: "Bars",
      step: 128,
    },
  });

  // Function to generate a random color
  const getRandomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);

  const geometry = new SphereGeometry(1, 32, 32);

  return (
    <group ref={mesh} position={[-120, 0, 0]} castShadow>
      {loaded ? (
        Array(bars / 2)
          .fill(undefined)
          .map((_, i) => {
            const material = new MeshStandardMaterial({
              // Check if the randomColors flag is set, if so, generate a random color, otherwise use the color from the color picker
              color: randomColors ? getRandomColor() : color,
              transparent: true,
              opacity: 0.8,
            });

            return (
              <mesh
                key={i}
                position={[i * 6, 0, 0]}
                geometry={geometry}
                material={material}
                receiveShadow
              />
            );
          })
      ) : (
        <LoadingSpinner />
      )}
    </group>
  );
};

export default Soundwave;

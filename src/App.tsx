import { useEffect, useRef, useState } from "react";
import Soundwave from "./components/soundwave";
import "./App.css";
import { Canvas, Vector3, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Leva, useControls } from "leva";

function Link({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "inherit", textDecoration: "none" }}
    >
      {children}
    </a>
  );
}

const Camera = (props: JSX.IntrinsicElements["perspectiveCamera"]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>();
  const set = useThree((state) => state.set);
  useEffect(() => void set({ camera: ref.current }), []);
  useFrame(() => ref.current?.updateMatrixWorld());
  return <perspectiveCamera ref={ref} {...props} />;
};

function PlayIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="#fff"
      version="1.1"
      viewBox="0 0 64 64"
      xmlSpace="preserve"
    >
      <g>
        <path d="M46.014 31.105L25.197 20.697a1.003 1.003 0 00-1.447.895v20.816a1 1 0 001.447.895l20.817-10.408a1 1 0 000-1.79zM25.75 40.79V23.21L43.33 32l-17.58 8.79z"></path>
        <path d="M32 0C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0zm0 62C15.458 62 2 48.542 2 32S15.458 2 32 2s30 13.458 30 30-13.458 30-30 30z"></path>
      </g>
    </svg>
  );
}

function PauseIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="100"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15 6v12M9 6v12"
      ></path>
    </svg>
  );
}

function App() {
  const getCameraPositionDesktopMobile = () => {
    if (window.innerWidth > 768) {
      return [100, 114, 88] as Vector3;
    } else {
      return [158, 186, 64] as Vector3;
    }
  };

  const [playing, setPlaying] = useState(false);
  const [cameraPosition] = useState(
    getCameraPositionDesktopMobile()
  );
  const [zoom] = useState(1);

  const { autoRotate } = useControls({
    autoRotate: {
      value: false,
      label: "Auto Rotate",
    },
    // cameraX: {
    //   value: 100,
    //   min: 0,
    //   max: 200,
    //   label: "Camera X",
    // },
    // cameraY: {
    //   value: 114,
    //   min: 0,
    //   max: 200,
    //   label: "Camera Y",
    // },
    // cameraZ: {
    //   value: 88,
    //   min: 0,
    //   max: 200,
    //   label: "Camera Z",
    // },
    // cameraZoom: {
    //   value: 1,
    //   min: 0,
    //   max: 10,
    //   label: "Camera Zoom",
    // },
  });

  // Update playing state when needed
  // You might want to connect this to a button or other UI element
  const togglePlaying = () => {
    setPlaying(!playing);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.5,
      }}
    >
      <Leva fill collapsed />
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 0,
          width: "100vw",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Link href="https://www.youtube.com/watch?v=ZZNZgtj26Fk">
          Grateful Dead - Althea
        </Link>
        <div
          className="button"
          onClick={togglePlaying}
          style={{
            width: "100px",
            height: "100px",
            display: "flex",
            justifyContent: "around",
            alignItems: "center",
          }}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </div>
      </div>
      <Canvas shadows style={{ width: "100vw", height: "100vh" }}>
        <Camera
          position={cameraPosition}
          zoom={zoom}
          near={50}
          far={4000}
        />
        <ambientLight intensity={0.1} />
        <spotLight
          position={[0, 500, 200]}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <OrbitControls enablePan={false} autoRotate={autoRotate} />

        <Soundwave
          audioFile="/waveform-r3f/sounds/grateful.mp3"
          playing={playing}
        />
      </Canvas>
    </div>
  );
}

export default App;

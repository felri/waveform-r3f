import { useState } from "react";
import Soundwave from "./components/soundwave";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Leva } from "leva";

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
      height="800"
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
  const [playing, setPlaying] = useState(false);

  // Update playing state when needed
  // You might want to connect this to a button or other UI element
  const togglePlaying = () => {
    setPlaying(!playing);
  };

  const getCameraPositionDesktopMobile = () => {
    if (window.innerWidth > 768) {
      return [70, 40, 100];
    } else {
      return [120, 70, 30];
    }
  };

  const getCameraZoomDesktopMobile = () => {
    if (window.innerWidth > 768) {
      return 5;
    } else {
      return 2.5;
    }
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
      <Canvas shadows>
        {/* <Perf /> */}
        <ambientLight intensity={0.1} />
        <spotLight
          position={[0, 500, 200]}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <OrbitControls enablePan={false} />

        <Soundwave audioFile="/sounds/grateful.mp3" playing={playing} />
        <OrthographicCamera
          makeDefault
          position={getCameraPositionDesktopMobile()}
          zoom={getCameraZoomDesktopMobile()}
          key={undefined}
          view={undefined}
          quaternion={undefined}
          left={undefined}
          right={undefined}
          bottom={undefined}
          onClick={undefined}
          onPointerMissed={undefined}
          attach={undefined}
          args={undefined}
          onUpdate={undefined}
          up={undefined}
          scale={undefined}
          rotation={undefined}
          matrix={undefined}
          layers={undefined}
          dispose={undefined}
          onContextMenu={undefined}
          onDoubleClick={undefined}
          onPointerUp={undefined}
          onPointerDown={undefined}
          onPointerOver={undefined}
          onPointerOut={undefined}
          onPointerEnter={undefined}
          onPointerLeave={undefined}
          onPointerMove={undefined}
          onPointerCancel={undefined}
          onWheel={undefined}
          castShadow={undefined}
          addEventListener={undefined}
          hasEventListener={undefined}
          removeEventListener={undefined}
          dispatchEvent={undefined}
          visible={undefined}
          type={undefined}
          id={undefined}
          uuid={undefined}
          name={undefined}
          parent={undefined}
          modelViewMatrix={undefined}
          normalMatrix={undefined}
          matrixWorld={undefined}
          matrixAutoUpdate={undefined}
          matrixWorldAutoUpdate={undefined}
          matrixWorldNeedsUpdate={undefined}
          receiveShadow={undefined}
          frustumCulled={undefined}
          renderOrder={undefined}
          animations={undefined}
          userData={undefined}
          customDepthMaterial={undefined}
          customDistanceMaterial={undefined}
          isObject3D={undefined}
          onBeforeRender={undefined}
          onAfterRender={undefined}
          applyMatrix4={undefined}
          applyQuaternion={undefined}
          setRotationFromAxisAngle={undefined}
          setRotationFromEuler={undefined}
          setRotationFromMatrix={undefined}
          setRotationFromQuaternion={undefined}
          rotateOnAxis={undefined}
          rotateOnWorldAxis={undefined}
          rotateX={undefined}
          rotateY={undefined}
          rotateZ={undefined}
          translateOnAxis={undefined}
          translateX={undefined}
          translateY={undefined}
          translateZ={undefined}
          localToWorld={undefined}
          worldToLocal={undefined}
          lookAt={undefined}
          add={undefined}
          remove={undefined}
          removeFromParent={undefined}
          clear={undefined}
          getObjectById={undefined}
          getObjectByName={undefined}
          getObjectByProperty={undefined}
          getObjectsByProperty={undefined}
          getWorldPosition={undefined}
          getWorldQuaternion={undefined}
          getWorldScale={undefined}
          getWorldDirection={undefined}
          raycast={undefined}
          traverse={undefined}
          traverseVisible={undefined}
          traverseAncestors={undefined}
          updateMatrix={undefined}
          updateMatrixWorld={undefined}
          updateWorldMatrix={undefined}
          toJSON={undefined}
          clone={undefined}
          copy={undefined}
          top={undefined}
          matrixWorldInverse={undefined}
          projectionMatrix={undefined}
          projectionMatrixInverse={undefined}
          isCamera={undefined}
          near={undefined}
          far={undefined}
          setViewOffset={undefined}
          clearViewOffset={undefined}
          updateProjectionMatrix={undefined}
          isOrthographicCamera={undefined}
        />
      </Canvas>
    </div>
  );
}

export default App;

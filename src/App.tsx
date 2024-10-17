import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Scene } from "./components/Scene";
import { TextSection } from "./components/TextSection";

export const App: React.FC = () => {
  const [scrollPosY, setScrollPosY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosY(window.scrollY / document.body.clientHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth;
      window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <nav>
        <div className="logo">Yahel Cohen</div>
        <div className="hamburger">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>

      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
        }}
      >
        <Scene scrollPosY={scrollPosY} />
      </Canvas>

      <TextSection />
    </div>
  );
};

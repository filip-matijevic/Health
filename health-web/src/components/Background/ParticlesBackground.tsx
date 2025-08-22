import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false);

  // Initialize the engine once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // small build with basic shapes/interactivity
    }).then(() => setReady(true));
  }, []);

  // Night-sky style: soft dots with subtle linking and gentle drift
  const options = useMemo(
    () => ({
        background: {
          color: { value: "#000000" } // black background, change as you like
        },
        fpsLimit: 30,
        particles: {
          color: { value: "#ffffff" },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1.5,
            triangles: { enable: true, opacity: 0.1 } // this is the key!
          },
          collisions: { enable: false },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            outModes: { default: "out" }
          },
          number: {
            value: 200,
            density: { enable: true, area: 800 }
          },
          opacity: { value: 0.6 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } }
        },
        detectRetina: true
      }),
    []
  );

  if (!ready) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 -z-10 pointer-events-none"
      options={options as any}
    />
  );
}
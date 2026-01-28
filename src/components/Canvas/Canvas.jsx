import { useRef, useEffect } from "react";
import { machineSize, prodCycleRate } from "../../data/settings.js";
import Machine from "../../classes/Machine.js";

export default function Canvas({
  machines,
  setMachines,
  animateProdCycle,
  onMachineClick,
  pause,
}) {
  const canvasRef = useRef(null);

  //Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId;

    function animate(timestamp) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cycleTime =
        typeof timestamp === "number" ? timestamp % prodCycleRate : 0;

      machines.forEach((machine) => {
        machine.update(ctx, cycleTime, pause);
      });
      animationFrameId = window.requestAnimationFrame(animate);
    }

    animationFrameId = window.requestAnimationFrame(animate);
    //Cleanup animation frame
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [machines, animateProdCycle, pause]);

  //Select machines
  useEffect(() => {
    const canvas = canvasRef.current;

    function handleClick(e) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      const clicked = machines.find((machine) => {
        return (
          x >= machine.position.x &&
          x <= machine.position.x + machineSize &&
          y >= machine.position.y &&
          y <= machine.position.y + machineSize
        );
      });

      if (clicked) {
        setMachines((prevMachines) =>
          prevMachines.map((machine) => {
            const updated =
              machine === clicked
                ? { ...machine, selected: true }
                : { ...machine, selected: false };
            return machine instanceof Machine
              ? Object.assign(Object.create(Machine.prototype), updated)
              : new Machine(updated);
          })
        );
        if (onMachineClick) {
          onMachineClick(clicked);
        }
      }
    }

    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, [machines, setMachines, onMachineClick]);

  return <canvas ref={canvasRef}></canvas>;
}

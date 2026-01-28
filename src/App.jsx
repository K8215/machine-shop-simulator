import React, { useState } from "react";
import "./App.css";
import {
  Info,
  BuyMachines,
  Sidebar,
  Canvas,
  HireEmployees,
  Overview,
  HumanResources,
} from "./components";
import { useProductionCycle, useControls } from "./hooks";

function App() {
  //State
  const [openMenu, setOpenMenu] = useState(null);
  const [machines, setMachines] = useState([]);
  const [selectedMachineId, setSelectedMachineId] = useState(null);

  //Init Game Processes
  const { pause } = useControls();
  const { funds, setFunds, lifetimeEarnings, animateProdCycle } =
    useProductionCycle({
      machines,
      setMachines,
      pause,
    });

  function onMachineClick(machine) {
    setSelectedMachineId(machine.id);
  }

  //Render
  return (
    <>
      <div className="grid">
        <Sidebar setOpenMenu={setOpenMenu} funds={funds} />
        <Canvas
          machines={machines}
          setMachines={setMachines}
          animateProdCycle={animateProdCycle}
          onMachineClick={onMachineClick}
          pause={pause}
        />
        <Info
          selectedMachine={machines.find((m) => m.id === selectedMachineId)}
          funds={funds}
          setFunds={setFunds}
          setMachines={setMachines}
        />
        {pause && (
          <div className="paused">
            <h1>PAUSED</h1>
          </div>
        )}
        {openMenu === "buy" && (
          <BuyMachines
            funds={funds}
            setFunds={setFunds}
            setOpenMenu={setOpenMenu}
            machines={machines}
            setMachines={setMachines}
          />
        )}
        {openMenu === "overview" && (
          <Overview
            setOpenMenu={setOpenMenu}
            machines={machines}
            lifetimeEarnings={lifetimeEarnings}
          />
        )}
        {openMenu === "hire" && <HireEmployees setOpenMenu={setOpenMenu} />}
        {openMenu === "hr" && <HumanResources setOpenMenu={setOpenMenu} />}
      </div>
    </>
  );
}

export default App;

import { useState } from "react";
import type { MeasurementType } from "../../pages/MeasurementPage";
import MeasurementCard from "./MeasurementCard";

type Props = {
    onMeasurementSelect : (measurement: MeasurementType | null) => void;
    onCreateBegin : () => void;
    data : MeasurementType[]
}

export default function MeasurementList({onMeasurementSelect, onCreateBegin, data : measurements} : Props) {
  const [selectedMeasurement, setSelectedMeasurement] =
    useState<MeasurementType | null>(measurements[0]);

  function sayName(measurement: MeasurementType) {
    if (measurement === selectedMeasurement) {
      setSelectedMeasurement(null);
      onMeasurementSelect(null);
    } else {
      setSelectedMeasurement(measurement);
      onMeasurementSelect(measurement);
    }
  }
  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      {measurements.map((item) => {
        const selectedState =
          selectedMeasurement === null
            ? false
            : item.name === selectedMeasurement.name;
        return (
          <MeasurementCard
            model={item}
            selected={selectedState}
            onClick={sayName}
          />
        );
      })}

      <div 
      onClick={()=>{
        setSelectedMeasurement(null);
        onCreateBegin();
      }}
      className="h-18 border-dashed border-1 border-primary-a50 rounded-2xl bg-primary-a0/20 text-center justify-center flex flex-col">
        NEW MEASUREMENT +
      </div>
    </div>
  );
}

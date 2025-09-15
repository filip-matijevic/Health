import type { MeasurementType } from "../../pages/MeasurementPage";
import { RoundedBase } from "../../primitives/Rounded";
import MeasurementValueTrend from "./MeasurementValueTrend";

type Props = {
  model: MeasurementType;
  selected: boolean;
  onClick?: (name: MeasurementType) => void;
};

export default function MeasurementCard({
  model,
  selected,
  onClick = () => {},
}: Props) {
  if (model.values) {
    if (model.values?.length < 2) {
      console.log("can not render. not enough data");
    }
  }
  else{

    console.log("can not render. no data");
  }
  return (
    <RoundedBase
      className={`bg-surface-a10 p-2 h-18 ${
        selected ? "border-2 border-white" : "opacity-20"
      } 
    transition-all duration-150`}
      onClick={() => {
        onClick(model);
      }}
    >
      <div className="flex flex-row justify-between">
        <p className="text-light-a0 text-[12px] uppercase w-full font-bold text-left">
          {model.name}
        </p>
        <MeasurementValueTrend />
      </div>
      <div className="w-full flex flex-row justify-between">
        <div className="border-0 border-white text-white text-center flex flex-col">
          <p className="font-bold text-center">182.44</p>
          <p className="text-[8px] text-center">13 JUL 2025</p>
        </div>
        <p className="flex flex-col text-[8px] justify-end items-center">►</p>
        <div className="border-0 border-white text-white flex flex-col">
          <p className="font-bold">182.44</p>
          <p className="text-[8px]">13 JUL 2025</p>
        </div>
      </div>
    </RoundedBase>
  );
}

import { useRef, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { ArrowDown } from "../../icons/Icons";
import MaterialInput from "../../inputs/MaterialInput";
import MaterialRoundedButton from "../../inputs/MaterialRoundedButton";
import MeasurementValue, {
  type MeasurementValueType,
} from "./MeasurementValue";
import MeasurementValueTrend from "./MeasurementValueTrend";

type Props = {
  name: string;
  id: string;
};

export default function Measurement({ name, id }: Props) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const meaData = useFetch<MeasurementValueType[]>(
    `/api/Measurement/Data/${id}`,
    {
      method: "GET",
    },
    { immediate: true }
  );

  const newDataFetch = useFetch<MeasurementValueType>(
    `/api/Measurement/Measurement/${id}`,
    {
      method: "POST",
    },
    { immediate: false, auth: true }
  );


  const valueRef = useRef<HTMLInputElement>(null);

  async function postNewData(){
    newDataFetch.updateRequestOptions({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          value: valueRef.current?.value
        }),
      });

      const response = await newDataFetch.load();
      if (response){
          meaData.load();    
          if (valueRef.current) {
            valueRef.current.value = ""; // clear the field
          }
          setExpanded(false);
      }

  }

  return (
    <div className="bg-surface-a20 rounded-xl shadow-inner shadow-surface-tonal-a0 border-1 border-surface-a20">
      <div className="flex flex-row items-center justify-between ">
        <p className="px-2 text-primary-a50 capitalize font-semibold text-[16px] w-26">
          {name}
        </p>
        <div className="flex-grow h-10 text-white">
          {!meaData.data || meaData.data.length < 1 ? (
            "No data"
          ) : (
            <div className="flex flex-row items-center space-x-4">
              <MeasurementValue value={meaData.data[0]} />
              <MeasurementValueTrend/>
              <MeasurementValue value={meaData.data[meaData.data.length-1]} />
            </div>
          )}
        </div>
        <button
          className="text-surface-a10 w-11 h-11 p-3"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <ArrowDown />
        </button>
      </div>
      <div
        className={`${
          expanded ? "h-11 m-2 opacity-100" : "h-0 m-0 opacity-0"
        } overflow-hidden transition-all duration-300`}
      >
        <div className="flex flex-row w-70">
          <MaterialInput placeholder="New entry" ref={valueRef} />
          <MaterialRoundedButton label="Add" onClick={postNewData}/>
        </div>
      </div>
    </div>
  );
}

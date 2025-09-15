import { useRef, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { FileDetailsSvg, PlusSvg } from "../../icons/Icons";
import MeasurementValue, {
  type MeasurementValueType,
} from "./MeasurementValue";
import MeasurementValueTrend from "./MeasurementValueTrend";
import InputFieldButton from "../../inputs/inputFields/InputFieldButton";
import { RoundedBase } from "../../primitives/Rounded";
import RoundedButton from "../../inputs/RoundedButton";

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

  async function postNewData() {
    newDataFetch.updateRequestOptions({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        value: valueRef.current?.value,
      }),
    });

    const response = await newDataFetch.load();
    if (response) {
      meaData.load();
      if (valueRef.current) {
        valueRef.current.value = ""; // clear the field
      }
      setExpanded(false);
    }
  }

  return (
    <RoundedBase
      className="bg-surface-a10"
      onClick={() => {
        setExpanded(!expanded);
      }}
    >
      <div className="flex flex-row items-center justify-between p-2">
        <p className="px-2 text-primary-a50 uppercase font-semibold text-[16px] w-26">
          {name}
        </p>
        <div className="flex-grow h-10 text-white">
          {!meaData.data || meaData.data.length < 1 ? (
            "No data"
          ) : (
            <div className="flex flex-row items-center space-x-4">
              <MeasurementValue value={meaData.data[0]} />
              <MeasurementValueTrend />
              <MeasurementValue value={meaData.data[meaData.data.length - 1]} />
            </div>
          )}
        </div>
      </div>
      <div
        className={`${
          expanded ? "h-14 opacity-100" : "h-0 m-0 opacity-0"
        } overflow-hidden transition-all duration-300 flex items-end`}
      >
        <div className="flex flex-row space-x-1 justify-between w-full">
          <InputFieldButton
            icon={<PlusSvg />}
            placeholder="Add value"
            className="w-44 m-1"
          />
          <div className="flex flex-row items-end space-x-1 m-2">
            <RoundedButton
              icon={<FileDetailsSvg />}
              label="Progress"
              className="h-9 text-surface-a10 bg-gradient-to-br from-primary-a0 to-primary-a30"
            />
          </div>
        </div>
      </div>
    </RoundedBase>
  );
}

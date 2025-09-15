import useFetch from "../../hooks/useFetch";
import Measurement from "../elements/measurement/Measurement";
import type { MeasurementValueType } from "../elements/measurement/MeasurementValue";
import { PlusSvg } from "../icons/Icons";
import InputFieldButton from "../inputs/inputFields/InputFieldButton";

export type MeasurementType ={
    name: string;
    id: string;
    description: string;
    values? : MeasurementValueType[];
}

export default function MeasurementPage(){


    const { data: measurements} = useFetch<MeasurementType[]>("/api/Measurement/Measurements", {
        method: "GET",
    }, 
    { immediate: true, auth: true });
    return(
    <div className="p-4">
        <p className="font-extrabold text-light-a0 text-2xl flex justify-between items-center">
            MEASUREMENTS
        </p>
        <div className="pt-4 pb-3 border-b-1 border-surface-a40 mb-3 flex flex-row space-x-2">
            <InputFieldButton icon={<PlusSvg/>} placeholder="Create a new measurement" className="w-full"/>
        </div>
        <ul className="space-y-3">
            {measurements?.map(item => (
                <li key={item.id}>
                    <Measurement name={item.name} id={item.id}/>
                </li>
            ))}
        </ul>


    </div>)
}
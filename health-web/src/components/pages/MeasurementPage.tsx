import useFetch from "../../hooks/useFetch";
import Measurement from "../elements/measurement/Measurement";
import MaterialInput from "../inputs/MaterialInput";
import MaterialRoundedButton from "../inputs/MaterialRoundedButton";


export default function MeasurementPage(){

    type MeasurementType ={
        name: string;
        id: string;
        description: string;
    }

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
            <MaterialInput placeholder="Track someting new!"/>
            <MaterialRoundedButton label="Create"/>
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
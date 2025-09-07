import { useFetch } from "../../hooks/useFetch";
import CreateMeasurement from "../elements/measurement/CreateMeasurement";
import Measurement from "../elements/measurement/Measurement";


export default function MeasurementPage(){

    type MeasurementType ={
        name: string;
        id: string;
        description: string;
    }

    const { data: measurements, refetch} = useFetch<MeasurementType[]>("/api/Measurement/Measurements", {
        method: "GET",
        auth: true
    });
    console.log(measurements);

    return(
    <div>
        <ul className="p-4 space-y-3">
            {measurements?.map(item => (
                <li key={item.id}>
                    <Measurement name={item.name} id={item.id}/>
                </li>
            ))}
        </ul>
        <CreateMeasurement onCreate={()=>refetch()}/>

    </div>)
}
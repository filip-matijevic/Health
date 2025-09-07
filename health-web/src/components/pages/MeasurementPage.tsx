import { useFetch } from "../../hooks/useFetch";
import CreateMeasurement from "../elements/measurement/CreateMeasurement";
import Measurement from "../elements/measurement/Measurement";


export default function MeasurementPage(){

    type MeasurementType ={
        name: string;
        id: string;
        description: string;
    }

    const { data: measurements, refetch} = useFetch<MeasurementType[]>("/api/Measurement/Measurements");
    console.log(measurements);

    return(
    <div>
        Measurement page
        <ul>
            {measurements?.map(item => (
                <li key={item.id}>
                    <Measurement name={item.name}/>
                </li>
            ))}
        </ul>
        <CreateMeasurement onCreate={()=>refetch()}/>

    </div>)
}
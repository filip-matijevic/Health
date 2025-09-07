import { useFetch } from "../../../hooks/useFetch";


type Props = {
    name: string;
    id: string;
  };

  type MeasurementValueType ={
    value: number;
    time: string;
  }

export default function Measurement({name, id} : Props){
    const { data } = useFetch<MeasurementValueType[]>(
        `/api/Measurement/Data/${id}`,
        {
          method: "GET",
          auth: true
        }
      );

      console.log(data);
      
    return (
        <div className="bg-blue-500 rounded-xl font-white shadow-xl shadow-black/30">
            <p className="p-2 text-white uppercase font-bold ">{name}</p>
            <p className="px-2 text-white">{id}</p>
            <ul className="flex flex-row gap-2 px-2">
            {data?.map(item => (
                <li key={item.value}>
                    {item.value}
                </li>
            ))}
            </ul>
        </div>
    )
}
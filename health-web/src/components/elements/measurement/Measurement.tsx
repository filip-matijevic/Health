

type Props = {
    name: string;
  };
export default function Measurement({name} : Props){
    return (
        <div>
            {name}
        </div>
    )
}
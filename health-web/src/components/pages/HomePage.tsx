import RoundedButton from "../inputs/RoundedButton";

type Props = {
    userName: string;
    onLogOut: () => void;
  };

export default function HomePage({userName, onLogOut} : Props){

    function LogOut(){
        console.log("Logging out");
        onLogOut();
    }

    return (
    <div>
        <RoundedButton label={`LOG OUT, ${userName}`} className="bg-red-700" onClick={LogOut}/>
    </div>)
}
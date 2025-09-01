import Navigation from "../elements/Navigation";
import RoundedButton from "../inputs/RoundedButton";

type Props = {
  userName?: string;
  onLogOut: () => void;
};

export default function HomePage({ userName, onLogOut }: Props) {
  function LogOut() {
    console.log("Logging out");
    onLogOut();
  }

  return <div className="w-full h-full flex flex-col border-2 border-yellow-500">
    <div className="flex-1 bg-green-200">
    CONTENT
    </div>
    <RoundedButton label="log out" filled={false} onClick={LogOut}/>
    <Navigation/>
  </div>;
}

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

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 bg-white">{userName}</div>
      <RoundedButton label="log out" filled={false} onClick={LogOut} />
      <Navigation />
    </div>
  );
}

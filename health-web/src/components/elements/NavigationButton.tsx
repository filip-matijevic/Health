import type { NavigationKey } from "./NavigationBar";

type Props = {
    selected: boolean;
    tabKey: NavigationKey;
    onSelect: (key: NavigationKey) => void;
  };

export default function NavigationButton({selected = false, tabKey, onSelect} : Props) {
  return (
    <button className={`aspect-square ${selected ? "bg-amber-600 -translate-y-5" : "bg-blue-400"} w-13 rounded-full
    transition-all duration-300 ease-in-out`}
    onClick={()=> onSelect(tabKey)}>
      <div></div>
    </button>
  );
}

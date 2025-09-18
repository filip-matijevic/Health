import type { ReactNode } from "react";

type Props = {
  index: number;
  onSelect?: (index: number) => void;
  icon?: ReactNode;
};

export default function ToggleBarButton({ onSelect = () => {}, index, icon }: Props) {
  return (
    <button
      className="h-11 w-16 rounded-full text-white m-2 flex flex-col items-center justify-between"
      onClick={() => {
        onSelect(index);
      }}
    >
      <div className="flex-1 aspect-square p-1">
        {icon}
      </div>
      <p className="text-[8px] font-bold">FEED</p>
    </button>
  );
}

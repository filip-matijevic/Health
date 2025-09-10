import type { ReactNode } from "react";
import type { NavigationKey } from "./NavigationBar";

type Props = {
  selfIdx: number;
  selectedIdx: number;
  tabKey: NavigationKey;
  icon: ReactNode;
  onSelect: (idx: number) => void;
};

export default function NavigationButton({
  selfIdx,
  selectedIdx,
  tabKey,
  icon,
  onSelect,
}: Props) {
  const selected = selfIdx === selectedIdx;
  let roundedStyle;
  if (selectedIdx - 1 === selfIdx) roundedStyle = "rounded-r-[32px]";

  if (selectedIdx + 1 === selfIdx) roundedStyle = "rounded-l-[32px]";

  if (!selected) {
    if (selfIdx === 0) {
      if (selectedIdx === selfIdx + 1) {
        roundedStyle = "rounded-[32px]";
      } else {
        roundedStyle = "rounded-l-[32px]";
      }
    }

    if (selfIdx === 4) {
      if (selectedIdx === selfIdx - 1) {
        roundedStyle = "rounded-[32px]";
      } else {
        roundedStyle = "rounded-r-[32px]";
      }
    }
  }

  return (
    <button
      className={`
    flex items-center justify-center transition-all duration-300
    ${
      selected
        ? "flex-grow min-w-16 mx-2 bg-surface-a10 rounded-[32px] -translate-y-0"
        : "w-16 h-16 bg-surface-a10 " + roundedStyle
    }
  `}
      onClick={() => onSelect(selfIdx)}
    >
      <div
        className={`transition-all duration-300 w-16 h-16  p-3 
        flex flex-col items-center justify-center ${
          selected ? "pt-1.5 text-primary-a40" : "text-primary-a0"
        }`}
      >
        {icon}
        <p
          className={`text-xs uppercase font-bold transition-all duration-300 ${
            selected ? "text-primary-a40 h-3" : "text-transparent h-0"
          }`}
        >
          {tabKey}
        </p>
      </div>
    </button>
  );
}

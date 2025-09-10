import { useState, type ReactNode } from "react";
import NavigationButton from "./NavigationButton";
import { ChartSvg, ExclamationSvg, RulerSvg, UserSettingsSvg } from "../icons/Icons";

export type NavigationKey =
  | "dashboard"
  | "measurements"
  | "create"
  | "notifications"
  | "profile";

type Props = {
  onSelect: (key: NavigationKey) => void;
};

export type Tab = {
  key: NavigationKey;
  label: string;
  idx: number;
  icon: ReactNode;
};

const TABS: Tab[] = [
  { key: "dashboard", label: "Dashboard", idx: 0, icon:<ChartSvg/> },
  { key: "measurements", label: "Measurements", idx: 1, icon:<RulerSvg/>  },
  { key: "create", label: "Not Implemented", idx: 2, icon:<ExclamationSvg/>  },
  { key: "notifications", label: "Not Implemented", idx: 3, icon:<ExclamationSvg/>  },
  { key: "profile", label: "Profile", idx: 4, icon:<UserSettingsSvg/>  },
];

export default function NavigationBar({ onSelect }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>(TABS[0]);

  function onTabSelected(idX: number): void {
    setActiveTab(TABS[idX]);
    onSelect(TABS[idX].key);
  }
  return (
    <nav className="fixed bottom-2 z-50 w-full flex justify-around">
      <div className="w-full h-16 flex justify-around px-2">
        {TABS.map(({ key, idx, icon }) => {
          return (
            <NavigationButton
              selfIdx={idx}
              selectedIdx={activeTab?.idx}
              tabKey={key}
              icon={icon}
              onSelect={onTabSelected}
            />
          );
        })}
      </div>
    </nav>
  );
}

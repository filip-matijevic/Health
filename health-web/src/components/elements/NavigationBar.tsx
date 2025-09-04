import { useState } from "react";
import NavigationButton from "./NavigationButton";

export type NavigationKey =
  | "home"
  | "search"
  | "create"
  | "notifications"
  | "profile";

type Props = {
  onSelect: (key: NavigationKey) => void;
};

export type Tab = {
  key: NavigationKey;
  label: string;
};

const TABS: Tab[] = [
  { key: "home", label: "Home" },
  { key: "search", label: "Search" },
  { key: "create", label: "New" },
  { key: "notifications", label: "Alerts" },
  { key: "profile", label: "Profile" },
];

export default function NavigationBar({ onSelect }: Props) {
  const [activeTabKey, setActiveTabKey] = useState<NavigationKey>("home");

  function onTabSelected(key: NavigationKey): void {
    setActiveTabKey(key);
    onSelect(key);
  }
  return (
    <nav className="fixed bottom-3 z-50 w-full flex justify-center">
      <div className="flex flex-row justify-center bg-blue-300 w-fit p-2 rounded-full gap-2">
        {TABS.map(({ key }) => {
          return (
            <NavigationButton
              selected={activeTabKey === key}
              tabKey={key}
              onSelect={onTabSelected}
            />
          );
        })}
      </div>
    </nav>
  );
}

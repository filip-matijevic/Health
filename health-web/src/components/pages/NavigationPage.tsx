import { useState } from "react";
import { type ReactNode } from "react";
import NavigationBar, { type NavigationKey } from "../elements/NavigationBar";
import MeasurementPage from "./MeasurementPage";
import UserSettingsPage from "./UserSettingsPage";

type Props = {
  logOutUser: () => void;
};

export type Page = {
  key: NavigationKey;
  header: string;
  content: ReactNode;
};

export default function NavigationPage({ logOutUser }: Props) {
  const PAGES: Record<NavigationKey, Page> = {
    dashboard: {
      key: "create",
      header: "Home",
      content: <div>Home Page</div>,
    },
    measurements: {
      key: "measurements",
      header: "Measurement",
      content: <MeasurementPage />,
    },
    create: {
      key: "create",
      header: "Create",
      content: <div>Create Page</div>,
    },
    notifications: {
      key: "notifications",
      header: "Notifications",
      content: <div>Notifications Page</div>,
    },
    profile: {
      key: "profile",
      header: "Profile",
      content: <UserSettingsPage onSignOut={LogOutUser} />,
    },
  };

  const [selectedPage, setSelectedPage] = useState<Page>(PAGES.dashboard);

  function SetActiveTab(key: NavigationKey): void {
    console.log("Selected the page " + key);
    setSelectedPage(PAGES[key]);
  }

  function LogOutUser(): void {
    console.log("gonna log out");
    logOutUser();
  }

  return (
    <div className="h-full w-full flex flex-col">
      {(Object.entries(PAGES) as [NavigationKey, Page][]).map(([key, page]) => {
        const isActive = selectedPage.key === key;
        return (
          <section
            key={key}
            className={`
                absolute inset-0 h-full w-full transition-opacity duration-300
                ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}
              `}
            hidden={!isActive && false} // keep it mounted, just moved off-screen
          >
            {page.content}
          </section>
        );
      })}
      <NavigationBar onSelect={SetActiveTab} />
    </div>
  );
}

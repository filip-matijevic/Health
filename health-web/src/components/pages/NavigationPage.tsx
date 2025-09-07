import { useState } from "react";
import { type ReactNode } from "react";
import NavigationBar, { type NavigationKey } from "../elements/NavigationBar";
import RoundedButton from "../inputs/RoundedButton";
import NavigationHeader from "../elements/NavigationHeader";
import MeasurementPage from "./MeasurementPage";

type Props = {
  logOutUser: () => void;
};

export type Page = {
  header: string;
  content: ReactNode;
};

const PAGES: Record<NavigationKey, Page> = {
  home: {
    header: "Home",
    content: <div>Home Page</div>,
  },
  search: {
    header: "Measurement",
    content: <MeasurementPage />,
  },
  create: {
    header: "Create",
    content: <div>Create Page</div>,
  },
  notifications: {
    header: "Notifications",
    content: <div>Notifications Page</div>,
  },
  profile: {
    header: "Profile",
    content: <div>Profile Page</div>,
  },
};

export default function NavigationPage({ logOutUser }: Props) {
  const [selectedPage, setSelectedPage] = useState<Page>(PAGES.home);
  function SetActiveTab(key: NavigationKey): void {
    console.log("Selected the page " + key);
    setSelectedPage(PAGES[key]);
  }

  function LogOutUser(): void {
    console.log("gonna log out");
    logOutUser();
  }

  return (
    <div className="bg-red-300 h-full w-full flex flex-col">
        
      <div hidden={true}>
        <RoundedButton
          label="Log out"
          filled={true}
          className="w-fit"
          onClick={LogOutUser}
        ></RoundedButton>
        {selectedPage.header}
      </div>
      <NavigationHeader title={selectedPage.header} onLogOut={LogOutUser}/>
      <div className="pt-13">{selectedPage.content}</div>
      <NavigationBar onSelect={SetActiveTab} />
    </div>
  );
}

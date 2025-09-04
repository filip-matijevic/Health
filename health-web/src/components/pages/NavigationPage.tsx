import { useState } from "react";
import NavigationBar, { type NavigationKey } from "../elements/NavigationBar";
import RoundedButton from "../inputs/RoundedButton";

type Props = {
  logOutUser: () => void;
};

export type Page = {
  header: string;
};

const PAGES: Record<NavigationKey, Page> = {
  home: {
    header: "Home",
  },
  search: {
    header: "Search",
  },
  create: {
    header: "Create",
  },
  notifications: {
    header: "Notifications",
  },
  profile: {
    header: "Profile",
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
      <div>
        <RoundedButton
          label="Log out"
          filled={true}
          className="w-fit"
          onClick={LogOutUser}
        ></RoundedButton>
        {selectedPage.header}
      </div>
      <div>CONTENT</div>
      <NavigationBar onSelect={SetActiveTab} />
    </div>
  );
}

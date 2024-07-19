import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
// import Profile from "layouts/profile";
import Coinflip from "layouts/coinflip";
import Slot from "layouts/slot";
import Enter from "layouts/enter";
// import { BsFillPersonFill } from "react-icons/bs";
// import { BsCreditCardFill } from "react-icons/bs";
// import { IoWallet } from "react-icons/io5";
// import { IoStatsChart } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
// import { element } from "prop-types";

const routes = [
  {
    type: "component",
    name: "Enter",
    key: "enter",
    route: "/",
    component: Enter,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Home",
    key: "home",
    route: "/home",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Leaderboard",
  //   key: "tables",
  //   route: "/tables",
  //   icon: <IoStatsChart size="15px" color="inherit" />,
  //   component: Tables,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Wallet",
  //   key: "wallet",
  //   route: "/wallet",
  //   icon: <IoWallet size="15px" color="inherit" />,
  //   component: Billing,
  //   noCollapse: true,
  // },
  // { type: "title", title: "Account Pages", key: "account-pages" },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   route: "/profile",
  //   icon: <BsFillPersonFill size="15px" color="inherit" />,
  //   component: Profile,
  //   noCollapse: true,
  // },
  {
    type: "component",
    name: "Coinflip",
    key: "coiflip",
    route: "/coinflip",
    icon: <IoHome size="15px" color="inherit" />,
    component: Coinflip,
    noCollapse: true,
  },
  {
    type: "component",
    name: "Slot",
    key: "slot",
    route: "/slot",
    icon: <IoHome size="15px" color="inherit" />,
    component: Slot,
    noCollapse: true,
  },
];

export default routes;

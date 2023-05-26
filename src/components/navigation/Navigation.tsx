import { useState } from "react";
import HamburgerIcon from "./HamburgerIcon";
import Menu from "./Menu";
import useScrollDisabler from "../../hooks/useScrollDisabler";

const Navigation = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  useScrollDisabler(openSidebar);
  const toggle = () => setOpenSidebar((prev) => !prev);

  return (
    <div className="pl-4 lg:hidden">
      <HamburgerIcon open={openSidebar} toggle={toggle} />

      {openSidebar && <Menu show={openSidebar} toggle={toggle} />}
    </div>
  );
};

export default Navigation;

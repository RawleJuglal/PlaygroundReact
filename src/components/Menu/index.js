import { Menu } from "./Menu";
import { Button } from "../Button/Button";
import { MenuDropDown } from "./MenuDropdown";
import { MenuItem } from "./MenuItem";

Menu.Button = Button
Menu.Dropdown = MenuDropDown
Menu.Item = MenuItem

export default Menu
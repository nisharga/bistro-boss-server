/* eslint-disable @typescript-eslint/no-explicit-any */

import { IMenu } from "./menu.interface";
import { Menu } from "./menu.model";

 
const createMenu = async (menuDetails: IMenu): Promise<IMenu | null> => {
    const menu = await Menu.create(menuDetails)
    return menu;
  }

export const MenuService = {
    createMenu
}

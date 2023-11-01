import { BellIcon } from "@chakra-ui/icons";
import { Button, Checkbox, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

<Menu>
  <MenuButton as={Button} rightIcon={<BellIcon />}>
  </MenuButton>
  <MenuList>
    <MenuItem>Notification 1</MenuItem><Checkbox defaultChecked></Checkbox>
    <MenuItem>Notification 2</MenuItem><Checkbox defaultChecked></Checkbox>
    <MenuItem>Notification 3</MenuItem><Checkbox defaultChecked></Checkbox>
    <MenuItem>Notification 4</MenuItem><Checkbox defaultChecked></Checkbox>
    <MenuItem>Notification 5</MenuItem><Checkbox defaultChecked></Checkbox>
  </MenuList>
</Menu>
import { ROUTES_ENUM, Routes } from 'constants/routes';
import CalculateIcon from '@mui/icons-material/Calculate';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SideBarOption = any;

export enum SideBarOptionsEnum {
  dashboard = 'dashboard',
  chat = 'chat',
  calculator = 'calculator',
  educational = 'educational',
  reports = 'reports',
  queries = 'queries',
  setting = 'setting',
  help = 'help',
}

export const SideBarRoutes = {
  [SideBarOptionsEnum.dashboard]: Routes[ROUTES_ENUM.DASHBOARD],
  [SideBarOptionsEnum.chat]: Routes[ROUTES_ENUM.CHAT],
  [SideBarOptionsEnum.calculator]: Routes[ROUTES_ENUM.DOCTORS],
  [SideBarOptionsEnum.educational]: Routes[ROUTES_ENUM.EDUCATIONAL],
  [SideBarOptionsEnum.queries]: Routes[ROUTES_ENUM.QUERIES],
  [SideBarOptionsEnum.setting]: Routes[ROUTES_ENUM.SETTINGS],
  [SideBarOptionsEnum.help]: Routes[ROUTES_ENUM.HELP],
};

const dashboard: SideBarOption = {
  id: SideBarOptionsEnum.dashboard,
  label: 'dashboard',
  path: `${SideBarRoutes[SideBarOptionsEnum.dashboard]}`,
  Icon: ExploreOutlinedIcon,
};

const chat: SideBarOption = {
  id: SideBarOptionsEnum.chat,
  label: 'chat',
  path: SideBarRoutes[SideBarOptionsEnum.chat],
  Icon: ForumOutlinedIcon,
};

const calculator: SideBarOption = {
  id: SideBarOptionsEnum.calculator,
  label: 'calculator',
  path: SideBarRoutes[SideBarOptionsEnum.calculator],
  Icon: CalculateIcon,
};

const educational: SideBarOption = {
  id: SideBarOptionsEnum.educational,
  label: 'educational',
  path: SideBarRoutes[SideBarOptionsEnum.educational],
  Icon: ImportContactsIcon,
};

const queries: SideBarOption = {
  id: SideBarOptionsEnum.queries,
  label: 'queries',
  path: SideBarRoutes[SideBarOptionsEnum.queries],
  Icon: SmsOutlinedIcon,
};

const setting: SideBarOption = {
  id: SideBarOptionsEnum.setting,
  label: 'setting',
  path: SideBarRoutes[SideBarOptionsEnum.setting],
  Icon: SettingsOutlinedIcon,
};

const help: SideBarOption = {
  id: SideBarOptionsEnum.help,
  label: 'help',
  path: SideBarRoutes[SideBarOptionsEnum.help],
  Icon: HelpOutlineOutlinedIcon,
};

export const SideBarNav = {
  [SideBarOptionsEnum.dashboard]: dashboard,
  [SideBarOptionsEnum.chat]: chat,
  [SideBarOptionsEnum.calculator]: calculator,
  [SideBarOptionsEnum.educational]: educational,
  [SideBarOptionsEnum.queries]: queries,
  [SideBarOptionsEnum.setting]: setting,
  [SideBarOptionsEnum.help]: help,
};

export interface SIDEBAR_MENU_ITEM_TYPE {
  sidebarItem: SideBarOption;
  path: string;
  menu: string;
  isLastOption?: true;
}

export const SIDEBAR_MENU_ITEMS: SIDEBAR_MENU_ITEM_TYPE[] = [
  {
    sidebarItem: SideBarNav.dashboard,
    path: SideBarNav.dashboard.path,
    menu: SideBarNav.dashboard.label,
  },
  {
    sidebarItem: SideBarNav.chat,
    path: SideBarNav.chat.path,
    menu: SideBarNav.chat.label,
  },
  {
    sidebarItem: SideBarNav.calculator,
    path: SideBarNav.calculator.path,
    menu: SideBarNav.calculator.label,
  },
  {
    sidebarItem: SideBarNav.educational,
    path: SideBarNav.educational.path,
    menu: SideBarNav.educational.label,
  },
  {
    sidebarItem: SideBarNav.queries,
    path: SideBarNav.queries.path,
    menu: SideBarNav.queries.label,
  },
  {
    sidebarItem: SideBarNav.setting,
    path: SideBarNav.setting.path,
    menu: SideBarNav.setting.label,
  },
  {
    sidebarItem: SideBarNav.help,
    path: SideBarNav.help.path,
    menu: SideBarNav.help.label,
  },
];

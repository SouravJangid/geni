import { ROUTES_ENUM, Routes } from 'constants/routes';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SideBarOption = any;

export enum SideBarOptionsEnum {
  dashboard = 'dashboard',
  chat = 'chat',
  doctors = 'doctors',
  patients = 'patients',
  queries = 'queries',
  setting = 'setting',
  help = 'help',
  reports = 'reports',
  sharedfiles = 'sharedfiles',
  educational = 'educational',
}

export const SideBarRoutes = {
  [SideBarOptionsEnum.dashboard]: Routes[ROUTES_ENUM.DASHBOARD],
  [SideBarOptionsEnum.chat]: Routes[ROUTES_ENUM.CHAT],
  [SideBarOptionsEnum.doctors]: Routes[ROUTES_ENUM.DOCTORS],
  [SideBarOptionsEnum.patients]: Routes[ROUTES_ENUM.PATIENTS],
  [SideBarOptionsEnum.queries]: Routes[ROUTES_ENUM.QUERIES],
  [SideBarOptionsEnum.setting]: Routes[ROUTES_ENUM.SETTINGS],
  [SideBarOptionsEnum.help]: Routes[ROUTES_ENUM.HELP],
  [SideBarOptionsEnum.reports]: Routes[ROUTES_ENUM.REPORTS],
  [SideBarOptionsEnum.sharedfiles]: Routes[ROUTES_ENUM.SHAREDFILES],
  [SideBarOptionsEnum.educational]: Routes[ROUTES_ENUM.EDUCATIONAL],
};

const dashboard: SideBarOption = {
  id: SideBarOptionsEnum.dashboard,
  label: 'Dashboard',
  path: `${SideBarRoutes[SideBarOptionsEnum.dashboard]}`,
  Icon: ExploreOutlinedIcon,
};

const chat: SideBarOption = {
  id: SideBarOptionsEnum.chat,
  label: 'Chat',
  path: SideBarRoutes[SideBarOptionsEnum.chat],
  Icon: ForumOutlinedIcon,
};

const doctors: SideBarOption = {
  id: SideBarOptionsEnum.doctors,
  label: 'Doctor List',
  path: SideBarRoutes[SideBarOptionsEnum.doctors],
  Icon: PersonOutlineOutlinedIcon,
};

const patients: SideBarOption = {
  id: SideBarOptionsEnum.patients,
  label: 'Patient List',
  path: SideBarRoutes[SideBarOptionsEnum.patients],
  Icon: PeopleOutlinedIcon,
};

const queries: SideBarOption = {
  id: SideBarOptionsEnum.queries,
  label: 'Queries',
  path: SideBarRoutes[SideBarOptionsEnum.queries],
  Icon: SmsOutlinedIcon,
};

const setting: SideBarOption = {
  id: SideBarOptionsEnum.setting,
  label: 'Setting',
  path: SideBarRoutes[SideBarOptionsEnum.setting],
  Icon: SettingsOutlinedIcon,
};

const help: SideBarOption = {
  id: SideBarOptionsEnum.help,
  label: 'Help',
  path: SideBarRoutes[SideBarOptionsEnum.help],
  Icon: HelpOutlineOutlinedIcon,
};

const sharedfiles: SideBarOption = {
  id: SideBarOptionsEnum.sharedfiles,
  label: 'Contribute Shared Files',
  path: SideBarRoutes[SideBarOptionsEnum.sharedfiles],
  Icon: DescriptionOutlinedIcon,
};

const reports: SideBarOption = {
  id: SideBarOptionsEnum.reports,
  label: 'Reports',
  path: SideBarRoutes[SideBarOptionsEnum.reports],
  Icon: DescriptionOutlinedIcon,
};

const educational: SideBarOption = {
  id: SideBarOptionsEnum.educational,
  label: 'Educational',
  path: SideBarRoutes[SideBarOptionsEnum.educational],
  Icon: SchoolOutlinedIcon,
};

export const SideBarNav = {
  [SideBarOptionsEnum.dashboard]: dashboard,
  [SideBarOptionsEnum.chat]: chat,
  [SideBarOptionsEnum.doctors]: doctors,
  [SideBarOptionsEnum.patients]: patients,
  [SideBarOptionsEnum.queries]: queries,
  [SideBarOptionsEnum.setting]: setting,
  [SideBarOptionsEnum.help]: help,
  [SideBarOptionsEnum.sharedfiles]: sharedfiles,
  [SideBarOptionsEnum.reports]: reports,
  [SideBarOptionsEnum.educational]: educational,
};

export enum rolesType {
  admin = 'admin',
  doctor = 'doctor',
  patient = 'patient',
}
export interface SIDEBAR_MENU_ITEM_TYPE {
  sidebarItem: SideBarOption;
  path: string;
  menu: string;
  isLastOption?: true;
  roles?: rolesType[];
}

export const SIDEBAR_MENU_ITEMS: SIDEBAR_MENU_ITEM_TYPE[] = [
  {
    sidebarItem: SideBarNav.dashboard,
    path: SideBarNav.dashboard.path,
    menu: SideBarNav.dashboard.id,
    roles: [rolesType.admin, rolesType.doctor, rolesType.patient],
  },
  {
    sidebarItem: SideBarNav.chat,
    path: SideBarNav.chat.path,
    menu: SideBarNav.chat.id,
    roles: [rolesType.doctor, rolesType.patient],
  },
  {
    sidebarItem: SideBarNav.doctors,
    path: SideBarNav.doctors.path,
    menu: SideBarNav.doctors.id,
    roles: [rolesType.admin],
  },
  {
    sidebarItem: SideBarNav.patients,
    path: SideBarNav.patients.path,
    menu: SideBarNav.patients.id,
    roles: [rolesType.admin, rolesType.doctor],
  },
  {
    sidebarItem: SideBarNav.educational,
    path: SideBarNav.educational.path,
    menu: SideBarNav.educational.id,
    roles: [rolesType.patient],
  },
  {
    sidebarItem: SideBarNav.reports,
    path: SideBarNav.reports.path,
    menu: SideBarNav.reports.id,
    roles: [rolesType.doctor, rolesType.patient],
  },
  {
    sidebarItem: SideBarNav.queries,
    path: SideBarNav.queries.path,
    menu: SideBarNav.queries.id,
    roles: [rolesType.admin, rolesType.doctor, rolesType.patient],
  },
  {
    sidebarItem: SideBarNav.sharedfiles,
    path: SideBarNav.sharedfiles.path,
    menu: SideBarNav.sharedfiles.id,
    roles: [rolesType.doctor],
  },
  {
    sidebarItem: SideBarNav.setting,
    path: SideBarNav.setting.path,
    menu: SideBarNav.setting.id,
    roles: [rolesType.admin, rolesType.doctor, rolesType.patient],
  },
  {
    sidebarItem: SideBarNav.help,
    path: SideBarNav.help.path,
    menu: SideBarNav.help.id,
    roles: [rolesType.admin, rolesType.doctor, rolesType.patient],
  },
];

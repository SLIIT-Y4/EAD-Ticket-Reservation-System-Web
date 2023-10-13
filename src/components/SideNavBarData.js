import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { MdSupervisorAccount, MdOutlineSupervisorAccount, MdTopic, MdOutlineTopic } from 'react-icons/md';
import { AiOutlineWechat, AiFillFileAdd } from 'react-icons/ai';
import { HiDocumentText, HiPresentationChartBar, HiTemplate, HiUsers, HiDocumentSearch } from 'react-icons/hi';
import { GiFiles } from 'react-icons/gi';

export const backOfficeSideNavbarData = [
  {
    title: 'Travelers',
    path: '/travelers',
    icon: <FaUsers />,
    cName: 'nav-text',
  },
  {
    title: 'Travel Agents',
    path: '/travel-agents',
    icon: <FaUsers />,
    cName: 'nav-text',
  },
  {
    title: 'Reservations',
    path: '/reservations',
    icon: <FaUsers />,
    cName: 'nav-text',
  },
  { title: 'Schedules', path: '/schedules', icon: <FaUsers />, cName: 'nav-text' },
  {
    title: 'Trains',
    path: '/trains',
    icon: <FaUsers />,
    cName: 'nav-text',
  },
];

export const travelAgentSideNavbarData = [
  {
    title: 'Travelers',
    path: '/travelers',
    icon: <FaUsers />,
    cName: 'nav-text',
  },
  {
    title: 'Reservations',
    path: '/reservations',
    icon: <FaUsers />,
    cName: 'nav-text',
  },
];

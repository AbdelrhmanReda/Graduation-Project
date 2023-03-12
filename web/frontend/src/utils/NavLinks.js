import {
  MdOutlineDomain,
  MdOutlineBusinessCenter,
  MdOutlineEventNote,
  MdOutlineDashboard,
  MdAssignment,
} from 'react-icons/md'
import CompanyDashboard from '../components/Company/CompanyDashboard'

import JobDashboard from '../components/Company/JobDashboard'


export const companyLinks = [
  {
    id: 'CN1',
    name: 'Company',
    icon: MdOutlineDomain,
    element: CompanyDashboard,
  },
  {
    id: 'CN2',
    name: 'Jobs',
    icon: MdOutlineBusinessCenter,
    element: JobDashboard,
  },
  
]


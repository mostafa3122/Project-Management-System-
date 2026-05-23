import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { userContext } from '../context/userContext'

const ManagerOrEmployee = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation()
  const { userData } = useContext(userContext) || {}

  
  if (!userData) return null 

  const isEmployee = userData?.group?.name === 'Employee'
  const isManager = userData?.group?.name === 'Manager'

  const managerOnlyRoutes = ['users', 'projects', 'tasks']
  const employeeOnlyRoutes = ['projects', 'tasks']

  const currentRoute = pathname.split('/').filter(Boolean).pop() ?? ''

  if (isManager) {
    return managerOnlyRoutes.includes(currentRoute)
      ? <>{children}</>
      : <Navigate to='/no-data' replace />
  }

  if (isEmployee) {
    return employeeOnlyRoutes.includes(currentRoute)
      ? <>{children}</>
      : <Navigate to='/no-data' replace />
  }
  if (!userData) return null
  return <Navigate to='/no-data' replace />
}

export default ManagerOrEmployee
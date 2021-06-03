import React, { useReducer, ReactNode } from 'react'
import * as auth from '../untils/auth'
// import { useHistory } from 'react-router-dom'
// useHistory().push()

interface AuthInfo {
  name: string | null;
  token: string | null;
}

const AuthContext = React.createContext<any | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const initState: AuthInfo = {
    name: '' || auth.getToken('SET_NAME'),
    token: '' || auth.getToken('SET_TOKEN'),
  }

  const [state, dispath] = useReducer(infoReducer, initState)

  return <AuthContext.Provider children={children} value={{ state, dispath}} />
}

const infoReducer = (state: any, action: any) =>  {
  switch(action.type) {
      case 'success':
          return {
              ...state,
              ...action.payload
          }
      default: 
          return state;
  }
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}

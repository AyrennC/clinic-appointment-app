import * as React from 'react';
import {Reducer} from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {IClinicInputDTO} from "../interfaces/IClinic";
import useRemoteAuthServices from "../hooks/useRemoteAuthServices";

export interface IAuthState {
  token: string | null
  isLoading: boolean
  isSignout: boolean
  error: string | null
}

export interface IAuthContext {
  state: IAuthState;
  actions: {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    signUp: (inputDTO: IClinicInputDTO) => Promise<void>;
  }
}

export interface IAction {
  type: 'RESTORE_TOKEN' | 'SIGN_IN' | 'SIGN_OUT' | 'ACTION_FAILED'
  token?: string | null
  error?: string | null
}

export const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

interface Props {
  children: JSX.Element
}

const AuthContextProvider = ({children}: Props) => {
  const [state, dispatch] = React.useReducer<Reducer<IAuthState, IAction>>(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            token: action.token ?? null,
            isLoading: false,
            error: null
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            token: action.token ?? null,
            isSignout: false,
            error: null
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            token: null,
            isSignout: true,
            error: null
          };
        case 'ACTION_FAILED':
          return {
            ...prevState,
            error: action.error ?? null
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      token: null,
      error: null
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let token;

      try {
        token = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      token ? dispatch({type: 'RESTORE_TOKEN', token: token ?? undefined}) : dispatch({type: 'SIGN_OUT'})
    };

    bootstrapAsync().then();
  }, []);

  const authServices = useRemoteAuthServices();

  const actions = React.useMemo(
    () => ({
      signIn: async (email: string, password: string) => {
        try {
          const token = await authServices.signIn(email, password);
          dispatch({type: 'SIGN_IN', token});
        } catch (e) {
          dispatch({type: 'ACTION_FAILED', error: e.message});
        }
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async (inputDTO: IClinicInputDTO) => {
        try {
          const token = await authServices.signUp(inputDTO);
          dispatch({type: 'SIGN_IN', token});
        } catch (e) {
          dispatch({type: 'ACTION_FAILED', error: e.message});
        }
      },
    }),
    [dispatch]
  );


  return <AuthContext.Provider value={{state, actions}}>
    {children}
  </AuthContext.Provider>
}

export default AuthContextProvider
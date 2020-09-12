import * as React from 'react';
import {Reducer} from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {ClinicInputDTO} from "../interfaces/Clinic";

export interface IAuthState {
  token: string | null
  isLoading: boolean
  isSignout: boolean
}

export interface IAuthContext {
  state: IAuthState;
  actions: {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    signUp: (inputDTO: ClinicInputDTO) => Promise<void>;
  }
}

export interface IAction {
  type: 'RESTORE_TOKEN' | 'SIGN_IN' | 'SIGN_OUT'
  token?: string
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
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            token: action.token ?? null,
            isSignout: false,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            token: null,
            isSignout: true,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      token: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;

      try {
        token = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      token ? dispatch({type: 'RESTORE_TOKEN', token: token ?? undefined}) : dispatch({type: 'SIGN_OUT'})
    };

    bootstrapAsync().then();
  }, []);

  const actions = React.useMemo(
    () => ({
      signIn: async (data: any) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async (data: any) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    []
  );


  return <AuthContext.Provider value={{state, actions}}>
    {children}
  </AuthContext.Provider>
}

export default AuthContextProvider
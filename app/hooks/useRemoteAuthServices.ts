import Config from 'react-native-config';
import React from "react";
import axios from 'axios';
import {IClinicInputDTO} from "../interfaces/IClinic";

export default function useRemoteAuthServices() {
  return React.useMemo(
    () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost/api'
      });

      return {
        signIn: async (email: string, password: string): Promise<string|null> => {
          const response = await axiosInstance.post('auth/signin', {email, password});
          return response.data?.token
        },
        signUp: async (inputDTO: IClinicInputDTO) => {
          const response = await axiosInstance.post('auth/signup', inputDTO);
          return response.data?.token
        },
      }
    },
    [Config.APP_URL]
  )
}
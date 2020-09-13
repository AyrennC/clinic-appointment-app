import Config from 'react-native-config';
import React from "react";
import axios from 'axios';
import {IClinicInputDTO} from "../interfaces/IClinic";
import config from "../config";
import {getErrorFromAxiosError} from "../utils/axios";

export default function useRemoteAuthServices() {
  return React.useMemo(
    () => {
      const axiosInstance = axios.create({
        baseURL: config.API_HOST
      });

      return {
        signIn: async (email: string, password: string): Promise<string|null> => {
          try {
            const response = await axiosInstance.post('auth/signin', {email, password});
            return response.data?.token
          } catch (e) {
            throw getErrorFromAxiosError(e);
          }
        },
        signUp: async (inputDTO: IClinicInputDTO) => {
          try {
            const response = await axiosInstance.post('auth/signup', inputDTO);
            return response.data?.token
          } catch (e) {
            throw getErrorFromAxiosError(e);
          }
        },
      }
    },
    [Config.APP_URL]
  )
}
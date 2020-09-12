import Config from 'react-native-config';
import React from "react";
import axios from 'axios';
import {IConsultation, IConsultationInputDTO} from "../interfaces/IConsultation";
import env from "../env";

export default function useRemoteAgendaServices() {
  return React.useMemo(
    () => {
      const axiosInstance = axios.create({
        baseURL: env.API_HOST
      });

      return {
        createAgenda: async (token: string, inputDTO: IConsultationInputDTO): Promise<IConsultation | null> => {
          const response = await axiosInstance.post('consultation/create', inputDTO, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          return response.data?.consultation
        },
        fetchAgendas: async (token: string): Promise<IConsultation[]> => {
          const response = await axiosInstance.get('consultation/list', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          return response.data?.consultations
        },
      }
    },
    [Config.APP_URL]
  )
}
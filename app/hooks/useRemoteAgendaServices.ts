import Config from 'react-native-config';
import React from "react";
import axios from 'axios';
import {IConsultation, IConsultationInputDTO} from "../interfaces/IConsultation";
import config from "../config";
import * as R from 'ramda'
import {getErrorFromAxiosError} from "../utils/axios";

const parseAgenda =
  (agenda: IConsultationResponse): IConsultation =>
    ({
      ...agenda,
      date: new Date(agenda.date)
    })

interface IConsultationResponse extends Omit<IConsultation, 'date'> {
  date: string;
}

const isIConsultationResponse = (a: unknown): a is IConsultationResponse =>
  R.allPass([
    R.is(Object),
    ...R.map(R.propIs(Number), [
      'id',
      'fee',
    ]),
    ...R.map(R.propIs(String), [
      'doctor',
      'patient',
      'diagnosis',
      'medication',
      'date'
    ]),
  ])(a)

const isIConsultationResponseArray = (a: unknown): a is IConsultationResponse[] =>
  R.allPass([
    R.is(Array),
    R.all(isIConsultationResponse)
  ])(a)

export default function useRemoteAgendaServices() {
  return React.useMemo(
    () => {
      const axiosInstance = axios.create({
        baseURL: config.API_HOST
      });

      return {
        createAgenda: async (token: string, inputDTO: IConsultationInputDTO): Promise<IConsultation | null> => {
          try {
            const response = await axiosInstance.post('consultation/create', inputDTO, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            const {consultation} = response.data;
            return isIConsultationResponse(consultation) ? parseAgenda(consultation) : null;
          } catch (e) {
            throw getErrorFromAxiosError(e);
          }
        },

        attachFollowUp: async (token: string, id: string, followUpId: string): Promise<IConsultation | null> => {
          try {
            const response = await axiosInstance.post(`consultation/attach/${id}`, {
              followUpId: followUpId.toString()
            }, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            const {consultation} = response.data;
            return isIConsultationResponse(consultation) ? parseAgenda(consultation) : null;
          } catch (e) {
            throw getErrorFromAxiosError(e);
          }
        },

        fetchAgendas: async (token: string): Promise<IConsultation[]> => {
          try {
            const response = await axiosInstance.get('consultation/list', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            const {consultations} = response.data;
            console.log(consultations);
            return isIConsultationResponseArray(consultations) ? consultations.map(parseAgenda) : [];
          } catch (e) {
            throw getErrorFromAxiosError(e);
          }
        },
      }
    },
    [Config.APP_URL]
  )
}
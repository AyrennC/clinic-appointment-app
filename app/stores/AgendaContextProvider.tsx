import * as React from 'react';
import {Reducer} from "react";
import {IConsultation, IConsultationInputDTO} from "../interfaces/IConsultation";
import useRemoteAgendaServices from "../hooks/useRemoteAgendaServices";

export type IAgendaById = Record<string, IConsultation>;
export type IAgendaState = {
  error: string | null;
  byId: IAgendaById;
}
export type IAgendaComputedState = Record<string, IConsultation[]>;

export interface IAgendaContext {
  state: IAgendaState;
  actions: {
    createAgenda: (token: string, payload: IConsultationInputDTO) => Promise<boolean>;
    attachFollowUp: (token: string, id: string, payload: IConsultationInputDTO) => Promise<boolean>;
    fetchAgendas: (token: string) => Promise<boolean>;
  }
}

export interface IAction {
  type: 'UPDATE_AGENDAS' | 'ACTION_FAILED',
  payload: IConsultation[],
  error?: string | null
}

export const AgendaContext = React.createContext<IAgendaContext | undefined>(undefined);

interface Props {
  children: JSX.Element
}

const AgendaContextProvider = ({children}: Props) => {
  const [state, dispatch] = React.useReducer<Reducer<IAgendaState, IAction>>(
    (prevState, action) => {
      switch (action.type) {
        case 'UPDATE_AGENDAS':
          const byId = action.payload
            .reduce(
              (acc: IAgendaById, item: IConsultation) => {
                acc[item.id] = item;
                return acc;
              }, prevState.byId);
          return {
            ...prevState,
            error: null,
            byId,
          }
        case 'ACTION_FAILED':
          return {
            ...prevState,
            error: action.error ?? null
          }
      }
    },
    {
      byId: {},
      error: null
    }
  );


  const AgendaServices = useRemoteAgendaServices();

  const actions = React.useMemo(
    () => ({
      createAgenda: async (token: string, inputDTO: IConsultationInputDTO): Promise<boolean> => {
        try {
          const agenda = await AgendaServices.createAgenda(token, inputDTO);
          if (agenda) {
            dispatch({type: 'UPDATE_AGENDAS', payload: [agenda]});
          }
          return true;
        } catch (e) {
          dispatch({type: 'ACTION_FAILED', payload: [], error: e.message});
          return false;
        }
      },

      attachFollowUp: async (token: string, id: string, inputDTO: IConsultationInputDTO): Promise<boolean> => {
        try {
          const followUp = await AgendaServices.createAgenda(token, inputDTO);
          if (followUp) {
            dispatch({type: 'UPDATE_AGENDAS', payload: [followUp]});

            const agenda = await AgendaServices.attachFollowUp(token, id, followUp.id);
            if (agenda) {
              dispatch({type: 'UPDATE_AGENDAS', payload: [agenda]});
            }
          }
          return true;
        } catch (e) {
          dispatch({type: 'ACTION_FAILED', payload: [], error: e.message});
          return false;
        }
      },

      fetchAgendas: async (token: string): Promise<boolean> => {
        try {
          const agendas = await AgendaServices.fetchAgendas(token);
          dispatch({type: 'UPDATE_AGENDAS', payload: agendas});
          return true;
        } catch (e) {
          dispatch({type: 'ACTION_FAILED', payload: [], error: e.message});
          return false;
        }
      }
    }),
    [dispatch]
  );

  return <AgendaContext.Provider value={{state, actions}}>
    {children}
  </AgendaContext.Provider>
}

export default AgendaContextProvider
import * as React from 'react';
import {Reducer} from "react";
import {IConsultation, IConsultationInputDTO} from "../interfaces/IConsultation";
import useRemoteAgendaServices from "../hooks/useRemoteAgendaServices";
import moment from 'moment';

export type IAgendaState = Record<string, IConsultation>;
export type IAgendaComputedState = Record<string, IConsultation[]>;

export interface IAgendaContext {
  state: IAgendaState;
  computed: IAgendaComputedState;
  actions: {
    createAgenda: (token: string, payload: IConsultationInputDTO) => Promise<void>;
    fetchAgendas: (token: string) => Promise<void>;
  }
}

export interface IAction {
  type: 'HYDRATE_AGENDAS' | 'UPDATE_AGENDAS' | 'REFRESH_AGENDAS',
  payload: IConsultation[],
  timestamp?: number
}

export const AgendaContext = React.createContext<IAgendaContext | undefined>(undefined);

interface Props {
  children: JSX.Element
}

const timeToString = (time: Date|number) => moment(new Date(time))

const AgendaContextProvider = ({children}: Props) => {
  const [state, dispatch] = React.useReducer<Reducer<IAgendaState, IAction>>(
    (prevState, action) => {
      switch (action.type) {
        case 'UPDATE_AGENDAS':
          return action.payload
            .reduce(
              (acc: IAgendaState, item: IConsultation) => {
                acc[item.id] = item;
                return acc;
              }
              , {});
        default:
          return prevState;
      }
    },
    {}
  );

  const computed = React.useMemo(() => Object.values(state as IAgendaState)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .reduce(
        (acc: IAgendaComputedState, item: IConsultation) => {
          const dateStr = moment(item.date).format('YYYY-MM-DD')
          acc[dateStr] =
            acc[dateStr]
              ? [...acc[dateStr], item]
              : [item];
          return acc;
        }, {})
    , [state])

  const AgendaServices = useRemoteAgendaServices();

  const actions = React.useMemo(
    () => ({
      createAgenda: async (token: string, inputDTO: IConsultationInputDTO) => {
        const agenda = await AgendaServices.createAgenda(token, inputDTO);
        if (agenda) {
          dispatch({type: 'UPDATE_AGENDAS', payload: [agenda]});
        }
      },
      fetchAgendas: async (token: string) => {
        const agendas = await AgendaServices.fetchAgendas(token);
        dispatch({type: 'UPDATE_AGENDAS', payload: agendas});
      }
    }),
    [dispatch]
  );

  return <AgendaContext.Provider value={{state, computed, actions}}>
    {children}
  </AgendaContext.Provider>
}

export default AgendaContextProvider
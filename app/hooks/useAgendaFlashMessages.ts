import * as React from 'react';
import {showMessage} from "react-native-flash-message";
import {AgendaContext} from "../stores/AgendaContextProvider";

export default function useAgendaFlashMessages() {
  const agendaContext = React.useContext(AgendaContext);

  React.useEffect(() => {
    if (agendaContext && agendaContext.state.error) {
      const { error } = agendaContext.state;
      showMessage({
        message: error,
        type: "danger",
      });
    }
  }, [agendaContext])
}

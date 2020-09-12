import * as React from 'react';
import {AuthContext} from "../stores/AuthContextProvider";
import {showMessage} from "react-native-flash-message";

export default function useAuthFlashMessages() {
  const authContext = React.useContext(AuthContext);

  React.useEffect(() => {
    console.log(authContext);
    if (authContext && authContext.state.error) {
      const { error } = authContext.state;
      showMessage({
        message: error,
        type: "danger",
      });
    }
  }, [authContext])
}

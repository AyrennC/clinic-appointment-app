import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../types";
import {AuthContext} from "../stores/AuthContextProvider";
import StyledTextInput from "../components/StyledTextInput";
import {MontserratText} from "../components/StyledText";
import FormView from "../components/FormView";
import TouchableButton from "../components/TouchableButton";

type Props = StackScreenProps<RootStackParamList, 'SignIn'>;

export default function SignInScreen({navigation}: Props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const context = React.useContext(AuthContext)

  const onLogin = () => {
    context && context.actions.signIn(email, password);
  }

  return (
    <FormView>
      <>
        <MontserratText fontWeight="bold" style={styles.logo}>
          clinic.
        </MontserratText>
        <StyledTextInput name="email" type="material" onChangeText={setEmail}>
          Email
        </StyledTextInput>
        <StyledTextInput name="onepassword" type="material-community" onChangeText={setPassword} secureTextEntry>
          Password
        </StyledTextInput>
        <TouchableButton onPress={onLogin} label="LOGIN"/>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <MontserratText style={styles.backText}>Register an account</MontserratText>
        </TouchableOpacity>
      </>
    </FormView>
  );
}

const styles = StyleSheet.create({
  logo: {
    color: '#fb5b5a',
    fontSize: 38,
    marginBottom: 40
  },
  backText: {
    color: "white"
  }
});

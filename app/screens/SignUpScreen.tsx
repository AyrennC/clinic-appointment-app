import * as React from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import {Text, View} from '../components/Themed';
import {AuthContext} from "../stores/AuthContextProvider";
import FormView from "../components/FormView";
import {MontserratText} from "../components/StyledText";
import TouchableButton from "../components/TouchableButton";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../types";
import StyledTextInput from "../components/StyledTextInput";

type Props = StackScreenProps<RootStackParamList, 'SignUp'>;

export default function SignUpScreen({navigation}: Props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');

  const context = React.useContext(AuthContext)

  const onSignUp = () => {
    context && context.actions.signUp({
      name, email, password, phone, address
    });
  }


  return (
    <FormView>
      <>
        <MontserratText fontWeight="bold" style={styles.title}>Clinic Registration</MontserratText>
        <StyledTextInput name="clinic-medical" type="font-awesome-5" onChangeText={setName}>
          Clinic Name
        </StyledTextInput>
        <StyledTextInput name="email" type="material" onChangeText={setEmail}>
          Email
        </StyledTextInput>
        <StyledTextInput name="onepassword" type="material-community" onChangeText={setPassword} secureTextEntry>
          Password
        </StyledTextInput>
        <StyledTextInput name="cellphone" type="material-community" onChangeText={setPhone} keyboardType="number-pad">
          Phone
        </StyledTextInput>
        <StyledTextInput
          name="location"
          type="entypo"
          onChangeText={setAddress}
          height={120}
          multiline/>

        <TouchableButton onPress={onSignUp} label="REGISTER"/>

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <MontserratText style={styles.loginText}>Already have an account?</MontserratText>
        </TouchableOpacity>
      </>
    </FormView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    color: '#fb5b5a',
    width: '80%',
    borderBottomWidth: 4,
    borderBottomColor: '#fb5b5a',
    paddingBottom: 5,
    marginBottom: 40,
  },
  loginText: {
    color: "white",
  }
});

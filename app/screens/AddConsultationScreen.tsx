import * as React from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {Text, View} from '../components/Themed';
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../types";
import {AuthContext} from "../stores/AuthContextProvider";
import {AgendaContext} from "../stores/AgendaContextProvider";
import {IConsultationInputDTO} from "../interfaces/IConsultation";

type Props = StackScreenProps<RootStackParamList, 'SignIn'>;

export default function AddConsultationScreen({navigation}: Props) {
  const [doctor, setDoctor] = React.useState('');
  const [patient, setPatient] = React.useState('');
  const [diagnosis, setDiagnosis] = React.useState('');
  const [medication, setMedication] = React.useState('');
  const [fee, setFee] = React.useState<string>('0');
  const [date, setDate] = React.useState<Date>(new Date());
  const [show, showDate] = React.useState<boolean>(false);

  const toggleDatePicker = () => {
    showDate(!show)
  }

  const authContext = React.useContext(AuthContext)
  const agendaContext = React.useContext(AgendaContext)

  const onCreate = () => {
    if (authContext?.state.token && agendaContext) {
      const {token} = authContext.state;
      const {createAgenda} = agendaContext.actions;

      const inputDTO: IConsultationInputDTO = {
        doctor,
        patient,
        diagnosis,
        medication,
        fee: Number(fee),
        date
      }

      createAgenda(token, inputDTO).then();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Consultation</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Doctor..."
          placeholderTextColor="#003f5c"
          onChangeText={setDoctor}/>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Patient..."
          placeholderTextColor="#003f5c"
          onChangeText={setPatient}/>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Diagnosis..."
          placeholderTextColor="#003f5c"
          onChangeText={setDiagnosis}/>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Medication..."
          placeholderTextColor="#003f5c"
          onChangeText={setMedication}/>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Fee..."
          placeholderTextColor="#003f5c"
          keyboardType="number-pad"
          onChangeText={setFee}/>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputText} onPress={toggleDatePicker}>
          {date.toLocaleString()}
        </Text>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          display="default"
          onChange={(event, date) => {
            date && setDate(date);
            showDate(false);
          }}
        />
      )}
      <TouchableOpacity style={styles.loginBtn} onPress={onCreate}>
        <Text style={styles.loginText}>CREATE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  }
});

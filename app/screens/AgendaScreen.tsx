import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import ConsultationCard from "../components/ConsultationCard";
import {IConsultation} from "../interfaces/IConsultation";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../types";
import {AuthContext} from "../stores/AuthContextProvider";
import {AgendaContext} from "../stores/AgendaContextProvider";

type Props = StackScreenProps<RootStackParamList, 'SignIn'>;

export default function AgendaScreen({ navigation }: Props) {
  const authContext = React.useContext(AuthContext)
  const agendaContext = React.useContext(AgendaContext)

  const fetchAgendas = () => {
    if (authContext?.state.token && agendaContext)  {
      const { fetchAgendas } = agendaContext.actions;
      const { token } = authContext.state;
      fetchAgendas(token).then();
    }
  }

  const items: Record<string, IConsultation[]> = React.useMemo(() => {
    return agendaContext?.computed ?? {};
  }, [agendaContext])

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        renderItem={(item: IConsultation) => <ConsultationCard item={item}/>}
        rowHasChanged={(r1: IConsultation, r2: IConsultation) => r1.id !== r2.id}
        loadItemsForMonth={fetchAgendas}
      />
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('AddConsultation')
          }}
        >
          <Text style={styles.buttonText}>Add Consultation</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: '#74b9ff',
    padding: 18,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 22,
  }
});
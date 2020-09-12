import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda, DateObject} from 'react-native-calendars';
import ConsultationCard from "../components/ConsultationCard";
import {IConsultation} from "../interfaces/IConsultation";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../types";
import {AuthContext} from "../stores/AuthContextProvider";
import {AgendaContext, IAgendaComputedState} from "../stores/AgendaContextProvider";
import TouchableButton from "../components/TouchableButton";
import EmptyAgenda from "../components/EmptyAgenda";
import {Icon} from "react-native-elements";
import {MontserratText} from "../components/StyledText";
import moment from "moment";
import * as R from 'ramda';
import EmptyDate from "../components/EmptyDate";

type Props = StackScreenProps<RootStackParamList, 'SignIn'>;

const timeToString = (time: number) => moment(new Date(time)).format('YYYY-MM-DD')

export default function AgendaScreen({navigation}: Props) {
  const authContext = React.useContext(AuthContext)
  const agendaContext = React.useContext(AgendaContext)

  const fetchAgendas = () => {
    if (authContext?.state.token && agendaContext) {
      const {fetchAgendas} = agendaContext.actions;
      const {token} = authContext.state;
      fetchAgendas(token).then();
    }
  }

  React.useEffect(() => {
    fetchAgendas()
  }, [])

  const [hydratedItems, setHydratedItems] = React.useState<IAgendaComputedState>({})

  const hydrate = (date: DateObject) => {
    let emptyItems: IAgendaComputedState = {};
    for (let i = -15; i < 85; i++) {
      const time = date.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);
      emptyItems[strTime] = [];
    }
    setHydratedItems({
      ...hydratedItems,
      ...emptyItems
    })
  }

  const onLogout = () => {
    if (authContext) {
      const {signOut} = authContext.actions;
      signOut();
    }
  }

  const contextItems: Record<string, IConsultation[]> = React.useMemo(() => {
    return agendaContext?.computed ?? {};
  }, [agendaContext])

  const items: Record<string, IConsultation[]> = React.useMemo(() =>
      R.mergeDeepRight(hydratedItems, contextItems) as Record<string, IConsultation[]>,
    [contextItems, hydratedItems])

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        renderItem={(item: IConsultation) => <ConsultationCard item={item}/>}
        renderEmptyDate={() => <EmptyDate />}
        renderEmptyData={() => <EmptyAgenda/>}
        loadItemsForMonth={hydrate}
      />
      <View style={styles.btnView}>
        <TouchableButton label="ADD CONSULTATION" onPress={() => navigation.navigate('AddConsultation')} style={styles.addBtn}/>
        <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
          <Icon
            name="logout"
            type="simple-line-icon"
            size={18}
            style={styles.logoutIcon}
          />
          <MontserratText style={styles.logoutText}>Logout</MontserratText>
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
  btnView: {
    alignItems: 'center',
    paddingBottom: 12,
  },
  addBtn: {
    marginTop: 20
  },
  logoutBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
  },
  logoutText: {
    color: "black"
  },
  logoutIcon: {
    paddingRight: 6
  }
});
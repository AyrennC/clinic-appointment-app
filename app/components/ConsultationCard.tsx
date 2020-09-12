import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IConsultation} from "../interfaces/IConsultation";
import moment from "moment";
import {MontserratText} from "./StyledText";
import CardContent from "./CardContent";
import ExpandableText from "./ExpandableText";

export default function ConsultationCard({item}: { item: IConsultation }) {

  const timeStr = React.useMemo(() =>
      moment(item.date).format('hh:mm A')
    , [item]);

  const dateStr = React.useMemo(() =>
      moment(item.date).format('MMMM Do')
    , [item]);

  return (
    <View style={styles.item}>
      <View style={[styles.titleView, styles.view]}>
        <MontserratText fontWeight="medium" style={styles.titleText}>{timeStr}</MontserratText>
        <MontserratText style={styles.subtitleText}>{dateStr}</MontserratText>
      </View>
      <View style={[styles.subtitleView]}>
      </View>
      <View style={[styles.view]}>
        <CardContent title="Patient" content={item.patient} name="bed-patient" type="fontisto"/>
        <CardContent title="Doctor" content={item.doctor} name="doctor" type="material-community"/>
        <CardContent title="Fee" content={item.fee.toString()} name="attach-money" type="material"/>
        <ExpandableText title="Diagnosis">
          {item.diagnosis}
        </ExpandableText>
        <ExpandableText title="Medication">
          {item.medication}
        </ExpandableText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 8,
    marginRight: 10,
    marginTop: 17,
  },
  view: {
    paddingHorizontal: 18,
    paddingVertical: 8
  },
  titleView: {
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    backgroundColor: '#325D79',
  },
  titleText: {
    color: 'white',
    fontSize: 22,
  },
  subtitleView: {
    paddingHorizontal: 18,
    paddingVertical: 4,
    backgroundColor: '#9BD7D1',
  },
  subtitleText: {
    color: 'white',
    fontSize: 14
  },
});

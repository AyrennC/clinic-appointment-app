import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IConsultation} from "../interfaces/IConsultation";
import moment from "moment";
import {MontserratText, TitleText} from "./StyledText";
import CardContent from "./CardContent";
import ExpandableText from "./ExpandableText";
import {Icon} from "react-native-elements";

export interface ConsultationCardProps {
  item: IConsultation,
  onAttach: (item: IConsultation) => unknown;
}

export default function ConsultationCard({item, onAttach}: ConsultationCardProps) {

  const timeStr = React.useMemo(() =>
    moment(item.date).format('hh:mm A'), [item]);

  const dateStr = React.useMemo(() =>
    moment(item.date).format('MMMM Do'), [item]);

  const {followUp} = item;

  const followUpDateStr = React.useMemo(() =>
    item.followUp ?
      moment(item.followUp.date).format('MMMM Do hh:mm A') : null, [item]);

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
      {
        followUpDateStr ?
          (
            <View style={[styles.addView]}>
              <MontserratText style={styles.addText}>Follow Up</MontserratText>
              <MontserratText style={styles.text}>{followUpDateStr}</MontserratText>
            </View>
          ) : (
            <TouchableOpacity onPress={() => onAttach(item)} style={[styles.iconView, styles.addView]}>
              <MontserratText style={styles.addText}>Add Follow Up</MontserratText>
              <Icon
                name="plus-circle"
                type="font-awesome-5"
                size={18}
                style={styles.addIcon}
                color="#fb5a5a"
              />
            </TouchableOpacity>
          )
      }
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
  iconView: {
    paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  icon: {
    paddingLeft: 4,
    paddingRight: 8
  },
  text: {
    fontSize: 13,
  },
  addView: {
    backgroundColor: '#fffafa',
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
  },
  addIcon: {
    paddingLeft: 8
  },
  addText: {
    color: '#fb5a5a',
    fontSize: 16
  }
});

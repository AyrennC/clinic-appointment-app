import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from './Themed';
import {IConsultation} from "../interfaces/IConsultation";
import {Icon} from 'react-native-elements'

export default function EditScreenInfo({item}: { item: IConsultation }) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => Alert.alert(item.doctor)}
    >
      <Text>Doctor: {item.diagnosis}</Text>
      <Text>Patient: {item.diagnosis}</Text>
      <Text>Diagnosis: {item.diagnosis}</Text>
      <Text>Medication: {item.diagnosis}</Text>
      <Text>Fee: {item.diagnosis}</Text>
      <Text>Date: {item.date.toISOString().replace(/T/, ' ').replace(/\..+/, '')}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  titleView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  icon: {
    paddingLeft: 4,
    paddingRight: 4
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});

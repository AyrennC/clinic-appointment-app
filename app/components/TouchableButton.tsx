import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import {Text} from './Themed';
import {IConsultation} from "../interfaces/IConsultation";
import {Icon} from 'react-native-elements'
import {MontserratText} from "./StyledText";

export interface ButtonProps extends TouchableOpacityProps {
  label?: string;
  children?: JSX.Element
}

export default function TouchableButton({label, children, ...others}: ButtonProps) {
  return (
    <TouchableOpacity  {...others} style={[styles.btn, others.style]}>
      {children ?
        children :
        <MontserratText style={styles.text}>{label}</MontserratText>
      }
    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  btn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  text: {
    color: "white",
    fontSize: 18
  }
});

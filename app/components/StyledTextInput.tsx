import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {Icon} from 'react-native-elements'
import {IconProps} from "react-native-elements";

export interface StyledTextInputProps extends Pick<IconProps, 'name' | 'type' | 'color'>, TextInputProps {
  children?: string,
  height?: number,
}

export default function StyledTextInput(props: StyledTextInputProps) {
  const {children, name, type, color = '#242424', height = 50, ...others} = props;

  return (
    <View style={[styles.container, { height }]}>
      <Icon
        style={styles.icon}
        size={22}
        name={name}
        type={type}
        color={color}
      />
      <TextInput
        style={[styles.inputText, { height }]}
        placeholder={children}
        placeholderTextColor={color}
        {...others}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    marginBottom: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    paddingRight: 16
  },
  inputText: {
    color: "white",
    fontFamily: "Montserrat_500Medium"
  },
});

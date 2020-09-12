import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {Icon} from 'react-native-elements'
import {IconProps} from "react-native-elements";
import {MontserratText} from "./StyledText";

export interface StyledTextInputProps extends Pick<IconProps, 'name' | 'type' | 'color'>, TextInputProps {
  children: string,
  height?: number,
  width?: string,
  backgroundColor?: string,
  labelColor?: string,
  showLabel?: boolean
}

export default function StyledTextInput(props: StyledTextInputProps) {
  const {
    children,
    name,
    type,
    backgroundColor = '#465881',
    color = 'white',
    height = 50,
    width = '80%',
    showLabel,
    labelColor = '#242424',
    ...others
  } = props;

  return (
    <View style={[styles.container, {width}]}>
      {
        showLabel && children &&
        <View style={styles.labelView}>
          <Icon
            style={styles.icon}
            size={22}
            name={name}
            type={type}
            color={labelColor ?? color}
          />
          <MontserratText fontWeight="medium" style={[styles.label, {color: labelColor ?? color}]}>
            {children}
          </MontserratText>
        </View>
      }
      <View style={[styles.inputView, {height, backgroundColor, }]}>
        {
          showLabel ||
          <Icon
            style={styles.icon}
            size={22}
            name={name}
            type={type}
            color={labelColor}
          />
        }
        <TextInput
          style={[styles.inputText, {color, height: others.multiline ? height * .8 : height}]}
          placeholder={showLabel ? undefined : children}
          placeholderTextColor={labelColor}
          {...others}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  inputView: {
    borderRadius: 25,
    marginBottom: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  label: {
    fontSize: 16,
  },
  labelView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  icon: {
    paddingRight: 16
  },
  inputText: {
    fontFamily: "Montserrat_500Medium",
    width: "100%"
  },
});

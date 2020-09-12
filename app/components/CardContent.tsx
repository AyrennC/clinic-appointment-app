import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from './Themed';
import {IConsultation} from "../interfaces/IConsultation";
import {Icon} from 'react-native-elements'
import moment from "moment";
import {MontserratText, TitleText} from "./StyledText";
import {IconProps} from "react-native-elements";

export interface CardContentProps extends IconProps {
  title: string;
  content: string;
}

export default function CardContent(props: CardContentProps) {
  const {title, content, ...others} = props;

  return (
    <View style={styles.container}>
      <TitleText>
        {title}
      </TitleText>
      <View style={styles.iconView}>
        <Icon
          style={styles.icon}
          size={16}
          {...others} />
        <MontserratText style={styles.text}>{content}</MontserratText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2
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
  }
});

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, TextProps} from './Themed';
import {Icon} from "react-native-elements";
import {MontserratText, TitleText} from "./StyledText";

export interface ExpandableTextProps extends TextProps {
  title: string;
}


export default function ExpandableText(props: ExpandableTextProps) {
  const {title, numberOfLines = 2, ...others} = props;

  const [show, showText] = React.useState<boolean>(false);

  const currentNumberOfLines = React.useMemo(() => show ? undefined : numberOfLines, [show, numberOfLines])

  const iconName = React.useMemo(() => show ? "expand-more" : "expand-less", [show]);

  const toggleCollapse = () => {
    showText(!show);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.title} onPress={toggleCollapse}>
        <TitleText>
          {title}
        </TitleText>
        <Icon
          size={24}
          name={iconName}
          type="material"
          color="#F26627"/>
      </TouchableOpacity>
      <MontserratText numberOfLines={currentNumberOfLines} ellipsizeMode="tail" style={styles.text} {...others}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 2,
  },
  text: {
    paddingLeft: 2,
    paddingTop: 2,
    fontSize: 14,
    lineHeight: 20
  }
});

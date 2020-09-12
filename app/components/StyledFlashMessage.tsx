import * as React from 'react';
import {StyleSheet} from 'react-native';
import FlashMessage from "react-native-flash-message";

export default function StyledFlashMessage() {
  return (
    <FlashMessage
      position="bottom"
      duration={5000}
      style={styles.container}
      titleStyle={styles.title}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "Montserrat_400Regular",
  },
  title: {
    fontSize: 16
  }
});

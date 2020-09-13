import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MontserratText} from "./StyledText";

export default function EmptyDate() {
  return (
    <View style={styles.container}>
      <MontserratText style={styles.title}>
        No consultation
      </MontserratText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6efef',
    flex: 1,
    borderRadius: 8,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#fcb0b0',
    fontSize: 24
  }
});

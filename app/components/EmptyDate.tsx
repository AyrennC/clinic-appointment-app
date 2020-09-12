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
    backgroundColor: '#efe0e0',
    flex: 1,
    borderRadius: 8,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textView: {
    width: "80%",
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    color: '#ff8888',
    fontSize: 24
  }
});

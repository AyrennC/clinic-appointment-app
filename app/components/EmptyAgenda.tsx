import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MontserratText} from "./StyledText";

export default function EmptyAgenda() {
  return (
    <View style={styles.container}>
      <View style={styles.textView}>
        <MontserratText style={styles.title}>
          There doesn't seem to be anything here yet.
        </MontserratText>
        <MontserratText style={styles.subtitle}>
          Add a consultation to by pressing the button below.
        </MontserratText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {
    width: "80%",
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff3f5',
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
  },
  subtitle: {
    color: '#ffabb1',
    fontSize: 20
  }
});

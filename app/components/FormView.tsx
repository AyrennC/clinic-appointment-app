import * as React from 'react';
import {StyleSheet} from 'react-native';
import {View} from "./Themed";

export default function FormView({children}: {children: JSX.Element}) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Header from '../components/molecules/Header';

export default function DetailsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Details Screen" />
      <View style={styles.content}>
        <Text style={styles.text}>Details Screen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

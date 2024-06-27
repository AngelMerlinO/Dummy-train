// myApp\src\screens\StatisticsScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Picker } from 'react-native';
import chart1 from '../assets/Chart1.png';
import chart2 from '../assets/Chart2.png';

export default function StatisticsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Resumen semanal</Text>
      </View>
      <View style={styles.pickerContainer}>
        <Picker style={styles.picker}>
          <Picker.Item label="Press militar" value="press_militar" />
        </Picker>
      </View>
      <View style={styles.chartContainer}>
        <Image source={chart1} style={styles.chart1} />
        <Image source={chart2} style={styles.chart2} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    color: 'white',
  },
  pickerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  picker: {
    height: 50,
    width: 200,
    color: 'white',
    backgroundColor: '#333',
  },
  chartContainer: {
    flex: 1,
    alignItems: 'center',
  },
  chart1: {
    width: 200,
    height: 100,
    marginVertical: 20,
  },
  chart2: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
});

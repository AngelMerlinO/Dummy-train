// myApp\src\screens\StatisticsScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import chart1 from '../assets/Chart1.png';
import chart2 from '../assets/Chart2.png';

export default function StatisticsScreen() {
  const [selectedValue, setSelectedValue] = React.useState("press_militar");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Resumen semanal</Text>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Press militar" value="press_militar" />
        </Picker>
      </View>
      <View style={styles.chartContainer}>
        <Image source={chart1} style={styles.chart1} resizeMode="contain" />
        <Image source={chart2} style={styles.chart2} resizeMode="contain" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242323', // Similar al fondo en la imagen proporcionada
  },
  header: {
    marginTop: 30,
    marginLeft: 80,
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'left',
  },
  pickerContainer: {
    alignItems: 'flex-start',
    marginVertical: 20,
    marginLeft: 20,
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
    flex: 1,
    width: '90%',
    marginVertical: 20,
  },
  chart2: {
    flex: 2,
    width: '90%',
    marginVertical: 20,
  },
});

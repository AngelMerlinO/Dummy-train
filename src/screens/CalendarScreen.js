// myApp/src/screens/CalendarScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateMatrix = () => {
    const matrix = [];
    const daysInMonth = getDaysInMonth(selectedDate.getMonth(), selectedDate.getFullYear());
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

    let counter = 1;
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          row.push('');
        } else if (counter > daysInMonth) {
          row.push('');
        } else {
          row.push(counter);
          counter++;
        }
      }
      matrix.push(row);
    }
    return matrix;
  };

  const matrix = generateMatrix();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Calendario de actividades</Text>
        <View style={styles.calendar}>
          <View style={styles.week}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <Text key={index} style={styles.dayHeader}>{day}</Text>
            ))}
          </View>
          {matrix.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.week}>
              {row.map((day, colIndex) => (
                <TouchableOpacity
                  key={colIndex}
                  style={styles.day}
                  onPress={() => day && setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
                >
                  <Text style={[styles.dayText, selectedDate.getDate() === day ? styles.selectedDayText : null]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
  },
  content: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
    color: 'white',  // Color del texto del título
  },
  calendar: {
    width: '100%',
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayHeader: {
    flex: 1,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
    fontWeight: 'bold',
    color: 'white',  // Color del texto de los días de la semana
  },
  day: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    color: 'white',  // Color del texto de los días del mes
  },
  selectedDayText: {
    backgroundColor: '#FC8760',
    color: 'white',
    borderRadius: 20,
    width: 36,
    height: 36,
    textAlign: 'center',
    lineHeight: 36,
  },
});

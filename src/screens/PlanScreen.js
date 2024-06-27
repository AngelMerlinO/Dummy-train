// myApp\src\screens\PlanScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

const exercises = [
  { name: 'Press militar', sets: 10, reps: 8, weight: 15 },
  { name: 'Press banca', sets: 10, reps: 8, weight: 15 },
  { name: 'Press inclinado', sets: 10, reps: 8, weight: 15 },
  { name: 'Mancuernas contra el pecho', sets: 10, reps: 8, weight: 15 },
  { name: 'Press de banca con agarre cerrado', sets: 10, reps: 8, weight: 15 }
];

export default function PlanScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newExercise, setNewExercise] = useState({ name: '', sets: '', reps: '', weight: '' });

  const handleAddExercise = () => {
    // Aquí puedes agregar lógica para añadir el nuevo ejercicio a la lista
    console.log(newExercise);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.breadcrumb}>Pecho &gt; Ejercicios</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Ejercicios</Text>
        {exercises.map((exercise, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{exercise.name}</Text>
              <View style={styles.cardDetails}>
                <Text style={styles.detailText}>S</Text>
                <Text style={styles.detailText}>{exercise.sets}</Text>
                <Text style={styles.detailText}>RP</Text>
                <Text style={styles.detailText}>{exercise.reps}</Text>
                <Text style={styles.detailText}>Kg</Text>
                <Text style={styles.detailText}>{exercise.weight}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Press militar</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>kg</Text>
                <TextInput
                  style={styles.input}
                  placeholder=""
                  placeholderTextColor="#ccc"
                  keyboardType="numeric"
                  onChangeText={(text) => setNewExercise({ ...newExercise, weight: text })}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Repeticiones</Text>
                <TextInput
                  style={styles.input}
                  placeholder=""
                  placeholderTextColor="#ccc"
                  keyboardType="numeric"
                  onChangeText={(text) => setNewExercise({ ...newExercise, reps: text })}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Serie</Text>
                <TextInput
                  style={styles.input}
                  placeholder=""
                  placeholderTextColor="#ccc"
                  keyboardType="numeric"
                  onChangeText={(text) => setNewExercise({ ...newExercise, sets: text })}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddExercise}
            >
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breadcrumb: {
    fontSize: 14,
    color: '#aaa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#d9534f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
  },
  cardContent: {
    flexDirection: 'column',
  },
  cardTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: {
    fontSize: 16,
    color: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 300,
    margin: 20,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  inputGroup: {
    alignItems: 'center',
  },
  inputLabel: {
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    width: 60,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    color: '#fff',
    textAlign: 'center',
    padding: 5,
  },
  saveButton: {
    backgroundColor: '#FC8760',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

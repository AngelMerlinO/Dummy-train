import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';

const exercises = [
  { name: 'Press militar', sets: 10, reps: 8, weight: 15 },
  { name: 'Press banca', sets: 10, reps: 8, weight: 15 },
  { name: 'Press inclinado', sets: 10, reps: 8, weight: 15 },
  { name: 'Mancuernas contra el pecho', sets: 10, reps: 8, weight: 15 },
  { name: 'Press de banca con agarre cerrado', sets: 10, reps: 8, weight: 15 }
];

export default function PlanScreen() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newExercise, setNewExercise] = useState('');
  const [selectedExercise, setSelectedExercise] = useState({ name: '', sets: '', reps: '', weight: '' });

  const handleAddExercise = () => {
    exercises.push({ name: newExercise, sets: '', reps: '', weight: '' });
    setNewExercise('');
    setAddModalVisible(false);
  };

  const handleEditExercise = () => {
    // Aquí puedes agregar lógica para editar el ejercicio seleccionado
    console.log(selectedExercise);
    setEditModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.breadcrumb}>Pecho &gt; Ejercicios</Text>
          <TouchableOpacity onPress={() => setAddModalVisible(true)}>
            <View style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Ejercicios</Text>
        {exercises.map((exercise, index) => (
          <TouchableOpacity key={index} onPress={() => { setSelectedExercise(exercise); setEditModalVisible(true); }}>
            <View style={styles.card}>
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
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => {
          setAddModalVisible(!addModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setAddModalVisible(!addModalVisible)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nuevo Ejercicio</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="#999"
              value={newExercise}
              onChangeText={(text) => setNewExercise(text)}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddExercise}
            >
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => {
          setEditModalVisible(!editModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setEditModalVisible(!editModalVisible)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedExercise.name}</Text>
            <TextInput
              style={styles.input}
              placeholder="Kg"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={selectedExercise.weight.toString()}
              onChangeText={(text) => setSelectedExercise({ ...selectedExercise, weight: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Repeticiones"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={selectedExercise.reps.toString()}
              onChangeText={(text) => setSelectedExercise({ ...selectedExercise, reps: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Series"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={selectedExercise.sets.toString()}
              onChangeText={(text) => setSelectedExercise({ ...selectedExercise, sets: text })}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleEditExercise}
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
    backgroundColor: '#A0522D', // Color de fondo del botón de añadir similar al de la imagen
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: 'white', // Color del texto del botón de añadir
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscurecido
  },
  modalView: {
    width: '80%',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
  },
  closeButtonText: {
    fontSize: 15,
    color: 'white',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    backgroundColor: '#555',
    borderRadius: 5,
    padding: 10,
    color: 'white',
    marginVertical: 5,
  },
  saveButton: {
    backgroundColor: '#FF7F50',
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
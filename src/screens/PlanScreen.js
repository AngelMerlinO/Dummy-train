import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';

export default function PlanScreen({ route }) {
  const { routineId } = route.params || {};
  if (!routineId) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text>Error: routineId no encontrado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [newExercise, setNewExercise] = useState('');
  const [selectedExercise, setSelectedExercise] = useState({ id: '', name: '', sets: '', reps: '', weight: '' });
  const [newRegister, setNewRegister] = useState({ kilogram: '', repetitions: '', series: '' });
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetchExercises();
  }, [routineId]);

  const fetchExercises = async () => {
    try {
      const response = await fetch(`http://98.80.41.243:5005/rutine/${routineId}/exercises`);
      if (!response.ok) throw new Error('Error fetching exercises');
      const data = await response.json();
      const updatedExercises = await Promise.all(data.map(async (exercise) => {
        try {
          const registersResponse = await fetch(`http://98.80.41.243:5005/exercise/${exercise.id}/registers`);
          if (!registersResponse.ok) throw new Error('Error fetching registers');
          const registersData = await registersResponse.json();
          const lastRegister = registersData[registersData.length - 1] || {};
          return {
            ...exercise,
            sets: lastRegister.series || 0,
            reps: lastRegister.repetitions || 0,
            weight: lastRegister.kilogram || 0
          };
        } catch (error) {
          console.error(error);
          return { ...exercise, sets: 0, reps: 0, weight: 0 };
        }
      }));
      setExercises(updatedExercises);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddExercise = async () => {
    if (!newExercise.trim()) {
      Alert.alert('Error', 'El nombre del ejercicio no puede estar vacío');
      return;
    }

    try {
      const response = await fetch('http://98.80.41.243:5005/exercise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newExercise, rutine_id: routineId }),
      });

      if (response.ok) {
        const addedExercise = await response.json();
        setExercises((prevExercises) => [...prevExercises, addedExercise]);
        setAddModalVisible(false);
        setNewExercise('');
      } else {
        Alert.alert('Error', 'No se pudo agregar el ejercicio');
      }
    } catch (error) {
      console.error('Error adding exercise:', error);
      Alert.alert('Error', 'No se pudo agregar el ejercicio');
    }
  };

  const handleEditExercise = async () => {
    if (!selectedExercise.name.trim()) {
      Alert.alert('Error', 'El nombre del ejercicio no puede estar vacío');
      return;
    }

    try {
      const response = await fetch(`http://98.80.41.243:5005/exercise/${selectedExercise.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: selectedExercise.name }),
      });

      if (response.ok) {
        const updatedExercises = exercises.map(exercise =>
          exercise.id === selectedExercise.id ? selectedExercise : exercise
        );
        setExercises(updatedExercises);
        setEditModalVisible(false);
      } else {
        Alert.alert('Error', 'No se pudo actualizar el ejercicio');
      }
    } catch (error) {
      console.error('Error updating exercise:', error);
      Alert.alert('Error', 'No se pudo actualizar el ejercicio');
    }
  };

  const handleAddRegister = async () => {
    if (!newRegister.kilogram || !newRegister.repetitions || !newRegister.series) {
      Alert.alert('Error', 'Todos los campos deben estar completos');
      return;
    }

    try {
      const response = await fetch('http://98.80.41.243:5005/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newRegister, exercise_id: selectedExercise.id }),
      });

      if (response.ok) {
        fetchExercises();  // Refrescar los ejercicios para mostrar el nuevo registro
        setRegisterModalVisible(false);
        setNewRegister({ kilogram: '', repetitions: '', series: '' });
      } else {
        Alert.alert('Error', 'No se pudo agregar el registro');
      }
    } catch (error) {
      console.error('Error adding register:', error);
      Alert.alert('Error', 'No se pudo agregar el registro');
    }
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
          <TouchableOpacity
            key={index}
            onPress={() => { setSelectedExercise(exercise); setRegisterModalVisible(true); }}
            onLongPress={() => { setSelectedExercise(exercise); setEditModalVisible(true); }}
          >
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
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setAddModalVisible(false)}
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
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Editar Ejercicio</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="#999"
              value={selectedExercise.name}
              onChangeText={(text) => setSelectedExercise({ ...selectedExercise, name: text })}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={registerModalVisible}
        onRequestClose={() => setRegisterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setRegisterModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Agregar Registro</Text>
            <TextInput
              style={styles.input}
              placeholder="Kilogramos"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={newRegister.kilogram}
              onChangeText={(text) => setNewRegister({ ...newRegister, kilogram: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Repeticiones"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={newRegister.repetitions}
              onChangeText={(text) => setNewRegister({ ...newRegister, repetitions: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Series"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={newRegister.series}
              onChangeText={(text) => setNewRegister({ ...newRegister, series: text })}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddRegister}
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
    backgroundColor: '#A0522D',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: 'white',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

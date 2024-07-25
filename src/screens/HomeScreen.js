import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Modal, TextInput, FlatList, Dimensions, Alert } from 'react-native';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [routines, setRoutines] = useState([]);
  const [routineName, setRoutineName] = useState('');

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await fetch('http://98.80.41.243:5005/rutines');
        const data = await response.json();
        setRoutines(data);
      } catch (error) {
        console.error('Error fetching routines:', error);
      }
    };

    fetchRoutines();
  }, []);

  const handleSave = async () => {
    if (!routineName.trim()) {
      Alert.alert('Error', 'El nombre de la rutina no puede estar vacío');
      return;
    }

    try {
      const response = await fetch('http://98.80.41.243:5005/rutine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: routineName }),
      });

      if (response.ok) {
        const newRoutine = await response.json();
        setRoutines((prevRoutines) => [...prevRoutines, newRoutine]);
        setModalVisible(false);
        setRoutineName('');
      } else {
        Alert.alert('Error', 'No se pudo guardar la rutina');
      }
    } catch (error) {
      console.error('Error saving routine:', error);
      Alert.alert('Error', 'No se pudo guardar la rutina');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://98.80.41.243:5005/rutine/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setRoutines((prevRoutines) => prevRoutines.filter((routine) => routine.id !== id));
      } else {
        Alert.alert('Error', 'No se pudo eliminar la rutina');
      }
    } catch (error) {
      console.error('Error deleting routine:', error);
      Alert.alert('Error', 'No se pudo eliminar la rutina');
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Eliminar rutina',
      '¿Estás seguro de que deseas eliminar esta rutina?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => handleDelete(id) },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Entrenamiento</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <FlatList
          data={routines}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Plan', { routineId: item.id })}
              onLongPress={() => confirmDelete(item.id)}
            >
              <Text style={styles.buttonText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.flatListContent}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nuevo entrenamiento</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="#999"
              keyboardType="default"
              value={routineName}
              onChangeText={setRoutineName}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
    backgroundColor: '#202020',
    paddingTop: Constants.statusBarHeight,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  flatListContent: {
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#FF7F50',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginVertical: 10,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
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

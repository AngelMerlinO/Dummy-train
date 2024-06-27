import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import Constants from 'expo-constants';

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Entrenamiento</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Plan')}>
          <Text style={styles.buttonText}>Empuje</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Plan')}>
          <Text style={styles.buttonText}>Jalón</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Plan')}>
          <Text style={styles.buttonText}>Pierna</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Plan')}>
          <Text style={styles.buttonText}>Cara</Text>
        </TouchableOpacity>
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
            <Text style={styles.modalTitle}>Nuevo ejercicio</Text>
            <TextInput style={styles.input} placeholder="Nombre" placeholderTextColor="#999" keyboardType="default" />
            <TouchableOpacity style={styles.saveButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.saveButtonText}>guardar</Text>
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
    backgroundColor: '#202020', // Color de fondo similar al de la imagen
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
    color: 'white', // Color del texto del encabezado
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FF7F50', // Color de fondo de los botones similar al de la imagen
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'black', // Color del texto de los botones
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

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import imgRegister from '../assets/image2.png';

export default function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={imgRegister} style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Primer apellido"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Segundo apellido"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#999"
            secureTextEntry
          />
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 25,
    padding: 15,
    color: 'white',
    marginVertical: 10,
  },
  registerButton: {
    backgroundColor: '#FF7F50',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
import React from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import imgLogin from 'assets/image4.png';
export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={imgLogin} style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <View style={styles.inputContainer}>
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
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
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
  loginButton: {
    backgroundColor: '#FF7F50',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#ccc',
    marginTop: 20,
  },
});
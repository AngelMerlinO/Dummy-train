// src/components/atoms/HeaderHome.js
import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';

const HeaderHome = ({ name }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hola, {name}</Text>
          <View style={styles.profileContainer}>
            <Image source={{ uri: 'https://example.com/profile-pic.png' }} style={styles.profilePic} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    // backgroundColor: '#333', // Fondo general de la app
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Ajuste para Android
  },
  headerContainer: {
    backgroundColor: '#1c1c1e',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileContainer: {
    backgroundColor: '#2c2c2e',
    borderRadius: 25,
    padding: 2,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  subText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
});

export default HeaderHome;

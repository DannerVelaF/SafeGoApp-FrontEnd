import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';

const WelcomeScreen = ({ onCategoryPress, onStartPress, setCurrentScreen }) => {
  const welcome = require("../assets/welcome.png");
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <FontAwesome
          name="arrow-circle-left"
          size={30}
          color="black"
          onPress={() => {
            router.push("/home");
          }}
        />
        <Text style={styles.headerTitle}>Safe<Text style={styles.headerTitleGO}>GO</Text></Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.categoryContainer}>
          <TouchableOpacity style={[styles.categoryButton, { backgroundColor: 'black' }]} >
            <Text style={styles.categoryButtonText}>Modalidades Robo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryButton, { backgroundColor: '#3E6259' }]}>
            <Text style={styles.categoryButtonText}>Salud y Emergencias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryButton, { backgroundColor: '#34D399' }]}>
            <Text style={[styles.categoryButtonText, { color: 'black' }]}>Acoso y Violencia </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryButton, { backgroundColor: '#EF4444' }]} >
            <Text style={styles.categoryButtonText}>Desastres naturales</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={welcome}
          style={styles.mascot}
        />
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '25%' }]} />
          </View>
          <Text style={styles.progressText}> 1/4 Niveles </Text>
        </View>
        <View style={styles.ButtonContainer}>
      <TouchableOpacity style={styles.startButton} onPress={() => setCurrentScreen('categories')} >
        <Text style={styles.startButtonText} >Comenzar el juego</Text>
      </TouchableOpacity>
      </View>
      <View style={ styles.footerContainer } >
     <View style={styles.footerContainerCenter}>
      <TouchableOpacity>
      <Entypo name="home" size={30} color="white"  />
      </TouchableOpacity>
      <TouchableOpacity>
      <Entypo name="trophy" size={30} color="white" />
      </TouchableOpacity>
      </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footerContainerCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor:'#00120B'
  },
  footerContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    backgroundColor:'#00120B'
  },
  ButtonContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 900,
  },

  headerTitleGO:{
    color: '#31E981',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 4,
  },
  categoryButtonText: {
    color: 'white',
    fontSize: 14,
  },
  mascot: {
    width: 400,
    height: 400,
    marginVertical: 20,
    objectFit: 'contain',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  progressBar: {
    width: 120,
    height: 15,
    borderRadius: 20,
    borderWidth: 1,
  },
  progressFill: {
    height: '80%',
    backgroundColor: '#000',
    borderRadius: 20,
    marginHorizontal: 1,
    marginVertical: 1,
  },
  progressText: {
    marginBottom: 8,
    fontSize: 15,
    color: '#000',
  },
  startButton: {
    width: '50%',
    backgroundColor: '#00E13C',
    margin: 16,
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
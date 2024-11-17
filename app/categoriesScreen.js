import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CategoriesScreen = ({ setCurrentScreen, setSelectedCategory }) => {
  const categories = [
    { id: 'robbery', title: 'Modalidades de Robo', color: '#000000' },
    { id: 'health', title: 'Salud y Emergencias', color: '#3E6259' },
    { id: 'harassment', title: 'Acoso y Violencia ', color: '#34D399' },
    { id: 'disasters', title: 'Desastres Naturales', color: '#EF4444' },
  ];

  const backgroundCategories = require("../assets/backgroundCategories.png");

  const handleCategoryPress = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentScreen('question');
  };

  return (
    <ImageBackground source={backgroundCategories} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('welcome')}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.centerContainer}>
          <Text style={styles.safeGoText}>Safe<Text style={styles.safeGoTextGO}>GO</Text></Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>Elige una categoría</Text>
          <View style={styles.gridContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.gridItem, { backgroundColor: category.color }, styles.shadow]}
                onPress={() => handleCategoryPress(category.id)}
              >
                <Text style={[styles.gridItemText, { color: category.color === '#34D399' ? '#000' : '#FFF' }]}>
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#00120B',
  },
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeGoText: {
    fontSize: 60,
    fontWeight: '900',
    color: '#FFF',
  },
  safeGoTextGO: {
    color: '#31E981',
  },
  bottomContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  gridItem: {
    width: (width - 56) / 2,
    height: (width - 240) / 2,
    padding: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItemText: {
    fontSize: 14,
    textAlign: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default CategoriesScreen;
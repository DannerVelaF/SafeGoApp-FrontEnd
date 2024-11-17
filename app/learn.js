import React, { useState } from 'react';
import { SafeAreaView, Dimensions } from 'react-native';
import WelcomeScreen from './welcomeScreen';
import CategoriesScreen from './categoriesScreen';
import QuestionScreen from './questionScreen';


const { width } = Dimensions.get('window');


export default function Learn() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [progress, setProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const screens = {
    welcome: <WelcomeScreen setCurrentScreen={setCurrentScreen} />,
    categories: <CategoriesScreen setCurrentScreen={setCurrentScreen} setSelectedCategory={setSelectedCategory} />,
    question: <QuestionScreen setCurrentScreen={setCurrentScreen} progress={progress} setProgress={setProgress} category={selectedCategory} />,
  };

  return screens[currentScreen];
}
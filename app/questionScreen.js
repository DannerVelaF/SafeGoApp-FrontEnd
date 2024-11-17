import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ProgressBar = ({ value }) => {
  return (
    <View style={localStyles.progressContainer}>
      <View style={[localStyles.progressBar, { width: `${value}%` }]} />
    </View>
  );
};

const QuestionScreen = ({ setCurrentScreen, progress, setProgress, category }) => {
  
  const questionsByCategory = {
    robbery: [
      { text: "¿Qué deberías hacer si alguien intenta robarte en la calle?", options: [{ text: "Resistirte", correct: false }, { text: "Entregar tus pertenencias", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Cuál es la mejor manera de proteger tus pertenencias en lugares públicos?", options: [{ text: "Llevarlas en la mano", correct: false }, { text: "Guardarlas en bolsillos internos", correct: true }, { text: "Dejarlas en la mesa", correct: false }, { text: "No llevar nada", correct: false }] },
      { text: "¿Qué deberías hacer si ves a alguien robando en una tienda?", options: [{ text: "Enfrentarlo", correct: false }, { text: "Llamar a la policía", correct: true }, { text: "Ignorarlo", correct: false }, { text: "Gritar", correct: false }] },
      { text: "¿Cuál es la mejor manera de evitar robos en tu casa?", options: [{ text: "Dejar las puertas abiertas", correct: false }, { text: "Instalar cámaras de seguridad", correct: true }, { text: "No hacer nada", correct: false }, { text: "Dejar las luces apagadas", correct: false }] },
      { text: "¿Qué deberías hacer si alguien intenta robar tu coche?", options: [{ text: "Resistirte", correct: false }, { text: "Entregar las llaves", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Cuál es la mejor manera de proteger tu coche de robos?", options: [{ text: "Dejarlo abierto", correct: false }, { text: "Instalar una alarma", correct: true }, { text: "No hacer nada", correct: false }, { text: "Dejar las llaves dentro", correct: false }] },
      { text: "¿Qué deberías hacer si alguien intenta robar tu bolso?", options: [{ text: "Resistirte", correct: false }, { text: "Entregar el bolso", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Cuál es la mejor manera de proteger tu bolso en lugares públicos?", options: [{ text: "Llevarlo en la mano", correct: false }, { text: "Guardarlo en bolsillos internos", correct: true }, { text: "Dejarlo en la mesa", correct: false }, { text: "No llevar nada", correct: false }] },
      { text: "¿Qué deberías hacer si ves a alguien robando en la calle?", options: [{ text: "Enfrentarlo", correct: false }, { text: "Llamar a la policía", correct: true }, { text: "Ignorarlo", correct: false }, { text: "Gritar", correct: false }] },
      { text: "¿Cuál es la mejor manera de evitar robos en tu vecindario?", options: [{ text: "Dejar las puertas abiertas", correct: false }, { text: "Organizar una vigilancia vecinal", correct: true }, { text: "No hacer nada", correct: false }, { text: "Dejar las luces apagadas", correct: false }] },
    ],
    health: [
      { text: "¿Qué deberías hacer si alguien se desmaya?", options: [{ text: "Ignorarlo", correct: false }, { text: "Llamar a emergencias", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Cuál es la mejor manera de tratar una quemadura menor?", options: [{ text: "Aplicar hielo", correct: false }, { text: "Enfriar con agua corriente", correct: true }, { text: "Cubrir con una manta", correct: false }, { text: "No hacer nada", correct: false }] },
      { text: "¿Qué deberías hacer si alguien está teniendo un ataque al corazón?", options: [{ text: "Ignorarlo", correct: false }, { text: "Llamar a emergencias", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Cuál es la mejor manera de tratar una herida sangrante?", options: [{ text: "Aplicar presión", correct: true }, { text: "Lavar con agua", correct: false }, { text: "Cubrir con una manta", correct: false }, { text: "No hacer nada", correct: false }] },
      { text: "¿Qué deberías hacer si alguien está teniendo una convulsión?", options: [{ text: "Ignorarlo", correct: false }, { text: "Llamar a emergencias", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Cuál es la mejor manera de tratar una picadura de abeja?", options: [{ text: "Aplicar hielo", correct: true }, { text: "Lavar con agua", correct: false }, { text: "Cubrir con una manta", correct: false }, { text: "No hacer nada", correct: false }] },
      { text: "¿Qué deberías hacer si alguien está ahogándose?", options: [{ text: "Ignorarlo", correct: false }, { text: "Llamar a emergencias", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Cuál es la mejor manera de tratar una fractura?", options: [{ text: "Inmovilizar la zona", correct: true }, { text: "Lavar con agua", correct: false }, { text: "Cubrir con una manta", correct: false }, { text: "No hacer nada", correct: false }] },
      { text: "¿Qué deberías hacer si alguien está en shock?", options: [{ text: "Ignorarlo", correct: false }, { text: "Llamar a emergencias", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Cuál es la mejor manera de tratar una intoxicación?", options: [{ text: "Llamar a emergencias", correct: true }, { text: "Lavar con agua", correct: false }, { text: "Cubrir con una manta", correct: false }, { text: "No hacer nada", correct: false }] },
    ],
    harassment: [
      { text: "¿Qué deberías hacer si alguien te acosa en el trabajo?", options: [{ text: "Ignorarlo", correct: false }, { text: "Reportarlo a recursos humanos", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Cuál es la mejor manera de manejar el acoso en línea?", options: [{ text: "Ignorarlo", correct: false }, { text: "Bloquear al acosador", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Qué deberías hacer si alguien te acosa en la calle?", options: [{ text: "Ignorarlo", correct: false }, { text: "Llamar a la policía", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Cuál es la mejor manera de manejar el acoso escolar?", options: [{ text: "Ignorarlo", correct: false }, { text: "Reportarlo a un maestro", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Qué deberías hacer si alguien te acosa en el transporte público?", options: [{ text: "Ignorarlo", correct: false }, { text: "Llamar a la policía", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Cuál es la mejor manera de manejar el acoso sexual?", options: [{ text: "Ignorarlo", correct: false }, { text: "Reportarlo a las autoridades", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Qué deberías hacer si alguien te acosa en un lugar público?", options: [{ text: "Ignorarlo", correct: false }, { text: "Llamar a la policía", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Cuál es la mejor manera de manejar el acoso verbal?", options: [{ text: "Ignorarlo", correct: false }, { text: "Reportarlo a las autoridades", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Qué deberías hacer si alguien te acosa en un evento?", options: [{ text: "Ignorarlo", correct: false }, { text: "Llamar a la seguridad del evento", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Cuál es la mejor manera de manejar el acoso físico?", options: [{ text: "Ignorarlo", correct: false }, { text: "Reportarlo a las autoridades", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
    ],
    disasters: [
      { text: "¿Qué deberías hacer durante un terremoto?", options: [{ text: "Correr afuera", correct: false }, { text: "Agacharse, cubrirse y agarrarse", correct: true }, { text: "Gritar", correct: false }, { text: "No hacer nada", correct: false }] },
      { text: "¿Cuál es la mejor manera de prepararse para un huracán?", options: [{ text: "Ignorarlo", correct: false }, { text: "Tener un kit de emergencia", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Qué deberías hacer durante una inundación?", options: [{ text: "Correr afuera", correct: false }, { text: "Buscar terreno elevado", correct: true }, { text: "Gritar", correct: false }, { text: "No hacer nada", correct: false }] },
      { text: "¿Cuál es la mejor manera de prepararse para un incendio forestal?", options: [{ text: "Ignorarlo", correct: false }, { text: "Tener un plan de evacuación", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Qué deberías hacer durante una tormenta eléctrica?", options: [{ text: "Correr afuera", correct: false }, { text: "Quedarse adentro y alejarse de ventanas", correct: true }, { text: "Gritar", correct: false }, { text: "No hacer nada", correct: false }] },
      { text: "¿Cuál es la mejor manera de prepararse para un tornado?", options: [{ text: "Ignorarlo", correct: false }, { text: "Tener un refugio seguro", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Qué deberías hacer durante una erupción volcánica?", options: [{ text: "Correr afuera", correct: false }, { text: "Evacuar la zona", correct: true }, { text: "Gritar", correct: false }, { text: "No hacer nada", correct: false }] },
      { text: "¿Cuál es la mejor manera de prepararse para una ola de calor?", options: [{ text: "Ignorarlo", correct: false }, { text: "Mantenerse hidratado y en lugares frescos", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
      { text: "¿Qué deberías hacer durante una tormenta de nieve?", options: [{ text: "Correr afuera", correct: false }, { text: "Quedarse adentro y mantenerse caliente", correct: true }, { text: "Gritar", correct: false }, { text: "No hacer nada", correct: false }] },
      { text: "¿Cuál es la mejor manera de prepararse para un tsunami?", options: [{ text: "Ignorarlo", correct: false }, { text: "Tener un plan de evacuación", correct: true }, { text: "Gritar", correct: false }, { text: "Correr", correct: false }] },
    ],
  };


  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const questions = questionsByCategory[category] || [];

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswer(true);
      setProgress(progress + (100 / questions.length)); // Ajusta progreso basado en el número total de preguntas
    } else {
      setCorrectAnswer(false);
    }
    setTimeout(() => {
      setCurrentQuestion((prev) => prev + 1);
      setCorrectAnswer(false);
    }, 1000);
  };

  const question = questions[currentQuestion];
  const img = require("../assets/robo.png");
  
  if (currentQuestion >= questions.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.congratulationsText}>¡Felicidades, has completado todas las preguntas!</Text>
        <TouchableOpacity style={styles.startButton} onPress={() => setCurrentScreen('categories')}>
          <Text style={styles.startButtonText}>Volver a categorías</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentScreen('categories')}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.logo}>Safe<Text style={styles.logoGreen}>GO</Text></Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.card}>
        <Image source={img} style={styles.questionImage} />
        <View style={styles.cardContent}>
          <Text style={styles.questionText}>
            {question.text}
          </Text>
          {question.options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.answerButton} onPress={() => handleAnswer(option.correct)}>
              <Text>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {correctAnswer && (
        <Text style={styles.correctAnswerText}>¡Muy bien hecho! Hacer un llamado de ayuda directo es la mejor opción porque...</Text>
      )}
      <ProgressBar value={progress} />
      <TouchableOpacity style={styles.startButton} onPress={() => setCurrentScreen('categories')}>
        <Text style={styles.startButtonText}>Confirmar respuesta</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Feather name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="award" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};



const localStyles = StyleSheet.create({
  progressContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#34D399',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  logoGreen: {
    color: '#34D399',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  questionImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 16,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 16,
  },
  answerButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  correctAnswerText: {
    color: '#34D399',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  congratulationsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34D399',
    textAlign: 'center',
    marginVertical: 20,
  },
  startButton: {
    backgroundColor: '#34D399',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default QuestionScreen;

import { useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FokusButton } from '../components/FokusButton';
import { ActionButton } from '../components/ActionButton';
import { Timer } from '../components/Timer';

const pomodoro = [
  {
    id: 'focus',
    initialValue: 25,
    image: require('./pomodoro.png'),
    display: 'Foco',
  },
  {
    id: 'short',
    initialValue: 5,
    image: require('./short.png'),
    display: 'Pausa curta',
  },
  {
    id: 'long',
    initialValue: 15,
    image: require('./long.png'),
    display: 'Pausa longa',
  },
];

export default function Index() {
  const [timeType, setTimeType] = useState(pomodoro[1]);

  const timerRef = useRef(null);

  const toogleTime = () => {
    if (timerRef.current) {
      // pausar
      clearInterval(timerRef.current);
      return;
    }
    const id = setInterval(() => {
      console.log('timer rolando');
    }, 1000);
    timerRef.current = id;
  };
  return (
    <View style={styles.container}>
      <Image source={timeType.image} />
      <View style={styles.actions}>
        <View style={styles.context}>
          {pomodoro.map((p) => (
            <ActionButton
              key={p.id}
              active={timeType.id === p.id}
              onPress={() => setTimeType(p)}
              display={p.display}
            />
          ))}
        </View>
        <Timer totalSeconds={timeType.initialValue} />
        <FokusButton 
        title={timerRef.current ? 'Pausar' : 'Começar'}
        onPress={toogleTime} 
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Projeto fictício e sem fins comerciais.
        </Text>
        <Text style={styles.footerText}>Desenvolvido por Alura.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#021123',
    gap: 40,
  },
  actions: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: '#14448080',
    width: '80%',
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#144480',
    gap: 32,
  },
  context: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  timer: {
    fontSize: 54,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    width: '80%',
  },
  footerText: {
    textAlign: 'center',
    color: '#98A0A8',
    fontSize: 12.5,
  },
});

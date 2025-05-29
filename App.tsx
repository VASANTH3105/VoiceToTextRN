import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {startSpeechToText} from 'react-native-voice-to-text';

const App = () => {
  const [text, setText] = useState<any>('');

  return (
    <View style={styles.container}>
      <Text style={{color: 'white', fontWeight: 'bold'}}>Result: {text}</Text>
      <Text style={styles.heading1}>Voice Assistant POC</Text>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#d6f5d6'}]}
        onPress={async () => {
          try {
            const audioText = await startSpeechToText();
            console.log('audioText:', {audioText});
            setText(audioText);
          } catch (error) {
            console.log({error});
          }
        }}>
        <Text>{'Start'}</Text>
      </TouchableOpacity>

      <Text style={{color: '#000000', fontWeight: 'bold'}}>Result: {text}</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading1: {
    fontWeight: '700',
    fontSize: 18,
    color: '#000',
  },
  button: {
    backgroundColor: '#d6f5d6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
  },
});

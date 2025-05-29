import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {startSpeechToText} from 'react-native-voice-to-text';
import Tts from 'react-native-tts';
// import { EmojiHappy } from 'iconsax-react-native';

const App = () => {
  const [text, setText] = useState<any>('');

  useEffect(() => {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultRate(0.5);
      Tts.setDefaultPitch(1.0);
    });
  }, []);

  const speakHelloWorld = (textData: any) => {
    Tts.stop();
    // Tts.speak('Hello world how are you ');
    Tts.speak(textData || 'There was an error occured. Please try again');
  };

  return (
    <View style={styles.container}>
      <Text style={{color: 'white', fontWeight: 'bold'}}>Result: {text}</Text>
      <Text style={styles.heading1}>Voice Assistant POC</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          try {
            const audioText = await startSpeechToText();
            console.log('audioText:', {audioText});
            setText(audioText);
            speakHelloWorld(audioText);
          } catch (error) {
            console.log({error});
          }
        }}>
        {/* <VoiceCricle size="32" color="#ffffff" /> */}
        {/* <EmojiHappy color="#eee" variant="Bulk" size={54} /> */}

        <Text style = {{color: '#ffffff', fontWeight: 400}}>{'Start'}</Text>
      </TouchableOpacity>

      <View style = {styles?.responseContainer}>

      <Text style={{color: '#000000', fontWeight: 400}}>{text}...</Text>
      </View>


      {/* <Button title="Speak Hello World" onPress={speakHelloWorld} /> */}
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
    backgroundColor: '#4d79ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
  },
  responseContainer: {
    width: '80%',
    backgroundColor: '#d6f5d6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    // borderColor: '#6fdc6f',
    borderTopColor: '#ffffff',
    borderRightColor: '#ffffff',
    borderLeftColor: '#6fdc6f',
    borderBottomColor : '#6fdc6f',
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    marginTop: 20,
  }
});

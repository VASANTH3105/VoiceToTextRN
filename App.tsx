import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Voice from '@react-native-voice/voice';

const App = () => {
  const [isRunning, setRunning] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  Voice.onSpeechStart = () => setRunning(true);
  Voice.onSpeechEnd = () => setRunning(false);
  Voice.onSpeechError = (err: any) =>
    setError(err?.error?.message || 'Unknown error occurred');
  Voice.onSpeechResults = (result: any) => setResult(result.value[0]);

  const startRecording = async () => {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );

      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        setError('');
        await Voice.start('en-US');
        console.log('Voice recognition started');
      } else {
        setError('Permission denied');
      }
    } catch (error: any) {
      setError(error?.message || 'Error while starting voice recognition');
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (error: any) {
      setError(error?.message || 'Error while stopping voice recognition');
    }
  };

  useEffect(() => {
  return () => {
    Voice.destroy().then(Voice.removeAllListeners);
  };
}, []);


  return (
    <View style={styles.container}>
      <Text style={styles.heading1}>Voice Assistant POC</Text>
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: isRunning ? '#ffb3b3' : '#d6f5d6'},
        ]}
        onPress={isRunning ? stopRecording : startRecording}>
        <Text>{isRunning ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>

      {result ? <Text>Result: {result}</Text> : null}
      {error ? <Text style={{color: 'red'}}>Error: {error}</Text> : null}
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

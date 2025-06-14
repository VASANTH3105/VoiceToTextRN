// import React in our code
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

// import slider for the tuning of pitch and speed
import Slider from '@react-native-community/slider';

// import Tts Text to Speech
import Tts from 'react-native-tts';

const AdminController = () => {
  const [voices, setVoices] = useState<any>([]);
  const [ttsStatus, setTtsStatus] = useState<any>('initiliazing');
  const [selectedVoice, setSelectedVoice] = useState<any>(null);
  const [speechRate, setSpeechRate] = useState<any>(0.5);
  const [speechPitch, setSpeechPitch] = useState<any>(1);
  const [text, setText] = useState('Enter Text like Hello About React');

  //   useEffect(() => {
  //     Tts.addEventListener('tts-start', _event => setTtsStatus('started'));
  //     Tts.addEventListener('tts-finish', _event => setTtsStatus('finished'));
  //     Tts.addEventListener('tts-cancel', _event => setTtsStatus('cancelled'));
  //     Tts.setDefaultRate(speechRate);
  //     Tts.setDefaultPitch(speechPitch);
  //     Tts.getInitStatus().then(initTts);
  //     return () => {
  //       Tts.removeEventListener('tts-start', _event => setTtsStatus('started'));
  //       Tts.removeEventListener('tts-finish', _event => setTtsStatus('finished'));
  //       Tts.removeEventListener('tts-cancel', _event =>
  //         setTtsStatus('cancelled'),
  //       );
  //     };
  //   }, []);

  useEffect(() => {
    const onStart = () => setTtsStatus('started');
    const onFinish = () => setTtsStatus('finished');
    const onCancel = () => setTtsStatus('cancelled');

    Tts.addEventListener('tts-start', onStart);
    Tts.addEventListener('tts-finish', onFinish);
    Tts.addEventListener('tts-cancel', onCancel);

    Tts.setDefaultRate(speechRate);
    Tts.setDefaultPitch(speechPitch);
    Tts.getInitStatus().then(initTts);

    return () => {
      // Older versions used removeEventListener like this:
      try {
        Tts.removeEventListener('tts-start', onStart);
        Tts.removeEventListener('tts-finish', onFinish);
        Tts.removeEventListener('tts-cancel', onCancel);
      } catch (e) {
        console.warn('Unable to remove TTS listeners cleanly:', e);
      }
    };
  }, []);

  const initTts = async () => {
    const voices = await Tts.voices();
    const availableVoices = voices
      .filter(v => !v.networkConnectionRequired && !v.notInstalled)
      .map(v => {
        return {id: v.id, name: v.name, language: v.language};
      });
    let selectedVoice = null;
    if (voices && voices.length > 0) {
      selectedVoice = voices[0].id;
      try {
        await Tts.setDefaultLanguage(voices[0].language);
      } catch (err) {
        //Samsung S9 has always this error:
        //"Language is not supported"
        console.log(`setDefaultLanguage error `, err);
      }
      await Tts.setDefaultVoice(voices[0].id);
      console.log('availableVoices', JSON.stringify(availableVoices, null, 2));
      setVoices(availableVoices);
      setSelectedVoice(selectedVoice);
      setTtsStatus('initialized');
    } else {
      setTtsStatus('initialized');
    }
  };

  const readText = async () => {
    Tts.stop();
    Tts.speak(text);
  };

  const updateSpeechRate = async (rate: any) => {
    await Tts.setDefaultRate(rate);
    setSpeechRate(rate);
  };

  const updateSpeechPitch = async (rate: any) => {
    await Tts.setDefaultPitch(rate);
    setSpeechPitch(rate);
  };

  const onVoicePress = async (voice: any) => {
    try {
      await Tts.setDefaultLanguage(voice.language);
    } catch (err) {
      // Samsung S9 has always this error:
      // "Language is not supported"
      console.log(`setDefaultLanguage error `, err);
    }
    await Tts.setDefaultVoice(voice.id);
    setSelectedVoice(voice.id);
  };

  const renderVoiceItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: selectedVoice === item.id ? '#DDA0DD' : '#5F9EA0',
        }}
        onPress={() => onVoicePress(item)}>
        <Text style={styles.buttonTextStyle}>
          {`${item.language} - ${item.name || item.id}`}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>
            {`Speed: ${speechRate.toFixed(2)}`}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0.01}
            maximumValue={0.99}
            value={speechRate}
            onSlidingComplete={updateSpeechRate}
          />
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>
            {`Pitch: ${speechPitch.toFixed(2)}`}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0.5}
            maximumValue={2}
            value={speechPitch}
            onSlidingComplete={updateSpeechPitch}
          />
        </View>
        <Text style={styles.sliderContainer}>
          {`Selected Voice: ${selectedVoice || ''}`}
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setText(text)}
          value={text}
          onSubmitEditing={Keyboard.dismiss}
        />
        <TouchableOpacity style={styles.buttonStyle} onPress={readText}>
          <Text style={styles.buttonTextStyle}>
            Click to Read Text ({`Status: ${ttsStatus || ''}`})
          </Text>
        </TouchableOpacity>
        <Text style={styles.sliderLabel}>Select the Voice from below</Text>
        <FlatList
          style={{width: '100%', marginTop: 5}}
          keyExtractor={item => item.id}
          renderItem={renderVoiceItem}
          extraData={selectedVoice}
          data={voices}
        />
      </View>
    </SafeAreaView>
  );
};

export default AdminController;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    padding: 5,
  },
  sliderLabel: {
    textAlign: 'center',
    marginRight: 20,
  },
  slider: {
    flex: 1,
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
    width: '100%',
    textAlign: 'center',
    height: 40,
  },
});

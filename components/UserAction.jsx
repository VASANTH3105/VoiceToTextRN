import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {startSpeechToText} from 'react-native-voice-to-text';
import Tts from 'react-native-tts';
// import { EmojiHUserActiony } from 'iconsax-react-native';

const UserAction = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultRate(0.5);
      Tts.setDefaultPitch(1.0);
    });
  }, []);

  const speakHelloWorld = (textData) => {
    setIsSpeaking(true);
    Tts.stop();
    // Tts.speak('Hello world how are you ');
    Tts.speak(textData || 'There was an error occured. Please try again');
    setIsSpeaking(false);
  };

//   useEffect(() => {
//     const onStart = () => setIsSpeaking(true);
//     const onFinish = () => setIsSpeaking(false);
//     const onCancel = () => setIsSpeaking(false);

//     Tts.addEventListener('tts-start', onStart);
//     Tts.addEventListener('tts-finish', onFinish);
//     Tts.addEventListener('tts-cancel', onCancel);

//     return () => {
//       Tts.removeEventListener('tts-start', onStart);
//       Tts.removeEventListener('tts-finish', onFinish);
//       Tts.removeEventListener('tts-cancel', onCancel);
//     };
//   }, []);

useEffect(() => {
  const onStart = () => setIsSpeaking(true);
  const onFinish = () => setIsSpeaking(false);
  const onCancel = () => setIsSpeaking(false);

  const startListener = Tts.addEventListener('tts-start', onStart);
  const finishListener = Tts.addEventListener('tts-finish', onFinish);
  const cancelListener = Tts.addEventListener('tts-cancel', onCancel);

  return () => {
    startListener.remove();
    finishListener.remove();
    cancelListener.remove();
  };
}, []);


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {text && (
          // text
          <View
            style={{
              //   borderWidth: 1,
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignSelf: 'flex-end',
              //   alignItems: 'flex-end',
              justifyContent: 'flex-end',
              gap: 8,
              //   backgroundColor: 'white',
            }}>
            <View style={styles.responseContainerFrom}>
              <Text style={{color: '#000000', fontWeight: '400'}}>
                {text}...
              </Text>
            </View>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/666/666201.png',
              }}
              style={{
                padding: 15,
                opacity: 0.2,
                borderWidth: 2,
                borderColor: '#2db300',
                width: 40,
                height: 40, //
                borderRadius: 50,
              }}
              resizeMode="cover"
            />
          </View>
        )}

        {isSpeaking && (
          <View
            style={{
              width: '100%',
              alignSelf: 'flex-start',
              //   borderWidth: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              //   justifyContent: 'space-between',
              gap: 8,
              //   backgroundColor: 'white',
            }}>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWuO70X9BLOrcdSEHcam7dO9ZqwpEuCHxK-jINCZdzBaQifSJGpFs10yQiec-Og-Y_yHY&usqp=CAU',
              }}
              style={{
                borderWidth: 1,
                borderColor: '#0080ff',
                width: 40,
                height: 40, //
                borderRadius: 50,
              }}
              resizeMode="cover"
            />
            <View
              style={[
                styles.responseContainerFrom,
                {borderBottomLeftRadius: 0, borderBottomRightRadius: 10},
              ]}>
              <Text style={{color: '#000000', fontWeight: '400'}}>
                {'Response from Assistant'}...
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.actionContainer}>
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
          <Text style={{color: '#ffffff', fontWeight: '400'}}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserAction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff50',
    justifyContent: 'space-between',
  },
  content: {
    // borderWidth: 1,
    flex: 1,
    paddingHorizontal: '4%',
    gap: 8,
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
    paddingHorizontal: '12%',
    borderRadius: 50,
  },
  responseContainerFrom: {
    width: '80%',
    backgroundColor: '#d6f5d6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    // borderWidth: 1,
    // borderTopColor: '#ffffff',
    // borderRightColor: '#ffffff',
    // borderLeftColor: '#6fdc6f',
    // borderBottomColor: '#6fdc6f',
    borderRadius: 10,
    borderBottomRightRadius: 0,
    // marginTop: 20,
  },
  actionContainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.2,
    borderColor: '#8c8c8c',
    width: '100%',
    padding: '5%',
  },
});

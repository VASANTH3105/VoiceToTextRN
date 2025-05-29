import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import UserAction from './components/UserAction';
import AdminController from './components/AdminController';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <View style={styles?.headerContainer}>
        <TouchableOpacity
          onPress={() => setIsAdmin(true)}
          style={styles?.clickable}>
          <Text>User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsAdmin(false)}
          style={styles?.clickable}>
          <Text>Admin</Text>
        </TouchableOpacity>
      </View>

      {isAdmin ? <UserAction /> : <AdminController />}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // padding: 10,
  },
  clickable: {
    backgroundColor: '#e6ffff',
    width: '50%',
    // borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '3%',
    // margin: '1%'
  },
});

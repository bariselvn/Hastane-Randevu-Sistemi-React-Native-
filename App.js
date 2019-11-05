import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AnasayfaDrawerNavigator from './navigation/Anasayfa/AnasayfaDrawerNavigator';
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import reducers from './redux/index'//reducer oluşturulduktan sonra gelecek

export const store = createStore(reducers);
export default class AppScreen extends React.Component {

  
  render() {
    return (
      <Provider store={store}>
      <View style={styles.container}>
        
        <AnasayfaDrawerNavigator /> 
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  
});

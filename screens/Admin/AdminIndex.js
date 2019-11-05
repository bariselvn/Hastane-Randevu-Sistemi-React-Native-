import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DrawerNavigator from '../../navigation/Admin/AdminDrawerNavigator';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    
  }
  render() {
     
    
    return (
      
      <View style={styles.container}>
       
        <DrawerNavigator />
      </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DrawerNavigator from '../../navigation/Hasta/HastaDrawerNavigation';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hastaId:this.props.navigation.getParam('hastaId','NO-ID'),errormessage:""};
    
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

import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import Logo from '../components/Logo'
import MenuButton from '../components/MenuButton'


export default class HomeScreen extends React.Component {
  
  render() {
    
    return (
      
      <View style={styles.container}>
      <MenuButton navigation={this.props.navigation}/>
      <Logo />
        <Text style={styles.Text}>Hastane Randevu Sistemi</Text>
        <TouchableOpacity
         style={
           {height:50,
           width:300,
           borderRadius:15,
           backgroundColor:'black',
           marginVertical:10,
           alignItems: 'center',
           justifyContent: 'center',
           }}
           onPress={()=>this.props.navigation.navigate('DoktorGiris')}
           >
          <Text style={{color:'white',fontSize:20}}>Doktor Girişi </Text>
          </TouchableOpacity>   

          <TouchableOpacity
         style={
           {height:50,
           width:300,
           borderRadius:15,
           backgroundColor:'black',
           marginVertical:10,
           alignItems: 'center',
           justifyContent: 'center',
           }}
           onPress={()=>this.props.navigation.navigate('AdminGiris')}
           >
          <Text style={{color:'white',fontSize:20}}>Admin Girişi </Text>
          </TouchableOpacity> 

          <TouchableOpacity
         style={
           {height:50,
           width:300,
           borderRadius:15,
           backgroundColor:'black',
           marginVertical:10,
           alignItems: 'center',
           justifyContent: 'center',
           }}
           onPress={()=>this.props.navigation.navigate('HastaGiris')}
           >
          <Text style={{color:'white',fontSize:20}}>Hasta Girişi </Text>
          </TouchableOpacity>

          <TouchableOpacity
         style={
           {height:50,
           width:300,
           borderRadius:15,
           backgroundColor:'black',
           marginVertical:10,
           alignItems: 'center',
           justifyContent: 'center',
           }}
           onPress={()=>this.props.navigation.navigate('HastaKayit')}
           >
          <Text style={{color:'white',fontSize:20}}>Hasta Kayıt Ol </Text>
          </TouchableOpacity>             
       

      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text :{
     
    fontSize:30,
    
  },
 
});

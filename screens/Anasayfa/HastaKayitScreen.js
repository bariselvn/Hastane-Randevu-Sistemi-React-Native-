import React from 'react';
import { StyleSheet,TextInput,TouchableOpacity, View,Text } from 'react-native';
import MenuButton from '../../components/MenuButton'
import Logo from '../../components/Logo'
export default class HastaKayitScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit=this.onSubmit.bind(this);
        this.state = {
           hastaAdi: '',
           hastaSoyadi:'',
           hastaEmail:'',
           hastaPassword:'',
           hastaTCKN:'' ,
           errormessage:''
        }
      }
      onSubmit(){
        if(this.state.hastaAdi===''||this.state.hastaAdi===null||this.state.hastaSoyadi==''||this.state.hastaSoyadi===null ||this.state.hastaEmail===''||this.state.hastaEmail===null||this.state.hastaPassword===''||this.state.hastaPassword===null){
          this.setState({errormessage:"Eksik yada yanlış bilgi girdiniz."})
         
          return;
        }
        const hasta={
          hastaAdi:this.state.hastaAdi,
          hastaSoyadi:this.state.hastaSoyadi,
          hastaEmail:this.state.hastaEmail,
          hastaPassword:this.state.hastaPassword,
          hastaTCKN:this.state.hastaTCKN,
        }
        fetch('https://randevusistemi.azurewebsites.net/api/Hasta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
          },
          body:JSON.stringify(hasta),
          })
          .then((response) => response.json())
          .then((responseJson) => {
              console.log('response object:',responseJson)
              if(responseJson!=null){this.props.navigation.navigate('HastaGiris')}
          })
          .catch((error) => {
            console.error(error);
          });
       
    }
  render() {
    return (
      <View style={styles.container}>
      <MenuButton navigation={this.props.navigation}/>
      <Text style={styles.textStil}>{this.state.errormessage}</Text>
      <Logo />
      <TextInput 
             style={styles.inputBox} 
             placeholder="Ad" 
             placeholderTextColor='black'
             onChangeText={(hastaAdi)=>this.setState({hastaAdi})}
             />
             <TextInput 
             style={styles.inputBox} 
             placeholder="Soyad" 
             placeholderTextColor='black'
             onChangeText={(hastaSoyadi)=>this.setState({hastaSoyadi})}
             />

             <TextInput 
             style={styles.inputBox} 
             placeholder="Mail" 
             placeholderTextColor='black'
             onChangeText={(hastaEmail)=>this.setState({hastaEmail})}
             />
              <TextInput 
             style={styles.inputBox} 
             placeholder="TC Kimlik Numarası" 
             placeholderTextColor='black'
             onChangeText={(hastaTCKN)=>this.setState({hastaTCKN})}
             />

             <TextInput
              style={styles.inputBox} 
              placeholder="Şifre" 
              placeholderTextColor='black'
              secureTextEntry={true}
              onChangeText={(hastaPassword)=>this.setState({hastaPassword})}
              />
                
              
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
           onPress={this.onSubmit}
           >
          <Text style={{color:'white',fontSize:20}}>Kayıt Ol </Text>
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
  inputBox:{
      
    marginVertical:10, 
    width:300,
    height: 40,
    backgroundColor:'rgba(255,255,255,0.3)',
    borderWidth: 1,
    borderRadius:15,
    paddingHorizontal:16,
    
    
},
buttonStil : {
  
        marginVertical:10,
        width:300,
        height: 40,
        borderRadius:15,

},
});

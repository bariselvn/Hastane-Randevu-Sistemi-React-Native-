import React from 'react';
import { StyleSheet,TextInput,TouchableOpacity, View,Text } from 'react-native';
import MenuButton from '../../components/MenuButton'
import Logo from '../../components/Logo'
import {connect} from 'react-redux'
 class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit=this.onSubmit.bind(this);
        this.state = {
           
           doktorPassword:'',
           doktor:'',
           errormessage:'',
           doktorId:this.props.doktorId,
        }
      }
      componentDidMount(){
        
        fetch("https://randevusistemi.azurewebsites.net/api/doktor/"+this.state.doktorId).then(res=>{
              
        if(res.ok){
           
           res.json()
           .then(data=>{
             console.log('dataResults',data.results);
             this.setState({doktor:data.results});
             console.log('doktor', this.state.doktor);            
           })
    
          }
          else{             
            return;
          }
                
        })
      }
      onSubmit(){
         if(this.state.doktorPassword===''||this.state.doktorPassword===null){
           this.setState({errormessage:"Eksik yada yanlış bilgi girdiniz."})
         
          return;
         }
        const doktor={
          doktorID:this.state.doktorId,         
          doktorAdi:this.state.doktor.doktorAdi,
          doktorSoyadi:this.state.doktor.doktorSoyadi,
          doktorTCKN:this.state.doktor.doktorTCKN,
          doktorEmail:this.state.doktor.doktorEmail,
          bolumID:this.state.doktor.bolumID,
          hastaneID:this.state.doktor.hastaneID,
          doktorPassword:this.state.doktorPassword,
          
        }
        fetch('https://randevusistemi.azurewebsites.net/api/doktor', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
          },
          body:JSON.stringify(doktor),
          })
          .then((response) => response.json())
          .then((responseJson) => {
              console.log('response object:',responseJson)
              this.setState({errormessage:'Şifre Güncelleme İşlemi Başarılı'})
              
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
              placeholder="Şifre" 
              placeholderTextColor='black'
              secureTextEntry={true}
              onChangeText={(doktorPassword)=>this.setState({doktorPassword})}
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
          <Text style={{color:'white',fontSize:20}}>Güncelle </Text>
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

const mapStateToProps = (state, ownProps) => ({
  doktorId:state.reducer2.doktorId,
  
})

export default connect(mapStateToProps)(SettingsScreen);
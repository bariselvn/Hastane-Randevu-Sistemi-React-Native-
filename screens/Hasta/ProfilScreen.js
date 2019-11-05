import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Modal} from 'react-native';
import Logo from '../../components/Logo'
import MenuButton from '../../components/MenuButton'
import {connect} from 'react-redux'
 class ProfilScreen extends React.Component {
  constructor(props) {
    super(props);
    this.randevularıGorBtn=this.randevularıGorBtn.bind(this);
    this.state = {
        hastaId: props.HastaId,
        hastaAdi: props.HastaAdi,
        hastaMail:props.HastaMail,
        randevuLarGorModalVisible:false,
        randevular:[],
        
    }
}
componentDidMount() {
  
  fetch("https://randevusistemi.azurewebsites.net/api/Randevu/Hasta/"+this.state.hastaId+"/").then(res=>{
          
    if(res.ok){
       
       res.json()
       .then(data=>{
         console.log('dataResults',data.results);
         this.setState({randevular:data.results});
         console.log('Randevularım', this.state.randevular);            
       })

      }
      else{             
        return;
      }
            
    })

}
randevularıGorBtn(){
  fetch("https://randevusistemi.azurewebsites.net/api/Randevu/Hasta/"+this.state.hastaId+"/").then(res=>{
          
    if(res.ok){
       
       res.json()
       .then(data=>{
         console.log('dataResults',data.results);
         this.setState({randevular:data.results});
         console.log('Randevularım', this.state.randevular);            
       })

      }
      else{             
        return;
      }
            
    }),
this.setState({randevuLarGorModalVisible:true});
}
  render() {
    return (
      <View style={styles.container}>
      <MenuButton navigation={this.props.navigation}/>
      <Logo />
        <Text style={styles.Text}>Hastane Randevu Sistemi</Text>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.randevuLarGorModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Randevularım :</Text>
              <View>                 
                 {this.state.randevular.map((l, i) => {return <Text value={l} key={i}>{l.doktorID} Numaralı Doktor {l.randevuTarih} {l.randevuSaat}:00</Text>    })}
              </View>

                
                 
              <TouchableOpacity
                onPress={() => {
                  this.setState({randevuLarGorModalVisible:false});
                  
                }}>
                <Text>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


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
           >
          <Text style={{color:'white',fontSize:20}}>Hasta Numarası : {this.props.HastaId}</Text>
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
           onPress={this.randevularıGorBtn}    
           >
          <Text style={{color:'white',fontSize:20}}>Randevularımı Gör</Text>
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

const mapStateToProps = (state, ownProps) => ({
  HastaId:state.reducer1.hastaId,
  HastaAdi:state.reducer1.hastaAdi,
  hastaMail:state.reducer1.hastaMail,
})

export default connect(mapStateToProps)(ProfilScreen);

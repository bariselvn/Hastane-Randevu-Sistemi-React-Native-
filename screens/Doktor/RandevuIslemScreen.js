import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Modal,Picker,TextInput,Image} from 'react-native';
import Logo from '../../components/Logo'
import MenuButton from '../../components/MenuButton'


import {connect} from 'react-redux'
class RandevuIslemScreen extends React.Component {
    constructor(props) {
        super(props);
        
        this.randevuSil=this.randevuSil.bind(this);
        this.state = {
            doktorId:this.props.doktorId,
            randevuIptalModalVisible:false,
            silinecekRandevu:'',
            randevularım:[],
            randevuLarGorModalVisible:false,
            doktor:'',
            
        }
    }


    componentDidMount() {
        fetch("https://randevusistemi.azurewebsites.net/api/Randevu/Doktor/"+this.state.doktorId).then(res=>{
              
        if(res.ok){
           
           res.json()
           .then(data=>{
             console.log('dataResults',data.results);
             this.setState({randevularım:data.results});
             console.log('Randevularım', this.state.randevularım);            
           })
    
          }
          else{             
            return;
          }
                
        })

    
    }
    randevuSil(){
        fetch("https://randevusistemi.azurewebsites.net/api/randevu/Sil/"+this.state.silinecekRandevu.randevuID).then(res=>{
                
            if(res.ok){
               
               res.json()
               .then(data=>{
                 console.log('İptal Edilen Randevu',data.results);
                 this.setState({errormessage:'Randevu İptal Etme İşlemi Başarılı'});
                 this.setState({randevuIptalModalVisible:false});                
               })
        
              }
              else{             
                console.log('Hatalı randevu servisi işlemi'); 
                return;
              }
                    
            })
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
                     {this.state.randevularım.map((l, i) => {return <Text value={l} key={i}>{l.hastaID} Numaralı Hasta {l.randevuTarih} {l.randevuSaat}:00</Text>    })}
                  </View>
    
                    
                     
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
                    onPress={() => {
                      this.setState({randevuLarGorModalVisible:false});
                      
                    }}>
                    <Text style={{color:'white',fontSize:20}}>Kapat</Text>
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
               onPress={()=>this.setState({randevuLarGorModalVisible:true})}
               >
              <Text style={{color:'white',fontSize:20}}>Randevularımı Listele</Text>
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
               onPress={()=>this.setState({randevuIptalModalVisible:true})}    
               >
              <Text style={{color:'white',fontSize:20}}>Randevuları İptal Et</Text>
              </TouchableOpacity> 


               <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.randevuIptalModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
           
              <Text>Randevular</Text>
              <Picker 

                  selectedValue={this.state.silinecekRandevu}
                  onValueChange={(cli) => this.setState({silinecekRandevu: cli})}>
                  {this.state.randevularım.map((l, i) => {return <Picker.Item value={l} label={l.hastaID+"Numaralı Hasta"+l.randevuTarih+l.randevuSaat+":00"}  key={i}> </Picker.Item>})}
                  </Picker>
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
                  onPress={this.randevuSil}>
                 <Text style={{color:'white',fontSize:20}}>Seçilen Randevuyu Sil</Text>
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
                onPress={() => {
                  this.setState({randevuIptalModalVisible:false});
                  
                }}>
                <Text style={{color:'white',fontSize:20}}>Kapat</Text>
              </TouchableOpacity>
            </View>
          
        </Modal>   
    
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
    doktorId:state.reducer2.doktorId,
   
  })
  
  export default connect(mapStateToProps)(RandevuIslemScreen);
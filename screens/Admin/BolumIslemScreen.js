import React, { Component } from 'react';
import {  Text, TextInput, View,  Platform, Image,  Modal, Alert, TouchableOpacity,Picker} from 'react-native';
import MenuButton from '../../components/MenuButton'

export default class HastaneIslemScreen extends Component {
  constructor(props) {
    super(props);
    this.bolumEkle=this.bolumEkle.bind(this);
    
    this.bolumSil=this.bolumSil.bind(this);

    this.bolumleriCek=this.bolumleriCek.bind(this);
    
    this.silModalShow=this.silModalShow.bind(this);

    this.guncelleModalShow=this.guncelleModalShow.bind(this);

    this.bolumGuncelle=this.bolumGuncelle.bind(this);

    this.hastaneleriCek=this.hastaneleriCek.bind(this);

    this.ekleModalShow=this.ekleModalShow.bind(this);

    this.hastaneIdBolumGetir=this.hastaneIdBolumGetir.bind(this);

    this.state = {text: '',
                  eklemodalVisible: false,
                  silmodalVisible: false,
                  guncellemodalVisible: false,
                  
                  bolumler:[],
                  hastaneler:[],
                  eklenecekHastaneId:'',
                  guncellenecekHastaneID:'',
                  

                  guncellenecekBolum:'',
                  silinecekBolumID:'',
                  
                  
                  guncellenecekBolumID :'',

                 
                  hastaneIdyeGoreBolumler:[],
                  bolumAdi:	"",
                  bolumSoyadi:	"",
                  bolumEmail	:"",
                  bolumTCKN	:"",
                  bolumPassword	:" ",

                  errormessage:'',
                  

              
                  

  };
  }
  hastaneIdBolumGetir(){
    fetch("https://randevusistemi.azurewebsites.net/api/bolum/hastaneID/"+this.state.guncellenecekHastaneID.hastaneID).then(res=>{
      
    if(res.ok){
       
       res.json()
       .then(data=>{
        console.log('dataResults',data.results);
        this.setState({hastaneIdyeGoreBolumler:data.results});
        console.log('hastaneIdyeGoreBolumler',this.state.hastaneIdyeGoreBolumler);
       })
  
      }
      else{
        this.setState({errormessage:"Bir Terslik Var"});
        
        return;
      }
      
      
    })
  }
  hastaneleriCek(){
    // Hastaneleri Çekme
    fetch("https://randevusistemi.azurewebsites.net/api/hastane/").then(res=>{
           
     if(res.ok){
        
        res.json()
        .then(data=>{
          console.log('dataResults',data.results);
          this.setState({hastaneler:data.results});
          console.log('Hastaneler', this.state.hastaneler);            
        })
 
       }
       else{             
         console.log('Hatalı hastane servisi işlemi'); 
         return;
       }
             
     })
 }
  bolumleriCek(){
     // bolumler Çekme
     fetch("https://randevusistemi.azurewebsites.net/api/bolum/").then(res=>{
            
      if(res.ok){
         
         res.json()
         .then(data=>{
           console.log('dataResults',data.results);
           this.setState({bolumler:data.results});
           console.log('Bölümler', this.state.bolumler);            
         })
  
        }
        else{             
          console.log('Hatalı Bolum servisi işlemi'); 
          return;
        }
              
      })
  }
  componentDidMount() {
   
      this.bolumleriCek();
      
  
  }
 ekleModalShow(){
   this.hastaneleriCek();
   this.setState({eklemodalVisible:true});
   
 }
  bolumEkle(){
    if(this.state.bolumAdi!='' & this.state.eklenecekHastaneId!='') {
    const bolum={
      bolumAdi:this.state.bolumAdi,
      hastaneID:this.state.eklenecekHastaneId.hastaneID,
    }
    fetch('https://randevusistemi.azurewebsites.net/api/bolum', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      body:JSON.stringify(bolum),
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log('response object:',responseJson.results)
          if(responseJson.results.bolumAdi!=null){this.setState({eklemodalVisible:false}),this.setState({errormessage:'Bölüm Ekleme İşlemi Başarılı'})}
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  bolumSil(){
    fetch("https://randevusistemi.azurewebsites.net/api/bolum/Sil/"+this.state.silinecekBolumID.bolumID).then(res=>{
            
        if(res.ok){
           
           res.json()
           .then(data=>{
             console.log('Silinen Bölüm',data.results);
             this.setState({errormessage:'Bölüm Silme Başarılı'});
             this.setState({silmodalVisible:false});                
           })
    
          }
          else{             
            console.log('Hatalı bolum servisi işlemi'); 
            return;
          }
                
        })
  }
 silModalShow(){
  this.bolumleriCek();
  this.setState({silmodalVisible:true});
 }
 guncelleModalShow(){
   this.hastaneleriCek();
   this.bolumleriCek();
   this.setState({guncellemodalVisible:true})
 }
 guncelleOnValueChange(guncellenecekHastaneID){
   this.setState({guncellenecekHastaneID:guncellenecekHastaneID});
  this.hastaneIdBolumGetir();
 }
 bolumGuncelle(){
    if(this.state.guncellenecekbolumAdi!='' & this.state.guncellenecekHastaneID!='') {
      const bolum={
        bolumAdi:this.state.guncellenecekbolumAdi,     
        bolumID:this.state.guncellenecekBolumID.bolumID,
        hastaneID:this.state.guncellenecekHastaneID.hastaneID,
      }
      fetch('https://randevusistemi.azurewebsites.net/api/bolum', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        },
        body:JSON.stringify(bolum),
        })
        .then((response) => response.json())
          .then((responseJson) => {
              console.log('response object:',responseJson);
              this.setState({guncellemodalVisible:false});
              this.setState({errormessage:'bolum Guncelleme İşlemi Başarılı'});
        })
        .catch((error) => {
          console.error(error);
        });
      }
    }
  
  
  render() {
    return (
      
      <View style={{marginTop: Platform.OS == 'ios' ? 21 : 0,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor : 'white'
      }}>
         <MenuButton navigation={this.props.navigation}/>
         
        <View style={{flex:4}}>
        
         <Text style={{fontSize:24,textAlign:'center', marginTop:90}}>
           Admin Bölum İşlemleri
         </Text>
         <Text style={{marginVertical:15,
           width:300,
                height: 40,
              }}>{this.state.errormessage}</Text>
        </View>
        <View style={{flex:3}}>
         <Image style={{width: 64, height: 74 ,margin: 16}}
          source={{uri:'https://cdn.onlinewebfonts.com/svg/img_325791.png'}}
         />
        </View>
        <View style={{flex:2}}>
             
                          <Modal        
                                        animationType="slide"
                                        transparent={false}
                                        visible={this.state.eklemodalVisible}
                                        onRequestClose={() => {
                                        }}>
                                          <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                                          <Picker 
                                                 style={{height:50,width:300}}
                                                 selectedValue={this.state.eklenecekHastaneId}
                                                 onValueChange={(cli) => this.setState({eklenecekHastaneId: cli})}>
                                                {this.state.hastaneler.map((l, i) => {return <Picker.Item value={l} label={l.hastaneAdi} key={i}  /> })}
                                           </Picker>
                                          <TextInput 
                                            style={{ marginVertical:10, 
                                              width:300,
                                              height: 40,
                                              backgroundColor:'rgba(255,255,255,0.3)',
                                              borderWidth: 1,
                                              borderRadius:15,
                                              paddingHorizontal:16,}}
                                            placeholder="Bölüm Adı Giriniz!" 
                                            placeholderTextColor='black'
                                            value={this.state.bolumAdi}
                                            onChangeText={(bolumAdi)=>this.setState({bolumAdi})}
                                          />


                                            <TouchableOpacity style={{height:50,
                                                                        width:300,
                                                                        borderRadius: 15,
                                                                        backgroundColor:'black',                                                                       
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center'}}
                                              onPress={this.bolumEkle}>
                                              <Text style={{color:'white'}}>Bölüm Ekle</Text>
                                            </TouchableOpacity>
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
                                           onPress={this.ekleModalShow}>
                                          <Text style={{height:50,width:300,color:'white', textAlign:'center', fontSize:24, marginTop:15}}>Bölüm Ekle</Text>
                                      </TouchableOpacity>
                
          </View>
        <View style={{flex:2}}>
             
                          <Modal
                                        animationType="slide"
                                        transparent={false}
                                        visible={this.state.silmodalVisible}
                                        onRequestClose={() => {
                                        }}>
                                          <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                                          
                                           <Picker 
                                                 style={{height:50,width:300}}
                                                 selectedValue={this.state.silinecekBolumID}
                                                 onValueChange={(cli) => this.setState({silinecekBolumID: cli})}>
                                                {this.state.bolumler.map((l, i) => {return <Picker.Item value={l} label={l.bolumAdi} key={i}  /> })}
                                           </Picker>
                                          
                                            <TouchableOpacity style={{height:50,
                                                                        width:300,
                                                                        borderRadius: 15,
                                                                        backgroundColor:'black',                                                                       
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center'}}
                                              onPress={this.bolumSil}>
                                              <Text style={{color:'white'}}>Bölüm Sil</Text>
                                            </TouchableOpacity>
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
                                           onPress={this.silModalShow}>
                                          <Text style={{height:50,width:300,color:'white', textAlign:'center', fontSize:24, marginTop:15}}>Bölüm Sil</Text>
                                      </TouchableOpacity>
              
        </View>
      
        <View style={{flex:2}}>
             
                          <Modal
                                        animationType="slide"
                                        transparent={false}
                                        visible={this.state.guncellemodalVisible}
                                        onRequestClose={() => {
                                          Alert.alert('Modal has been closed.');
                                        }}>
                                          <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                                        

                                          <Picker 
                                                 style={{height:50,width:300}}
                                                 selectedValue={this.state.guncellenecekHastaneID}
                                                 onValueChange={(cli) => this.setState({guncellenecekHastaneID:cli})}>
                                                {this.state.hastaneler.map((l, i) => {return <Picker.Item value={l} label={l.hastaneAdi} key={i}  /> })}
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
                                           onPress={this.hastaneIdBolumGetir}>
                                          <Text style={{height:50,width:300,color:'white', textAlign:'center', fontSize:24, marginTop:15}}>Bölümleri Getir</Text>
                                      </TouchableOpacity>

                                           <Picker 
                                                 style={{height:50,width:300}}
                                                 selectedValue={this.state.guncellenecekBolumID}
                                                 onValueChange={(cli) => this.setState({guncellenecekBolumID: cli})}>
                                                {this.state.hastaneIdyeGoreBolumler.map((l, i) => {return <Picker.Item value={l} label={l.bolumAdi} key={i}  /> })}
                                           </Picker>


                                           <TextInput 
                                            style={{ marginVertical:10, 
                                              width:300,
                                              height: 40,
                                              backgroundColor:'rgba(255,255,255,0.3)',
                                              borderWidth: 1,
                                              borderRadius:15,
                                              paddingHorizontal:16,}}
                                            placeholder="Bölüm Adı Giriniz!" 
                                            placeholderTextColor='black'
                                            value={this.state.guncellenecekbolumAdi}
                                            onChangeText={(guncellenecekbolumAdi)=>this.setState({guncellenecekbolumAdi})}
                                          />

                                           
                                         
                                            <TouchableOpacity style={{height:50,
                                                                        width:300,
                                                                        borderRadius: 15,
                                                                        backgroundColor:'black',                                                                       
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center'}}
                                              onPress={this.bolumGuncelle}>
                                              <Text style={{color:'white'}}>Bölüm Güncelle</Text>
                                            </TouchableOpacity>
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
                                           onPress={this.guncelleModalShow}>
                                          <Text style={{height:50,width:300,color:'white', textAlign:'center', fontSize:24, marginTop:15}}>Bölüm Güncelle</Text>
                                      </TouchableOpacity>
              
        </View>

      </View>
    );
  }
}

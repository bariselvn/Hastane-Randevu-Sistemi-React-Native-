import React from 'react';
import {Platform,Dimensions} from 'react-native'
import {createDrawerNavigator,createAppContainer} from 'react-navigation'

import AdminGirisScreen from '../../screens/Anasayfa/AdminGirisScreen';
import DoktorGirisScreen from '../../screens/Anasayfa/DoktorGirisScreen';
import HastaGirisScreen from '../../screens/Anasayfa/HastaGirisScreen';
import HastaKayitScreen from '../../screens/Anasayfa/HastaKayitScreen';
import HomeScreen from '../../screens/HomeScreen'
import MenuDrawer from '../../components/MenuDrawer';
import HastaIndex from '../../screens/Hasta/HastaIndex'
import AdminIndex from '../../screens/Admin/AdminIndex'
import DoktorIndex from '../../screens/Doktor/DoktorIndex'
const WIDHT = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: WIDHT*0.83,
    contentComponent:({navigation}) =>{
        return (<MenuDrawer navigation={navigation}/>)
    }

}
const DrawerNavigator = createDrawerNavigator({
    Home : {
         screen: HomeScreen
    },
    HastaGiris : {
        screen : HastaGirisScreen
    },
    HastaKayit : {
        screen : HastaKayitScreen
    },
    AdminGiris : {
        screen : AdminGirisScreen

    },
    DoktorGiris : {
        screen : DoktorGirisScreen
    },
    HastaIndex :{
        screen: HastaIndex
    },
    AdminIndex :{
        screen: AdminIndex
    },
    DoktorIndex:{
        screen : DoktorIndex
    }
},
DrawerConfig
);

export default createAppContainer(DrawerNavigator);

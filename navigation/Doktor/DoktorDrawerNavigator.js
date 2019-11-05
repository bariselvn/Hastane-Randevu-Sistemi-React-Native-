import React from 'react';
import {Platform,Dimensions} from 'react-native'
import {createDrawerNavigator,createAppContainer} from 'react-navigation'

import DoktorMenuDrawer from '../../components/Doktor/DoktorMenuDrawer';
import RandevuIslemScreen from '../../screens/Doktor/RandevuIslemScreen';
import SettingsScreen from '../../screens/Doktor/SettingsScreen';
const WIDHT = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: WIDHT*0.83,
    contentComponent:({navigation}) =>{
        return (<DoktorMenuDrawer navigation={navigation}/>)
    }

}
const DrawerNavigator = createDrawerNavigator({
    
    RandevuIslem :{
        screen: RandevuIslemScreen,
    },
    Settings: {
        screen: SettingsScreen,
    }
},
DrawerConfig
);

export default createAppContainer(DrawerNavigator);
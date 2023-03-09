import * as SplashScreen from 'expo-splash-screen';

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import Main from "./src/screens/Main";
import Month from '../src/screens/Month';
import { titleStyle } from './src/constantes/text';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Weatpoint-Regular': require('./assets/fonts/Weatpoint-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);



  const [meses, setMeses] = useState([
    {
      id: 1,
      name: "marzo",
      estado: false,
image: require('./assets/calendario-marzo-2023-espana-clasico.png'),
      rate: 1
    },
    {
      id: 2,
      name: "abril",                    
      estado: true,
image: require('./assets/calendario-de-abril-2023.png'),
      rate: 2
    },
    {
      id: 3,
      name: "mayo",
      estado: false,
image: require('./assets/download.png'),
      rate: 3
    },
    
  ]);




 
  const [mesScreen, setMesScreen] = useState(false);
  const [searchScreen, setSearchScreen] = useState(false);

  const [selectedItem, setSelectedItem] = useState({});


  const mesUnit = (itemId) => {
    if (!mesScreen) {
      setMesScreen(true);
      const selected = meses.find(item => item.id === itemId);
      setSelectedItem(selected);
    } else {
      setSearchScreen({});
      setMesScreen(false);
    }
  }

  const openMonth = (item) => {
    setSelectedItem(item);
  };


  const onDeleteMonth = (id) => {
    setMesScreen(false);
    setMeses((oldArray) => oldArray.filter((item) => item.id !== id));
    setSelectedItem({});
  };

  if (!fontsLoaded) {
    return null;
  }

    return (

      <View style={styles.screen}>       
            <Main
              meses={meses}
              showMes={mesUnit}
              openMonth={openMonth}
            />
      </View>
    );
        
  }


const styles = StyleSheet.create({
  screen: {
    paddingTop: 25,
    padding: 3,
    flex: 1,
    backgroundColor: "#FFCF09"
  },
  textStyle: {
    ...titleStyle
  }
});
import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, StyleSheet, Text, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AppRoutes } from '../../app.routes';
import Constants from 'expo-constants';


const Home = () => {

  const navigation = useNavigation();

  // const [ufs, setUfs] = useState<string[]>([]);
  // const [cities, setCities] = useState<string[]>([]);

  // const [selectedUf, setSelectedUf] = useState('0');
  // const [selectedCity, setSelectedCity] = useState();

  // useEffect(() => {
  //   if (selectedUf === '0'){
  //       return;
  //   }

  //   axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
  //   .then(response => {
  //       const cityNames = response.data.map(city => city.nome);            
  //       setCities(cityNames);
  //   });
  // },[selectedUf]);

  function handleNavigateToHome() {
    navigation.navigate(AppRoutes.HOME)
  }

  return (
    <>
      <View style={styles.container}>

        <View style={styles.main}>
          <Image style={styles.mainLogo} source={require('../../assets/logo.png')} />
          <Image style={styles.mainImg} source={require('../../assets/login-image.png')} />
          <View style={{ width: '100%' }}>
            <Text style={styles.title}>Faça seu login</Text>
          </View>
        </View>
        {/* <View style={ { flex:1 } }></View> */}
      </View>
      <View style={styles.footer}>
        <View style={styles.inputsView}>
          <TextInput placeholder={"Email"} style={styles.input}></TextInput>
          <TextInput placeholder={"Senha"} style={styles.input}></TextInput>
        </View>
        <RectButton style={styles.button} onPress={handleNavigateToHome} >
          <Text style={styles.buttonText}>
            Entrar
         </Text>
        </RectButton>
      </View>
    </>
  )
}


export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    paddingHorizontal: 18,
    // paddingTop: 32,
    paddingTop: Constants.statusBarHeight + 8,
    backgroundColor: '#1E3085'
  },

  main: {
    // backgroundColor:'#458',
    display: "flex",
    // paddingTop: ,
    paddingBottom: 16,
    flex: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // width: "100%",
    alignContent: 'space-between'
    // backgroundColor: '#fff'

  },

  mainLogo: {
    alignSelf: "center",
    height: 32
  },

  mainImg: {
    alignSelf: "center",

  },

  title: {
    alignSelf: 'flex-start',
    color: '#fff',
    fontSize: 34,
    fontFamily: 'Roboto_900Black',
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    // width: "100%",
    alignItems: 'stretch',
    alignContent: 'space-between'
  },

  select: {},
  inputsView: {
    width: '100%',
  },

  input: {
    width: '100%',
    height: 44,
    // backgroundColor: '#458',
    marginBottom: 16,
    padding: 8,
    fontSize: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1'
  },

  button: {
    width: '100%',
    backgroundColor: '#E9E7EC',
    height: 48,
    flexDirection: 'row',
    borderRadius: 6,
    overflow: 'hidden',
    alignItems: 'center',
    // marginTop: 8,
    marginBottom: 16
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#1E3085',
    fontFamily: 'Roboto_500Medium',
    fontSize: 17,
    lineHeight: 22,
  }
});
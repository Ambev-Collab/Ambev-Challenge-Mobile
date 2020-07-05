
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, SafeAreaView, Linking} from 'react-native';
import Constants from 'expo-constants';
import { Feather as Icon, FontAwesome} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import * as MailComposer from 'expo-mail-composer';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface Params {
  point_id:number;
}

interface Data {
  point:{
    image:string;
    image_url:string;
    name:string;
    email:string;
    whatsapp:string;
    city:string;
    uf:string;
  };
  items: {
    title: string;
  }[];
}

interface IBGEUFResponse {
  sigla: string    
}

interface IBGECityResponse {
  nome: string    
}



const Detail = () => {

  const [data, setData] = useState<Data>({} as Data);
  const [ufs, setUfs] = useState<string[]>([]);
  
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);
        setUfs(ufInitials);
    });
}, [])

  // useEffect(() => {
  //   api.get(`points/${routeParams.point_id}`).then(response => {
  //     setData(response.data);
  //   });
  // });

  function handleWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre a coleta de resíduos`)
  }

  function handleComposeEmail() {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.point.email],
    });
  }

  function handleNavigateBack() {
    navigation.goBack();
  }

  if (!data.point) {
    return null;
  }

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={20} color="#34cb79" onPress={handleNavigateBack}/>
        </TouchableOpacity>

        <Image style={styles.pointImage}  source={{uri:data.point.image_url}} />
          <Text style={styles.pointName}>{data.point.name}</Text>
        <Text style={styles.pointItems}>
          {data.items.map(item => item.title).join(', ')}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
        </View>
    </View>   
    <View style={styles.footer}>
      <RectButton style={styles.button} onPress={handleWhatsapp}>
        <FontAwesome name="whatsapp" size={20} color="#FFF" />
        <Text style={styles.buttonText} >Whatsapp</Text>
      </RectButton>

      <RectButton style={styles.button} onPress={handleComposeEmail}>
        <Icon name="mail" size={20} color="#FFF" />
        <Text style={styles.buttonText} >Email</Text>
      </RectButton>
      
    </View> 
    </SafeAreaView>
  )};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Roboto_700Bold',
    marginTop: 24,
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  address: {
    marginTop: 32,
  },
  
  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});

export default Detail;

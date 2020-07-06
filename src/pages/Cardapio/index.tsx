
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import Sessao from '../../components/Sessao';


// import { RectButton } from 'react-native-gesture-handler';


interface Params {
  url:string;
}

interface Cardapio {
  nome:string;
  sessoes:string[];
}


interface Sessao {
  nome:string;
  produtos:string[];
}

interface Produto {

}



const Cardapio = () => {

  const [cardapio, setCardapio ] = useState<Cardapio>()
  

  const route = useRoute();

  const navigation = useNavigation(); 
  const routeParams = route.params as Params

  useEffect(() => {
    api.get(`/cardapio/${routeParams.url}`)
    .then(cardapio_response =>{
      setCardapio(cardapio_response.data)         
    });
  },[]);

  const handleNavigateBack = () => {
    navigation.goBack();
  }

  return (
    <>
      
        <View style={styles.container}>
          <Text>{cardapio?.nome}</Text>
         {/* {cardapio?.sessoes.map(sessao_id=>{
           <Sessao key={sessao_id} sessao_id={sessao_id} />
         })} */}
        </View>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});

export default Cardapio;
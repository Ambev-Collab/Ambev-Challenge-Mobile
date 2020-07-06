
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import api from '../services/api';


interface MyProps{
sessao_id:string;
}

interface Sessao {
    nome:string;
    produtos:string[];
}



const Sessao = (props:MyProps) => {

  const [sessao, setSessao ] = useState<Sessao>()
  

 



  useEffect(() => {
      console.log(props)
    api.get(`/sessao/${props.sessao_id}`)
    .then(response =>{
       setSessao(response.data)
       console.log(response)
    });
  },[]);



  return (
    <>
      
        <View style={styles.container}>
         {sessao?.produtos.map(produto_id => {
            
         })}
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

export default Sessao;
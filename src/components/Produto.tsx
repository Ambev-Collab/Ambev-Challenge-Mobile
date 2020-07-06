
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import api from '../services/api';


interface MyProps{
sessao_id:string;
}

interface Produto {
    nome:string;
    produtos:string[];
}



const Produto = (props:MyProps) => {

  const [sessao, setProduto ] = useState<Produto>()
  

 



  useEffect(() => {
    api.get(`/sessao/${props.sessao_id}`)
    .then(response =>{
       setProduto(response.data)
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

export default Produto;
import React, { userState, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import TouchID from 'react-native-touch-id';

export default function App(){
  const [user, setUser] = useState();

  const [supported, setSupported] = useState(null);

  useEffect(() =>{
    TouchID.isSupported()
    .then(sucess => {
      setSupported(true);
    })
    .catch((error) =>{
      console.log(error);
      alert("Touch ID não suportado!")
    })
  }, []);

  function handleLogin(){
    const config = {
      title: 'Authentication Touch ID',
      color: '#FF0000',
      sensorErrorDescription: 'Touch ID inválido!',
    };

    TouchID.authenticate("Login App", config)
    .then(sucess => {
      Alert.alert("Login feito com sucesso!")
      setUser("Bem vindo!")
    })
    .catch(error => {
      Alert.alert("Autenticação inválida! erro: " + error )
    });
  }

  return(
    <View style={styles.container}>
      <TouchableHighlight style={styles.button} onPress={ handleLogin }>
        <Text>Entrar</Text>
      </TouchableHighlight>
      <Text>
        {user}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    borderRadius: 3,
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#0391D7"
  }
})
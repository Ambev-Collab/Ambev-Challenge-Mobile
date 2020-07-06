
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button, Image, Platform } from 'react-native';
import Constants from 'expo-constants';
import { Feather as Icon, AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import Svg, { SvgUri, Path } from 'react-native-svg';
import api from '../../services/api';
import * as Location from 'expo-location';
import { AppRoutes } from '../../app.routes';
import { BarCodeScanner } from 'expo-barcode-scanner';

// import { RectButton } from 'react-native-gesture-handler';

interface Item {
  id: number;
  title: string;
  image_url: string;
  route: AppRoutes;
}

interface Point {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

interface Params {
  selectedUf: string;
  selectedCity: string;
}

const QRCode = () => {

  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(Boolean);
  const [scanned, setScanned] = useState(false);

  const handleNavigateBack = () => {
    navigation.goBack();
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = (e: any) => {
    if (scanned) {
      return
    }
    setScanned(true);
    const url = e.data; 
    navigation.navigate('Cardapio',{
      url
    })
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <AntDesign name="close" size={21} color="#17024B" style={styles.closeButton} onPress={handleNavigateBack} />
            <Text style={styles.title}>Ler QR Code</Text>
          </View>
          <Text style={styles.description}>Leia o Qr Code do estabelecimento</Text>
          <View style={styles.qrContainer}>
            <View style={styles.qrColumn} />
            <View style={styles.qrGridContainer}>
              <Image source={require('../../assets/qrGrid.png')} />
            </View>
            <View style={styles.qrColumn} />
          </View>
          <View style={styles.footer}>
            <View style={styles.hairLine}></View>
            <TouchableOpacity style={styles.footerButton} onPress={() => { }}>
              <Text style={styles.footerButtonText}>Insira o código do local</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BarCodeScanner>
      {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  title: {
    fontSize: 17,
    fontFamily: 'Roboto_700Bold',
    // marginTop: 24,
    color: '#BCBBC1',
    width: '100%',
    textAlign: 'center',
    paddingRight: 18 + 20,
    marginBottom: 16,
    // backgroundColor: '#412'
  },

  headerContainer: {
    paddingHorizontal: 18,
    paddingTop: 20 + Constants.statusBarHeight,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },

  description: {
    backgroundColor: '#fff',
    textAlign: "center",
    paddingVertical: 40,
    color: '#030303',
    fontSize: 17,
    lineHeight: 22,
  },

  closeButton: {
    width: 21,
    height: 21
  },

  qrContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  qrColumn: {
    height: 304,
    minWidth: 24,
    backgroundColor: '#fff'
  },

  qrGridContainer: {
    height: 304,
    maxWidth: 304,
    marginHorizontal: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },

  footer: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: "flex-end",
  },

  hairLine: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  footerButton: {
    height: (Platform.OS === 'ios') ? 86 : 66,
    display: 'flex',
    flexDirection: 'row',
    alignContent: "center",
    alignItems: 'center'
  },

  footerButtonText: {
    width: '100%',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: (Platform.OS === 'ios') ? 24 : 4,
    color: '#BCBBC1'
  }
});

export default QRCode;
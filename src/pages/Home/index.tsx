
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image, Alert, StatusBar, ImageSourcePropType } from 'react-native';
import Constants from 'expo-constants';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import Svg, { SvgUri, Path } from 'react-native-svg';
import api from '../../services/api';
import * as Location from 'expo-location';
import { AppRoutes } from '../../app.routes';

// import { RectButton } from 'react-native-gesture-handler';

interface Item {
  id: number;
  title: string;
  image: ImageSourcePropType;
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


const Points = () => {

  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);


  useEffect(() => { })
  // useEffect(() => {
  //   api.get('points', {
  //     params: {
  //       city: routeParams.selectedCity,
  //       uf: routeParams.selectedUf,
  //       items: selectedItems
  //     }
  //   }).then(response => {
  //     setPoints(response.data);
  //   });
  // }, [selectedItems]);



  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Ooooops...', 'Precisamos da sua permissão para obter a localização');
        return;
      }
      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setInitialPosition([
        latitude,
        longitude
      ]);


    }

    loadPosition();
  });


  useEffect(() => {
    const localItens = [{
      id: 1,
      title: 'Ler QR Code',
      image: require('../../assets/qrCode.png'),
      route: AppRoutes.QRCODE
    }, {
      id: 2,
      title: 'Teste2',
      image: require('../../assets/qrCode.png'),
      route: AppRoutes.QRCODE
    }, {
      id: 3,
      title: 'Teste3',
      image: require('../../assets/qrCode.png'),
      route: AppRoutes.QRCODE
    }]
    setItems(localItens);
    // api.get('items').then(response => {
    //   setItems(response.data);
    // });
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToPage(page: AppRoutes, id: number) {
    const thispage = page === undefined ? 'Detail' : page
    navigation.navigate(page, { point_id: id });
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }

  }

  return (
    <View style = { { backgroundColor: '#fff', flex: 1 } }>
      <StatusBar barStyle='dark-content' backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={20} color="#1E3085" onPress={handleNavigateBack} />
        </TouchableOpacity>
        <Image style={styles.logoHome} source={require('../../assets/logoAzul.png')} />

        {/* <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text> */}

        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 && (
            <MapView style={styles.map}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014
              }}
            >
              {points.map(point => (
                <Marker
                  key={String(point.id)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude
                  }}
                  style={styles.mapMarker}
                // onPress={() => handleNavigateToDetail(point.id)}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image style={styles.mapMarkerImage} source={{ uri: point.image_url }}></Image>
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                  <View style={styles.sharped}>

                  </View>

                </Marker>
              ))}
            </MapView>
          )}
        </View>

      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >

          {items.map(item => (
            <TouchableOpacity
              key={String(item.id)}
              style={[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem : {}
              ]}
              // onPress={() => handleSelectItem(item.id)}
              onPress={() => handleNavigateToPage(item.route, item.id)}
              activeOpacity={0.6}
            >
              <Image width={32} height={32} source={item.image} />
              {/* <Svg width={42} height={42}>
                <Path></Path>
              </Svg> */}
              {/* <SvgUri width={42} height={42} uri={item.image_url} /> */}
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>

  );
};









const styles = StyleSheet.create({



  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: Constants.statusBarHeight + 16,
  },

  logoHome: {
    marginVertical: 8,
    alignSelf: "center"
  },

  title: {
    fontSize: 20,
    fontFamily: 'Roboto_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20


  },
  sharped: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 8,
    alignSelf: "center",
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#34CB79',
    transform: [
      { rotate: '180deg' }
    ]

  }
  ,

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#E9E7EC',
    height: 120,
    width: 120,
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
    // alignItems: 'center',
    justifyContent: 'space-between',

    // textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'left',
    fontSize: 12,
    color: '#17024B'
  },
});

export default Points;
import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert} from "react-native";
import  MapView, {Marker,Polyline} from "react-native-maps";

function deg2rad(deg){
  return deg*(Math.PI/180)
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2){
  const R = 6371
  const dLat = deg2rad(lat2-lat1)
  const dLon = deg2rad(lon2-lon1)
  const a = 
      Math.sin(dLat/2)* 
      Math.sin(dLat/2)+
      Math.cos(deg2rad(lat1))*
      Math.cos(deg2rad(lat2))*
      Math.sin(dLon/2)*
      Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
  return R*c
}

export default function App(){
  const[markers,setMarkers] = useState([])
  const[distance, setDistance] = useState(null)
  const handleMapPress = (event)=>{
    const{latitude, longitude}= event.nativeEvent.coordinate;

    if(markers.length>=2){
      Alert.alert("Limite de marcadores")
      return 
    };

    const newMarkers = [...markers,{latitude, longitude}];
    setMarkers(newMarkers)

    if(newMarkers.length===2){
      const dist = getDistanceFromLatLonInKm(
        newMarkers[0].latitude,
        newMarkers[0].longitude,
        newMarkers[1].latitude,
        newMarkers[1].longitude
      )
      setDistance(dist.toFixed(2))
    }
  }

  const handleClear = ()=>{
    setMarkers([])
    setDistance(null)
  }

  const handleDragEnd = (index, event) =>{
    const{latitude, longitude}=event.nativeEvent.coordinate;
    const newMarkers = [...markers]
    newMarkers[index] = {latitude, longitude}
    setMarkers(newMarkers)
  }

  return(
    <View style={styles.container}>
      <View style={styles.infoBox}>
        {distance?(<Text style={styles.infoText}>Distância calculada: {distance}</Text>):
        (
          <Text style={styles.infoText}>Toque em dois pontos no mapa pra calcular a distância</Text>
        )
        }
        <TouchableOpacity style={styles.button} onPress={handleClear}> 
          <Text style={styles.buttonText}>Limpar</Text>

        </TouchableOpacity>
      </View>

      <MapView style={styles.map} onPress={handleMapPress} initialRegion={{latitude:-23.5505,longitude:-46.6333,latitudeDelta:0.05,longitudeDelta:0.05}}>

        {markers.length===2&&(
          <Polyline coordinates={markers} strokeColor="gray" strokeWidth={3}/>
        )}

        {markers.map((m,index)=>(
          <Marker
            key={index}
            coordinate={m}
            title={`Marcador ${index+1}`}
            pinColor={index === 0 ? "purple":"red"}
            draggable
            onDragEnd={(e)=>handleDragEnd(index, e)}
          />
        ))}
        
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{flex:1},
  map:{flex:1},
  infoBox:{
    position:'absolute',
    top:40,
    left:20,
    right:20,
    backgroundColor:"#000012",
    boderRadius:10,
    padding:10, 
    zIndex:1
  },
  infoText:{
    color:"#fff",
    fontSize:16,
    textAlign:'center',
    marginBottom:8
  },
  button:{
    alignSelf:'center',
    backgroundColor:'#1e90ff',
    paddingHorizontal:20,
    paddingVertical:8,
    borderRadius:8
  },
  buttonText:{
    color:"#fff",
    fontWeight:'bold'
  }
})
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,Switch, ImageBackground,FlatList, TextInput, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { photo } from './assets/img/kfc.png'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import home from './assets';
// import search from './assets';
// import notification from './assets';
// import settings from './assets';
const img = { uri: 'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5yTlnnamTd1nrgnGtTABqKSfT3b1n4D6Q7bgKzzYfCHxmuBw0am.jpg' }
const img2 = { uri: 'http://d20aeo683mqd6t.cloudfront.net/th/articles/title_images/000/038/184/medium/sushi.jpg?2019' }
const img3 = { uri: 'https://tecnogasthai.com/wp-content/uploads/2022/07/pic-01-3.png'}
const img4 = { uri: 'data:image/jpeg;base64,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'}

const DATA=[
  {
      id:'1',
      title: 'ข้าวมันไก่',
      power:'100',
      imgsrc:'data:image/jpeg;base64,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'
  },
  {
    id:'2',
    title: 'ข้าวผัด',
    power:'39',
    imgsrc:'https://www.nestleprofessional.co.th/sites/default/files/styles/np_recipe_detail/public/2022-04/resive_04062021_430x320px-2_0.png?itok=IVRT5J1c'
},
{
  id:'3',
  title:'ชุดไก่จุใจ',
  power:'199',
  imgsrc:'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5yTlnnamTd1nrgnGtTABqKSfT3b1n4D6Q7bgKzzYfCHxmuBw0am.jpg'
}
]
const stylesFlat = StyleSheet.create({
  container: {
    marginTop:30,
    padding:2
  },
  itemList:{
    // flexDirection:'row',
    backgroundColor:'#F2BFFD',
    padding:20,
    marginVertical:8,
    marginHorizontal:16,
    borderRadius:7,
  },
  tinyLogo:{
    width:100,
    height:100
  },
  text:{
    fontSize:20,
  }

});
const Item=({dataitem})=>{
return(
    <View style={stylesFlat.itemList}>
        {
          dataitem.imgsrc &&(
          <Image
          style={stylesFlat.tinyLogo}
          source={{uri:dataitem.imgsrc}}
          />
          )
        }
        <Text style={stylesFlat.text}>เมนู : {dataitem.title}</Text>
        <Text style={stylesFlat.text}>ราคา : {dataitem.power}</Text>
    </View>
)
}

export default function App() {
  const [currentTap, setCurrenTap] = useState("Home")
  const [showMenu, setShowMenu] = useState(false);

  const offsetValue = useRef(new Animated.Value(0)).current
  const scaleValue = useRef(new Animated.Value(1)).current
  const closeButtonOffset = useRef(new Animated.Value(0)).current

  // const Profile=()=>{
  //   return (
  //     <View style={styles1.container}>
  //       <ImageBackground source={image} resizeMode="cover" style={styles1.image}>
  //         <Text style={styles1.text}>Profile</Text>
  //       </ImageBackground>
  //     </View>
  //   )
  // }
  
  // const Notification=()=>{
  //   return (
  //     <NotificationComponent/>
  //     // <View style={styles1.container}>
  //     //   <ImageBackground source={image} resizeMode="cover" style={styles1.image}>
        
  //     //     <Text style={styles1.text}>Notification</Text>
  //     // </ImageBackground>
  //     // </View>
  //   )
  // }
  
  // const Setting=()=>{
  //   return (
  //     <View style={styles1.container}>
  //       <ImageBackground source={image} resizeMode="cover" style={styles1.image}>
  //       <Text style={styles1.text}>Setting</Text>
  //       </ImageBackground>
  //     </View>
  //   )
  // }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
        {/* <Image source={'md-home'} style={{
            width:60,
            height:60,
            borderRadius:10,
            marginTop:8
        }}></Image> */}

        <FontAwesome name="user-circle" size={50} marginTop={50} color="black" />

        {/* <AntDesign name="user" size={50} marginTop={8} color="black" /> */}
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 20
        }}>Jame Moriaty</Text>
        <TouchableOpacity>
          <Text style={{
            marginTop: 10,
            color: 'white'
          }}>View Profile</Text>
        </TouchableOpacity>
        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {

          }
          {TabButton(currentTap, setCurrenTap, "Home", "home")}
          {TabButton(currentTap, setCurrenTap, "Search", "search")}
          {TabButton(currentTap, setCurrenTap, "Notification", "notifications")}
          {TabButton(currentTap, setCurrenTap, "Settings", "settings")}
        </View>
        <View>
          {TabButton(currentTap, setCurrenTap, "Logout", "log-out")}
        </View>
      </View>
      {

      }
      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>
        {

        }
        <Animated.View style={{transform:[{
          translateY:closeButtonOffset
        }]}}>
            <TouchableOpacity onPress={() => {
              Animated.timing(scaleValue, {
                toValue: showMenu ? 1 : 0.88,
                duration: 300,
                useNativeDriver: true
              }).start()

              Animated.timing(offsetValue, {
                toValue: showMenu ? 0 : 230,
                duration: 300,
                useNativeDriver: true
              }).start()

              Animated.timing(closeButtonOffset, {
                toValue: !showMenu ? -30 : 0,
                duration: 300,
                useNativeDriver: true
              }).start()

              setShowMenu(!showMenu)
            }}>
            <Ionicons name="menu" size={30} color="black" style={{ marginTop: 20, }} />
            </TouchableOpacity>
            <View>
            {currentTap ==='Home' && (
                <Home/>
            )}
            {currentTap ==='Notification' &&(
                <Notification/>
            )}
            {currentTap ==='Search' &&(
              <SearchPage/>
            )}
            {currentTap ==='Settings' &&(
              <SettingsPage/>
            )}
            </View>
            
            {/* <Home1/> */}
            
          </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}

const Home = () =>{
  return(
    <View>
      <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 20
              }}>Home</Text>
        <Image source={img} style={{
                marginLeft: 11.5,
                width: 360,
                height: 300,
                borderRadius: 15,
                marginTop: 20
              }}></Image>
        <Text style={{
                fontSize: 25,
                fontWeight: 'bold',
                paddingTop: 15,
                paddingLeft: 15,
                paddingBottom: 8
              }}>ชุดไก่จุใจ</Text>

        <Image source={img2} style={{
                marginLeft: 11.5,
                width: 360,
                height: 300,
                borderRadius: 15,
                marginTop: 20
              }}></Image>
        <Text style={{
                fontSize: 25,
                fontWeight: 'bold',
                paddingTop: 15,
                paddingLeft: 15,
                paddingBottom: 8
              }}>ซูชิ</Text>
    </View>
    
  )
}

const Notification = () =>{
  const rederItem=({item})=>(
    <Item dataitem={item}/>
  )
  return(
    <View style={stylesFlat.container}>
      <FlatList
        data={DATA}
        renderItem={rederItem}
        keyExtractor={item=>item.id}
      />
    </View>
  )
}

const SettingsPage = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <View >
      <Text style={styles2.sectionTitle}>Notifications</Text>
      <View style={styles2.optionContainer}>
        <Text style={styles2.optionText}>Enable Push Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Text style={styles2.sectionTitle}>Privacy</Text>
      <View style={styles2.optionContainer}>
        <Text style={styles2.optionText}>Allow Location Access</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

const SearchPage = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for', query);
    // Make an API call or perform search logic here
  };

  return (
    <View style={styles1.container}>
      <Text style={styles1.heading}>Search Page</Text>
      <TextInput
        style={styles1.input}
        onChangeText={setQuery}
        value={query}
        placeholder="Search"
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const TabButton = (currentTap, setCurrenTap, title, image) => {
  return (
    <TouchableOpacity onPress={() => {
      if (title == "Logout") {

      }
      else {
        setCurrenTap(title)
      }
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTap == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>
        <Ionicons name={image} size={25} marginTop={8} color="black" />
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTap == title ? "#7A00DB" : "white"
        }}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}
const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
  },
});

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7A00DB',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

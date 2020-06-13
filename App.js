console.disableYellowBox = true

// React import
import React,{ Component } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

// navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,CardStyleInterpolators  } from '@react-navigation/stack';

// Tabbar import
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import HomeScreen from './src/screen/homeScreen';
import VideoListScreen from './src/screen/videoListScreen';
import VideoScreen from './src/screen/videoScreen';

// Common Import
import { BLUE_COLOR, WHITE_COLOR, BACK_ICON, HOME_ICON, DOWNLOAD_ICON, ABOUT_ICON } from './src/common/constant';

const HomeStack = createStackNavigator();
function homeStackScreen() {
	return (
		<HomeStack.Navigator initialRouteName='Home'>
				<HomeStack.Screen 
					name='Home'
					component={HomeScreen}
					options={{
						header: () => false,
						cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
					}}
				/>
				<HomeStack.Screen 
					name='VideoList'
					component={VideoListScreen}
					options={({navigation,route}) => ({
						title: route.params != undefined ? route.params.title : '',
						cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
						headerTitleAlign:'center',
						headerTitleStyle: {
							color: WHITE_COLOR
						},
						headerStyle:{
							backgroundColor: BLUE_COLOR,
						},
						headerLeft:() => (
							<TouchableOpacity
								onPress={() => navigation.goBack()}
							>
								<Image 
									source={BACK_ICON}
									style={styles.backIconStyle}
								/>
							</TouchableOpacity>
						)
					})}
				/>
				<HomeStack.Screen 
					name='VideoPlayer'
					component={VideoScreen}
					options={{
						header: () => false,
						cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
					}}
				/>
			</HomeStack.Navigator>
	)
}

// Tab bar Constant
const Tab = createBottomTabNavigator()

// Function to hide Tabbar on Certain Screens
function getTabBarVisible(route) {
	const routeName = route.state
		?  route.state.routes[route.state.index].name
		: route.params?.screen || 'Home' || 'Download' || 'About';
	if (routeName === 'VideoList'
		|| routeName === 'VideoPlayer'
	) {
		return false;
	}
	return true;
}
function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				tabBarOptions={{
					showLabel: false,
				}}
			>
				<Tab.Screen
					name='Home'
					component={homeStackScreen}
					options={({route}) => ({
						tabBarVisible:getTabBarVisible(route),
						tabBarIcon:({focused}) => (
							<Image source={HOME_ICON} style={{height:25,width:25,tintColor: focused ? BLUE_COLOR : 'grey'}} />
						)
						
					})}
				/>

				<Tab.Screen
					name='Download'
					component={homeStackScreen}
					options={({route}) => ({
						//tabBarVisible:getTabBarVisible(route),
						tabBarIcon:({focused}) => (
							<Image source={DOWNLOAD_ICON} style={{height:25,width:25,tintColor: focused ? BLUE_COLOR : 'grey'}} />
						)
						
					})}
				/>

				<Tab.Screen
					name='About'
					component={homeStackScreen}
					options={({route}) => ({
						//tabBarVisible:getTabBarVisible(route),
						tabBarIcon:({focused}) => (
							<Image source={ABOUT_ICON} style={{height:25,width:25,tintColor: focused ? BLUE_COLOR : 'grey'}} />
						)
						
					})}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	backIconStyle: {
		height:24,
		width:24,
		resizeMode:'contain',
		marginLeft:10
	}
})

export default App;
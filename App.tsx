import "./global.css";
import { useState, createContext, useEffect, useMemo, useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "./src/Context/AuthContext";

import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import AnalyticScreen from "./src/screens/AnalyticScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ActivityScreen from "./src/screens/ActivityScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

export type RootStackParamList = {
  Login: undefined;
  MainApp: undefined;
  Detail: { id: number; name: string };
};

export type RootTabParamList = {
  HomeTab: undefined;
  AnalyticTab: undefined;
  ProfileTab: undefined;
  ActivityTab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "AnalyticTab") {
            iconName = focused ? "analytics-sharp" : "analytics-outline";
          } else if (route.name === "ActivityTab") {
            iconName = focused
              ? "notifications-sharp"
              : "notifications-outline";
          } else if (route.name === "ProfileTab") {
            iconName = focused ? "person-sharp" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#9f4200",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#f0e9de" },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: "Home", headerShown: false }}
      />
      <Tab.Screen
        name="AnalyticTab"
        component={AnalyticScreen}
        options={{ title: "Analytics", headerShown: false }}
      />
      <Tab.Screen
        name="ActivityTab"
        component={ActivityScreen}
        options={{ title: "Activity" }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: "Profile", headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        setUserToken(token);
      } catch (error) {
        console.log("Failed to fetch token");
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (token: string) => {
        await SecureStore.setItemAsync("token", token);
        setUserToken(token);
      },

      signOut: async () => {
        await SecureStore.deleteItemAsync("token");
        setUserToken(null);
      },
    }),
    [],
  );
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {userToken == null ? (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="MainApp"
                component={BottomTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{
                  title: "Product Information",
                  headerStyle: {
                    backgroundColor: "blue",
                  },
                  headerTintColor: "white",
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

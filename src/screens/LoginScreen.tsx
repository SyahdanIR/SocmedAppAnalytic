import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../Services/AuthService";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../Context/AuthContext";

const LoginScreen = ({ navigation }: any) => {
  const [emailorusername, setEmailorUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!emailorusername || !password) {
      Alert.alert("Error", "Field can't empty");
      return;
    }
    try {
      const response = await login(emailorusername, password);
      const data = response.data;
      const token = response.token;
      console.log(token);
      signIn(token);

      // Navigate to Dashboard after successful login
      // navigation.navigate('Dashboard');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Something is Wrong";
      Alert.alert("Login Failed", errorMessage);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fcf9f8]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">
          <View className="flex-1 justify-center items-center py-12">
            {/* Logo and Brand */}
            <View className="items-center mb-2">
              <View className="overflow-hidden items-center justify-center mb-2">
                <Image
                  source={require("../assets/logo-rill.png")}
                  className="w-16 h-16"
                />
              </View>
            </View>

            {/* Welcome Text */}
            <View className="w-full mb-10 items-center">
              <Text className="text-3xl font-bold text-[#1a1a1a] mb-2">
                Welcome Back
              </Text>
              <Text className="text-base text-[#8c7867]">
                Please enter your details to sign in
              </Text>
            </View>

            {/* Form */}
            <View className="w-full space-y-6">
              {/* Email/Username Input */}
              <View>
                <Text className="text-sm font-semibold text-[#4A3728] mb-2 ml-1">
                  Email or Username
                </Text>
                <View className="flex-row items-center bg-white border border-[#e8e2d9] rounded-2xl px-4 h-14 mb-4 shadow-sm">
                  <Mail size={20} color="#8c7867" />
                  <TextInput
                    className="flex-1 ml-3 text-base text-[#1a1a1a]"
                    placeholder="Email or Username"
                    placeholderTextColor="#a89a8e"
                    autoCapitalize="none"
                    value={emailorusername}
                    onChangeText={setEmailorUsername}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-[#4A3728] mb-2 ml-1">
                  Password
                </Text>
                <View className="flex-row items-center bg-white border border-[#e8e2d9] rounded-2xl px-4 h-14 shadow-sm">
                  <Lock size={20} color="#8c7867" />
                  <TextInput
                    className="flex-1 ml-3 text-base text-[#1a1a1a]"
                    placeholder="••••••••"
                    placeholderTextColor="#a89a8e"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color="#8c7867" />
                    ) : (
                      <Eye size={20} color="#8c7867" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Sign In Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleLogin}
                className="w-full h-14 rounded-2xl items-center justify-center shadow-lg shadow-orange-500/30 mt-4"
              >
                <LinearGradient
                  colors={["#b34d00", "#c25600"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    width: "100%",
                    height: 56,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Sign In
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#fcf9f8] dark:bg-slate-800">
      <Image
        source={require("../assets/Logo-full.png")}
        className="w-[300px] h-[100px]"
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

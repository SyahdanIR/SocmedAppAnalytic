import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

export default function DetailScreen({ route, navigation }: Props) {
  const { id, name } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={[style.productCard]}>
        <Text>Product ID: {id}</Text>
        <Text>Product Name: {name}</Text>
      </View>
      <Button title="Go to Home" onPress={() => navigation.goBack()} />
    </View>
  );
}

const style = StyleSheet.create({
  productCard: {
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    borderTopWidth: 1,
    marginBottom: 15,
    padding: 5,
  },
});

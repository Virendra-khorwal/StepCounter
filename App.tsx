import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

type ValueProps = {
  label: string;
  value: string;
};

const Value = ({ label, value }: ValueProps) => {
  return (
    <View style={styles.valueContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>

      <View style={{ flexDirection: "row" }}>
        <Value label="Steps" value="1219" />
        <Value label="Distance" value="0,75 km" />
      </View>

      <Value label="Flights Climbed" value="0,75 km" />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // alignItems: 'center',
    justifyContent: "center",
    padding: 12,
  },
  valueContainer: {
    marginRight: 20,
    marginVertical: 10,
  },
  label: {
    color: "#fff",
    fontSize: 20,
  },
  value: {
    fontSize: 35,
    color: "#AFB3BE",
    fontWeight: "500",
  },
});

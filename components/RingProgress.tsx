import { StyleSheet, Text, View } from "react-native";
import SVG, {Circle} from "react-native-svg";

type RingProgressProps = {
  radius?: number;
  strokeWidth?: number;
  progress: number;
};

const color = "#EE0F55";

const RingProgress = ({ radius = 100, strokeWidth=35, progress }: RingProgressProps) => {

  const innerRadius = radius - strokeWidth / 2;
  const circumference = innerRadius * 2 * Math.PI;

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        alignSelf: "center",
      }}
    >
      <SVG>
        <Circle
          r={innerRadius}
          cx={radius}
          cy={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          opacity={0.2}
        />
        <Circle
          originX={radius}
          originY={radius}
          r={innerRadius}
          cx={radius}
          cy={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={[circumference * progress, circumference]}
          rotation={-90}
        />
      </SVG>
    </View>
  );
};

export default RingProgress;

const styles = StyleSheet.create({});

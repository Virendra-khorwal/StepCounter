import { StyleSheet, Text, View } from "react-native";
import SVG, { Circle, CircleProps } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type RingProgressProps = {
  radius?: number;
  strokeWidth?: number;
  progress: number;
};

const color = "#EE0F55";

const RingProgress = ({
  radius = 100,
  strokeWidth = 35,
  progress,
}: RingProgressProps) => {
  const innerRadius = radius - strokeWidth / 2;
  const circumference = innerRadius * 2 * Math.PI;

  const fill = useSharedValue(0);

  const circleDefaultProps : CircleProps = {
    r: innerRadius,
    cx: radius,
    cy: radius,
    stroke: color,
    strokeWidth: strokeWidth,
    originX: radius,
    originY: radius,
    strokeLinecap :"round",
  };

  useEffect(() => {
    fill.value = withTiming(progress, { duration: 1500 });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [circumference * fill.value, circumference],
  }));

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        alignSelf: "center",
      }}
    >
      <SVG>
        <Circle {...circleDefaultProps} opacity={0.2} />
        <AnimatedCircle
          animatedProps={animatedProps}
          {...circleDefaultProps}
          rotation={-90}
        />
      </SVG>
      <Ionicons name="arrow-forward-outline" size={strokeWidth * 0.8} color="black" style={[styles.arrowStyle, {top: strokeWidth*0.1}]} />
    </View>
  );
};

export default RingProgress;

const styles = StyleSheet.create({
  arrowStyle: {
    position: "absolute",
    alignSelf: "center",
  }
});

import { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Styles } from "../styles/GlobalStyles";

interface ButtonProps {
  onPress: () => void;
  title: string;
  isBlue?: boolean;
  isGray?: boolean;
  isLight?: boolean;
  isDark?: boolean;
}

export default function Button({
  title,
  onPress,
  isBlue,
  isGray,
  isLight,
  isDark,
}: ButtonProps) {
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={
        isBlue
          ? Styles.btnBlue
          : isGray
          ? Styles.btnGray
          : isLight
          ? Styles.btnLight
          : isDark
          ? Styles.btnDark
          : Styles.btnLight
      }
      onPress={onPress}
    >
      <Text style={{ fontSize: 19, fontWeight: "bold" }}>{title}</Text>
    </TouchableOpacity>
  );
}

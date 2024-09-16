import * as React from "react";
import Button from "./Button";
import { View, Text } from "react-native";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";

export default function MyKeyboard() {
  const [firstNumber, setFirstNumber] = React.useState("");
  const [secondNumber, setSecondNumber] = React.useState("");
  const [operation, setOperation] = React.useState("");
  const [result, setResult] = React.useState<number | null>(null);

  const handleNumberPress = (buttonValue: string) => {
    if (result !== null) {
      setResult(null);
    }
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };
  const handleOperationPress = (buttonValue: string) => {
    if (buttonValue === "+/-" && (firstNumber !== "" || result != 0)) {
      if (firstNumber === "" && result !== null) {
        setResult(result * -1);
      } else {
        setFirstNumber((parseInt(firstNumber) * -1).toString());
      }
    } else if (buttonValue !== "+/-") {
      setOperation(buttonValue);
      if (firstNumber === "" && result !== null) {
        setSecondNumber(result.toString());
        setResult(null);
      } else {
        setSecondNumber(firstNumber);
        setFirstNumber("");
      }
    }
  };

  const clear = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setResult(null);
  };

  const getResult = () => {
    switch (operation) {
      case "+":
        clear();
        setResult(
          parseFloat(
            (parseFloat(secondNumber) + parseFloat(firstNumber)).toFixed(5)
          )
        );
        break;
      case "-":
        clear();
        setResult(
          parseFloat(
            (parseFloat(secondNumber) - parseFloat(firstNumber)).toFixed(5)
          )
        );
        break;
      case "*":
        clear();
        setResult(
          parseFloat(
            (parseFloat(secondNumber) * parseFloat(firstNumber)).toFixed(5)
          )
        );
        break;
      case "/":
        clear();
        setResult(
          parseFloat(
            (parseFloat(secondNumber) / parseFloat(firstNumber)).toFixed(5)
          )
        );
        break;
      case "%":
        clear();
        setResult(
          parseFloat(
            (
              (parseFloat(secondNumber) / 100) *
              parseFloat(firstNumber)
            ).toFixed(5)
          )
        );
        break;
      default:
        clear();
        if (result === null) {
          setResult(parseFloat(firstNumber));
        } else {
          setResult(result);
        }
        break;
    }
  };

  const firstNumberDisplay = () => {
    if (result !== null) {
      return (
        <Text
          style={
            result.toString().length < 6
              ? [Styles.screenFirstNumber, { color: myColors.result }]
              : [
                  Styles.screenFirstNumber,
                  { fontSize: 50, color: myColors.result },
                ]
          }
        >
          {result?.toString()}
        </Text>
      );
    }

    if (firstNumber && firstNumber.length < 6) {
      return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>;
    }
    if (firstNumber === "") {
      return <Text style={Styles.screenFirstNumber}>{"0"}</Text>;
    }
    if (firstNumber.length > 5 && firstNumber.length < 8) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>
          {firstNumber}
        </Text>
      );
    }
    if (firstNumber.length > 7) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 50 }]}>
          {firstNumber}
        </Text>
      );
    }
  };

  return (
    <View style={Styles.viewBottom}>
      <View
        style={{
          height: 120,
          width: "90%",
          justifyContent: "flex-end",
          alignSelf: "center",
        }}
      >
        <Text style={Styles.screenSecondNumber}>
          {secondNumber}
          <Text style={{ color: "purple", fontSize: 50, fontWeight: "500" }}>
            {operation}
          </Text>
        </Text>
        {firstNumberDisplay()}
      </View>
      <View style={Styles.row}>
        <Button title="C" isGray onPress={clear} />
        <Button
          title="+/-"
          isGray
          onPress={() => handleOperationPress("+/-")}
        />
        <Button title="%" isGray onPress={() => handleOperationPress("%")} />
        <Button title="/" isGray onPress={() => handleOperationPress("/")} />
      </View>
      <View style={Styles.row}>
        <Button title="7" isLight onPress={() => handleNumberPress("7")} />
        <Button title="8" isLight onPress={() => handleNumberPress("8")} />
        <Button title="9" isLight onPress={() => handleNumberPress("9")} />
        <Button title="*" isBlue onPress={() => handleOperationPress("*")} />
      </View>
      <View style={Styles.row}>
        <Button title="4" isLight onPress={() => handleNumberPress("4")} />
        <Button title="5" isLight onPress={() => handleNumberPress("5")} />
        <Button title="6" isLight onPress={() => handleNumberPress("6")} />
        <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
      </View>
      <View style={Styles.row}>
        <Button title="1" isLight onPress={() => handleNumberPress("1")} />
        <Button title="2" isLight onPress={() => handleNumberPress("2")} />
        <Button title="3" isLight onPress={() => handleNumberPress("3")} />
        <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
      </View>
      <View style={Styles.row}>
        <Button title="." onPress={() => handleNumberPress(".")} />
        <Button title="0" onPress={() => handleNumberPress("0")} />
        <Button
          title="CE"
          onPress={() => setFirstNumber(firstNumber.slice(0, -1))}
        />
        <Button title="=" isBlue onPress={() => getResult()} />
      </View>
    </View>
  );
}

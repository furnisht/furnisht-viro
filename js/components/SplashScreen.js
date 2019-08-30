import React, { Component } from "react";
import { View, Image } from "react-native";
import styles from "../../styles";

export default class SplashScreen extends Component {
  render() {
    const viewStyles = [styles.container, { backgroundColor: "#5e59a1" }];

    return (
      <View style={viewStyles}>
        <Image
          source={require("../res/splash.png")}
          style={{ width: "95%", height: "98%" }}
        />
      </View>
    );
  }
}

import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Instructions } from "./js/components/Instructions";
import { FurnitureScreen } from "./js/components/FurnitureScreen";
import { Overlay } from "react-native-elements";

import { ViroARSceneNavigator } from "react-viro";

var sharedProps = {
  apiKey: "8C55396A-5FCB-4D94-B114-2F823C35529C"
};

var InitialARScene = require("./js/components/HomeScreen");

export default class Main extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: "",
      sharedProps: sharedProps,
      furnishScreen: false
    };

    this._exitViro = this._exitViro.bind(this);
    this.furnishButton = this.furnishButton.bind(this);
  }

  furnishButton = () => {
    this.setState({ furnishScreen: !this.state.furnishScreen });
  };

  render() {
    return (
      <View style={styles.outer}>
        <ViroARSceneNavigator
          style={styles.arView}
          {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }}
        />
        <Instructions />
        {this.state.furnishScreen && (
          <FurnitureScreen visible={this.state.furnishScreen} />
        )}
        <View style={styles.navBar}>
          <TouchableOpacity>
            <Text style={styles.titleText}>Floor Plan</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.titleText} onPress={this.furnishButton}>
              Furnish
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.titleText}>Project</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }
}

module.exports = Main;

import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { Instructions } from "./js/components/Instructions";
import { FurnitureScreen } from "./js/components/FurnitureScreen";

import  FloorPlanScreen  from "./js/components/FloorPlanScreenAR"

import { Overlay } from "react-native-elements";

import { ViroARSceneNavigator } from "react-viro";
//
var sharedProps = {
  apiKey: "8C55396A-5FCB-4D94-B114-2F823C35529C"
};

var InitialARScene = require("./js/components/FurnitureScreenAR");
var FloorPlanScreenAR = require("./js/components/FloorPlanScreenAR")

export default class Main extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: "",
      sharedProps: sharedProps,
      furnishScreen: false,
      floorPlanScreen: false,
      homeScreen: true
    };

    this._exitViro = this._exitViro.bind(this);
    this.furnishButton = this.furnishButton.bind(this);
    this.floorPlanButton = this.floorPlanButton.bind(this)

    this.homeScreenButtons = this.homeScreenButtons.bind(this);
    this.floorPlanScreenButtons = this.floorPlanScreenButtons.bind(this);

    this.furnishStateToggle = this.furnishStateToggle.bind(this)
  }

  furnishButton = () => {
    this.setState({ furnishScreen: !this.state.furnishScreen, homeScreen: false });
  };

  floorPlanButton = () => {
    this.setState({ floorPlanScreen: !this.state.floorPlanScreen, homeScreen: false });
  };

  render() {
    return (
      <View style={styles.outer}>

        {/* <Instructions /> */}

        <ViroARSceneNavigator
          style={styles.arView}
          {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }}
          />

        {this.state.furnishScreen && (
          <FurnitureScreen toggleVisibility={this.furnishStateToggle}/>
        )}

        {this.state.floorPlanScreen && (
          <FloorPlanScreen />
        )}

        {this.state.floorPlanScreen && (this.floorPlanScreenButtons())}
        {this.state.furnishScreen && (this.homeScreenButtons())}
        {this.homeScreenButtons()}
      </View>
    );
  }

  homeScreenButtons() {
    return (
      <View style={styles.navBar}>
          <TouchableOpacity>
            <Text style={styles.titleText} onPress={this.floorPlanButton}>Floor Plan</Text>
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
    )
  }
  //undo button needs onPress, onPress={this.submitFloorPlan}, onPress={this.renderNode()}
  floorPlanScreenButtons() {
    return (
      <View style={styles.navBar}>
          <TouchableOpacity>
            <Text style={styles.titleText}>Undo</Text>
          </TouchableOpacity>

          <TouchableOpacity >
            <Image source={require("./js/res/check-mark-button.png")} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.titleText} >
              New Marker
            </Text>
          </TouchableOpacity>
        </View>
    )
  }

  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }

  furnishStateToggle() {
    this.setState({furnishScreen: !this.state.furnishScreen})
  }

  // floorStateToggle() {
  //   this.setState({floorPlanScreen: !this.state.floorPlanScreen})
  // }

}

module.exports = Main;
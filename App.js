import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { Instructions } from "./js/components/Instructions";
import { FurnitureScreen } from "./js/components/FurnitureScreen";
import { key } from "./secrets";
import { ngrokKey } from "./secrets";
import axios from "axios";

import FloorPlanScreen from "./js/components/FloorPlanScreenAR";

import { Overlay } from "react-native-elements";

import { ViroARSceneNavigator } from "react-viro";

const sharedProps = {
  apiKey: key
};

const InitialARScene = require("./js/components/FurnitureScreenAR");
// var FloorPlanScreenAR = require("./js/components/FloorPlanScreenAR");

export default class Main extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: "",
      sharedProps: sharedProps,
      furnishScreen: false,
      floorPlanScreen: false,
      homeScreen: true,
      projectScreen: false
    };

    this._exitViro = this._exitViro.bind(this);
    this.furnishOverlay = this.furnishOverlay.bind(this);

    this.homeScreenButtons = this.homeScreenButtons.bind(this);
    this.floorPlanScreenButtons = this.floorPlanScreenButtons.bind(this);
    this.projectScreenButtons = this.projectScreenButtons.bind(this);
    this.projectButton = this.projectButton.bind(this);

    this.furnishStateToggle = this.furnishStateToggle.bind(this);
    this.floorStateToggle = this.floorStateToggle.bind(this);
    this.projectStateToggle = this.projectStateToggle.bind(this);
  }
  //toggle furnish screen
  furnishOverlay = () => {
    this.setState({
      furnishScreen: !this.state.furnishScreen,
      homeScreen: false
    });
  };
  //toggle floor plan screen
  floorPlanButton = () => {
    this.setState({
      floorPlanScreen: !this.state.floorPlanScreen,
      homeScreen: false
    });
  };

  projectButton = () => {
    this.setState({
      projectScreen: !this.state.projectScreen,
      homeScreen: false
    });
  };

  homeScreenButtons() {
    return (
      <View style={styles.navBar}>
        <TouchableOpacity>
          <Text style={styles.titleText} onPress={this.floorPlanButton}>
            Floor Plan
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.titleText} onPress={this.furnishOverlay}>
            Furnish
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.titleText} onPress={this.projectButton}>
            Project
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  floorPlanScreenButtons() {
    return (
      <View style={styles.floorPlanNav}>
        <TouchableOpacity onPress={this.floorStateToggle}>
          <Image source={require("./js/res/go-back-left-arrow.png")} />
        </TouchableOpacity>
      </View>
    );
  }

  projectScreenButtons() {
    return (
      <View style={styles.floorPlanNav}>
        <TouchableOpacity onPress={this.projectStateToggle}>
          <Image source={require("./js/res/go-back-left-arrow.png")} />
        </TouchableOpacity>
      </View>
    );
  }
  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }

  furnishStateToggle() {
    this.setState({
      furnishScreen: !this.state.furnishScreen,
      homeScreen: !this.state.homeScreen
    });
  }

  floorStateToggle() {
    this.setState({
      floorPlanScreen: !this.state.floorPlanScreen,
      homeScreen: !this.state.homeScreen
    });
  }

  projectStateToggle() {
    this.setState({
      projectScreen: !this.state.projectScreen,
      homeScreen: true
    });
  }

  render() {
    return (
      <View style={styles.outer}>
        {/* <Instructions /> */}

        {this.state.homeScreen && (
          <ViroARSceneNavigator
            style={styles.arView}
            {...this.state.sharedProps}
            initialScene={{ scene: InitialARScene }}
            //autoFocus={false}
          />
        )}

        {this.state.furnishScreen && (
          <ViroARSceneNavigator
            style={styles.arView}
            {...this.state.sharedProps}
            initialScene={{ scene: InitialARScene }}
            //autofocus={false}
          />
        )}

        {this.state.floorPlanScreen && (
          <ViroARSceneNavigator
            style={styles.arView}
            {...this.state.sharedProps}
            initialScene={{ scene: FloorPlanScreen }}
            viroAppProps={{
              nodes: this.state.fPNodes,
              editCurrentNode: this.editCurrentNode
            }}
            //autofocus={false}
          />
        )}

        {this.state.floorPlanScreen && this.floorPlanScreenButtons()}
        {this.state.furnishScreen && (
          <FurnitureScreen toggleVisibility={this.furnishStateToggle} />
        )}
        {this.state.furnishScreen && this.homeScreenButtons()}
        {this.state.homeScreen && this.homeScreenButtons()}

        {this.state.projectScreen && (
          <ViroARSceneNavigator
            style={styles.arView}
            {...this.state.sharedProps}
            initialScene={{ scene: require("./js/components/DefaultScreen") }}
            //autofocus={false}
          />
        )}

        {this.state.projectScreen && this.projectScreenButtons()}
      </View>
    );
  }
}

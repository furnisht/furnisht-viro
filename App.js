import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { Instructions } from "./js/components/Instructions";
import { FurnitureScreen } from "./js/components/FurnitureScreen";
import { key } from "./secrets";
import axios from "axios";

import FloorPlanScreen from "./js/components/FloorPlanScreenAR";

import { Overlay } from "react-native-elements";

import { ViroARSceneNavigator } from "react-viro";
//
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
      fPNodes: [{ x: 0, y: 0, z: 1, key: 0 }]
    };

    this._exitViro = this._exitViro.bind(this);
    this.furnishButton = this.furnishButton.bind(this);

    this.homeScreenButtons = this.homeScreenButtons.bind(this);
    this.floorPlanScreenButtons = this.floorPlanScreenButtons.bind(this);

    this.furnishStateToggle = this.furnishStateToggle.bind(this);
    this.floorStateToggle = this.floorStateToggle.bind(this);
    this.newFPNodeButton = this.newFPNodeButton.bind(this);
    this.deleteFPNodeButton = this.deleteFPNodeButton.bind(this);
    this.createFloorPlan = this.createFloorPlan.bind(this);
  }

  furnishButton = () => {
    this.setState({
      furnishScreen: !this.state.furnishScreen,
      homeScreen: false
    });
  };

  floorPlanButton = () => {
    this.setState({
      floorPlanScreen: !this.state.floorPlanScreen,
      homeScreen: false
    });
  };

  newFPNodeButton() {
    let newArr = this.state.fPNodes;
    const mostRecentNode = newArr[newArr.length - 1];
    newArr.push({
      x: mostRecentNode.x + 0.1,
      y: mostRecentNode.y,
      z: mostRecentNode.z,
      key: mostRecentNode.key + 1
    });
    this.setState({
      fPNodes: newArr
    });
  }

  deleteFPNodeButton() {
    let newArr = this.state.fPNodes;
    newArr.pop();
    this.setState({
      fPNodes: newArr
    });
  }

  async createFloorPlan() {
    const newNodes = this.state.fPNodes.map(node => {
      return { x: node.x, y: node.z };
    });
    const { data } = await axios.post("/api/floorplans", {
      coordinates: newNodes,
      userId: 1
    });
    this.setState({ fPNodes: [{ x: 0, y: 0, z: 1, key: 0 }] });
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
          />
        )}

        {this.state.furnishScreen && (
          <ViroARSceneNavigator
            style={styles.arView}
            {...this.state.sharedProps}
            initialScene={{ scene: InitialARScene }}
          />
        )}

        {this.state.floorPlanScreen && (
          <ViroARSceneNavigator
            style={styles.arView}
            {...this.state.sharedProps}
            initialScene={{ scene: FloorPlanScreen }}
            viroAppProps={{ nodes: this.state.fPNodes }}
          />
        )}

        {this.state.floorPlanScreen && this.floorPlanScreenButtons()}
        {this.state.furnishScreen && (
          <FurnitureScreen toggleVisibility={this.furnishStateToggle} />
        )}
        {this.state.furnishScreen && this.homeScreenButtons()}
        {this.state.homeScreen && this.homeScreenButtons()}
      </View>
    );
  }

  homeScreenButtons() {
    return (
      <View style={styles.navBar}>
        <TouchableOpacity>
          <Text style={styles.titleText} onPress={this.floorPlanButton}>
            Floor Plan
          </Text>
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
    );
  }
  //undo button needs onPress, onPress={this.submitFloorPlan}, onPress={this.renderNode()}
  floorPlanScreenButtons() {
    return (
      <View style={styles.navBar}>
        <TouchableOpacity onPress={this.floorStateToggle}>
          <Image source={require("./js/res/go-back-left-arrow.png")} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.titleText} onPress={this.deleteFPNodeButton}>
            Undo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.createFloorPlan}>
          <Image source={require("./js/res/check-mark-button.png")} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.titleText} onPress={this.newFPNodeButton}>
            New Marker
          </Text>
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
}

module.exports = Main;

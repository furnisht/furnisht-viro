import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Picker } from "react-native";
import styles from "./styles";
import { Instructions } from "./js/components/Instructions";
import { FurnitureScreen } from "./js/components/FurnitureScreen";
import { SavedProjects } from "./js/components/SavedProjects";
import { key, ngrokKey } from "./secrets";
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
      projectScreen: false,
      floorPlanScreen: false,
      homeScreen: true,
      fPNodes: [{ x: 0, y: 0, z: 1, key: 0 }],
      room: "Bedroom"
    };

    this._exitViro = this._exitViro.bind(this);
    this.furnishButton = this.furnishButton.bind(this);
    this.projectButton = this.projectButton.bind(this);

    this.homeScreenButtons = this.homeScreenButtons.bind(this);
    this.floorPlanScreenButtons = this.floorPlanScreenButtons.bind(this);
    this.projectButton = this.projectButton.bind(this);

    this.furnishStateToggle = this.furnishStateToggle.bind(this);
    this.projectStateToggle = this.projectStateToggle.bind(this);
    this.floorStateToggle = this.floorStateToggle.bind(this);
    this.newFPNodeButton = this.newFPNodeButton.bind(this);
    this.deleteFPNodeButton = this.deleteFPNodeButton.bind(this);
    this.createFloorPlan = this.createFloorPlan.bind(this);
    this.editCurrentNode = this.editCurrentNode.bind(this);
    this.getArea = this.getArea.bind(this);
  }

  furnishButton = () => {
    this.setState({
      furnishScreen: !this.state.furnishScreen,
      homeScreen: false
    });
  };

  projectButton = () => {
    this.setState({
      projectScreen: !this.state.projectScreen,
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

    if (newArr.length) {
      const mostRecentNode = newArr[newArr.length - 1];
      newArr.push({
        x: mostRecentNode.x + 0.1,
        y: mostRecentNode.y,
        z: mostRecentNode.z,
        key: mostRecentNode.key + 1
      });
    } else {
      newArr.push({
        x: 0,
        y: 0,
        z: 0,
        key: 0
      });
    }

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
    const { data } = await axios.post(`${ngrokKey}/api/floorplans`, {
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

        {this.state.projectScreen && (
          <ViroARSceneNavigator
            style={styles.arView}
            {...this.state.sharedProps}
            initialScene={{ scene: InitialARScene }}
            viroAppProps={{
              room: this.state.room
            }}
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
          />
        )}

        {this.state.floorPlanScreen && this.floorPlanScreenButtons()}
        {this.state.furnishScreen && (
          <FurnitureScreen toggleVisibility={this.furnishStateToggle} />
        )}
        {this.state.projectScreen && (
          <Overlay
            isVisible={this.state.projectScreen}
            overlayBackgroundColor="rgba(160, 87, 162, 0.9)"
            overlayStyle={{
              position: "absolute",
              flex: 1,
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity onPress={this.projectStateToggle}>
              <Image
                source={require("./js/res/go-back-left-arrow.png")}
                style={{ marginRight: 290 }}
              />
            </TouchableOpacity>

            <Text
              style={{
                width: "90%",
                fontSize: 24,
                fonWeight: "bold",
                fontFamily: "arial",
                alignSelf: "center"
              }}
            >
              Which project would you like to view?
            </Text>
            <Picker
              selectedValue={this.state.room}
              style={{
                height: 44,
                width: "100%",
                alignSelf: "center",
                marginBottom: 30
              }}
              itemStyle={{ height: 44 }}
              onValueChange={(value, idx) => this.setState({ room: value })}
            >
              <Picker.Item label="Living Room" value="livingroom" />
              <Picker.Item label="Bedroom" value="bedroom" />
              <Picker.Item label="Kitchen" value="Kitchen" />
              <Picker.Item label="Dining Room" value="diningroom" />
              <Picker.Item label="Other" value="other" />
            </Picker>
            <TouchableOpacity
              // onPress={this.chooseProject(1, this.state.room)}
              style={{ alignSelf: "center" }}
            >
              <Image source={require("./js/res/check-mark-1.png")} />
            </TouchableOpacity>
          </Overlay>
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
          <Text style={styles.titleText} onPress={this.projectButton}>
            Projects
          </Text>
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

  editCurrentNode(currentNode) {
    let newArr = this.state.fPNodes;
    let current = newArr.map(node => {
      if (node.key === currentNode.key) {
        node = {
          x: currentNode.x,
          y: currentNode.y,
          z: currentNode.z,
          key: node.key
        };
      }
      return node;
    });
    this.setState({ fPNodes: current });
  }

  getDistances(pointsArr) {
    let distances = [];
    let j = pointsArr.length - 1;
    for (let i = 0; i < pointsArr.length; i++) {
      let xPart = Math.pow(pointsArr[i].x - pointsArr[j].x, 2);
      let yPart = Math.pow(pointsArr[i].y - pointsArr[j].y, 2);
      distances[i] = Math.sqrt(xPart + yPart);
      j = i;
    }
    return distances;
  }

  getArea(pointsArr, numPoints) {
    let area = 0;
    let j = numPoints - 1;
    for (i = 0; i < numPoints; i++) {
      area =
        area +
        (pointsArr[j].x + pointsArr[i].x) * (pointsArr[j].y - pointsArr[i].y);
      j = i;
    }
    return Math.abs(area / 2);
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

  projectStateToggle() {
    this.setState({
      projectScreen: !this.state.projectScreen,
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

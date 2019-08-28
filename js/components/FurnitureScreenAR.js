"use strict";
import React, { Component } from "react";
import styles from "../../styles";
import {
  StyleSheet,
  AppRegistry,
  Text,
  View,
  Image,
  Modal,
  PixelRatio,
  TouchableHighlight,
  TouchableOpacity,
  Picker
} from "react-native";
import { Overlay } from "react-native-elements";
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations
} from "react-viro";
import axios from "axios";
import { ngrokKey } from "../../secrets";

export default class FurnitureScreenAR extends Component {
  constructor() {
    super();
    this.state = {
      text: "Loading Furniture Screen",
      items: [
      ],
      rotation: [0, 0.7, 0],
      // visibleChoice: false (for overlay, might not need)
    };

    this._onInitialized = this._onInitialized.bind(this);
    // this._onDrag = this._onDrag.bind(this);
    // this._onRotate = this._onRotate.bind(this);
  }

  async componentDidMount() {
    const furniture = await axios.get(`${ngrokKey}/api/furniture/1`);
    this.setState({ items: furniture.data });
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({ text:"furniture screen AR" });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        {this.state.items &&
          this.state.items.map(item => {
            if (item.type === "Couch") {
              return (
                <ViroBox
                  height={item.dimensions.x * 0.3048}
                  length={item.dimensions.y * 0.3048}
                  width={item.dimensions.z * 0.3048}
                  // height={(item.dimensions.x * 0.3048) / 10}
                  // length={(item.dimensions.y * 0.3048) / 10}
                  // width={(item.dimensions.z * 0.3048) / 10}
                  // onRotate={this._onRotate}
                  materials={["couch"]}
                  dragType="FixedToWorld"
                  onDrag={()=>{}}
                  // rotation={this.state.rotation}
                />
              );
            } else if (item.type === "Table") {
              return (
                <ViroBox
                  height={item.dimensions.x * 0.3048}
                  length={item.dimensions.y * 0.3048}
                  width={item.dimensions.z * 0.3048}
                  // height={(item.dimensions.x * 0.3048) / 10}
                  // length={(item.dimensions.y * 0.3048) / 10}
                  // width={(item.dimensions.z * 0.3048) / 10}
                  // onRotate={this._onRotate}
                  position={[0, 0, -1]}
                  materials={["table"]}
                  dragType="FixedToWorld"
                  onDrag={()=>{}}
                  // rotation={this.state.rotation}
                />
              );
            } else if (item.type === "Bed") {
              return (
                <ViroBox
                  height={item.dimensions.x * 0.3048}
                  length={item.dimensions.y * 0.3048}
                  width={item.dimensions.z * 0.3048}
                  // height={(item.dimensions.x * 0.3048) / 10}
                  // length={(item.dimensions.y * 0.3048) / 10}
                  // width={(item.dimensions.z * 0.3048) / 10}
                  // onRotate={this._onRotate}
                  materials={["bed"]}
                  dragType="FixedToWorld"
                  onDrag={()=>{}}
                  // rotation={this.state.rotation}
                />
              );
            } else {
              return (
                <ViroBox
                  height={+item.dimensions.x * 0.3048}
                  length={+item.dimensions.y * 0.3048}
                  width={+item.dimensions.z * 0.3048}
                  // height={(item.dimensions.x * 0.3048) / 10}
                  // length={(item.dimensions.y * 0.3048) / 10}
                  // width={(item.dimensions.z * 0.3048) / 10}
                  // onRotate={this._onRotate}
                  materials={["table"]}
                  dragType="FixedToWorld"
                  onDrag={()=>{}}
                  // rotation={this.state.rotation}
                />
              );
            }
          })}
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true}
        />
      </ViroARScene>
    );
  }

}

ViroMaterials.createMaterials({
  couch: {
    diffuseTexture: require("../res/couch.png")
  },
  bed: {
    diffuseTexture: require("../res/bed.png")
  },
  table: {
    diffuseTexture: require("../res/table.png")
  },
  other: {
    diffuseTexture: require("../res/other.png")
  }
});

module.exports = FurnitureScreenAR;

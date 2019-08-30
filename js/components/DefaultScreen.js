"use strict";
import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
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
  ViroPolygon,
  ViroAnimations
} from "react-viro";
import axios from "axios";
import { ngrokKey } from "../../secrets";

export default class DefaultScreen extends Component {
  constructor() {
    super();
    this.state = {
      text: "Initializing AR...",
      items: [],
      rooms: []
    };
    this._onInitialized = this._onInitialized.bind(this);
  }

  async componentDidMount() {
    const furniture = await axios.get(`${ngrokKey}/api/furniture/1`);
    const rooms = await axios.get(`${ngrokKey}/api/floorplans/1`);

    let newArr = [];
    for (let i = 0; i < rooms.data.length; i++) {
      newArr[i] = [];
      for (let j = 0; j < rooms.data[i].coordinates.length; j++) {
        newArr[i].push([
          rooms.data[i].coordinates[j].x,
          rooms.data[i].coordinates[j].y
        ]);
      }
    }
    this.setState({ items: furniture.data, rooms: newArr });
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({ text: "HI" });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  _onRotate = (rotateState, rotationFactor, source, key) => {
    this[`_ViroPolygon${key}`].setNativeProps({
      rotation: [-90, 0 + rotationFactor, 0]
    });
  };

  _onRotateItems = (rotateState, rotationFactor, source, key) => {
    this[`_ViroBox${key}`].setNativeProps({
      rotation: [0, 0 + rotationFactor, 0]
    });
  };

  render() {
    let counter = 0;
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color='#ffffff'
          castsShadow={true}
        />

        {this.state.rooms &&
          this.state.rooms.map((room, idx) => {
            counter++;
            return (
              <ViroPolygon
                position={[0, -1, -1]}
                rotation={[-90, 0, 0]}
                vertices={room}
                key={idx}
                scale={[0.15, 0.15, 0.15]}
                materials={"grid"}
                ref={VR => (this[`_ViroPolygon${idx}`] = VR)}
                onRotate={(rotateState, rotationFactor, source) =>
                  this._onRotate(rotateState, rotationFactor, source, idx)
                }
                onDrag={() => {}}
                dragType={"FixedToWorld"}
              />
            );
          })}

        {this.state.items &&
          this.state.items.map((item, idx) => {
            if (item.type === "Couch") {
              return (
                <ViroNode
                  position={[-1, -0.5, -1]}
                  key={item.id}
                  dragType='FixedToWorld'
                  onDrag={() => {}}
                  ref={VB => (this[`_ViroBox${idx}`] = VB)}
                  onRotate={(rotateState, rotationFactor, source) =>
                    this._onRotateItems(
                      rotateState,
                      rotationFactor,
                      source,
                      idx
                    )
                  }>
                  <ViroBox
                    width={item.dimensions.x * 0.3048}
                    height={item.dimensions.y * 0.3048}
                    length={item.dimensions.z * 0.3048}
                    scale={[0.2, 0.2, 0.2]}
                    materials={["couch"]}
                    position={[0, (item.dimensions.y * 0.3048 * 0.2) / 2, 0]}
                    // rotation={this.state.rotation}
                    opacity={0.7}
                  />
                </ViroNode>
              );
            } else if (item.type === "Table") {
              return (
                <ViroNode
                  position={[-0.5, -0.5, -1]}
                  key={item.id}
                  dragType='FixedToWorld'
                  onDrag={() => {}}
                  ref={VB => (this[`_ViroBox${idx}`] = VB)}
                  onRotate={(rotateState, rotationFactor, source) =>
                    this._onRotateItems(
                      rotateState,
                      rotationFactor,
                      source,
                      idx
                    )
                  }>
                  <ViroBox
                    width={item.dimensions.x * 0.3048}
                    height={item.dimensions.y * 0.3048}
                    length={item.dimensions.z * 0.3048}
                    scale={[0.2, 0.2, 0.2]}
                    materials={["table"]}
                    position={[0, (item.dimensions.y * 0.3048 * 0.2) / 2, 0]}
                    // rotation={this.state.rotation}
                    opacity={0.7}
                  />
                </ViroNode>
              );
            } else if (item.type === "Bed") {
              return (
                <ViroNode
                  position={[0, -0.5, -1]}
                  key={item.id}
                  dragType='FixedToWorld'
                  onDrag={() => {}}
                  ref={VB => (this[`_ViroBox${idx}`] = VB)}
                  onRotate={(rotateState, rotationFactor, source) =>
                    this._onRotateItems(
                      rotateState,
                      rotationFactor,
                      source,
                      idx
                    )
                  }>
                  <ViroBox
                    width={item.dimensions.x * 0.3048}
                    height={item.dimensions.y * 0.3048}
                    length={item.dimensions.z * 0.3048}
                    scale={[0.2, 0.2, 0.2]}
                    materials={["bed"]}
                    position={[0, (item.dimensions.y * 0.3048 * 0.2) / 2, 0]}
                    // rotation={this.state.rotation}
                    opacity={0.7}
                  />
                </ViroNode>
              );
            } else {
              return (
                <ViroNode
                  position={[0.5, -0.5, -1]}
                  key={item.id}
                  dragType='FixedToWorld'
                  onDrag={() => {}}
                  ref={VB => (this[`_ViroBox${idx}`] = VB)}
                  onRotate={(rotateState, rotationFactor, source) =>
                    this._onRotateItems(
                      rotateState,
                      rotationFactor,
                      source,
                      idx
                    )
                  }>
                  <ViroBox
                    width={item.dimensions.x * 0.3048}
                    height={item.dimensions.y * 0.3048}
                    length={item.dimensions.z * 0.3048}
                    scale={[0.2, 0.2, 0.2]}
                    materials={["other"]}
                    position={[0, (item.dimensions.y * 0.3048 * 0.2) / 2, 0]}
                    // rotation={this.state.rotation}
                    opacity={0.7}
                  />
                </ViroNode>
              );
            }
          })}
      </ViroARScene>
    );
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});
ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require("../res/blueprint.png")
  },
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

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90",
      rotateX: "+=90",
      rotateZ: "+=90"
    },
    duration: 1000 //.25 seconds
  }
});

module.exports = DefaultScreen;

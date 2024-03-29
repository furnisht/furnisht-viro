"use strict";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
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
  ViroAnimations,
  ViroButton,
  ViroPolygon,
  setNativeProps
} from "react-viro";
import { ngrokKey } from "../../secrets";
import axios from "axios";

export default class FloorPlanScreen extends Component {
  constructor() {
    super();
    // Set initial state here
    this.state = {
      text: "Initializing AR Scene",
      nodes: [{ x: 0, y: 0, z: -1, key: 0 }],
      vertices: [],
      area: "Here's Area"
    };
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onDrag = this._onDrag.bind(this);
    this.renderNode = this.renderNode.bind(this);
    this._onButtonTap = this._onButtonTap.bind(this);
    this.addNode = this.addNode.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.submitFloorPlan = this.submitFloorPlan.bind(this);
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Welcome to Floor Plan"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  _onButtonTap() {
    if (this.state.nodes.length > 0) {
      this.setState({
        text: "clicked",
        nodes: [
          ...this.state.nodes,
          { x: 0, y: -0.1, z: -1, key: this.state.nodes.length }
        ]
      });
    } else {
      this.setState({
        text: "clicked",
        nodes: [{ x: 0, y: -0.5, z: 0, key: 0 }]
      });
    }
  }

  addNode(position, source) {
    if (this.state.nodes.length > 0) {
      this.setState({
        text: "clicked",
        nodes: [
          ...this.state.nodes,
          { x: 0, y: -0.1, z: -1, key: this.state.nodes.length }
        ]
      });
    } else {
      this.setState({
        text: "clicked",
        nodes: [{ x: 0, y: -0.5, z: 0, key: 0 }]
      });
    }
  }

  _onDrag(draggedToPosition, source) {
    let currentNode = this.state.nodes[this.state.nodes.length - 1];
    let newArr = this.state.nodes;
    let currentArr = newArr.map(node => {
      if (node.key === currentNode.key) {
        node = {
          x: draggedToPosition[0],
          y: draggedToPosition[1],
          z: draggedToPosition[2],
          key: node.key
        };
      }
      return node;
    });
    this.setState({ nodes: currentArr });
  }

  _onRotate = (rotateState, rotationFactor, source) => {
    this._ViroPolygon.setNativeProps({
      rotation: [-90, 0 + rotationFactor, 0]
    });
  };

  deleteNode() {
    let newNodes = [...this.state.nodes];
    newNodes.pop();
    this.setState({
      nodes: newNodes
    });
  }

  async submitFloorPlan() {
    let initialVert = [];
    const submitNodes = this.state.nodes.map(node => {
      initialVert.push([node.x / 5, node.z / 5]);
      return { x: node.x, y: node.z };
    });
    this.setState({ vertices: initialVert });
    await axios.post(`${ngrokKey}/api/floorplans`, {
      coordinates: submitNodes,
      userId: 1
    });
    let area = this.getArea(initialVert) * 100 * 3.28;
    let updatedArea = area.toFixed(2);
    this.setState({
      nodes: [{ x: 0, y: 0, z: 1, key: 0 }],
      area: `Area: ${updatedArea} sq. ft`
    });
  }

  getArea(pointsArr) {
    let area = 0;
    let j = pointsArr.length - 1;
    for (let i = 0; i < pointsArr.length; i++) {
      area =
        area +
        (pointsArr[j][0] + pointsArr[i][0]) *
          (pointsArr[j][1] - pointsArr[i][1]);
      j = i;
    }
    return Math.abs(area / 2);
  }

  renderNode(x, y, z, key) {
    return (
      <ViroNode
        position={[x, y, z]}
        key={key}
        dragType='FixedToWorld'
        onDrag={this._onDrag}>
        <Viro3DObject
          source={require("../res/arrow.obj")}
          resources={[require("../res/arrow.mtl")]}
          position={[0, 0, 0.1]}
          scale={[0.2, 0.2, 0.2]}
          type='OBJ'
        />
      </ViroNode>
    );
  }
  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          text={this.state.area}
          scale={[0.2, 0.2, 0.1]}
          position={[0, 0.3, -0.5]}
          style={styles.helloWorldTextStyle}
          transformBehaviors={["billboard"]}
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
        <ViroButton
          source={require("../res/plus.png")}
          tapSource={require("../res/plus-click.png")}
          position={[0, 0.2, -0.5]}
          height={0.1}
          width={0.1}
          onTap={this._onButtonTap}
          onClick={this.addNode}
          transformBehaviors={["billboard"]}
        />
        <ViroButton
          source={require("../res/minus.png")}
          tapSource={require("../res/minus-click.png")}
          position={[0, 0, -0.5]}
          height={0.1}
          width={0.1}
          onTap={this._onButtonTap}
          onClick={this.deleteNode}
          transformBehaviors={["billboard"]}
        />

        <ViroButton
          source={require("../res/check.png")}
          tapSource={require("../res/check-click-black.png")}
          position={[0, -0.2, -0.5]}
          height={0.1}
          width={0.1}
          onTap={this._onButtonTap}
          onClick={this.submitFloorPlan}
          transformBehaviors={["billboard"]}
        />

        {this.state.vertices.length > 0 && (
          <ViroPolygon
            rotation={this.state.rotation}
            position={[0, 0, 0]}
            vertices={this.state.vertices}
            materials={"grid"}
            ref={VR => (this._ViroPolygon = VR)}
            onRotate={this._onRotate}
            onDrag={() => {}}
            dragType={"FixedToWorld"}
          />
        )}
        {this.state.nodes &&
          this.state.nodes.map((node, idx) => {
            return this.renderNode(node.x, node.y, node.z, idx);
          })}
      </ViroARScene>
    );
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 20,
    color: "#00FA9A",
    textAlignVertical: "center",
    textAlign: "center"
  }
});
ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require("../res/blueprint.png")
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
module.exports = FloorPlanScreen;

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
  ViroButton
} from "react-viro";
import { ngrokKey } from "../../secrets";
import axios from "axios";

class FloorPlanScreen extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR Scene",
      nodes: [{ x: 0, y: 0, z: -1, key: 0 }]
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

  deleteNode() {
    let newNodes = [...this.state.nodes];
    newNodes.pop();
    this.setState({
      nodes: newNodes
    });
  }

  async submitFloorPlan() {
    const submitNodes = this.state.nodes.map(node => {
      return { x: node.x, y: node.z };
    });
    await axios.post(`${ngrokKey}/api/floorplans`, {
      coordinates: submitNodes,
      userId: 1
    });
    this.setState({ nodes: [{ x: 0, y: 0, z: 1, key: 0 }] });
  }

  renderNode(x, y, z, key) {
    return (
      <ViroNode
        position={[x, y, z]}
        key={key}
        dragType='FixedToWorld'
        onDrag={this._onDrag}>
        <Viro3DObject
          source={require("../res/emoji_smile/emoji_smile.vrx")}
          resources={[
            require("../res/emoji_smile/emoji_smile_diffuse.png"),
            require("../res/emoji_smile/emoji_smile_normal.png"),
            require("../res/emoji_smile/emoji_smile_specular.png")
          ]}
          position={[0, 0, 0.1]}
          scale={[0.2, 0.2, 0.2]}
          type='VRX'
        />
      </ViroNode>
    );
  }
  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.2, 0.2, 0.1]}
          position={[0, 0.3, -0.5]}
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
        <ViroText
          text='New Node'
          scale={[0.2, 0.2, 0.2]}
          position={[0, 0.1, -0.5]}
          style={styles.helloWorldTextStyle}
          transformBehaviors={["billboard"]}
        />
        <ViroButton
          source={require("../res/check-mark-1.png")}
          tapSource={require("../res/check-mark-pressed.png")}
          position={[0, 0, -0.5]}
          height={0.1}
          width={0.1}
          transformBehaviors={["billboard"]}
          onTap={this._onButtonTap}
          onClick={this.addNode}
        />
        <ViroText
          text='Undo'
          scale={[0.2, 0.2, 0.2]}
          position={[0, -0.1, -0.5]}
          style={styles.helloWorldTextStyle}
          transformBehaviors={["billboard"]}
        />
        <ViroButton
          source={require("../res/check-mark-1.png")}
          tapSource={require("../res/check-mark-pressed.png")}
          position={[0, -0.2, -0.5]}
          height={0.1}
          width={0.1}
          transformBehaviors={["billboard"]}
          onTap={this._onButtonTap}
          onClick={this.deleteNode}
        />
        <ViroText
          text='Submit Floor Plan'
          scale={[0.2, 0.2, 0.2]}
          position={[0, -0.3, -0.5]}
          style={styles.helloWorldTextStyle}
          transformBehaviors={["billboard"]}
        />
        <ViroButton
          source={require("../res/check-mark-1.png")}
          tapSource={require("../res/check-mark-pressed.png")}
          position={[0, -0.5, -0.5]}
          height={0.1}
          width={0.1}
          transformBehaviors={["billboard"]}
          onTap={this._onButtonTap}
          onClick={this.submitFloorPlan}
        />
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
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});
ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require("../res/grid_bg.jpg")
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

const mapStateToProps = state => ({
  fPNodes: state.fPNodes
});

const mapDispatchToProps = dispatch => ({
  editFPNode: node => dispatch(editFPNode(node))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FloorPlanScreen);

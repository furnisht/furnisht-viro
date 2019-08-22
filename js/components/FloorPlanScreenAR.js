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
  ViroAnimations
} from "react-viro";
import { editFPNode } from "../store/floorplan";
import { connect } from "react-redux";

class FloorPlanScreen extends Component {
  constructor() {
    super();
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onDrag = this._onDrag.bind(this);
    this.renderNode = this.renderNode.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.2, 0.2, 0.2]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
        {/* <ViroBox
          position={[0, -0.5, -1]}
          scale={[0.3, 0.3, 0.1]}
          materials={["grid"]}
          dragType="FixedToWorld"
        onDrag={this._onDrag}
          animation={{ name: "rotate", run: true, loop: true }}
        /> */}
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true}
        />
        {this.state.nodes &&
          this.state.nodes.map((node, idx) => {
            return this.renderNode(node.x, node.y, node.z, idx);
          })}
        {/* {this.renderNode(0, -1, 0)} */}
      </ViroARScene>
    );
  }
  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "floorPlanScreenAR",
        nodes: this.props.sceneNavigator.viroAppProps.nodes
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
  _onDrag(draggedToPosition, source) {
    this.setState({
      text: `X: ${Math.round(draggedToPosition[0] * 10)}, Y: ${Math.round(
        draggedToPosition[1] * 10
      )}, Z: ${Math.round(draggedToPosition[2] * 10)}`
    });
    this.props.editFPNode({
      x: draggedToPosition[0],
      y: draggedToPosition[1],
      z: draggedToPosition[2],
      key: this.props.fPNodes.length - 1
    });
  }

  _onClick(position, source) {
    // this.props.sceneNavigator.viroAppProps.editCurrentNode({x: position, y: position, z: position, key: 1})
  }

  renderNode(x, y, z, key) {
    return (
      <ViroNode
        position={[x, y, z]}
        key={key}
        dragType="FixedToWorld"
        onDrag={this._onDrag}
      >
        <Viro3DObject
          source={require("../res/emoji_smile/emoji_smile.vrx")}
          resources={[
            require("../res/emoji_smile/emoji_smile_diffuse.png"),
            require("../res/emoji_smile/emoji_smile_normal.png"),
            require("../res/emoji_smile/emoji_smile_specular.png")
          ]}
          position={[0, 0, 0.1]}
          scale={[0.2, 0.2, 0.2]}
          type="VRX"
        />
      </ViroNode>
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

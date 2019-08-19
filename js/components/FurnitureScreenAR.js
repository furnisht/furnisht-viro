"use strict";
import React, { Component } from "react";
import styles from "../../styles";
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

export default class FurnitureScreenAR extends Component {
  constructor() {
    super();
    // Set initial state here
    this.state = {
      text: "Initializing AR..."
      // nodes: [{ x: 0, y: 0, z: 1, key: 0 }]
    };
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    // this._onDrag = this._onDrag.bind(this);
    // this._onClick = this._onClick.bind(this);
  }
  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
        {/* <ViroBox
          position={[0, -0.5, -1]}
          scale={[0.3, 0.3, 0.1]}
          materials={["grid"]}
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
        {/* {this.state.nodes &&
          this.state.nodes.map((node, idx) => {
            return this.renderNode(node.x, node.y, node.z, idx);
          })} */}
        {/* {this.renderNode(0, -1, 0)} */}
      </ViroARScene>
    );
  }
  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({ text:"furniture screen AR" });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
  // _onDrag(draggedToPosition, source) {
  //   this.setState({
  //     text: `X: ${Math.round(draggedToPosition[0] * 10)}, Y: ${Math.round(
  //       draggedToPosition[1] * 10
  //     )}, Z: ${Math.round(draggedToPosition[2] * 10)}`
  //   });
  // }

  // renderNode = (x, y, z, key) => {
  //   return (
  //     <ViroNode
  //       position={[x, y, z]}
  //       key={key}
  //       dragType="FixedToWorld"
  //       onDrag={this._onDrag}
  //       onClick={this._onClick}
  //     >
  //       <ViroText
  //         text={this.state.text}
  //         scale={[0.3, 0.3, 0.3]}
  //         position={[0, 0.4, 0]}
  //         style={styles.helloWorldTextStyle}
  //       />
  //       <Viro3DObject
  //         source={require("../res/emoji_smile/emoji_smile.vrx")}
  //         resources={[
  //           require("../res/emoji_smile/emoji_smile_diffuse.png"),
  //           require("../res/emoji_smile/emoji_smile_normal.png"),
  //           require("../res/emoji_smile/emoji_smile_specular.png")
  //         ]}
  //         position={[0, 0, 0.1]}
  //         scale={[0.2, 0.2, 0.2]}
  //         type="VRX"
  //       />
  //     </ViroNode>
  //   );
  // };
}
// var styles = StyleSheet.create({
//   helloWorldTextStyle: {
//     fontFamily: "Arial",
//     fontSize: 30,
//     color: "#ffffff",
//     textAlignVertical: "center",
//     textAlign: "center"
//   }
// });
// ViroMaterials.createMaterials({
//   grid: {
//     diffuseTexture: require("../res/grid_bg.jpg")
//   }
// });
// ViroAnimations.registerAnimations({
//   rotate: {
//     properties: {
//       rotateY: "+=90",
//       rotateX: "+=90",
//       rotateZ: "+=90"
//     },
//     duration: 1000 //.25 seconds
//   }
// });
module.exports = FurnitureScreenAR;

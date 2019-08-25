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
import axios from "axios";
import { ngrokKey } from "../../secrets";

class FurnitureScreenAR extends Component {
  constructor() {
    super();
    // Set initial state here
    this.state = {
      text: "",
      items: [
        {
          type: "Couch",
          name: "living room couch",
          dimensions: {
            x: 5,
            y: 7,
            z: 2
          }
        },
        {
          type: "Bed",
          name: "master bed",
          dimensions: {
            x: 2,
            y: 4,
            z: 2
          }
        }
      ],
      rotation: [0, 0.7, 0]
      // nodes: [{ x: 0, y: 0, z: 1, key: 0 }]
    };
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onDrag = this._onDrag.bind(this);
    this._onRotate = this._onRotate.bind(this);
  }
  async componentDidMount() {
    const furniture = await axios.get(`${ngrokKey}/api/furniture`, {
      params: {
        userId: 1
      }
    });
    this.setState({ items: furniture.data });
  }

  _onRotate(rotateState, rotationFactor, source) {
    if (rotateState === 3) {
      this.setState({
        rotation: [0, rotationFactor, 0]
      });
    }
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
        {this.state.items &&
          this.state.items.map(item => {
            if (item.type === "Couch") {
              return (
                <ViroBox
                  height={item.dimensions.x * 0.3048}
                  length={item.dimensions.y * 0.3048}
                  width={item.dimensions.z * 0.3048}
                  onRotate={this._onRotate}
                  materials={["couch"]}
                  dragType="FixedToWorld"
                  onDrag={this._onDrag}
                  rotation={this.state.rotation}
                />
                // <Viro3DObject
                //   source={require("../res/couch.obj")}
                //   height={item.dimensions.x * 0.3048}
                //   length={item.dimensions.y * 0.3048}
                //   width={item.dimensions.z * 0.3048}
                //   onRotate={this._onRotate}
                //   scale={[1, 1, 1]}
                //   materials={["couch"]}
                //   dragType="FixedToWorld"
                //   rotation={this.state.rotation}
                //   onDrag={this._onDrag}
                //   type="OBJ"
                // />
              );
            } else if (item.type === "Table") {
              return (
                <ViroBox
                  height={item.dimensions.x * 0.3048}
                  length={item.dimensions.y * 0.3048}
                  width={item.dimensions.z * 0.3048}
                  onRotate={this._onRotate}
                  materials={["table"]}
                  dragType="FixedToWorld"
                  onDrag={this._onDrag}
                  rotation={this.state.rotation}
                />
              );
            } else if (item.type === "Bed") {
              return (
                <ViroBox
                  height={item.dimensions.x * 0.3048}
                  length={item.dimensions.y * 0.3048}
                  width={item.dimensions.z * 0.3048}
                  onRotate={this._onRotate}
                  materials={["table"]}
                  dragType="FixedToWorld"
                  onDrag={this._onDrag}
                  rotation={this.state.rotation}
                />
              );
            } else {
              return (
                <ViroBox
                  height={item.dimensions.x * 0.3048}
                  length={item.dimensions.y * 0.3048}
                  width={item.dimensions.z * 0.3048}
                  onRotate={this._onRotate}
                  materials={["table"]}
                  dragType="FixedToWorld"
                  onDrag={this._onDrag}
                  rotation={this.state.rotation}
                />
              );
            }
          })}

        {/* <ViroBox
          height={3 * 0.3048}
          length={2 * 0.3048}
          width={3 * 0.3048}
          materials={["couch"]}
          dragType="FixedToWorld"
          onDrag={this._onDrag}
          onRotate={this._onRotate}
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
      </ViroARScene>
    );
  }
  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({ text: "furniture screen AR" });
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
  }
}

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

// var styles = StyleSheet.create({
//   helloWorldTextStyle: {
//     fontFamily: "Arial",
//     fontSize: 30,
//     color: "#ffffff",
//     textAlignVertical: "center",
//     textAlign: "center"
//   }
// });
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

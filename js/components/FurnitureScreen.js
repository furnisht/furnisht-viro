import React, { Component } from "react";
import styles from "../../styles";
import {
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
import {
  FormLabel,
  Button,
  Overlay,
  Input,
  Icon,
  FormValidationMessage
} from "react-native-elements";
import axios from "axios";
import { ngrokKey } from "../../secrets";

export class FurnitureScreen extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.state = {
      widthText: "4",
      heightText: "3",
      depthText: "2.5",
      visible: true,
      typeofItem: "Couch"
    };
    this.onBack = this.onBack.bind(this);
    this.submitFurniture = this.submitFurniture.bind(this);
  }

  onBack = () => {
    this.props.toggleVisibility();
  };

  async submitFurniture() {
    try {
      await axios.post(`${ngrokKey}/api/furniture`, {
        type: this.state.typeofItem,
        dimensions: {
          x: +this.state.widthText,
          y: +this.state.heightText,
          z: +this.state.depthText
        },
        userId: 1
      });
      this.props.toggleVisibility();
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    return (
      <Overlay
        isVisible={this.state.visible}
        overlayBackgroundColor="rgba(0,128,128, 0.9)"
        fullScreen={true}
        overlayStyle={{
          position: "absolute",
          flex: 1,
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity onPress={this.onBack}>
            <Image
              source={require("../res/go-back-left-arrow.png")}
              style={{ marginRight: 290 }}
            />
          </TouchableOpacity>
          {/* <Text style={{ fontSize: 16, fontFamily: "arial" }}>
            Measure the dimensions of furniture you own:
          </Text>
          <TouchableOpacity onPress={this.onPress}>
            <Image source={require("../res/photo-camera.png")} />
          </TouchableOpacity> */}
          <Text
            style={{
              width: "90%",
              fontSize: 24,
              fontFamily: "arial"
            }}
          >
            1. Select type of furniture:
          </Text>
          <Picker
            selectedValue={this.state.typeofItem}
            style={{
              height: 44,
              width: "100%",
              alignSelf: "center"
            }}
            itemStyle={{ height: 44 }}
            onValueChange={(value, idx) => this.setState({ typeofItem: value })}
          >
            <Picker.Item label="Couch" value="Couch" />
            <Picker.Item label="Bed" value="Bed" />
            <Picker.Item label="Table" value="Table" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
          <View
            style={{
              marginBottom: 10,
              marginRight: 15
            }}
          >
            <Text
              style={{
                width: "80%",
                fontSize: 24,
                fontFamily: "arial",
                marginBottom: 15
              }}
            >
              2. Input dimensions (in feet):
            </Text>
            <Input
              onChangeText={widthText => this.setState({ widthText })}
              value={this.state.widthText}
              label="width"
            />
            <Input
              onChangeText={heightText => this.setState({ heightText })}
              value={this.state.heightText}
              label="height"
            />
            <Input
              onChangeText={depthText => this.setState({ depthText })}
              value={this.state.depthText}
              label="depth"
            />
          </View>
          <TouchableOpacity
            onPress={this.submitFurniture}
            style={{ alignSelf: "center" }}
          >
            <Image source={require("../res/check-click-black.png")} />
          </TouchableOpacity>
        </View>
      </Overlay>
    );
  }
}

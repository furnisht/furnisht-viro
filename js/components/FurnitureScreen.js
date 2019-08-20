/* eslint-disable semi */
import React from "react";
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
import Display from "react-native-display";

export class FurnitureScreen extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.state = {
      widthText: "4",
      heightText: "3",
      depthText: "2.5",
      visible: true,
      typeofItem: "cube"
    };
    this.onBack = this.onBack.bind(this);
    //this.submitItem = this.submitItem.bind(this)
  }

  // //submitItem = () => {
  //   //put thunk here to add an item to a project board
  // }
  onBack = () => {
    this.props.toggleVisibility();
  };

  render() {
    return (
      <Overlay
        isVisible={this.state.visible}
        overlayBackgroundColor="rgba(0,128,128, 0.5)"
        style={{
          width: 450,
          height: 450,
          marginBottom: 250,
          flex: 1,
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <TouchableOpacity onPress={this.onBack}>
            <Image
              source={require("../res/go-back-left-arrow.png")}
              style={{ marginRight: 290 }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontFamily: "arial" }}>
            Measure the dimensions of furniture you own:
          </Text>
          <TouchableOpacity onPress={this.onPress}>
            <Image source={require("../res/photo-camera.png")} />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontFamily: "arial" }}>
            OR input the dimensions manually (in feet):
          </Text>
          <Picker
            selectedValue={this.state.typeofItem}
            style={{ height: 50, width: 100, marginBottom: 25 }}
            onValueChange={(value, idx) => this.setState({ typeofItem: value })}
          >
            <Picker.Item label="Couch" value="couch" />
            <Picker.Item label="Bed" value="bed" />
            <Picker.Item label="Table" value="table" />
            <Picker.Item label="Other" value="cube" />
          </Picker>

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
          <TouchableOpacity onPress={this.submitFurniture}>
            <Image source={require("../res/check-mark-button.png")} />
          </TouchableOpacity>
        </View>
      </Overlay>
    );
  }
}

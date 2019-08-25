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
import axios from "axios";
import { ngrokKey } from "../../secrets";

export class SavedProjects extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.state = {
      visible: true,
      room: "Living Room"
    };
    this.onBack = this.onBack.bind(this);
    // this.chooseProject = this.chooseProject.bind(this);
  }

  // //submitItem = () => {
  //   //put thunk here to add an item to a project board
  // }
  onBack = () => {
    this.props.toggleVisibility();
  };

  //   async chooseProject(userId, roomName) {
  //     try {
  //       let { data } = await axios.get(
  //         `${ngrokKey}/api/furniture/${userId}/${roomName}`
  //       );
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }

  render() {
    return (
      <Overlay
        isVisible={this.state.visible}
        overlayBackgroundColor="rgba(160, 87, 162, 0.9)"
        overlayStyle={{
          position: "absolute",
          flex: 1,
          justifyContent: "space-between"
        }}
      >
        <TouchableOpacity onPress={this.onBack}>
          <Image
            source={require("../res/go-back-left-arrow.png")}
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
          <Image source={require("../res/check-mark-1.png")} />
        </TouchableOpacity>
      </Overlay>
    );
  }
}

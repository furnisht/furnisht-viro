/* eslint-disable semi */
import React from "react";
import styles from "../../styles";
import {
  AppRegistry,
  Text,
  View,
  Modal,
  PixelRatio,
  TouchableHighlight,
  TouchableOpacity,
  TextInput
} from "react-native";
import {
  FormLabel,
  Button,
  Input,
  Icon,
  FormValidationMessage
} from "react-native-elements";

export class FurnitureScreen extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.state = {
      widthText: "4",
      heightText: "3",
      depthText: "2.5"
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <Text style={{ fontSize: 24, fontFamily: "arial" }}>
          Measure the dimensions of furniture you own:
        </Text>
        <Icon
          name="sc-telegram"
          type="evilicon"
          size={30}
          color="#900"
          style={{ fontFamily: "arial" }}
        />
        <Text style={{ fontSize: 24, fontFamily: "arial" }}>
          OR input the dimensions manually (in feet):
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
        <Button style={styles.exitButton} title="Submit" />
      </View>
    );
  }
}

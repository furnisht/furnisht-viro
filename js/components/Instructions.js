import React from "react";
import styles from "../../styles";
import {
  AppRegistry,
  Text,
  View,
  Modal,
  PixelRatio,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";

export class Instructions extends React.Component {
  constructor() {
    super();

    this.state = {
      firstTime: true
    };
  }

  setModalVisible(visible) {
    this.setState({ firstTime: visible });
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.firstTime}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={{ marginTop: 22 }}>
          <View>
            <Text>Watch the instructional below!</Text>

            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(!this.state.firstTime);
              }}
            >
              <Text>I've seen enough, get me out of here...</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}

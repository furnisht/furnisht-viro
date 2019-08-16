import React from "react";
import styles from "../../styles";
import {
  AppRegistry,
  Button,
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
        <View style={styles.modalStyle}>
          <View style={styles.containerStyle}>
            <Text style={styles.dialogueText}>
              New to the app? Watch the instructional below!
            </Text>

            <View style={styles.buttonContainer}>
              <Button
                raised
                icon={{ name: "Close" }}
                title="I've seen enough, get me out.."
                backgroundColor="#2196F3"
                onPress={() => {
                  this.setModalVisible(!this.state.firstTime);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

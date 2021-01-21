import * as React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const CreatePost = (props) => {
  const [content, setContent] = React.useState("");

  return (
    <View>
      <View style={styles.input}>
        <TextInput
          value={content}
          placeholder="Enter a new post"
          onChange={(e) => setContent(e.target.value)}
        />
        <View style={[styles.button, styles.alignCenter]}>
          <Text> Image </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "grey",
    height: 100,
    width: "auto",
  },
  alignCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 30,
    width: 80,
    borderWidth: 1,
    borderColor: "#282c34",
    color: "#fff",
    fontSize: 16,
    borderRadius: 3,
  },
});

export default CreatePost;

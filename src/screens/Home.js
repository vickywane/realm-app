import * as React from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { gql, useQuery } from "@apollo/client";

const { height, width } = Dimensions.get("screen");

const DOCUMENT_QUERY = gql`
    query {
        offlineRealmApps {
            _id
            img_uri
        }
    }
`;

const Home = (props) => {
  const { data, loading, error } = useQuery(DOCUMENT_QUERY);
  if (loading) {
    return (
      <View style={{ height, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="blue" />
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "#fff", height }}>
      <FlatList
        data={data.offlineRealmApps}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.alignCenter}>
            <View style={styles.post} key={item.id}>
              <Image
                source={{ uri: item.img_uri }}
                resizeMode="contain"
                style={styles.img}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 250,
    width: width - 5,
    borderRadius: 5,
  },
  alignCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  posts: {
    display: "flex",
    flexDirection: "column",
    marginVertical: 5,
  },
  post: {
    width: width - 10,
    borderRadius: 7,
    display: "flex",
    flex: 1,
    height: 250,
    marginVertical: 3,
  },
  button: {
    height: 40,
    width: 170,
    borderWidth: 1,
    borderColor: "#282c34",
    color: "#fff",
    fontSize: 16,
    borderRadius: 3,
  },
});

export default Home;

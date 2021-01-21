import * as React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Dimensions,
} from 'react-native';

const {height, width} = Dimensions.get('screen');

const posts = [
    {
        id: 1,
        img_uri:
            'https://images.pexels.com/photos/4160089/pexels-photo-4160089.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        content: 'Some test content for creating a post',
    },
    {
        id: 2,
        img_uri:
            'https://images.pexels.com/photos/4160089/pexels-photo-4160089.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        content: 'Some test content for creating a post',
    },
];

const Home = (props) => {
    const [fetchMore, showFetchMore] = React.useState(false);

    React.useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <View style={{marginRight: 15}}>
                    <Text
                        style={{color: '#fff'}}
                        onPress={() => props.navigation.navigate('CreatePost')}>
                        Create Post
                    </Text>
                </View>
            ),
        });
    }, []);

    return (
        <View style={{backgroundColor: '#fff', height}}>
            <FlatList
                data={posts}
                onEndReached={() => showFetchMore(true)}
                ListEmptyComponent={() => (
                    <View>
                        <Text> No posts to show. </Text>
                        <Text
                            onPress={() =>
                                props.navigation.navigate('CreatePost')
                            }>
                            Tap to create new post.
                        </Text>
                    </View>
                )}
                ListFooterComponent={() => (
                    <View style={[styles.alignCenter, {marginTop: 10}]}>
                        {fetchMore ? (
                            <TouchableOpacity
                                onPress={() => {}}
                                style={[styles.button, styles.alignCenter]}>
                                <Text> Fetch more posts </Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                )}
                renderItem={({item, index, separators}) => (
                    <View style={styles.alignCenter}>
                        <View style={styles.post} key={item.id}>
                            <Image
                                source={item.img_uri}
                                resizeMode="cover"
                                style={styles.img}
                            />
                            <Text> {item.content} </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    img: {
        height: 150,
        width: width - 20,
    },
    alignCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    posts: {
        display: 'flex',
        flexDirection: 'column',
        marginVertical: 10,
    },
    post: {
        width: width - 20,
        borderWidth: 1,
        borderColor: 'grey',
        display: 'flex',
        flex: 1,
        height: 200,
        marginVertical: 10,
    },
    button: {
        height: 40,
        width: 170,
        borderWidth: 1,
        borderColor: '#282c34',
        color: '#fff',
        fontSize: 16,
        borderRadius: 3,
    },
});

export default Home;

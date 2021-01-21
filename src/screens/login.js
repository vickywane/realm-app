import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Realm from 'realm';

const {height, width} = Dimensions.get('window');

const Login = (props) => {
  const [Email, setEmail] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  handleLogin = async () => {
    setLoading(true);

    const credentials = Realm.Credentials.emailPassword(Email, Password);
    // Authenticate the user
    const app = new Realm.App({id: 'first-realm-application-xurco'});

    app
      .logIn(credentials)
      .then((data) => {
        props.navigation.navigate('Home');
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  return (
    <View style={styles.body}>
      <View>
        <Text style={[styles.title, styles.alignCenter]}> Offline App - Login</Text>
        <View style={{marginVertical: 10}} />

        <View style={styles.input}>
          <TextInput
            value={Email}
            placeholder="Your email. John@mail.com"
            onChangeText={(value) => setEmail(value)}
          />
        </View>
        <View style={{marginVertical: 10}} />
        <View style={styles.input}>
          <TextInput
            value={Password}
            placeholder="Your Password"
            onChangeText={(value) => setPassword(value)}
          />
        </View>
        <View style={{marginVertical: 10}} />

        <View style={styles.alignCenter}>
          <TouchableOpacity
            onPress={() => handleLogin()}
            disabled={isLoading}
            style={[styles.button, styles.alignCenter]}>
            {!isLoading ? (
              <Text> Login Account </Text>
            ) : (
              <ActivityIndicator color="#282c34" />
            )}
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 10}} />

        <TouchableOpacity
          onPress={() => props.navigation.navigate('create-account')}>
          <View style={styles.flex}>
            <Text style={styles.infoText}>Don't Have An Account?</Text>

            <Text style={[styles.infoText, {color: 'black', marginLeft: 10}]}>
              Create Account
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  infoText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'grey',
  },

  body: {
    height,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'grey',
    height: 45,
    width: width - 30,
  },
  alignCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: '#282c34',
    color: '#fff',
    fontSize: 16,
    borderRadius: 3,
  },
});

export default Login;

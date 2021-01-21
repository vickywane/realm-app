import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Realm from 'realm';

const {height, width} = Dimensions.get('window');

const CreateAccount = (props) => {
  const [Email, setEmail] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const [hasCreatedAccount, setAccountCreation] = React.useState(false);

  const [token, setToken] = React.useState('');
  const [tokenID, setTokenID] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  handleCreateAccount = async () => {
    setLoading(true);
    const app = new Realm.App({id: 'first-realm-application-xurco'});
    // Authenticate the user
    app.emailPasswordAuth
      .registerUser(Email, Password)
      .then(() => {
        setLoading(false);
        setAccountCreation(true);
      })
      .catch((e) => {
        setLoading(false);
        console.error('Failed to log in', e);
      });
  };

  handleVerification = async () => {
    setLoading(true);
    const app = new Realm.App({id: 'first-realm-application-xurco'});

    app.emailPasswordAuth
      .confirmUser(token, tokenID)
      .then(() => {
        props.navigation.navigate('login');
      })
      .catch((e) => {
        setLoading(false);

        console.error('Failed to log in', e);
      });
  };

  return (
    <View style={styles.body}>
      {!hasCreatedAccount ? (
        <View>
          <Text style={[styles.title, styles.alignCenter]}>
            {' '}
            Offline App - Create Account{' '}
          </Text>
          <View style={{marginVertical: 10}} />

          <View style={styles.input}>
            <TextInput
              keyboardType="email-address"
              value={Email}
              placeholder="Your email. John@mail.com"
              onChangeText={(val) => setEmail(val)}
            />
          </View>
          <View style={{marginVertical: 10}} />
          <View style={styles.input}>
            <TextInput
              secureTextEntry={true}
              value={Password}
              placeholder="Your Password"
              onChangeText={(val) => setPassword(val)}
            />
          </View>
          <View style={{marginVertical: 10}} />

          <View style={styles.alignCenter}>
            <TouchableOpacity
              onPress={() => handleCreateAccount()}
              style={[styles.button, styles.alignCenter]}>
              {!isLoading ? (
                <Text> Create Account </Text>
              ) : (
                <ActivityIndicator color="#282c34" />
              )}
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: 10}} />

          <TouchableOpacity
            disabled={isLoading}
            onPress={() => props.navigation.navigate('login')}>
            <View style={styles.flex}>
              <Text style={styles.infoText}>Have An Account?</Text>

              <Text style={[styles.infoText, {color: 'black', marginLeft: 10}]}>
                Login Instead
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.alignCenter}>
          <Text
            style={{textAlign: 'center', marginHorizontal: 10, fontSize: 15}}
            allowFontScaling={true}>
            A verification code has been sent to your email address, enter
            verification to confirm your account
          </Text>

          <View style={{marginVertical: 10}} />

          <View style={styles.input}>
            <TextInput
              value={token}
              placeholder="Token"
              onChangeText={(val) => setToken(val)}
            />
          </View>

          <View style={{marginVertical: 10}} />
          <View style={styles.input}>
            <TextInput
              value={tokenID}
              placeholder="Token ID"
              onChangeText={(val) => setTokenID(val)}
            />
          </View>
          <View style={{marginVertical: 10}} />

          <View style={styles.alignCenter}>
            <TouchableOpacity
              disabled={isLoading}
              onPress={() => handleVerification()}
              style={[styles.button, styles.alignCenter]}>
              {!isLoading ? (
                <Text> Verify Code </Text>
              ) : (
                <ActivityIndicator color="#282c34" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
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

export default CreateAccount;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  TextInput,
  View
} from 'react-native';

import Amplify, { Auth } from 'aws-amplify'
import config from './src/aws-exports'
Amplify.configure(config)

type Props = {};
export default class App extends Component<Props> {
  state = {
    authCode: '',
    user: {}
  }
  onChangeText(authCode) {
    this.setState({ authCode })
  }
  signUp() {
    Auth.signUp({
      username: 'dabit3',
      password: 'MyCoolP@ssw0rd1!',
      attributes: {
        phone_number: '+16018127241',
        email: 'dabit3@gmail.com'
      }
    })
    .then(res => {
      console.log('successful signup: ', res)
    })
    .catch(err => {
      console.log('error signing up: ', err)
    })
  }
  confirmUser() {
    const { authCode } = this.state
    Auth.confirmSignUp('dabit3', authCode)
      .then(res => {
        console.log('successful confirmation: ', res)
      })
      .catch(err => {
        console.log('error confirming user: ', err)
      })
  }
  signIn() {
    Auth.signIn(username, password)
      .then(user => {
        this.setState({ user })
      })
      .catch(err => {
        console.log('error signing in: ', err)
      })
  }
  confirmSignIn() {
    Auth.confirmSignIn(user, authCode)
      .then(user => {
        console.log('user: ', user)
      }).catch(err => {
        console.log('error confirming sign in: ', err)
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <Button title='Sign Up' onPress={this.signUp.bind(this)} />
        <TextInput
          placeholder='Input Code'
          onChangeText={value => this.onChangeText(value)}
          style={styles.input}
        />
        <Button
          title='Confirm User'
          onPress={this.confirmUser.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: '#ededed',
    marginVertical: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  }
});

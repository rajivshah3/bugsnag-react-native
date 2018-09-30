import React, { Component } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Platform } from 'react-native';

import bugsnag from './lib/bugsnag';
import NativeCrash from './lib/native_crash';

function triggerException() {
  bogusFunction(); // eslint-disable-line no-undef
}

function triggerHandledException() {
  bogusHandledFunction(); // eslint-disable-line no-undef
}

function triggerNativeException() {
  NativeCrash.generateCrash()
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style= {{
          paddingTop: 40,
          margin: 20,
        }}>Press the buttons below to test examples of Bugsnag functionality. Make sure you have changed the API key in Info.plist or AndroidManifest.xml.</Text>
        <ScrollView>
          <View style={styles.buttonContainer}>

            <Button
              title="Trigger JS Exception"
              onPress={triggerException} />
            <Text style={styles.info}>
            Tap this button to send a JS crash to Bugsnag
            </Text>

            <Button
              title="Trigger Native Exception"
              onPress={triggerNativeException} />
            <Text style={styles.info}>
              Tap this button to send a native {Platform.OS} crash to Bugsnag
            </Text>

            <Button
              title="Send Handled JS Exception"
              onPress={() => {
                try { // execute crashy code
                  triggerHandledException();
                } catch (error) {
                  bugsnag.notify(error);
                }
              }} />
            <Text style={styles.info}>
              Tap this button to send a handled error to Bugsnag
            </Text>

            <Button
              title="Set user"
              onPress={() => {
                try { // execute crashy code
                  throw new Error("Error with user");
                } catch (error) {
                  bugsnag.setUser("user-5fab67", "John Smith", "john@example.com");
                  bugsnag.notify(error);
                }
              }} />
            <Text style={styles.info}>
              Tap this button to send a handled error with user information to Bugsnag
            </Text>

            <Button
              title="Leave breadcrumbs"
              onPress={() => {
                // log a breadcrumb, which will be attached to the error report
                bugsnag.leaveBreadcrumb('About to execute crashy code', {
                  type: 'user'
                });

                try { // execute crashy code
                  throw new Error("Error with breadcrumbs");
                } catch (error) {
                  bugsnag.notify(error);
                }
              }} />
            <Text style={styles.info}>
              Tap this button to send a handled error with manual breadcrumbs
            </Text>

          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },
  buttonContainer: {
    margin: 20
  },
  info: {
    textAlign: 'center',
    color: '#666',
    fontSize: 11,
    marginBottom: 20
  }
})

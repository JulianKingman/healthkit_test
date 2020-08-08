/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import { NativeModules } from 'react-native'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  AppleHealth,
} from 'react-native';
import AppleHealthKit from 'rn-apple-healthkit';
import {map} from 'lodash';
import moment from 'moment';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Button from './Button';

//console.log(NativeModules.Counter.increment())


const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          containerStyle={[StyleSheet.absoluteFillObject]}
          contentContainerStyle={{
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            padding: 30,
            paddingTop: 60,
          }}>
          <Button
            text="Connect HK"

            onPress={() => {

              NativeModules.AppleHealth.initHealthKit(
                {
                  permissions: {
                    read: map(AppleHealthKit.Constants.Permissions, v => v),
                    write: map(AppleHealthKit.Constants.Permissions, v => v),
                  },
                  observers: [
                    {
                      type: 'StepCount',
                    },
                    {
                      type: 'HeartRate',
                    },
                  ],
                },
                async (err, results) => {
                  console.log(err, results);
                },
              );
            }}
          />
          <Button
            text="Get 7 Days Data"
            onPress={() => {
              AppleHealthKit.readHealthDataByDate(
                {
                  fromDate: moment()
                    .subtract(7, 'days')
                    .format('YYYY-MM-DD'),
                  toDate: moment().format('YYYY-MM-DD'),
                  permissions: map(
                    AppleHealthKit.Constants.Permissions,
                    v => v,
                  ),
                  userId: 'test',
                },
                (data, err) => {
                  console.log(data, err);
                  Alert.alert('Done');
                },
              );
            }}
          />
          <Button
            text="Recursively Get Anchored Data"
            onPress={() => {
              // const getData = async () =>
              //   new Promise(resolve => {
              //     AppleHealthKit.readHealthDataByAnchor(
              //       {
              //         permissions: map(
              //           AppleHealthKit.Constants.Permissions,
              //           v => v,
              //         ),
              //         userId: 'test',
              //         fromDate: '1800-01-01',
              //         toDate: moment().format('YYYY-MM-DD'),
              //       },
              //       (data, err) => {
              //         if (!data) {
              //           console.log('No anchored data');
              //           Alert.alert('Done');
              //           resolve(true);
              //           return;
              //         }
              //         console.log(
              //           'Data',
              //           data && data[0]
              //             ? map(data[0], (d, k) => `${k}: ${d.length}`)
              //             : data,
              //         );
              //         console.log(data, err);
              //         return resolve(getData());
              //       },
              //     );
              //   });
              // getData();

              const allMetrics = [
                //' ActiveEnergyBurned',
                // 'Protein',
                // 'OxygenSaturation',
                // 'BasalBodyTemperature',
                // 'RestingHeartRate',
                // 'BodyFatPercentage',
                // 'WaistCircumference',
                // 'MindfulSession',
                // 'BloodGlucose',
                // 'FatPolyunsaturated',
                // 'SleepAnalysis',
                // 'FatMonounsaturated',
                // 'Weight',
                // 'FatTotal',
                // 'VO2Max',
                // 'FatSaturated',
                // 'RespiratoryRate',
                // 'Carbohydrates',
                // 'HeartRate',
                // 'BodyMassIndex',
                // 'HeartRateVariability',
                // 'BloodPressure',
                // 'BodyTemperature',
                // 'EnergyConsumed',
                // 'Steps',
              ];
              const getMetricReadings = async metrics => {
                if (!metrics.length) return true;
                const metric = metrics.pop();
                const healthkitData = await new Promise(resolve =>
                  NativeModules.AppleHealth.readHealthDataByAnchor(
                    {
                      metric, // or permissions, or whatever the key is
                      userId: 'test',
                    },
                    (err, res) => {
                      resolve({err, res});
                    },
                  ),
                );
                // App does stuff here
                console.log({healthkitData});
                return getMetricReadings(metrics);
              };
              Alert.alert('Done');
              getMetricReadings(allMetrics);
            }}
          />
          <Button
            text="(Old) Get Anchored Data"
            onPress={() => {

              const allMetrics = [
                'ActiveEnergyBurned',
                'Protein',
                'OxygenSaturation',
                'BasalBodyTemperature',
                'RestingHeartRate',
                'BodyFatPercentage',
                'WaistCircumference',
                'MindfulSession',
                'BloodGlucose',
                'FatPolyunsaturated',
                'SleepAnalysis',
                'FatMonounsaturated',
                'Weight',
                'FatTotal',
                'VO2Max',
                'FatSaturated',
                'RespiratoryRate',
                'Carbohydrates',
                'HeartRate',
                'BodyMassIndex',
                'HeartRateVariability',
                'BloodPressure',
                'BodyTemperature',
                'EnergyConsumed',
                'Steps',
              ];
              const getMetricReadings = async metrics => {
                if (!metrics.length) return true;
                const metric = metrics.pop();
                const healthkitData = await new Promise(resolve =>
                  AppleHealthKit.readHealthDataByAnchor(
                    {
                      metric, // or permissions, or whatever the key is
                      userId: 'test',
                    },
                    (err, res) => {
                      resolve({err, res});
                    },
                  ),
                );
                // App does stuff here
                console.log({healthkitData});
                return getMetricReadings(metrics);
              };
              Alert.alert('Done');
              getMetricReadings(allMetrics);
            }}
          />
          <Button
            text="Drop Anchors"
            onPress={() => {
              NativeModules.AppleHealth.dropAnchors(
                {
                  permissions: map(
                    AppleHealthKit.Constants.Permissions,
                    v => v,
                  ),
                  userId: 'test',
                },
                (data, err) => {
                  console.log(data, err);
                  Alert.alert('Done');
                },
              );
            }}
          />
          <Button
            text="Clear Anchors"
            onPress={() => {

              // NativeModules.AppleHealth.startTrack(
              //   { artist: "Bruce Springsteen", title: "Born in the USA" },
              //   [{ url: "url", type: "image" }, { url: "another url", type: "link" }]
              // );

              NativeModules.AppleHealth.isAvailable((data, err) => {
                console.log(data, err);
                Alert.alert('Done');
              },);

              NativeModules.AppleHealth.clearAnchors(
                {
                  permissions: map(
                    AppleHealthKit.Constants.Permissions,
                    v => v,
                  ),
                  userId: 'test',
                },
                (data, err) => {
                  console.log(data, err);
                  Alert.alert('Done');
                },
              );

              // AppleHealth.clearAnchors(
              //   {
              //     permissions: map(
              //       AppleHealthKit.Constants.Permissions,
              //       v => v,
              //     ),
              //     userId: 'test',
              //   },
              //   (data, err) => {
              //     console.log(data, err);
              //     Alert.alert('Done');
              //   },
              // );
            }}
          />
          <Button
            text="Clear Steps Anchor"
            onPress={() => {
              AppleHealthKit.clearAnchors(
                {
                  anchorKey: 'HKQuantityTypeIdentifierStepCount',
                },
                (data, err) => {
                  console.log(data, err);
                  Alert.alert('Done');
                },
              );
            }}
          />
          <Button
            text="Drop Steps Anchor"
            onPress={() => {
              NativeModules.AppleHealth.dropAnchors(
                {
                  anchorKey: 'HKQuantityTypeIdentifierStepCount',
                },
                (data, err) => {
                  console.log(data, err);
                  Alert.alert('Done');
                },
              );
            }}
          />
          <Button
            text="Set Step Observer Query"
            onPress={() => {
              NativeModules.AppleHealth.setObservers(
                {
                  metrics: [
                    "Weight",
                    // 'Steps',
                    // 'HeartRate',
                    // 'Protein',
                    // 'OxygenSaturation',
                    // 'BasalBodyTemperature',
                    // 'RestingHeartRate',
                    // 'BodyFatPercentage',
                    // 'WaistCircumference',
                    // 'MindfulSession',
                    // 'BloodGlucose',
                    // 'FatPolyunsaturated',
                    // 'SleepAnalysis',
                    // 'FatMonounsaturated',
                    // 'ActiveEnergyBurned',
                    // 'FatTotal',
                    // 'VO2Max',
                    // 'FatSaturated',
                    // 'RespiratoryRate',
                    // 'Carbohydrates',
                    // 'BodyMassIndex',
                    // 'HeartRateVariability',
                    // 'BloodPressure',
                    // 'BodyTemperature',
                    // 'EnergyConsumed',
                  ],
                  userId: 'test',
                },
                (err, {identifier, data, finish}) => {
                  console.log({err, identifier, data});
                  //finish(true);
                },
              );
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

import React from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  ScrollView,
  NativeModules,
  Alert,
} from 'react-native';



const { Crashy } = NativeModules;
// === APM imports ===
const AppiceAPM = require('reactnative-plugin-appice-apm');
const AppICE = require('reactnative-plugin-appice');

// SDK credentials
const APP_ID = "663df417b655bf1a13eafc20";
const APP_KEY = "5260943a1be7c7b28d50319c8d7e16c5114e9069";
const API_KEY = "a569dbf7636a9ca31c6fb9b716716611";
const BASE_URL = "https://7cdfb4b4dccc45907b3b361a8f1025d3@o4506154662428672.ingest.us.sentry.io/4509168323133440";
const appicenptest = "https://34f9edf5fa64946add2c152a1a5ef6a0@appicenp.unionbankofindia.co.in/8";
const apm_uat = "https://cc111eed478101663610fef4c445db44@appicenp.unionbankofindia.co.in/7";
const inEncryption = true;
const msm = "https://930c5d718d03ba70d87de588af164688@o4506154662428672.ingest.us.sentry.io/4510007252287488";
const prod_dc_dsn = "https://7706f2c9aea39e804096709a44f80463@cexdbp.unionbankofindia.co.in/2";

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  // SDK Initialization
  const handleInitSDK = () => {
    console.log("[AppICE APM] 2 reateCustomTransport SDK Initialized");
    AppiceAPM.initAppiceAPM(APP_ID, APP_KEY, API_KEY, apm_uat, inEncryption);
    console.log("createCustomTransport SDK Initialized");
  };

  const crashObjectInMicrotask = () => {
    const q = (globalThis as any).queueMicrotask || ((cb: any) => Promise.resolve().then(cb));
    q(() => {
      // Purposely NOT using new Error(...)
      throw { message: 'Test object error (microtask)' };
    });
    // AppiceAPM.doNativeCrash();
  };




  function b() {  }
  function FATALERROR() {
    throw new Error("Check source path is there or not V16");
  }

  // Crash: Manual Throw (JS-origin)
  const handleCrash = () => {
    console.log("createCustomTransport SDK handleCrash");
    crash6();
  };

  const handleCrash1 = () => { handleCrash(); };

  // Just a sanity call; should not crash
  const crashReferenceError = () => {
    AppICE.setUserId(['123']);
  };

  // (keeping buttons; disabled bodies are fine)
  const crashUnhandledPromise = () => {
    // Promise.reject(new Error("Unhandled Promise Rejection Crash"));
  };
  const crashInvalidJSON = () => {
    // JSON.parse("This is not JSON Release build");
  };
  const crashStackOverflow = () => {
    // const recurse = () => recurse(); recurse();
  };
  const crashCustomError = () => {
    // throw new Error("This is a custom test error from crashCustomError Release build");
  };

  const crashNative = () => {
    Crashy.nativeCrash(); // Android/iOS dono me fatal native crash
  };
  const sampleNative = () => {
    Crashy.nativeCrash(); // Android/iOS dono me fatal native crash
  };
  const crashPromise = () => { Promise.resolve().then(() => { throw new Error('JS FATAL in then'); }); };
  const crashTimeout = () => setTimeout(() => { throw new Error('JS FATAL via timeout'); }, 0);

  // INFO jaisa event (auto-captured)
  const logInfo = () => {
    setTimeout(() => {
      Promise.reject('[INFO_LOG] Lightweight note'); // string reason
    }, 0);
  };
  function Error1WOSM() {
    throw new Error("V15 1st Error without source map");
  }
  function Error2WOSM() {
    throw new Error("V15 2nd Error without source map");
  }
  function Error1WSM() {
    throw new Error("V15 1st Error with source map");
  }
  function Error2WSM() {
    throw new Error("V15 2nd Error withsource map");
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={styles.buttonContainer}>
        <Button title="Init SDK" onPress={handleInitSDK} />
        <Button title="1st Error WO SM" onPress={Error1WOSM} />
        <Button title="2nd Error WO SM" onPress={Error2WOSM} />
        <Button title="Crash: Manual Error " onPress={handleCrash1} color="red" />
        <Button title="Set User ID" onPress={crashReferenceError} color="#d9534f" />
        <Button title="Crash: Promise Rejection" onPress={crashUnhandledPromise} color="#f0ad4e" />
        <Button title="Crash: JSON Parse" onPress={crashInvalidJSON} color="#5bc0de" />
        <Button title="Crash: fatal check V16" onPress={FATALERROR} color="#0275d8" />
        <Button title="Crash: Custom Error" onPress={crashCustomError} color="#292b2c" />
        <Button title="Crash: Object (Microtask)" onPress={crashObjectInMicrotask} color="#8B0000" />
        <Button title="Crash Native" onPress={crashNative} color="red" />
        <Button title="crashPromise" onPress={crashTimeout} color="red" />
        <Button title="logInfo" onPress={logInfo} color="red" />
        <Button title="V16 1st Error With SM" onPress={Error1WSM} />
        <Button title="2nd Error With SM" onPress={Error2WSM} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: '#fff' },
  buttonContainer: { justifyContent: 'space-evenly', alignItems: 'center', paddingVertical: 30, gap: 20 },
});
// AppiceAPM.installGlobalHandlerSimple();
const WrappedApp = AppiceAPM.withAppiceAPM(App);
export default WrappedApp;

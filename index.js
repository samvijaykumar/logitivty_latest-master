/**
 * @format
 */

import { Alert, AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

import "react-native-gesture-handler";
import Index from "./src/screen/Index";
//import indexnew from './src/screen/indexnew';
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import messaging from "@react-native-firebase/messaging";
import AppUtils from "./src/utils/AppUtils";

// AppRegistry.registerComponent(appName, () => Index);
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(Index));

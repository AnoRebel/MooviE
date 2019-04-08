import { NativeModules } from 'react-native';
import Reactotron, { asyncStorage, networking, trackGlobalErrors } from 'reactotron-react-native';


const scriptURL = NativeModules.SourceCode.scriptURL;
let scriptHostName = scriptURL.split("://")[1].split(":")[0];
Reactotron
.configure({ host: scriptHostName, port: 9090 }) // controls connection and communication settings
.use(asyncStorage())
.use(networking())
.use(trackGlobalErrors())
.useReactNative() // add all built-in react native plugins
.connect() // let's connect

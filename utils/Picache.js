"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const shorthash = __importStar(require("shorthash"));
const expo_1 = require("expo");
class Picache extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            source: {}
        };
    }
    downloadRemoteImage(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = shorthash.unique(uri);
            const path = `${expo_1.FileSystem.cacheDirectory}${name}.png`;
            const image = yield expo_1.FileSystem.getInfoAsync(path);
            if (image.exists) {
                return image.uri;
            }
            const newImage = yield expo_1.FileSystem.downloadAsync(uri, path);
            return newImage.uri;
        });
    }
    downloadLocalImage(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const asset = yield expo_1.Asset.fromModule(source);
            if (!asset.localUri) {
                yield asset.downloadAsync();
            }
            this.setState({
                source: {
                    uri: asset.localUri
                }
            });
        });
    }
    returnNull() {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    downloadImage(source) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof source === "number") {
                this.downloadLocalImage(source);
            }
            else if (Array.isArray(source)) {
                const newUris = yield Promise.all(source.map(s => {
                    if (s.uri) {
                        return this.downloadRemoteImage(s.uri);
                    }
                    else {
                        return this.returnNull();
                    }
                }));
                const newSources = [];
                for (let i = 0; i < source.length; i += 1) {
                    const uri = newUris[i];
                    if (uri) {
                        newSources.push(Object.assign({}, source[i], { uri }));
                    }
                }
                this.setState({
                    source: newSources
                });
            }
            else {
                if (source.uri) {
                    const newUri = yield this.downloadRemoteImage(source.uri);
                    this.setState({
                        source: Object.assign({}, source, { uri: newUri })
                    });
                }
            }
        });
    }
    componentWillReceiveProps(nextProps, props) {
        return __awaiter(this, void 0, void 0, function* () {
            if (nextProps.source === props.source) {
                return;
            }
            this.downloadImage(nextProps.source);
        });
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.downloadImage(this.props.source);
        });
    }
    render() {
        const _a = this.props, { source } = _a, otherProps = __rest(_a, ["source"]);
        return <react_native_1.ImageBackground source={this.state.source} {...otherProps}/>;
    }
}
exports.default = Picache;
//# sourceMappingURL=Picache.js.map
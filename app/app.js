/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import "babel-polyfill";
// Import all the third party stuff
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import FontFaceObserver from "fontfaceobserver";
import createHistory from "history/createHashHistory";
import "sanitize.css/sanitize.css";
// Import root app
import App from "containers/App";
//Firebase service
// Import Language Provider
import LanguageProvider from "containers/LanguageProvider";
// Import CSS Libraries
// import "!style-loader!css-loader!sass-loader!./css/bootstrap/css/bootstrap.min.css";
import "!style-loader!css-loader!sass-loader!./css/font-awesome/css/all.css";
// Load the favicon and the .htaccess file
import "!file-loader?name=[name].[ext]!./images/favicon.ico";
import "!file-loader?name=[name].[ext]!./images/logo.png";
import "!file-loader?name=[name].[ext]!./images/avatar-default.jpg";
import "!file-loader?name=[name].[ext]!./images/avatar.jpg";
import "!file-loader?name=[name].[ext]!./images/logo-white.png";
import "!file-loader?name=[name].[ext]!./images/missing-car.png";
import "!file-loader?name=[name].[ext]!./images/web/category/car.png";
import "!file-loader?name=[name].[ext]!./images/web/category/car-pickup.png";
import "!file-loader?name=[name].[ext]!./images/web/category/combined-shape.png";
import "!file-loader?name=[name].[ext]!./images/web/category/motorcycle.png";
import "!file-loader?name=[name].[ext]!./images/web/category/car-muscle.png";
import "!file-loader?name=[name].[ext]!./images/web/category/car-steering-wheel.png";
import "!file-loader?name=[name].[ext]!./images/web/logo-white-square.png";
import "!file-loader?name=[name].[ext]!./images/web/bg-texture.jpg";
import "!file-loader?name=[name].[ext]!./images/web/bg-texture-2.jpg";
import "!file-loader?name=[name].[ext]!./images/web/bg-texture-mobi.jpg";
import "!file-loader?name=[name].[ext]!./images/web/bangkok-mahanakhon.jpg";
import "!file-loader?name=[name].[ext]!./images/web/destinations/vietnam.png";
import "!file-loader?name=[name].[ext]!./images/web/destinations/korea.png";
import "!file-loader?name=[name].[ext]!./images/web/destinations/austria.png";
import "!file-loader?name=[name].[ext]!./images/web/car-home.png";
import "!file-loader?name=[name].[ext]!./images/web/graphic.png";
import "!file-loader?name=[name].[ext]!./images/web/graphics.png";
import "!file-loader?name=[name].[ext]!./images/web/carousel/carousel1.png";
import "!file-loader?name=[name].[ext]!./images/web/carousel/carousel2.png";
import "!file-loader?name=[name].[ext]!./images/web/topbooking/pic.png";
import "!file-loader?name=[name].[ext]!./images/web/topbooking/pic1.png";
import "!file-loader?name=[name].[ext]!./images/web/topbooking/pic2.png";
import "!file-loader?name=[name].[ext]!./images/web/topbooking/pic3.png";
import "!file-loader?name=[name].[ext]!./images/web/resend.png";
import "!file-loader?name=[name].[ext]!./images/web/facebook.png";
import "!file-loader?name=[name].[ext]!./images/web/google-g-logo.png";
import "!file-loader?name=[name].[ext]!./images/web/signup-form.jpg";
import "!file-loader?name=[name].[ext]!./images/web/success-popup.png";
import "!file-loader?name=[name].[ext]!./images/web/pay-pal.svg";
import "!file-loader?name=[name].[ext]!./images/web/visa.svg";
import "!file-loader?name=[name].[ext]!./images/web/bg-error-popup.svg";
import "!file-loader?name=[name].[ext]!./images/web/bg-help.jpg";
import "!file-loader?name=[name].[ext]!./images/web/bg-payment.png";
import "!file-loader?name=[name].[ext]!./images/web/driver-complete-step.svg";
import "file-loader?name=[name].[ext]!./.htaccess"; // eslint-disable-line import/extensions
import "!file-loader?name=[name].[ext]!./images/web/bg-texture.png";
import "!file-loader?name=[name].[ext]!./images/web/bg-texture@2x.png";
import "!file-loader?name=[name].[ext]!./images/web/bg-texture@3x.png";
import "!file-loader?name=[name].[ext]!./images/web/bangkok-mahanakhon.png";
import "!file-loader?name=[name].[ext]!./images/web/bangkok-mahanakhon@2x.png";
import "!file-loader?name=[name].[ext]!./images/web/bangkok-mahanakhon@3x.png";
import "!file-loader?name=[name].[ext]!./images/avt-default.png";
import "!file-loader?name=[name].[ext]!./images/avt-default@2x.png";
import "!file-loader?name=[name].[ext]!./images/avt-default@3x.png";
import "!file-loader?name=[name].[ext]!./images/web/driver-not-rate.svg";
import "!file-loader?name=[name].[ext]!./images/web/success-mobile.png";
import "!file-loader?name=[name].[ext]!./images/web/image-not-found.png";
import "!file-loader?name=[name].[ext]!./images/web/mask.png";
import "!file-loader?name=[name].[ext]!./images/web/mask@2x.png";
import "!file-loader?name=[name].[ext]!./images/web/mask@3x.png";
import "!file-loader?name=[name].[ext]!./images/web/masks.png";
import "!file-loader?name=[name].[ext]!./images/web/masks@2x.png";
import "!file-loader?name=[name].[ext]!./images/web/masks@3x.png";
import "!file-loader?name=[name].[ext]!./images/web/bg-help-mobile.png";
import "!file-loader?name=[name].[ext]!./images/web/bg-help-mobile@2x.png";
import "!file-loader?name=[name].[ext]!./images/web/bg-help-mobile@3x.png";
import "!file-loader?name=[name].[ext]!./images/web/locale/en.png";
import "!file-loader?name=[name].[ext]!./images/web/locale/de.png";
import "!file-loader?name=[name].[ext]!./images/web/locale/th.png";
import "!file-loader?name=[name].[ext]!./images/web/locale/vi.png";
import configureStore from "./configureStore";
// Import i18n messages
import { translationMessages } from "./i18n";
// Import CSS reset and Global Styles
import "./css/style.scss";
import { SocketService } from "./helper/socketService";
// Import JS Libraries

/*///////////////////////////////////////////////////////////////
/////                      START LOGO                       /////
///////////////////////////////////////////////////////////////*/

// Android

// iOS

/*///////////////////////////////////////////////////////////////
/////                      STOP LOGO                       /////
///////////////////////////////////////////////////////////////*/

/* ///////////////////////////////////////////////////////////////
/////                STOP SPLASH SCREEN                   /////
/////////////////////////////////////////////////////////////// */

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver("Open Sans", {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add("fontLoaded");
});

// Add is-ios to body when current platform is ios
document.addEventListener("deviceready", () => {
  const platformId = window.cordova.platformId;
  if (platformId) {
    document.querySelector("#app").classList.add(`is-${platformId}`);
  }
});

initSocket();


// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById("app");

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App/>
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(["./i18n", "containers/App"], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import("intl"));
  })
    .then(() =>
      Promise.all([
        import("intl/locale-data/jsonp/en.js"),
        import("intl/locale-data/jsonp/de.js")
      ])
    )
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === "production") {
  require("offline-plugin/runtime").install(); // eslint-disable-line global-require
}

/*///////////////////////////////////////////////////////////////
/////                START INIT SOCKET                     /////
///////////////////////////////////////////////////////////////*/

// Init socket handlers
export function initSocket() {
  socketInstance = new SocketService();
}


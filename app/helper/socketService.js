//Socket
import React from "react";
import io from "socket.io-client/dist/socket.io";
import config from "config";
import localStoreService from "local-storage";
import { makeEvent } from "../utils/helpers";

var currentThis;

export class SocketService {
  constructor() {
    currentThis = this;
    this.socket = null;
    this.connected = false;
    this.listening = false;
  }

  connect = (page = "") => {
    return new Promise((resolve, reject) => {
      let token = localStoreService.get("token") || "";
      let locale = localStoreService.get("locale") || "";

      console.log("SOCKET SERVICE THIS.SOCKET", this.socket);
      if (!this.connected) {
        this.socket = io(config.serverUrl, {
          autoConnect: true,
          query: {
            token,
            lang: locale
          }
        });

        console.log("SOCKET BEGIN CONNECT WITH STATUS", this.socket && this.socket.connected);

        this.socket && this.socket.on("connect", () => {
          console.log("SOCKET CONNECTED");
          makeEvent("socketconnect");
          this.connected = true;

          resolve(true);
        });

        this.socket && this.socket.on("connect_failed", () => {
          currentThis.connected = false;
          reject(false);
        });
      } else {
        if (this.socket.connected) {
          makeEvent("socketconnect");
          resolve(true);
        } else {
          resolve(false);
        }

      }
    });
  };
  disconnect = () => {
    console.log("DISCONNECT IN SOCKET SERVICE");
    document.removeEventListener("socketconnect", function() {
      console.log("remove event socketconnect");
    });
    this.listening = false;
    this.connected = false;
    return this.socket && this.socket.close();
  };
  setListen = (value) => {
    this.listening = value;
  };
  getEvent = (eventName, page = "") => {
    console.log("SOCKET START GET EVENT ", page = "", eventName);

    return new Promise((resolve, reject) => {
      if (this.connected) {
        this.socket.on(eventName, response => {
          console.log("SOCKET CALLBACK IN ", page = "", eventName, response);
          resolve(response);
        });
      } else {
        reject(false);
      }
    });
  };
}




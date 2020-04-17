import { SocketService } from "../helper/socketService";
import Q from "q";
import { makeEvent } from "./helpers";

const socket = {
  connect: (page = "") => {
    let q = Q.defer();
    // console.log("socketInstance helper/socketService", socketInstance, socketInstance.connected);
    if (!socketInstance || socketInstance.connected === false) {
      console.log("SOCKET CONNECTING......");
      socketInstance.connect(page)
        .then((res) => {
            q.resolve(res);
          },
          (error) => {
            q.reject(error);
          });
    } else {
      console.log("SOCKET HAVE BEEN CONNECTED......");
      makeEvent("socketconnect");
      q.reject(false);
    }

    return q.promise;
  },
  disconnect: () => {
    socketInstance.disconnect();
  },
  getEvent: (eventName, pageName = "", callback) => {
    console.log("SOCKET.JS", socketInstance);
    let q = Q.defer();
    if (!socketInstance || socketInstance.connected === false) {
      console.log("SOCKET.JS CREATE AGAIN INSTANCE WITH EVENT NAME", eventName);
      socketInstance = new SocketService();

      socketInstance.connect()
        .then(() => {
          socketInstance.getEvent(eventName, pageName)
            .then((res) => {
                callback(res);
                q.resolve(res);
              },
              (error) => {
                q.reject(error);
              });
        });
    } else {
      console.log("SOCKET.JS HAVE A INSTANCE WITH EVENT NAME", eventName);
      socketInstance.getEvent(eventName, pageName)
        .then((res) => {
            callback(res);
            q.resolve(res);
          },
          (error) => {
            q.reject(error);
          });
    }
    return q.promise;
  }
};

export default socket;

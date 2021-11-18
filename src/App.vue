<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { io } from "socket.io-client";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  mounted() {
    const socketio = io(
      `https://stepup.dev4.stechoq.com/api/member/notification`,
      {
        withCredentials: false,
        extraHeaders: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ4LCJyb2xlIjozLCJ0b2tlbiI6IlUyRnNkR1ZrWDEvN2NTVnloU1pHbnRIVmkzU0lhWlA5bXB5UGNwQ0RSaitXRHltRVFKdHZRQlM5UEdYRTZ3c0paNUxOemxmRnErdkRIS1NKUGRScDJySUlML2diM3hwWWZtTWs3cE84UGZUamlIWVpZd2p3YWdWS0VNRDh0RXNyTjJ0MUVoTWc1RUZUTEhvcUFEcmFWdz09IiwidGltZXN0YW1wIjoxNjM3MjA3NDYwMjkzLCJpYXQiOjE2MzcyMDc0NjAsImV4cCI6MTYzNzIzNjI2MH0.kmnEWwO_i9gu_83aQlKN3ZXXWuENfVpnJP0ayRRVAJc",
        },
      }
    );

    Notification.requestPermission(function (result) {
      if (result === "granted") {
        navigator.serviceWorker.ready.then(function (registration) {
          socketio.on("notification", (msg) => {
            console.log(registration);
            registration.showNotification("Vibration Sample", {
              body: "Buzz! Buzz!",
              icon: "../images/touch/chrome-touch-icon-192x192.png",
              vibrate: [200, 100, 200, 100, 200, 100, 200],
              tag: "vibration-sample",
            });
            console.log("notif gas", msg);
          });
        });
      }
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

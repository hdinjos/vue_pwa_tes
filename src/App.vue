<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <highcharts
      :constructorType="'ganttChart'"
      class="hc"
      ref="chart"
      :options="chartOptions"
    ></highcharts>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

// import { io } from "socket.io-client";

let today = new Date();
let day = 1000 * 60 * 60 * 24;
let series;
let cars;

// Set to 00:00:00:000 today
today.setUTCHours(0);
today.setUTCMinutes(0);
today.setUTCSeconds(0);
today.setUTCMilliseconds(0);
today = today.getTime();

cars = [
  {
    model: "Nissan Leaf",
    current: 0,
    deals: [
      {
        rentedTo: "Lisa Star",
        from: today - 1 * day,
        to: today + 2 * day,
      },
      {
        rentedTo: "Shane Long",
        from: today - 3 * day,
        to: today - 2 * day,
      },
      {
        rentedTo: "Jack Coleman",
        from: today + 5 * day,
        to: today + 6 * day,
      },
    ],
  },
  {
    model: "Jaguar E-type",
    current: 0,
    deals: [
      {
        rentedTo: "Martin Hammond",
        from: today - 2 * day,
        to: today + 1 * day,
      },
      {
        rentedTo: "Linda Jackson",
        from: today - 2 * day,
        to: today + 1 * day,
      },
      {
        rentedTo: "Robert Sailor",
        from: today + 2 * day,
        to: today + 6 * day,
      },
    ],
  },
  {
    model: "Volvo V60",
    current: 0,
    deals: [
      {
        rentedTo: "Mona Ricci",
        from: today + 0 * day,
        to: today + 3 * day,
      },
      {
        rentedTo: "Jane Dockerman",
        from: today + 3 * day,
        to: today + 4 * day,
      },
      {
        rentedTo: "Bob Shurro",
        from: today + 6 * day,
        to: today + 8 * day,
      },
    ],
  },
  {
    model: "Volkswagen Golf",
    current: 0,
    deals: [
      {
        rentedTo: "Hailie Marshall",
        from: today - 1 * day,
        to: today + 1 * day,
      },
      {
        rentedTo: "Morgan Nicholson",
        from: today - 3 * day,
        to: today - 2 * day,
      },
      {
        rentedTo: "William Harriet",
        from: today + 2 * day,
        to: today + 3 * day,
      },
    ],
  },
  {
    model: "Peugeot 208",
    current: 0,
    deals: [
      {
        rentedTo: "Harry Peterson",
        from: today - 1 * day,
        to: today + 2 * day,
      },
      {
        rentedTo: "Emma Wilson",
        from: today + 3 * day,
        to: today + 4 * day,
      },
      {
        rentedTo: "Ron Donald",
        from: today + 5 * day,
        to: today + 6 * day,
      },
    ],
  },
];

series = cars.map(function (car, i) {
  var data = car.deals.map(function (deal) {
    return {
      id: "deal-" + i,
      model: car.model,
      rentedTo: deal.rentedTo,
      start: deal.from,
      end: deal.to,
      y: i,
    };
  });
  return {
    name: car.model,
    data: data,
    current: car.deals[car.current],
  };
});

console.log(series);

export default {
  name: "App",
  data: () => ({
    dataTask: [
      {
        task: "design ui",
        name: "Ihsan",
        start: Date.UTC(2021, 11, 18),
        end: Date.UTC(2021, 11, 25),
      },
      {
        task: "listing account number",
        name: "Muham",
        start: Date.UTC(2021, 11, 27),
        end: Date.UTC(2021, 11, 29),
      },
      {
        task: "check detail user",
        name: "Taufik",
        start: Date.UTC(2021, 11, 20),
        end: Date.UTC(2021, 11, 25),
      },
    ],
  }),
  computed: {
    flatArray() {
      return this.dataTask
        .map((item) => {
          const arr = [item, item];
          const waw = arr.map((ar, i) => {
            if (i % 2 === 1) {
              return { ...ar, task: ar.task + " (actual)" };
            } else {
              return { ...ar, task: ar.task + " (planning)" };
            }
          });
          return waw;
        })
        .flat();
    },
    chartOptions() {
      return {
        // inverted: true,
        title: {
          text: "Gantt Chart with Progress Indicators",
        },
        series: this.flatArray.map((item, i) => {
          let nData = {
            ...item,
            names: item.task,
            name: item.task,
            y: i,
          };
          return {
            data: [nData],
            name: "",
          };
        }),
        scrollbar: {
          enabled: true,
        },
        navigator: {
          enabled: true,
          liveRedraw: true,
          series: {
            type: "gantt",
            pointPlacement: 0.5,
            pointPadding: 0.25,
          },
          yAxis: {
            min: 0,
            max: 3,
            // reversed: true,
            // categories: [],
          },
        },
        // rangeSelector: {
        //   enabled: true,
        //   selected: 0,
        // },
        // tooltip: {
        //   pointFormat:
        //     "<span>Rented To: {point.rentedTo}</span><br/><span>From: {point.start:%e. %b}</span><br/><span>To: {point.end:%e. %b}</span>",
        // },
        xAxis: {
          currentDateIndicator: true,
        },
        yAxis: {
          type: "category",
          uniqueNames: true,
          grid: {
            columns: [
              {
                title: {
                  text: "Name",
                },
                categories: this.flatArray.map((item, i) => {
                  if (i % 2 === 1) {
                    return "";
                  } else {
                    return item.name;
                  }
                }),
              },
              {
                title: {
                  text: "Task",
                },
                categories: this.flatArray.map((item, i) => {
                  if (i % 2 === 1) {
                    return "";
                  } else {
                    return item.task;
                  }
                }),
              },
            ],
          },
        },
      };
    },
  },
  components: {
    // highcharts: HighchartsVue,
    // HelloWorld,
  },
  mounted() {
    console.log(this.chartOptions.series);
    // const socketio = io(
    //   `https://stepup.dev4.stechoq.com/api/member/notification`,
    //   {
    //     withCredentials: false,
    //     extraHeaders: {
    //       Authorization:
    //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ4LCJyb2xlIjozLCJ0b2tlbiI6IlUyRnNkR1ZrWDEvN2NTVnloU1pHbnRIVmkzU0lhWlA5bXB5UGNwQ0RSaitXRHltRVFKdHZRQlM5UEdYRTZ3c0paNUxOemxmRnErdkRIS1NKUGRScDJySUlML2diM3hwWWZtTWs3cE84UGZUamlIWVpZd2p3YWdWS0VNRDh0RXNyTjJ0MUVoTWc1RUZUTEhvcUFEcmFWdz09IiwidGltZXN0YW1wIjoxNjM3MjA3NDYwMjkzLCJpYXQiOjE2MzcyMDc0NjAsImV4cCI6MTYzNzIzNjI2MH0.kmnEWwO_i9gu_83aQlKN3ZXXWuENfVpnJP0ayRRVAJc",
    //     },
    //   }
    // );
    // Notification.requestPermission(function (result) {
    //   if (result === "granted") {
    //     navigator.serviceWorker.ready.then(function (registration) {
    //       console.log(registration);
    //       socketio.on("notification", (msg) => {
    //         registration.showNotification("Vibration Sample", {
    //           body: "Buzz! Buzz!",
    //           icon: "../images/touch/chrome-touch-icon-192x192.png",
    //           vibrate: [200, 100, 200, 100, 200, 100, 200],
    //           tag: "vibration-sample",
    //         });
    //         console.log("notif gas", msg);
    //       });
    //     });
    //   }
    // });
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

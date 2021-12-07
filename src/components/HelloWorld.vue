<template>
  <div id="app">
    <label>Actual</label
    ><input v-model="actual" @change="changeActual" type="checkbox" />
    <!-- <img alt="Vue logo" src="./assets/logo.png".target.value />
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
    actual: false,
    dataTask: [
      {
        id: 1,
        task: "design ui",
        name: "Ihsan",
        start: Date.UTC(2021, 11, 20),
        end: Date.UTC(2021, 11, 25),
      },
      {
        id: 2,
        task: "listing account number",
        name: "Muham",
        start: Date.UTC(2021, 11, 21),
        end: Date.UTC(2021, 11, 28),
      },
      {
        id: 3,
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
              return { ...ar, task: ar.task + " (actual)", color: "#F15C80" };
            } else {
              return { ...ar, task: ar.task + " (planning)", color: "#8085E9" };
            }
          });
          return waw;
        })
        .flat();
    },
    seriesData() {
      return [
        {
          name: "",
          data: this.dataTask,
        },
      ];
    },
    chartOptions() {
      return {
        title: {
          text: "Left Axis as Table",
        },

        xAxis: {
          uniqueNames: true,
          // tickPixelInterval: 70,
        },

        yAxis: {
          type: "category",
          grid: {
            // events: {
            //   click: () => {
            //     console.log("hhhhh");
            //   },
            // },
            enabled: true,
            borderColor: "rgba(0,0,0,0.3)",
            borderWidth: 1,
            columns: [
              {
                title: {
                  text: "Name",
                },
                labels: {
                  format: "{point.name}",
                },
              },
              {
                title: {
                  text: "Task",
                },
                labels: {
                  format: "{point.task}",
                },
              },
              // {
              //   title: {
              //     text: "Est. days",
              //   },
              //   labels: {
              //     formatter: function () {
              //       var point = this.point,
              //         days = 1000 * 60 * 60 * 24,
              //         number = (point.x2 - point.x) / days;
              //       return Math.round(number * 100) / 100;
              //     },
              //   },
              // },
              // {
              //   labels: {
              //     format: "{point.start:%e. %b}",
              //   },
              //   title: {
              //     text: "Start date",
              //   },
              // },
              // {
              //   title: {
              //     text: "End date",
              //   },
              //   labels: {
              //     format: "{point.end:%e. %b}",
              //   },
              // },
            ],
          },
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
            reversed: true,
            categories: [],
          },
        },
        scrollbar: {
          enabled: true,
        },
        rangeSelector: {
          enabled: true,
          selected: 0,
        },

        // tooltip: {
        //   xDateFormat: "%e %b %Y, %H:%M",
        // },

        series: [
          {
            name: "",
            // data: this.flatArray.map((item, i) => ({ ...item, y: i })),
            data: this.actual
              ? this.flatArray.map((item, i) => ({ ...item, y: i }))
              : this.dataTask.map((item, i) => ({
                  ...item,
                  y: i,
                  color: "#8085E9",
                })),
          },
        ],
        plotOptions: {
          gantt: {
            events: {
              click: (e) => {
                console.log(e.point);
              },
            },
            cursor: "pointer",
          },
          series: {
            events: {
              click: (point) => {
                console.log("series", point);
              },
            },
            dataLabels: [
              {
                style: {
                  cursor: "pointer",
                },
              },
            ],
            // point: {
            //   events: {
            //     click: (point) => {
            //       console.log("series", point);
            //     },
            //   },
            // },
          },
        },

        // exporting: {
        //   sourceWidth: 1000,
        // },
      };
    },
  },
  watch: {
    // actual(val) {
    //   this.actual = val;
    //   localStorage.setItem("actualTask", val);
    //   window.location.reload();
    // },
  },
  methods: {
    async changeActual() {
      localStorage.setItem("actualTask", this.actual);
      window.location.reload();
    },
  },
  components: {
    // highcharts: HighchartsVue,
    // HelloWorld,
  },
  created() {
    const actual = localStorage.getItem("actualTask");
    if (actual === "true") {
      this.actual = true;
    } else {
      this.actual = false;
    }
    // this.actual = actual;
    // console.log(this.chartOptions.series);
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

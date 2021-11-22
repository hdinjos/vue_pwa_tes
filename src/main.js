import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import Highcharts from "highcharts";
import Gantt from "highcharts/modules/gantt";
import HighchartsVue from "highcharts-vue";
// import HighchartsCustomEvents from "highcharts-custom-events";

Gantt(Highcharts);
// HighchartsCustomEvents(Highcharts);
Vue.use(HighchartsVue);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

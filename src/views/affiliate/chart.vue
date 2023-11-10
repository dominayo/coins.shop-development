<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveData } = mixins;
import { mapGetters } from "vuex";

export default {
  extends: Line,
  mixins: [reactiveData],
  data() {
    return {
      gradient: null,
      options: null,
    };
  },
  computed: {
    ...mapGetters(["getRefsChartData"]),
  },
  mounted() {
    // this.$refs.canvas.height = 356;
    let gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 356, 0, 0);
    gradient.addColorStop(0.3, "rgba(24, 187, 80, 0.05)");
    gradient.addColorStop(1, "rgba(24, 187, 80, 0.5)");

    this.chartData = {
      datasets: [
        {
          title: "Рефералы",
          borderColor: "#18bb50",
          pointBorderColor: "#ffffff",
          pointBackgroundColor: "#18bb50",
          pointBorderWidth: 2,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 0,
          pointRadius: 5,
          borderWidth: 2,
          backgroundColor: gradient,
          data: this.getRefsChartData,
        },
      ],
    };

    this.options = {
      legend: false,
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "#fff",
        xPadding: 30,
        yPadding: 25,
        titleFontFamily: "GTWalsheim",
        titleFontSize: 15,
        titleFontColor: "#a0a0ac",
        titleFontStyle: "normal",
        bodyFontColor: "#515168",
        bodyFontFamily: "GTWalsheim",
        bodyFontStyle: "500",
        bodyFontSize: 15,
        footerFontColor: "#515168",
        cornerRadius: 15,
        displayColors: false,
        // callbacks: {
        //   title: () => 'Рефералы',
        // 	label: function (tooltipItem, data) {
        // 		var label = tooltipItem.xLabel;
        // 		if (tooltipItem.index !== 0) {
        // 			var labelPrev = tooltipItem.index - 1;
        // 			var diff = Number(tooltipItem.value) - data.datasets[0].data[labelPrev];
        // 			label = diff + ' (' + tooltipItem.xLabel + ')';
        // 			return label;
        // 		} else {
        // 			return label;
        // 		}
        // 	}
        // },
        // Disable the on-canvas tooltip
        enabled: true,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0,
              max: 200,
              stepSize: 50,
              padding: 20,
              fontSize: 12,
              fontColor: "#a0a0ac",
              fontFamily: "GTWalsheim",
            },
            gridLines: {
              display: false,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              source: "data",
              padding: 20,
              fontSize: 12,
              fontColor: "#a0a0ac",
              fontFamily: "GTWalsheim",
            },
            gridLines: {},
            type: "time",
            time: {
              tooltipFormat: "DD.MM - HH:mm",
              unit: "day",
              displayFormats: {
                day: "DD.MM - HH:mm",
              },
            },
          },
        ],
      },
    };
    this.renderChart(this.chartData, this.options);
  },
};
</script>

<style>
</style>

{
  var x; //destroy varaible

  barchart = (title, label, year, cases, tempMin, tempMax) => {
    let min = parseInt(tempMin);
    let max = parseInt(tempMax);
    x = new Chart(document.getElementById("bar-chart"), {
      type: "bar",
      data: {
        labels: year,
        datasets: [
          {
            label: label,
            borderColor: "rgba(196, 88, 80, 1)",
            backgroundColor: "rgba(0,0,255, 0.5)",
            data: cases,
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: title,
          fontSize: 20,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: min - 1000, // min y-axis value
                max: max + 1000, // max y-axis value
              },
            },
          ],
        },
      },
    });
  };

  barchart2 = (title, label, year, cases, tempMin, tempMax) => {
    let min = parseInt(tempMin);
    let max = parseInt(tempMax);
    x = new Chart(document.getElementById("bar-chart"), {
      type: "bar",
      data: {
        labels: year,
        datasets: [
          {
            label: label,
            borderColor: "rgba(196, 88, 80, 1)",
            backgroundColor: "rgba(0,0,255, 0.5)",
            data: cases,
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: title,
          fontSize: 20,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                max: max + 100, // max y-axis value
              },
            },
          ],
        },
      },
    });
  };

  barchart3 = (title, label, year, cases, tempMin, tempMax) => {
    let min = parseInt(tempMin);
    let max = parseInt(tempMax);
    x = new Chart(document.getElementById("bar-chart"), {
      type: "bar",
      data: {
        labels: year,
        datasets: [
          {
            label: label,
            borderColor: "rgba(196, 88, 80, 1)",
            backgroundColor: "rgba(0,0,255, 0.5)",
            data: cases,
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: title,
          fontSize: 20,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: min - 1000, // min y-axis value
                max: max + 2000, // max y-axis value
              },
            },
          ],
        },
      },
    });
  };

  barchart4 = (title, label, year, cases, tempMin, tempMax) => {
    let min = parseInt(tempMin);
    let max = parseInt(tempMax);
    x = new Chart(document.getElementById("bar-chart"), {
      type: "bar",
      data: {
        labels: year,
        datasets: [
          {
            label: label,
            borderColor: "rgba(196, 88, 80, 1)",
            backgroundColor: "rgba(0,0,255, 0.5)",
            data: cases,
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: title,
          fontSize: 20,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                max: max + 10, // max y-axis value
              },
            },
          ],
        },
      },
    });
  };

  // data of 2000 - 2018
  defaultChart = () => {
    Papa.parse(
      "https://raw.githubusercontent.com/sooyongjie/source/master/tb.csv",
      {
        download: true,
        complete: function (results) {
          let title = results.data[0][2];
          // delete first row
          // extract list of year
          results.data.length;
          let year = new Array();
          for (i = 19; i > 0; i--) {
            year.push(results.data[i][1]);
          }
          // extract yearly cases data
          let cases = new Array();
          // get initial min max value
          let v = results.data[19][2].split(" ");
          let minVal = v[0];
          let maxVal = v[0];
          for (i = 19; i > 0; i--) {
            let v = results.data[i][2].split(" ");
            cases.push(v[0]);
            if (minVal > v[0]) minVal = v[0];
            if (maxVal < v[0]) maxVal = v[0];
          }
          barchart(title, "Cases", year, cases, minVal, maxVal);
        },
      }
    );
  };

  // data of 2008 - 2018
  filterYearChart = () => {
    Papa.parse(
      "https://raw.githubusercontent.com/sooyongjie/source/master/tb.csv",
      {
        download: true,
        complete: function (results) {
          let title = results.data[0][2];
          // delete first row
          results.data.splice(0, 1);
          // extract list of year
          results.data.length;
          let year = new Array();
          for (i = 10; i > -1; i--) {
            year.push(results.data[i][1]);
          }
          // extract yearly cases data
          let cases = new Array();
          // get initial min max value
          let v = results.data[10][2].split(" ");
          let minVal = v[0];
          let maxVal = v[0];
          for (i = 10; i > -1; i--) {
            let v = results.data[i][2].split(" ");
            cases.push(v[0]);
            if (minVal > v[0]) minVal = v[0];
            if (maxVal < v[0]) maxVal = v[0];
          }
          barchart(title, "Cases", year, cases, minVal, maxVal);
        },
      }
    );
  };

  //data of 2000 - 2018
  filter2000Chart = () => {
    Papa.parse(
      "https://raw.githubusercontent.com/sooyongjie/source/master/tb.csv",
      {
        download: true,
        complete: function (results) {
          let title = results.data[0][2];
          // delete first row
          results.data.splice(0, 1);
          // extract list of year
          results.data.length;
          let year = new Array();
          for (i = 18; i >= 10; i--) {
            year.push(results.data[i][1]);
          }
          // extract yearly cases data
          let cases = new Array();
          // get initial min max value
          let v = results.data[18][2].split(" ");
          let minVal = v[0];
          let maxVal = v[0];
          for (i = 18; i >= 10; i--) {
            let v = results.data[i][2].split(" ");
            cases.push(v[0]);
            if (minVal > v[0]) minVal = v[0];
            if (maxVal < v[0]) maxVal = v[0];
          }
          barchart(title, "Cases", year, cases, minVal, maxVal);
        },
      }
    );
  };

  //data of incidence of tuberculosis
  IncidenceChart = () => {
    Papa.parse(
      "https://raw.githubusercontent.com/sooyongjie/source/master/tb.csv",
      {
        download: true,
        complete: function (results) {
          let title = results.data[0][3];
          // delete first row
          // extract list of year
          results.data.length;
          let year = new Array();
          for (i = 19; i > 0; i--) {
            year.push(results.data[i][1]);
          }
          // extract yearly cases data
          let cases = new Array();
          // get initial min max value
          let v = results.data[19][3].split(" ");
          let minVal = v[0];
          let maxVal = v[0];
          for (i = 19; i > 0; i--) {
            let v = results.data[i][3].split(" ");
            cases.push(v[0]);
            if (minVal > v[0]) minVal = v[0];
            if (maxVal < v[0]) maxVal = v[0];
          }
          barchart2(title, "Cases", year, cases, minVal, maxVal);
        },
      }
    );
  };

  HIVChart = () => {
    Papa.parse(
      "https://raw.githubusercontent.com/sooyongjie/source/master/tb.csv",
      {
        download: true,
        complete: function (results) {
          let title = results.data[0][5];
          // delete first row
          // extract list of year
          results.data.length;
          let year = new Array();
          for (i = 19; i > 0; i--) {
            year.push(results.data[i][1]);
          }
          // extract yearly cases data
          let cases = new Array();
          // get initial min max value
          let v = results.data[19][5].split(" ");
          let minVal = v[0];
          let maxVal = v[0];
          for (i = 19; i > 0; i--) {
            let v = results.data[i][5].split(" ");
            cases.push(v[0]);
            if (minVal > v[0]) minVal = v[0];
            if (maxVal < v[0]) maxVal = v[0];
          }
          barchart3(title, "Cases", year, cases, minVal, maxVal);
        },
      }
    );
  };

  HIVChart2 = () => {
    Papa.parse(
      "https://raw.githubusercontent.com/sooyongjie/source/master/tb.csv",
      {
        download: true,
        complete: function (results) {
          let title = results.data[0][6];
          // delete first row
          // extract list of year
          results.data.length;
          let year = new Array();
          for (i = 19; i > 0; i--) {
            year.push(results.data[i][1]);
          }
          // extract yearly cases data
          let cases = new Array();
          // get initial min max value
          let v = results.data[19][6].split(" ");
          let minVal = v[0];
          let maxVal = v[0];
          for (i = 19; i > 0; i--) {
            let v = results.data[i][6].split(" ");
            cases.push(v[0]);
            if (minVal > v[0]) minVal = v[0];
            if (maxVal < v[0]) maxVal = v[0];
          }
          barchart4(title, "Cases", year, cases, minVal, maxVal);
        },
      }
    );
  };

  //dropbox selection to view chart
  select = () => {
    let e = document.getElementById("filter");
    let value = e.options[e.selectedIndex].value;
    x.destroy();
    if (value == 0) {
      filter2000Chart();
    } else if (value == 1) {
      filterYearChart();
    } else if (value == 2) {
      defaultChart();
    } else if (value == 3) {
      IncidenceChart();
    } else if (value == 4) {
      HIVChart();
    } else if (value == 5) {
      HIVChart2();
    }
  };
  filter2000Chart(); //default chart that should display
  var ori = document.getElementById("submit").addEventListener("click", select); //dropbox selection button
}

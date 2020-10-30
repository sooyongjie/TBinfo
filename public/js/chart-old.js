{
  linechart = (id, title, label, year, cases, tempMin, tempMax, tickMin, tickMax) => {
    let min = parseInt(tempMin);
    let max = parseInt(tempMax);
    new Chart(id, {
      type: "line",
      data: {
        labels: year,
        datasets: [
          {
            label: label,
            borderColor: "rgba(196, 88, 80, 1)",
            backgroundColor: "rgba(196, 88, 80, 0.2)",
            data: cases,
          },
        ],
      },
      options: {
        legend: { display: true },
        title: { display: false },
        scales: {
          yAxes: [
            {
              ticks: {
                min: min - tickMin, // min y-axis value
                max: max + tickMax, // max y-axis value
              },
            },
          ],
        },
        animation: {
          duration: 750, // general animation time
        },
        hover: {
          animationDuration: 100, // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 250, // animation duration after a resize
      },
    });
  };

  generateChart = (yrStart, yrEnd, col) => {
    Papa.parse(
      "https://raw.githubusercontent.com/sooyongjie/source/master/tb.csv",
      {
        download: true,
        complete: (results) => {
          console.log('results.data: ', results.data);
          let title = results.data[0][col];
          // delete first row
          // extract list of year
          let year = new Array();
          for (i = yrEnd; i > yrStart; i--) {
            year.push(results.data[i][1]);
          }
          // extract yearly cases data
          let cases = new Array();
          // get initial min max value
          let v = results.data[yrEnd][col].split(" ");
          let minVal = v[0];
          let maxVal = v[0];
          for (i = yrEnd; i > yrStart; i--) {
            let v = results.data[i][col].split(" ");
            cases.push(v[0]);
            if (minVal > v[0]) minVal = v[0];
            if (maxVal < v[0]) maxVal = v[0];
          }
          console.log('minVal: ', minVal);
          console.log('minVal.length: ', minVal.length );
          console.log('maxVal: ', maxVal);
          console.log('maxVal.length: ', maxVal.length );
          if(minVal.length == 2) {
            var tickMin = 5
            var tickMax = 5
          }
          else if(minVal.length == 4) {
            var tickMin = 500
            var tickMax = 5000
          }
          else if(minVal.length == 5) {
            var tickMin = 1000
            var tickMax = 1000
          }
          linechart(
            document.getElementById("line-chart"),
            title,
            "Cases",
            year,
            cases,
            minVal,
            maxVal,
            tickMin,
            tickMax
          );
        },
      }
    );
  };

  // const ori = document
  //   .getElementById("default")
  //   .addEventListener("click", defaultChart);

  // const filter = document
  //   .getElementById("filter")
  //   .addEventListener("click", filterChart);

  const arr = {
    '2000': 1,
    '2001': 2,
    '2002': 3,
    '2003': 4,
    '2004': 5,
    '2005': 6,
    '2006': 7,
    '2007': 8,
    '2008': 9,
    '2009': 10,
    '2010': 11,
    '2011': 12,
    '2012': 13,
    '2013': 14,
    '2014': 15,
    '2015': 16,
    '2016': 17,
    '2017': 18,
    '2018': 19,
  }
  const arr2 = {
    '2000': 19,
    '2001': 18,
    '2002': 17,
    '2003': 16,
    '2004': 15,
    '2005': 14,
    '2006': 13,
    '2007': 12,
    '2008': 11,
    '2009': 10,
    '2010': 9,
    '2011': 8,
    '2012': 7,
    '2013': 6,
    '2014': 5,
    '2015': 4,
    '2016': 3,
    '2017': 2,
    '2018': 1,
  }

}

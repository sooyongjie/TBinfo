chart = (yrStart, yrEnd, api) => {
  if (api[1] == 1) {
    fetch(api[0])
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((results) => {
        console.log('results: ', results);
        let { cases, year, minVal, maxVal } = myCases(yrStart, yrEnd, results)
        linechart(document.getElementById("line-chart"), "Cases", year, cases, minVal, maxVal);
      });
  } else { // if comparing two countries
    fetch(api[0])
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((results1) => {
        fetch(api[1])
          .then((response) => response.text())
          .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
          .then((results2) => {
            let { myCases, usCases, myYear, usYear, minVal, maxVal } = myUScases(yrStart, yrEnd, results1, results2)
            linechart2(document.getElementById("line-chart"), "Malaysia", "United States", myYear, myCases, usCases, minVal, maxVal);
          });
      });
  }
};

myCases = (yrStart, yrEnd, results) => {
  const data = xmlToJson(results);
  let arr = data.data.data.slice(1, 21);
  arr.reverse();
  let year = new Array();
  let cases = new Array();
  for (i in arr) {
    if (arr[i].date >= yrStart && arr[i].date <= yrEnd && arr[i].value.length != null) {
      cases.push(arr[i].value);
      year.push(arr[i].date);
    }
  }
  let minVal = cases[0];
  let maxVal = cases[0];
  for (i in cases) {
    if (minVal > cases[i]) minVal = cases[i];
    if (maxVal < cases[i]) maxVal = cases[i];
  }
  return { cases, year, minVal, maxVal }
}

myUScases = (yrStart, yrEnd, myResults, usResults) => {
  const myData = xmlToJson(myResults);
  const usData = xmlToJson(usResults);
  let myArr = myData.data.data.slice(1, 21);
  let usArr = usData.data.data.slice(1, 21);
  myArr.reverse();
  usArr.reverse();
  let myYear = new Array();
  let usYear = new Array();
  let myCases = new Array();
  let usCases = new Array();
  for (i in myArr) {
    if (myArr[i].date >= yrStart && myArr[i].date <= yrEnd && myArr[i].value.length != null) {
      myCases.push(myArr[i].value);
      myYear.push(myArr[i].date);
    }
  }
  for (i in usArr) {
    if (usArr[i].date >= yrStart && usArr[i].date <= yrEnd && usArr[i].value.length != null) {
      usCases.push(usArr[i].value);
      usYear.push(usArr[i].date);
    }
  }
  let minVal = myCases[0];
  let maxVal = myCases[0];
  for (i in myCases) {
    if (minVal > myCases[i]) minVal = myCases[i];
    if (maxVal < myCases[i]) maxVal = myCases[i];
  }
  for (i in usCases) {
    if (minVal > usCases[i]) minVal = usCases[i];
    if (maxVal < usCases[i]) maxVal = usCases[i];
  }
  return { myCases, usCases, myYear, usYear, minVal, maxVal }
}

linechart = (id, label, year, cases, tempMin, tempMax) => {
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

linechart2 = (id, myLabel, usLabel, year, myCases, usCases, tempMin, tempMax) => {
  new Chart(id, {
    type: "line",
    data: {
      labels: year,
      datasets: [
        {
          label: myLabel,
          borderColor: "rgba(196, 88, 80, 1)",
          backgroundColor: "rgba(255,255,255, 0.25)",
          data: myCases,
        },
        {
          label: usLabel,
          borderColor: "rgba(62, 149, 205, 1)",
          backgroundColor: "rgba(255,255,255, 0.25)",
          data: usCases,
        },
      ],
    },
    options: {
      legend: { display: true },
      title: { display: false },

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

barChart2 = (id, myLabel, usLabel, year, myCases, usCases, tempMin, tempMax) => {
  new Chart(id, {
    type: "bar",
    data: {
      labels: year,
      datasets: [
        {
          label: myLabel,
          backgroundColor: "rgba(196, 88, 80, 1)",
          data: myCases,
        },
        {
          label: usLabel,
          backgroundColor: "rgba(62, 149, 205, 1)",
          data: usCases,
        },
      ],
    },
    options: {
      legend: { display: true },
      title: { display: false },
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

pieChart = (id, label, year, cases, usCases, tempMin, tempMax) => {
  new Chart(id, {
    type: "pie",
    data: {
      labels: year,
      datasets: [
        {
          label: label,
          backgroundColor: ["rgba(62, 149, 205, 1)", "rgba(62, 149, 205, 0.5)"],
          data: cases,
        },
      ],
    },
    options: {
      legend: { display: true },
      title: { display: false },
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

doughnutChart = (id, label, year, cases, usCases, tempMin, tempMax) => {
  new Chart(id, {
    type: "doughnut",
    data: {
      labels: year,
      datasets: [
        {
          label: label,
          backgroundColor: ["rgba(62, 149, 205, 0.2)", "rgba(62, 149, 205, 0.25)", "rgba(62, 149, 205, 0.30)", "rgba(62, 149, 205, 0.35)", "rgba(62, 149, 205, 0.40)", "rgba(62, 149, 205, 0.45)", "rgba(62, 149, 205, 0.50)", "rgba(62, 149, 205, 0.55)", "rgba(62, 149, 205, 0.60)", "rgba(62, 149, 205, 0.65)", "rgba(62, 149, 205, 0.70)", "rgba(62, 149, 205, 0.75)", "rgba(62, 149, 205, 0.80)", "rgba(62, 149, 205, 0.85)", "rgba(62, 149, 205, 0.90)", "rgba(62, 149, 205, 0.95)", "rgba(62, 149, 205, 1)", "rgba(62, 149, 205, 1)", "rgba(62, 149, 205, 1)"],
          data: cases,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: { display: false },
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

horizontalBarChart = (id, myLabel, usLabel, year, myCases, usCases, tempMin, tempMax) => {
  new Chart(id, {
    type: "horizontalBar",
    data: {
      labels: year,
      datasets: [
        {
          label: myLabel,
          backgroundColor: "rgba(196, 88, 80, 1)",
          data: myCases,
        },
        {
          label: usLabel,
          backgroundColor: "rgba(62, 149, 205, 1)",
          data: usCases,
        },
      ],
    },
    options: {
      legend: { display: true },
      title: { display: false },
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

chart(2000, 2018, `https://api.worldbank.org/v2/country/my/indicator/SH.TBS.INCD`);

const dropdown = document.querySelector("#md-select1");
const dropdown2 = document.querySelector("#md-select2");
const dropdown3 = document.querySelector("#md-select3");
const dropdown4 = document.querySelector("#md-select4");
const btn1 = document.querySelector("#md-select1 label button");
const btn2 = document.querySelector("#md-select2 label button");
const btn3 = document.querySelector("#md-select3 label button");
const btn4 = document.querySelector("#md-select4 label button");

dropdown.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});
dropdown2.addEventListener("click", () => {
  dropdown2.classList.toggle("active");
});
dropdown3.addEventListener("click", () => {
  dropdown3.classList.toggle("active");
});
dropdown4.addEventListener("click", () => {
  dropdown4.classList.toggle("active");
});

// $('#md-select1').on('click', function(){
//   $(this).toggleClass('active')
// })
// $('#md-select2').on('click', function(){
//   $(this).toggleClass('active')
// })
$("#md-select1 ul li").on("click", function () {
  var v = $(this).text();
  $("#md-select1 ul li").not($(this)).removeClass("active");
  $(this).addClass("active");
  $("#md-select1 label button").text(v);
  chart(btn1.textContent, btn2.textContent, checkDataset(btn3.textContent, btn4.textContent));
});
$("#md-select2 ul li").on("click", function () {
  var v = $(this).text();
  $("#md-select2 ul li").not($(this)).removeClass("active");
  $(this).addClass("active");
  $("#md-select2 label button").text(v);
  chart(btn1.textContent, btn2.textContent, checkDataset(btn3.textContent, btn4.textContent));
});
$("#md-select3 ul li").on("click", function () {
  var v = $(this).text();
  $("#md-select3 ul li").not($(this)).removeClass("active");
  $(this).addClass("active");
  $("#md-select3 label button").text(v);
  chart(btn1.textContent, btn2.textContent, checkDataset(btn3.textContent, btn4.textContent));
});
$("#md-select4 ul li").on("click", function () {
  var v = $(this).text();
  $("#md-select4 ul li").not($(this)).removeClass("active");
  $(this).addClass("active");
  $("#md-select4 label button").text(v);
  chart(btn1.textContent, btn2.textContent, checkDataset(btn3.textContent, btn4.textContent));
});

checkDataset = (dataset, country) => {
  let api = ['', '']
  if (dataset == "Incidence per 100,000") {
    api = ['https://api.worldbank.org/v2/country/my/indicator/SH.TBS.INCD', 1];
  }
  else if (dataset == "Tuberculosis Detection Rate") {
    api = ['https://api.worldbank.org/v2/country/my/indicator/SH.TBS.DTEC.ZS', 1];
  }
  else if (dataset == "Successful Treatement Rate") {
    api = ['https://api.worldbank.org/v2/country/my/indicator/SH.TBS.CURE.ZS', 1];
  }
  if (country == "Malaysia & U.S.") {
    api[1] = api[0].replace("my", "us");
  }
  return api;
};

chart2 = () => {
  fetch("https://api.worldbank.org/v2/country/my/indicator/SH.TBS.INCD")
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    .then((results1) => {
      fetch("https://api.worldbank.org/v2/country/us/indicator/SH.TBS.INCD")
        .then((response) => response.text())
        .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
        .then((results2) => {
          let { myCases, usCases, myYear, usYear, minVal, maxVal } = myUScases(2018, 2018, results1, results2)
          barChart2(document.getElementById("chart2"), "Malaysia", "United States", myYear, myCases, usCases, minVal, maxVal);
        });
    });
}

chart3 = () => {
  fetch("https://api.worldbank.org/v2/country/my/indicator/SH.TBS.DTEC.ZS")
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    .then((results) => {
      let { cases, year, minVal, maxVal } = myCases(2018, 2018, results)
      cases.push(100 - cases[0])
      cases[0] = parseInt(cases[0])
      let label = ["Success rate", "Fail rate"]
      pieChart(document.getElementById("chart3"), "Cases", label, cases, minVal, maxVal);
    });
}

chart4 = () => {
  fetch("https://api.worldbank.org/v2/country/my/indicator/SH.TBS.INCD")
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    .then((results) => {
      let { cases, year, minVal, maxVal } = myCases(2000, 2018, results)
      doughnutChart(document.getElementById("chart4"), "Cases", year, cases, minVal, maxVal);
    });
}

chart5 = () => {
  fetch("https://api.worldbank.org/v2/country/my/indicator/SH.TBS.INCD")
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    .then((results1) => {
      fetch("https://api.worldbank.org/v2/country/us/indicator/SH.TBS.INCD")
        .then((response) => response.text())
        .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
        .then((results2) => {
          let { myCases, usCases, myYear, usYear, minVal, maxVal } = myUScases(2018, 2018, results1, results2)
          horizontalBarChart(document.getElementById("chart5"), "Malaysia", "United States", myYear, myCases, usCases, minVal, maxVal);
        });
    });
}

chart(btn1.textContent, btn2.textContent, checkDataset(btn3.textContent, btn4.textContent));
chart2()
chart3()
chart4()
chart5()

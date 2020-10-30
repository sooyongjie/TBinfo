myUS2018Chart = (yrStart, yrEnd, myResults, usResults) => {
    const myData = xmlToJson(myResults);
    const usData = xmlToJson(usResults);
    let myArr = myData.data.data.slice(1, 20);
    let usArr = usData.data.data.slice(1, 20);
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

let { myCases, usCases, myYear, usYear, minVal, maxVal } = myUS2018Chart(2018, 2018, "https://api.worldbank.org/v2/country/my/indicator/SH.TBS.INCD", "https://api.worldbank.org/v2/country/us/indicator/SH.TBS.INCD")

linechart2(document.getElementById("chart2"), "Malaysia", "United States", myYear, myCases, usCases, minVal, maxVal);

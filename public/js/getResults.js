let response = JSON.parse(Cookies.get('response'))
let chances = 0;

if (response[3] == "Two or more") {
    chances += 60;
} else if (response[3] == "Just one") {
    chances += 20;
}

if (response[4] == "Two or more") {
    chances += 30;
} else if (response[4] == "Just one") {
    chances += 10;
}

if (response[5] == "Yes") {
    chances += 10;
} else if (response[5] == "I don't know" && chances != 0) {
    chances += 5;
}

const results = document.querySelector('#results')

if (chances == 0) {
    results.textContent = "We don't think you are at risk"
} else if (chances < 40) {
    results.textContent = "Hmm"
} else if (chances < 60) {
    results.textContent = "Hmmmm"
} else if (chances < 80) {
    results.textContent = "Wow, hello tuberculosis patient"
} else if (chances >= 80) {
    results.textContent = "You're quite fucked"
}

let db = firebase.firestore();

let labels = [
    ["Yes", "Just a bit", "No"],
    ["Yes", "No"],
    ["Yes", "No"],
];

let counts = [3, 2, 2]

let elements = [
    document.querySelector('#q1'),
    document.querySelector('#q2'),
    document.querySelector('#q3'),
]

db.collection("Questionnaire").doc("q1").get().then(function (doc) {
    if (doc.exists) {
        let results = Object.values(doc.data());
        questionnaireChart(elements[0], countData(results, labels[0], counts[0]), labels[0])
    } else {
        console.log("No such document!");
    }
}).catch(function (error) {
    console.log("Error getting document:", error);
});

db.collection("Questionnaire").doc("q2").get().then(function (doc) {
    if (doc.exists) {
        let results = Object.values(doc.data());
        questionnaireChart(elements[1], countData(results, labels[1], counts[1]), labels[1])
    } else {
        console.log("No such document!");
    }
}).catch(function (error) {
    console.log("Error getting document:", error);
});

db.collection("Questionnaire").doc("q3").get().then(function (doc) {
    if (doc.exists) {
        let results = Object.values(doc.data());
        questionnaireChart(elements[2], countData(results, labels[2], counts[2]), labels[2])
    } else {
        console.log("No such document!");
    }
}).catch(function (error) {
    console.log("Error getting document:", error);
});

countData = (arr, keyword, num) => {
    let count = new Array();
    for (i = 0; i < num; i++) {
        count.push(0)
    }
    for (i in arr) {
        for (j in arr) {
            if (arr[i] == keyword[j]) {
                count[j]++
            }
        }
    }
    return count;
}

questionnaireChart = (id, data, labels) => {
    new Chart(id, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: labels,
                backgroundColor: ["#f4a261", "#e9c46a", "#dda15e"],
                data: data
            }]
        },
        options: {
            title: {
                display: false
            }
        }
    });
}

const percentage = document.querySelector('#percentage')

// Use requestAnimationFrame with setTimeout fallback
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

(function animloop() {
    if (percentage.innerHTML >= chances) {
        return;
    } //Stop recursive when max reach
    requestAnimFrame(animloop);
    percentage.innerHTML++;
})();


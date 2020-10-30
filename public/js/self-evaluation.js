new Glider(document.querySelector('.questions'), {
  slidesToShow: 1,
  slidesToScroll: 1,
  scrollLock: true,
  scrollLockDelay: 0,
  draggable: true,
  dragVelocity: 3,
  duration: 0.6,
  arrows: {
    prev: '.back',
    next: '.next',
  }
});

const selectedEl = (el => {
  el.className = `${el.classList[0]} selected`
  el.parentElement.querySelectorAll("*").forEach((child) => {
    if (child != el) {
      child.className = child.classList[0];
    }
    if (child.nodeName == "INPUT") {
      console.log(child);
      el.parentElement.removeChild(child)
    }
  })
  let input = document.createElement("INPUT")
  input.setAttribute("type", "hidden")
  input.setAttribute("value", el.textContent)
  el.parentElement.append(input)
})


checkInput = () => {
  let inputs = document.querySelectorAll("input[type=hidden]");
  try {
    if (inputs.length < 6) {
      alert("Please complete the evaluation before proceeding in!")
      throw new Error("⚠ User have not complete evaluation");
    } else loginWithGoogle(inputs)
  } catch (error) {
    console.log(error);
  }
}

submitQuestionaire = (inputs, uid, userEmail) => {
  // let q = ["Are you familiar with Tuberculosis?", "Are you aware of how Tuberculosis spreads?", "Are you aware of the differences between Latent Tuberculosis Infection and Tuberculosis Disease?", "Do you have the following major symptoms?", "Do you have the following minor symptoms?", "Do you have HIV?"];

  let i = 0;
  let db = firebase.firestore();
  let response = {};
  inputs.forEach((input) => {
    let data = {};
    data[userEmail] = input.value;
    response[i] = input.value;
    db.collection("Questionnaire").doc(`q${i + 1}`).set(data, { merge: true }).then(function () {
    }).catch(function (error) {
      console.error("Error adding document: ", error);
    });
    i++;
  })
  Cookies.set("response", JSON.stringify(response))

  db.collection("Users").doc(userEmail).set({ uid: uid }, { merge: true }).catch(function (error) {
    console.error("Error adding document: ", error);
  }).then(function () {
    window.location.href = 'results.html'
  });
}

loginWithGoogle = (inputs) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE).then(() => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      var userInfo = result.user
      document.querySelector('#login-btn').textContent = userInfo.email
      return userInfo;
    }).then(userInfo => submitQuestionaire(inputs, userInfo.uid, userInfo.email)).catch((error) => {
      console.log('error: ', error);
    })
  })
}

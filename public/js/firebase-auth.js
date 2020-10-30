// firebaseLogin = () => {
//     firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE).then(() => {
//         let provider = new firebase.auth.GoogleAuthProvider();
//         firebase.auth().signInWithPopup(provider).then((result) => {
//             userToken = result.credential.accessToken;
//             let user = result.user;
//             signInBtn.textContent = user.email
//             submitQuestionaire(user.uid, user.email)
//         })
//             .catch((error) => {
//                 console.log('error: ', error);
//             });
//     })
// }

// firebaseLogout = () => {
//     firebase.auth().signOut().then(() => {
//         signInBtn.textContent = "Login"
//     }).catch((error) => {
//         console.log('error: ', error);
//     });
// }

// const signInBtn = document.querySelector(".sign-up")

// signInBtn.addEventListener("click", () => {
//     var user = firebase.auth().currentUser;
//     if (user)
//         firebaseLogout()
//     else
//         firebaseLogin()
// });

// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         uid = user.uid;
//         signInBtn.textContent = user.email
//     }
// });
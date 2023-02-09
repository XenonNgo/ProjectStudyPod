import { auth, onAuthStateChanged, signOut } from "./config.js";
import { db, ref, update, increment, get, onValue } from "./config.js";

var value3;
const value3Ref = ref(db, '/connections/value3');
get(value3Ref, (snapshot) => {
    value3 = snapshot.val();
    if (value3 !== 1) {
        window.location.replace("./otp.html");
    }
})

var value6;
var currentTime = new Date().getTime();
const value6Ref = ref(db, '/connections/value6');
onValue(value6Ref, (snapshot) => {
    value6 = snapshot.val();
    var sessionTimeout = Math.floor((value6 - currentTime) / 1000);
    sessionStorage.setItem("session_Timer", sessionTimeout);
});

var session_Timer;
setTimeout(function () {
    session_Timer = sessionStorage.getItem("session_Timer");
}, 1500)

var minutes = parseInt(session_Timer / 60);
var seconds = parseInt(session_Timer % 60);
setTimeout(function sessionTimer() {
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    document.getElementById("total-time-left").innerHTML = "Time Left: " + minutes + " minutes " + seconds + " seconds";
    if (session_Timer <= 0) {
        sessionTimedout();
    } else {
        session_Timer = session_Timer - 1;
        minutes = parseInt(session_Timer / 60);
        seconds = parseInt(session_Timer % 60);
        sessionStorage.setItem("session_Timer", session_Timer);
        setTimeout(sessionTimer, 1000);
    }
}, 2000);

function sessionTimedout() {
    var currentTime = new Date().getTime();
    var currentDate = new Date();
    var dateTime = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1)
        + "-" + currentDate.getDate() + " @ " + ('0' + currentDate.getHours()).slice(-2)
        + ":" + ('0' + currentDate.getMinutes()).slice(-2) + ":" + ('0' + currentDate.getSeconds()).slice(-2);
    update(ref(db, 'users/' + auth.currentUser.uid + '/value3'), {
        [currentTime]: dateTime + " - Logged out by session timeout."
    })
        .then(() => {
            update(ref(db, 'connections/'), {
                value1: increment(-1),
                value2: null,
                value3: null,
                value4: null,
                value5: null,
                value6: null
            })
                .then(() => {
                    signOut(auth).then(() => {
                        window.location.replace("./loggedout.html");
                    }).catch((error) => {
                    });
                })
                .catch((error) => {
                });
        })
        .catch((error) => {
        });
}

unlockbtn.addEventListener('click', (e) => {
    update(ref(db, 'door/'), {
        int: 1
    })
});

logoutbtn.addEventListener('click', (e) => {
    var currentTime = new Date().getTime();
    var currentDate = new Date();
    var dateTime = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1)
        + "-" + currentDate.getDate() + " @ " + ('0' + currentDate.getHours()).slice(-2)
        + ":" + ('0' + currentDate.getMinutes()).slice(-2) + ":" + ('0' + currentDate.getSeconds()).slice(-2);

    update(ref(db, 'users/' + auth.currentUser.uid + '/value3'), {
        [currentTime]: dateTime + " - Logged out."
    })
        .then(() => {
            update(ref(db, 'connections/'), {
                value1: increment(-1),
                value2: null,
                value3: null,
                value4: null,
                value5: null,
                value6: null
            })
                .then(() => {
                    signOut(auth).then(() => {
                        window.location.replace("./loggedout.html");
                    }).catch((error) => {
                    });
                })
                .catch((error) => {
                });
        })
        .catch((error) => {
        });
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
    } else {
        window.location.replace("./index.html");
    }
});

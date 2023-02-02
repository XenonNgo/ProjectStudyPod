import { auth, onAuthStateChanged, signOut } from "./config.js";
import { db, ref, update, increment, onValue } from "./config.js";

var value4;
const value4Ref = ref(db, '/connections/value4');
onValue(value4Ref, (snapshot) => {
    value4 = snapshot.val();
});

var value5;
var currentTime = new Date().getTime();
const value5Ref = ref(db, '/connections/value5');
onValue(value5Ref, (snapshot) => {
    value5 = snapshot.val();
    var otpTimeout = Math.floor((value5 - currentTime) / 1000);
    sessionStorage.setItem("otp_Timer", otpTimeout);
});

var otp_Timer;
setTimeout(function () {
    otp_Timer = sessionStorage.getItem("otp_Timer");
}, 1500)

var minutes = parseInt(otp_Timer / 60);
var seconds = parseInt(otp_Timer % 60);
setTimeout(function otpTimer() {
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    document.getElementById("total-time-left").innerHTML = "Time Left: " + minutes + " minutes " + seconds + " seconds";
    if (otp_Timer <= 0) {
        otpTimedout();
    } else {
        otp_Timer = otp_Timer - 1;
        minutes = parseInt(otp_Timer / 60);
        seconds = parseInt(otp_Timer % 60);
        sessionStorage.setItem("otp_Timer", otp_Timer);
        setTimeout(otpTimer, 1000);
    }
}, 2000);

function otpTimedout() {
    var currentTime = new Date().getTime();
    var currentDate = new Date();
    var dateTime = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1)
        + "-" + currentDate.getDate() + " @ " + ('0' + currentDate.getHours()).slice(-2)
        + ":" + ('0' + currentDate.getMinutes()).slice(-2) + ":" + ('0' + currentDate.getSeconds()).slice(-2);
    update(ref(db, 'users/' + auth.currentUser.uid + '/value3'), {
        [currentTime]: dateTime + " - Failed 2FA by otp timeout."
    })
        .then(() => {
            update(ref(db, 'connections/'), {
                value1: increment(-1),
                value2: null,
                value4: null,
                value5: null
            })
                .then(() => {
                    signOut(auth).then(() => {
                        window.location.replace("./invalidotp.html");
                    }).catch((error) => {
                    });
                })
                .catch((error) => {
                });
        })
        .catch((error) => {
        });
}

otpbtn.addEventListener('click', (e) => {
    var otp = document.getElementById('otp').value;
    digestMessage(otp);
    setTimeout(function () {
        var currentTime = new Date().getTime();
        var timeout = currentTime + 7200000;
        var currentDate = new Date();
        var dateTime = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1)
            + "-" + currentDate.getDate() + " @ " + ('0' + currentDate.getHours()).slice(-2)
            + ":" + ('0' + currentDate.getMinutes()).slice(-2) + ":" + ('0' + currentDate.getSeconds()).slice(-2);
        if (hash == value4) {
            update(ref(db, 'connections'), {
                value3: 1,
                value4: null,
                value5: null,
                value6: timeout
            })
                .then(() => {
                    update(ref(db, 'users/' + auth.currentUser.uid + '/value3'), {
                        [currentTime]: dateTime + " - Logged in."
                    })
                        .then(() => {
                            window.location.replace("./loggedin.html");
                        })
                        .catch((error) => {
                        });
                })
                .catch((error) => {
                });
        } else {
            update(ref(db, 'users/' + auth.currentUser.uid), {
                value2: increment(-1)
            })
                .then(() => {
                    document.getElementById("info").innerHTML = "A verification code has been sent to your email<br>Incorrect OTP.";
                })
                .catch((error) => {
                    update(ref(db, 'users/' + auth.currentUser.uid + '/value3'), {
                        [currentTime]: dateTime + " - Failed 2FA by invalid otp."
                    })
                        .then(() => {
                            update(ref(db, 'connections/'), {
                                value1: increment(-1),
                                value2: null,
                                value4: null,
                                value5: null
                            })
                                .then(() => {
                                    signOut(auth).then(() => {
                                        window.location.replace("./invalidotp.html");
                                    }).catch((error) => {
                                    });
                                })
                                .catch((error) => {
                                });
                        })
                        .catch((error) => {
                        });
                });
        }
    }, 1500)
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
    } else {
        window.location.replace("./index.html");
    }
});

document.getElementById("otpbtn").disabled = true;
const otp = document.getElementById("otp");
var otpValid = false;

otp.addEventListener('input', () => {
    const otpPattern = /\d{6}/;
    document.getElementById("info").innerHTML = "A verification code has been sent to your email";

    if (otp.value.match(otpPattern)) {
        otpValid = true;
    } else {
        otpValid = false;
    }
})

setTimeout(function inputValid() {
    if (otpValid == true) {
        document.getElementById("otpbtn").disabled = false;
    } else {
        document.getElementById("otpbtn").disabled = true;
    }
    setTimeout(inputValid, 500);
}, 500);

var hash;
async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    hash = hashHex;
}

import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, signOut, sendEmailVerification } from "./config.js";
import { db, ref, update, increment } from "./config.js";

var invalidLogin_Timer = localStorage.getItem("invalidLogin_Timer");
if (invalidLogin_Timer <= 0) {
    localStorage.removeItem("invalidLogin_Timer");
} else {
    window.location.replace("./invalidlogin.html");
}

signupbtn.addEventListener('click', (e) => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    digestMessage(password);
    setTimeout(function () {
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                createUserWithEmailAndPassword(auth, email, hash)
                    .then((userCredential) => {
                        signInWithEmailAndPassword(auth, email, hash)
                            .then((userCredential) => {
                                sendEmailVerification(auth.currentUser)
                                    .then(() => {
                                        document.getElementById("info").innerHTML = "Create an account to use the pod<br>A verification email has been sent";
                                        setTimeout(function notVerified() {
                                            if (auth.currentUser.emailVerified) {
                                                const user = userCredential.user;
                                                update(ref(db, 'users/' + user.uid), {
                                                    value1: email,
                                                    value2: 3
                                                })
                                                    .then(() => {
                                                        var currentTime = new Date().getTime();
                                                        var timeout = currentTime + 180000;
                                                        update(ref(db, 'connections/'), {
                                                            value1: increment(1),
                                                            value2: email,
                                                            value3: null,
                                                            value4: null,
                                                            value5: timeout,
                                                            value6: null
                                                        })
                                                            .then(() => {
                                                                window.location.replace("./otp.html");
                                                            })
                                                            .catch((error) => {
                                                                document.getElementById("info").innerHTML = "Create an account to use the pod<br>Currently occupied, please try signing in later.";
                                                                signOut(auth).then(() => {
                                                                }).catch((error) => {
                                                                });
                                                            });
                                                    })
                                                    .catch((error) => {
                                                    });
                                            } else {
                                                auth.currentUser.reload();
                                                setTimeout(notVerified, 5000);
                                            }
                                        }, 1000)
                                    })
                            })
                            .catch((error) => {
                            });
                    })
                    .catch((error) => {
                        switch (error.code) {
                            case 'auth/email-already-in-use':
                                document.getElementById("info").innerHTML = "Create an account to use the pod<br>This email already exists. Please try to log in instead.";
                                break;
                            default:
                                document.getElementById("info").innerHTML = "Create an account to use the pod<br>Something went wrong. Try refreshing the page, or try again later.";
                                break;
                        }
                    });
            })
            .catch((error) => {
            });
    }, 1500)
});

document.getElementById("signupbtn").disabled = true;
const email = document.getElementById("email");
const password = document.getElementById("password");
const checkbox = document.getElementById("checkbox");
var emailValid = false;
var passwordValid = false;

email.addEventListener('input', () => {
    const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/;
    document.getElementById("info").innerHTML = "Create an account to use the pod";

    if (email.value.match(emailPattern)) {
        emailValid = true;
    } else {
        emailValid = false;
    }
})

password.addEventListener('input', () => {
    const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    document.getElementById("info").innerHTML = "Create an account to use the pod";

    if (password.value.match(passwordPattern)) {
        passwordValid = true;
        document.getElementById("info").innerHTML = "Create an account to use the pod";
    } else {
        passwordValid = false;
        document.getElementById("info").innerHTML = "Create an account to use the pod<br>Password must be at least 8 characters and contain at least one uppercase, one lowercase, and one number.";
    }
})

setTimeout(function inputValid() {
    if (emailValid == true && passwordValid == true) {
        document.getElementById("signupbtn").disabled = false;
    } else {
        document.getElementById("signupbtn").disabled = true;
    }
    setTimeout(inputValid, 500);
}, 500);

checkbox.addEventListener('change', () => {
    var x = document.getElementById("password");
    if (checkbox.checked) {
        x.type = "text";
    } else {
        x.type = "password";
    }
});

var hash;
async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    hash = hashHex;
}
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, signOut, sendEmailVerification } from "./config.js";
import { db, ref, update, increment } from "./config.js";

var invalidLogin_Timer = localStorage.getItem("invalidLogin_Timer");
if (invalidLogin_Timer <= 0) {
    localStorage.removeItem("invalidLogin_Timer");
} else {
    window.location.replace("./invalidlogin.html");
}

signupbtn.addEventListener('click', (e) => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    digestMessage(password);
    setTimeout(function () {
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                createUserWithEmailAndPassword(auth, email, hash)
                    .then((userCredential) => {
                        signInWithEmailAndPassword(auth, email, hash)
                            .then((userCredential) => {
                                sendEmailVerification(auth.currentUser)
                                    .then(() => {
                                        document.getElementById("info").innerHTML = "Create an account to use the pod<br>A verification email has been sent";
                                        setTimeout(function notVerified() {
                                            if (auth.currentUser.emailVerified) {
                                                const user = userCredential.user;
                                                update(ref(db, 'users/' + user.uid), {
                                                    value1: email,
                                                    value2: 3
                                                })
                                                    .then(() => {
                                                        var currentTime = new Date().getTime();
                                                        var timeout = currentTime + 180000;
                                                        update(ref(db, 'connections/'), {
                                                            value1: increment(1),
                                                            value2: email,
                                                            value3: null,
                                                            value4: null,
                                                            value5: timeout,
                                                            value6: null
                                                        })
                                                            .then(() => {
                                                                window.location.replace("./otp.html");
                                                            })
                                                            .catch((error) => {
                                                                document.getElementById("info").innerHTML = "Create an account to use the pod<br>Currently occupied, please try signing in later.";
                                                                signOut(auth).then(() => {
                                                                }).catch((error) => {
                                                                });
                                                            });
                                                    })
                                                    .catch((error) => {
                                                    });
                                            } else {
                                                auth.currentUser.reload();
                                                setTimeout(notVerified, 5000);
                                            }
                                        }, 1000)
                                    })
                            })
                            .catch((error) => {
                            });
                    })
                    .catch((error) => {
                        switch (error.code) {
                            case 'auth/email-already-in-use':
                                document.getElementById("info").innerHTML = "Create an account to use the pod<br>This email already exists. Please try to log in instead.";
                                break;
                            default:
                                document.getElementById("info").innerHTML = "Create an account to use the pod<br>Something went wrong. Try refreshing the page, or try again later.";
                                break;
                        }
                    });
            })
            .catch((error) => {
            });
    }, 1500)
});

document.getElementById("signupbtn").disabled = true;
const email = document.getElementById("email");
const password = document.getElementById("password");
const checkbox = document.getElementById("checkbox");
var emailValid = false;
var passwordValid = false;

email.addEventListener('input', () => {
    const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/;
    document.getElementById("info").innerHTML = "Create an account to use the pod";

    if (email.value.match(emailPattern)) {
        emailValid = true;
    } else {
        emailValid = false;
    }
})

password.addEventListener('input', () => {
    const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    document.getElementById("info").innerHTML = "Create an account to use the pod";

    if (password.value.match(passwordPattern)) {
        passwordValid = true;
        document.getElementById("info").innerHTML = "Create an account to use the pod";
    } else {
        passwordValid = false;
        document.getElementById("info").innerHTML = "Create an account to use the pod<br>Password must be at least 8 characters and contain at least one uppercase, one lowercase, and one number.";
    }
})

setTimeout(function inputValid() {
    if (emailValid == true && passwordValid == true) {
        document.getElementById("signupbtn").disabled = false;
    } else {
        document.getElementById("signupbtn").disabled = true;
    }
    setTimeout(inputValid, 500);
}, 500);

checkbox.addEventListener('change', () => {
    var x = document.getElementById("password");
    if (checkbox.checked) {
        x.type = "text";
    } else {
        x.type = "password";
    }
});

var hash;
async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    hash = hashHex;
}

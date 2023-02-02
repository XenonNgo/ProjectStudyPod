import { auth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, signOut } from "./config.js";
import { db, ref, update, increment } from "./config.js";

var loginAttempts = 5;
var invalidLogin_Timer = localStorage.getItem("invalidLogin_Timer");
if (invalidLogin_Timer <= 0) {
    localStorage.removeItem("invalidLogin_Timer");
} else {
    window.location.replace("./invalidlogin.html");
}

loginbtn.addEventListener('click', (e) => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    setPersistence(auth, browserSessionPersistence)
        .then(() => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    var currentTime = new Date().getTime();
                    var timeout = currentTime + 180000;
                    update(ref(db, 'connections/'), {
                        value1: increment(1),
                        value2: email,
                        value5: timeout
                    })
                        .then(() => {
                            update(ref(db, 'users/' + user.uid), {
                                value2: 3
                            })
                                .then(() => {
                                    window.location.replace("./otp.html");
                                })
                                .catch((error) => {
                                });
                        })
                        .catch((error) => {
                            document.getElementById("info").innerHTML = "Please login to use the pod<br>Currently occupied, please try again later.";
                            signOut(auth).then(() => {
                            }).catch((error) => {
                            });
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    switch (errorCode) {
                        case 'auth/user-not-found':
                            document.getElementById("info").innerHTML = "Please login to use the pod<br>Incorrect email or password.";
                            loginAttempts--;
                            break;
                        case 'auth/wrong-password':
                            document.getElementById("info").innerHTML = "Please login to use the pod<br>Incorrect email or password.";
                            loginAttempts--;
                            break;
                        default:
                            document.getElementById("info").innerHTML = "Please login to use the pod<br>Something went wrong. Try refreshing the page, or try again later.";
                            break;
                    }
                    if (loginAttempts <= 0) {
                        window.location.replace("./invalidlogin.html");
                    }
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
});

document.getElementById("loginbtn").disabled = true;
const email = document.getElementById("email");
const password = document.getElementById("password");
const checkbox = document.getElementById("checkbox");
var emailValid = false;
var passwordValid = false;

email.addEventListener('input', () => {
    const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/;
    document.getElementById("info").innerHTML = "Please login to use the pod";

    if (email.value.match(emailPattern)) {
        emailValid = true;
    } else {
        emailValid = false;
    }
})

password.addEventListener('input', () => {
    const passwordPattern = /.{1,}/;
    document.getElementById("info").innerHTML = "Please login to use the pod";

    if (password.value.match(passwordPattern)) {
        passwordValid = true;
    } else {
        passwordValid = false;
    }
})

setTimeout(function inputValid() {
    if (emailValid == true && passwordValid == true) {
        document.getElementById("loginbtn").disabled = false;
    } else {
        document.getElementById("loginbtn").disabled = true;
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

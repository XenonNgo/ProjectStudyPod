import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, signOut } from "./config.js";
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
    setPersistence(auth, browserSessionPersistence)
        .then(() => {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
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
                                        value1: email,
                                        value2: 3
                                    })
                                        .then(() => {
                                            window.location.replace("./otp.html");
                                        })
                                        .catch((error) => {
                                        });
                                })
                                .catch((error) => {
                                    document.getElementById("info").innerHTML = "Create an account to use the pod<br>Currently occupied, please try again later.";
                                    signOut(auth).then(() => {
                                        window.location.replace("./index.html");
                                    }).catch((error) => {
                                    });
                                });
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    switch (errorCode) {
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
            const errorCode = error.code;
            const errorMessage = error.message;
        });
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

var msg = document.querySelector("#msg");

function register() {
    var name = document.getElementById("name");
    var number = document.getElementById("number");
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    if (
        name.value === "" &&
        email.value === "" &&
        password.value === "" &&
        number.value === ""
    ) {
        msg.innerHTML = "Please fill the form first";
    }

    firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(function (result) {
            var obj = {
                username: name.value,
                email: result.email,
                phoneNumber: number.value,
                uid: result.uid,
                emailVerified: result.emailVerified
            };


            firebase
                .database()
                .ref("ToDo App")
                .child("Registration Data/" + result.uid)
                .set(obj);
            console.log(result);
            setTimeout(() => {
                name.value = "";
                number.value = "";
                email.value = "";
                password.value = "";
                msg.innerHTML = "You are signed in successfully";
            }, 1000);
        })
        .catch(function (error) {
            console.log(error);
            if (
                !(
                    name.value === "" &&
                    email.value === "" &&
                    password.value === "" &&
                    number.value === ""
                )
            ) {
                msg.innerHTML = error.message;
            }
        });

}

function login() {
    var userEmail = document.getElementById("userEmail");
    var userPass = document.getElementById("userPassword");

    firebase
        .auth()
        .signInWithEmailAndPassword(userEmail.value, userPass.value)
        .then(function (result) {
            msg.innerHTML = "You're logged in successfully";

            console.log(result.uid);
            setTimeout(() => {
                window.location = "app.html";
            }, 1000);
        })
        .catch(function (error) {
            console.log(error);
            msg.innerHTML = error.message;
        });
}




firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var uid = user.uid;
        console.log(uid);
    } else {
        console.log("Please login to see your todos");
        console.log("User is signed out.\nPlease login!");
    }

});


/* Registration End */
/* Authentication Details Start */

var uid;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        email = user.email;
        uid = user.uid;
        console.log(email);
        console.log(uid);
    }
    else {
        document.getElementById("logoutBtn").style.display = "none";
        document.getElementById("loginBtn").style.display = "inline";
        console.log("Please login to see your todos");
        console.log("User is signed out.\nPlease login!");
    }
});

function logOut() {
    firebase.auth().signOut()
        .then(resolve => {
            window.location.replace("index.html");
            console.log("Succesfully Signed-Out", resolve);
        })
        .catch(error => {
            console.log("Error", error);
        });
};
/* Authentication Details End*/

/* App Start*/
var val = document.getElementById("val");
var btn = document.getElementById("btn1");
btn.addEventListener('click', (event) => {
    add(val.value);
    val.value = "";
});
val.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        add(val.value);
        val.value = "";
    }
});

var deletekeys = []
let itemID;

function add(currentTodo = "", itemID = 0, save = false) {
    console.log("received", itemID);
    var task = document.getElementById("task");

    var li = document.createElement("LI");

    var span = document.createElement("SPAN");
    // span.setAttribute("class", "col-xs-6");

    var btn = document.createElement("BUTTON");
    btn.setAttribute("class", "btn btn-danger pull-right");
    var btnText = "<i class='fa fa-trash-o'></i>";
    btn.innerHTML = btnText;
    btn.onclick = function () {
        var li = this.parentElement;
        var ul = li.parentElement;
        ul.removeChild(li);
        firebase.database().ref("/ToDo App/App Data").child(itemID).remove();
        console.log("deleted ", itemID, " from database");
    }

    var btn1 = document.createElement("BUTTON");
    btn1.setAttribute("class", "btn btn-info pull-right");
    var btn1Text = "<i class='fa fa-pencil-square-o'></i>";
    btn1.innerHTML = btn1Text;
    btn1.onclick = function () {
        var li = this.parentNode;
        var text = prompt("Enter new value");
        li.appendChild(checkbox);
        li.appendChild(btn);
        li.appendChild(btn1);
        span.innerHTML = text;
    };

    var checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.className = "float-left";

    var todoValue;
    if (currentTodo != "") {
        todoValue = currentTodo;
    }
    var obj = {
        uid: uid,
        item: todoValue
    }
    if (save == false) {
        itemID = firebase.database().ref("/ToDo App/App Data").push(obj).key;
        console.log(obj);
        console.log(itemID)
        deletekeys.push(itemID);
    }

    li.appendChild(checkbox);
    span.innerHTML = todoValue;
    li.appendChild(span);
    li.appendChild(btn);
    li.appendChild(btn1);
    task.appendChild(li);
}


checkSavedToDos();
function checkSavedToDos() {
    firebase.database().ref("/ToDo App/App Data").once("value")
        .then(function (result) {
            var postObject = result.val();
            var keys = Object.keys(postObject);
            console.log(keys);
            for (var i = 0; i < keys.length; i++) {
                var currentObj = postObject[keys[i]];
                if (uid == currentObj.uid) {
                    console.log("current user todo uid", currentObj.uid);
                    var currTodo = currentObj.item;
                    if (currTodo != null) {
                        console.log("key in chectodo function", keys[i]);
                        deletekeys.push(keys[i]);
                        add(currTodo, keys[i], true);
                    }
                }
                else
                    console.log("todo uid not found");
            }
        })
}
function deleteAll() {
    // alert("List Cleared!");
    for (var i = 0; i < deletekeys.length; i++) {
        firebase.database().ref("/").child("ToDo App/App Data/" + deletekeys[i]).remove();
    }
    document.getElementById("task").innerHTML = "";
    console.log("keys deleted ", deletekeys)
}

function del(){
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            deleteAll();
            swal("Poof! Your data has been deleted!", {
                icon: "success",
            });
        } else {
            swal("Your data is safe!");
        }
    });
}


//start of clock
var myVar = setInterval(myTimer, 1000);
function myTimer() {
    var d = new Date();
    document.getElementById("time").innerHTML = d.toLocaleTimeString();
}
//end of clock


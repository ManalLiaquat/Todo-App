
checkSavedToDos();

const userInput = document.getElementById("val");
const button = document.getElementById("btn1");
let toDos = [];

button.addEventListener('click', (event) => {
    add(userInput);
});

userInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        add(userInput);
    }
})

let i = 1;

function add(userInp, savedOrNot = 0, itemID = 0) {
    var item; // todo item

    if(savedOrNot!=0){
        item = userInp;
    }
    else {
        item = userInp.value;
    }

    if (item) {
                if (!(savedOrNot === "saved")) firebase
                    .database()
                    .ref("/ToDo App")
                    .child("ToDo" + i)
                    .set(item);

                if (!itemID) {
                  itemID = "ToDo" + i;
                }

                i++;

                var incompleteList = document.getElementById("incompleteList");
                var completedList = document.getElementById("completedlist");
                
                var li = document.createElement("LI");
                
                var span = document.createElement("SPAN");
                span.innerHTML= item;

                
                var btn = document.createElement("BUTTON");
                btn.setAttribute("class", "btn btn-danger col-xs-2");
                var btnText = document.createTextNode("Delete");
                btn.appendChild(btnText);
                
                // var btn1 = document.createElement("BUTTON");
                // btn1.setAttribute("class", "btn btn-info col-xs-2");
                // var btn1Text = document.createTextNode("Edit");
                // btn1.appendChild(btn1Text);
                
                var checkbox = document.createElement("INPUT");
                checkbox.setAttribute("type", "checkbox");
                checkbox.className = "col-sm-2 float-left";
                
                
                li.appendChild(checkbox);
                li.appendChild(span);
                li.appendChild(btn);
                // li.appendChild(btn1);
                incompleteList.appendChild(li);

                userInput.value = "";
                
                btn.addEventListener("click", () => { // removing a item from database + DOM
                    firebase
                    .database()
                    .ref("/ToDo App")
                    .child(itemID)
                    .remove();
                
                    incompleteList.removeChild(btn.parentNode);
                });
                
                checkbox.onclick = function() {
                    li.removeChild(checkbox);
                    // li.removeChild(btn1);
                    completedList.appendChild(li);
                    incompleteList.removeChild(li);
                };
                
                btn.onclick = function() {
                    var li = this.parentNode;
                    var ul = li.parentNode;
                    ul.removeChild(li);
                };
                
                // btn1.onclick = function() {
                //     var li = this.parentNode;
                //     var text = prompt("Enter updated value");
                //     span.innerHTML = text;
                //     li.appendChild(checkbox);
                //     li.appendChild(btn);
                //     li.appendChild(btn1);
                // };
                
            } 
            
            else {
        alert("Please! Enter something in input bar...");
    }

}

function checkSavedToDos(){

    firebase.database().ref("/ToDo App").once('value', function(data) {
        data.forEach(function(itemData) {
          var itemID = itemData.key;
          var childID = itemData.val();
          add   (childID, "saved", itemID);
        });
      });

}

function deleteAll() {
    alert("Are you sure?");
    firebase
      .database()
      .ref("/ToDo App")
      .remove();
    document.getElementById("incompleteList").innerHTML = "";
    document.getElementById("completedlist").innerHTML = "";
}
//End of todo app coding

//start of clock
var myVar = setInterval(myTimer, 1000);
function myTimer() {
    var d = new Date();
    document.getElementById("time").innerHTML = d.toLocaleTimeString();
}
//end of clock
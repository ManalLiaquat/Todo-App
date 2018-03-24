//To Do App
function add() {
    var input = document.getElementById("val");
    var text = document.createTextNode(input.value);
    var li = document.createElement("LI");

    var btn = document.createElement("BUTTON");
    btn.setAttribute("class", "btn btn-danger col-xs-2");
    var btnText = document.createTextNode("Delete");
    btn.appendChild(btnText);

    var btn1 = document.createElement("BUTTON");
    btn1.setAttribute("class", "btn btn-info col-xs-2");
    var btn1Text = document.createTextNode("Edit");
    btn1.appendChild(btn1Text);
    
    var checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type","checkbox");
    checkbox.className ="col-sm-2";

    var incompleteList = document.getElementById("incompleteList");
    var completedList = document.getElementById("completedlist");

    text.className="col-xs-6";
    
   




    
    if (input.value === "") {
        alert("You should enter something!")
    }
    else {
        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(btn);
        li.appendChild(btn1);
        incompleteList.appendChild(li);
        input.value = "";

        checkbox.onclick = function () {
            li.removeChild(checkbox);
            li.removeChild(btn1);
            completedList.appendChild(li);
            incompleteList.removeChild(li)
            
        }

        
        btn.onclick = function () {
            var li = this.parentNode;
            var ul = li.parentNode;
            ul.removeChild(li);
        }

        
        btn1.onclick = function () {
            var li = this.parentNode;
            var text = prompt("Enter updated value");
            li.innerHTML = text;
            li.appendChild(checkbox);
            li.appendChild(btn);
            li.appendChild(btn1);
        }


        //Start of styling
        btn.style.margin = "10px 10px 10px 20px";
        
        //End of stying


    }

}

function deleteAll() {
    alert("Are you sure?");
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
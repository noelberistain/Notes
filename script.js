

var fragment, temp1, dateCreated = '', dateModified = '';
fragment = document.createDocumentFragment();
temp1 = document.getElementsByTagName("template")[0];
var container = document.getElementById("container");
var j = 0;

(function createNote(a) {
    btnCreate = document.getElementById("btn");
    btnCreate.addEventListener("click", function () {
        var clon = a.content.cloneNode(true);
        fragment.appendChild(clon);
        var i = fragment.querySelector("i");
        i.childNodes[0].textContent = j + 1;  //properties o "i" ->childNodes [0] -> text
        var span = fragment.querySelector("#created");
        var innerSpan = document.createTextNode(getDate());
        span.appendChild(innerSpan);
        container.appendChild(fragment);
        j++;
    });
})(temp1);

container.addEventListener("click", function (event) {
    var data = [], textB = '';
    var textNode = '', edit = event.target.getAttribute("name");
    var textarea = event.target.parentNode.getElementsByTagName("textarea")[0];
    if (event.target.getAttribute("name") == "trash") {
        container.removeChild(event.target.parentNode);
    }
    if (edit === "edit") {
        if (textarea.disabled) {
            enableText(textarea);
        }
        else {
            var noteContent = {};
            disableText(textarea)
            var b = event.target.firstChild;
            textB = document.createTextNode(getDate());
            b.nextElementSibling.appendChild(textB);
            textNode = document.createTextNode(textarea.value);
            textarea.appendChild(textNode);
        }
    }
    if (event.target.getAttribute("name") == "save") {
        
    }
});

function getDate() {
    var upDate, mins, secs, time, date;
    upDate = new Date();
    mins = upDate.getMinutes();
    segs = upDate.getSeconds();
    if (mins < "10") {
        mins = '0' + mins;
    }
    if (segs < '10') {
        segs = '0' + segs;
    }
    time = upDate.getHours() + ":" + mins + ":" + segs;
    date = upDate.getFullYear() + "/" + upDate.getMonth() + "/" + upDate.getDate();
    return date + " - " + time;
}

function enableText(b) {
    b.disabled = false;
    b.focus();
}
function disableText(b) {
    b.disabled = true;
}
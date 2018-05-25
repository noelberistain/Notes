

var fragment, temp1, dateCreated = '', dateModified = '';
fragment = document.createDocumentFragment();
temp1 = document.getElementsByTagName("template")[0];
var container = document.getElementById("container");
var j = 0;

(function createNote(a) {
    btnCreate = document.getElementById("btn");
    var span = document.createElement("span");
    btnCreate.addEventListener("click", function () {
        var clon = a.content.cloneNode(true);
        fragment.appendChild(clon);
        var i = fragment.querySelector("i");
        i.textContent = j + 1;
        span.textContent = getDate();
        i.appendChild(span);
        container.appendChild(fragment);
        j++;
    });
})(temp1);

    container.addEventListener("click", function (event) {
        if (event.target.getAttribute("name") == "trash")
            container.removeChild(event.target.parentNode);
    });

    container.addEventListener("click", function (event) {
        var edit = event.target.getAttribute("name");
        var textarea = event.target.parentNode.getElementsByTagName("textarea")[0];
        if (edit === "edit") {
            if (textarea.disabled) {
                enableText(textarea);
            }
            else {
                disableText(textarea)
                var b = event.target.firstChild;
                b.nextElementSibling.textContent = getDate();

            }
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



    container.addEventListener("click", function (event) {
        if (event.target.getAttribute("name") == "save") {
            console.log(container)
            // probando probando
        }
    });
function enableText(b) {
    b.disabled = false;
    b.focus();
}
function disableText(b) {
    b.disabled = true;
}


var fragment, temp1, dateCreated = '', dateModified = '';
fragment = document.createDocumentFragment();
temp1 = document.getElementsByTagName("template")[0];
var container = document.getElementById("container");
var j = 0;
var notes = localStorage.getItem("notes");
notes = notes ? JSON.parse(notes) : [];

(function createNote(a) {
    btnCreate = document.getElementById("btn");
    btnCreate.addEventListener("click", function () {
        var clon = a.content.cloneNode(true);
        fragment.appendChild(clon);
        var i = fragment.querySelector("i");
        i.textContent = j + 1;
        var span = fragment.querySelector("#created");
        var dateCreated = document.createTextNode(getDate());
        span.appendChild(dateCreated);
        container.appendChild(fragment);
        j++;
    });
})(temp1);

container.addEventListener("click", function (event) {
    var dateModified = '', b = '';
    var textNode = '', attributeName = event.target.getAttribute("name");
    var textarea = event.target.parentNode.getElementsByTagName("textarea")[0];

    //if i press the "TRASH" little icon(top-left)
    if (attributeName === "trash") {
        container.removeChild(event.target.parentNode);
    }

    //if i press the "EDIT" icon (bottom-left)

    if (attributeName === "edit") { //if I click the textarea element which is disabled by default, I enable the writing
        if (textarea.disabled) {
            enableText(textarea);
            textarea.focus();
        }
        else { //otherwise, CLICK again, and disable the wiriting.
            disableText(textarea)
            b = event.target.firstChild;
            if (b.nextElementSibling.textContent.length > 0) {
                b.nextElementSibling.textContent = '';
            }
            dateModified = document.createTextNode(getDate());
            b.nextElementSibling.appendChild(dateModified);
            textNode = document.createTextNode(textarea.value);
            textarea.appendChild(textNode);
        }
    }

    //if i press the "SAVE" icon (bottom-right)
    if (attributeName === "save") {
        var noteContent = {};
        var mainNote = event.target.parentNode;
        noteContent.noteNumber = mainNote.firstChild.nextElementSibling.childNodes[0].data;
        noteContent.dateCreated = mainNote.firstChild.nextElementSibling.nextElementSibling.innerText;
        noteContent.dateModified = event.target.previousElementSibling.innerText;
        noteContent.textarea = textarea.value;
        notes.push(noteContent);
        localStorage.setItem("notes", JSON.stringify(notes));
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
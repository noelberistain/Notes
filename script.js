

var fragment, temp1, dateCreated = '', dateModified = '';
fragment = document.createDocumentFragment();
temp1 = document.getElementsByTagName("template")[0];
var container = document.getElementById("container");
var notes = localStorage.getItem("notes");
notes = notes ? JSON.parse(notes) : [];
var j = 0;
if (notes.length > 0) {
    for (var key in notes) {
        showNotes(temp1, key, notes[key].dateCreated, notes[key].dateModified, notes[key].textarea)
    }
    function showNotes(temp1, num, crtd, updtd, txt) {
        var clon = temp1.content.cloneNode(true);
        fragment.appendChild(clon);
        var numNote = fragment.querySelector(".fa-trash");
        numNote.innerText = num;
        var span = fragment.querySelector(".created");
        span.innerText = crtd;
        var updated = fragment.querySelector(".updated");
        updated.innerText = updtd;
        var textarea = fragment.querySelector(".innerText");
        textarea.innerText = txt;
        container.appendChild(fragment);
    }
    j = key;
}


(function createNote(temp1) {
    btnCreate = document.getElementById("btn");
    btnCreate.addEventListener("click", function () {
        var clon = temp1.content.cloneNode(true);
        fragment.appendChild(clon);
        var iTrash = fragment.querySelector(".fa-trash");
        iTrash.innerText = parseInt(j) + 1;
        var span = fragment.querySelector(".created");
        var dateCreated = document.createTextNode(getDate());
        span.appendChild(dateCreated);
        container.appendChild(fragment);
        // j++;
    });

})(temp1);

container.addEventListener("click", function (event) {
    var textNode = '', attributeName = event.target.getAttribute("name");
    var textarea = event.target.parentNode.getElementsByTagName("textarea")[0];
    var mainNote = event.target.parentNode;
    var iUpdated = mainNote.querySelector(".updated");
    var iCreated = mainNote.querySelector(".created");

    //if i press the "TRASH" little icon(top-left)
    if (attributeName === "trash") {
        
        //container.removeChild(event.target.parentNode);
    }

    //if i CLICK on text area
    if (attributeName === "textArea") { //if I click the textarea element which is disabled by default, I enable the writing
        if (textarea.disabled) {
            enableText(textarea);
        }
        else { //otherwise, CLICK again, and disable the wiriting.
            disableText(textarea)
        }
    }

    //if i press the "SAVE" icon (bottom-right)
    if (attributeName === "save") {
        var noteContent = {};

        if (iUpdated.innerText.length > 0) {
            iUpdated.innerText = '';
        }
        var dateModified = document.createTextNode(getDate());
        iUpdated.appendChild(dateModified);
        textNode = document.createTextNode(textarea.value);
        textarea.appendChild(textNode);
        noteContent.key = j;
        noteContent.dateCreated = iCreated.innerText;
        noteContent.dateModified = iUpdated.innerText;
        noteContent.textarea = textarea.value;
        notes.push(noteContent);
        localStorage.setItem("notes", JSON.stringify(notes));
        j++;
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
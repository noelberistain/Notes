

var fragment, temp1, dateCreated = '', dateModified = '';
fragment = document.createDocumentFragment();
temp1 = document.getElementsByTagName("template")[0];
var container = document.getElementById("container");
var notes = localStorage.getItem("notes");
notes = notes ? JSON.parse(notes) : [];
// var j = 1;  var j...     Just display a number for every note

if (notes.length > 0) {
    for (var key in notes) {
        showNotes(temp1,
            notes[key].key,
            notes[key].dateCreated,
            notes[key].dateModified,
            notes[key].textarea);
    }
    function showNotes(temp1, num, crtd, updtd, txt) {
        var clon = temp1.content.cloneNode(true);
        fragment.appendChild(clon);
        // var numNote = fragment.querySelector(".fa-trash");         So, not using
        // numNote.innerText = j;                                     var J anymore
        var keyNote = fragment.querySelector(".key");
        keyNote.innerText = num;
        var span = fragment.querySelector(".created");
        span.innerText = crtd;
        var updated = fragment.querySelector(".updated");
        updated.innerText = updtd;
        var textarea = fragment.querySelector(".innerText");
        textarea.innerText = txt;
        container.appendChild(fragment);
        // j++;                                                        no j var
    }
}

(function createNote(temp1) {
    btnCreate = document.getElementById("btn");
    btnCreate.addEventListener("click", function () {
        var clon = temp1.content.cloneNode(true);
        fragment.appendChild(clon);
        // var iTrash = fragment.querySelector(".fa-trash");           no more
        // iTrash.innerText = j;                                       var j
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
    var spanKey = mainNote.querySelector(".key").innerText;

    //if i press the "TRASH" little icon(top-left)
    if (attributeName === "trash") {
        for (var key in notes) {
            if (spanKey == notes[key].key) {
                notes.splice(key, 1);
            }
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        container.removeChild(event.target.parentNode);
    }

    //if i CLICK on text area
    if (attributeName === "textArea") { //if I click the textarea element which is disabled by default, I enable the writing
        if (textarea.disabled) {
            enableText(textarea);
        }
        // else { //otherwise, CLICK again, and disable the wiriting.
        //     disableText(textarea)
        // }
    }
    //if i press the "SAVE" icon (bottom-right)
    if (attributeName === "save") {
        disableText(textarea)
        if (notExist(spanKey)) {
            // just modify, and replace the new modified note to the local Storate
            // dont duplicate notes on local Storage
            console.log(notExist(spanKey))
            var modifying = notes.splice(notExist(spanKey),1);
            console.log(modifying[0].textarea);
        }
        var noteContent = {};
        if (iUpdated.innerText.length > 0) {
            iUpdated.innerText = '';
        }
        var dateModified = document.createTextNode(getDate());
        iUpdated.appendChild(dateModified);
        textNode = document.createTextNode(textarea.value);
        textarea.appendChild(textNode);
        noteContent.key = setKey();
        noteContent.dateCreated = iCreated.innerText;
        noteContent.dateModified = iUpdated.innerText;
        noteContent.textarea = textarea.value;
        notes.push(noteContent);
        localStorage.setItem("notes", JSON.stringify(notes));
    }
});

function notExist(a) {
    for (var i in notes) {
        if (a == notes[i].key) {
            return i;
        }
    }
}
function setKey() {
    var update = new Date();
    return update.getMilliseconds();
}
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
//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange


if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
}

var db;
var request = window.indexedDB.open("notesDataBase", 1);

request.onerror = function (event) {
    console.log("error: jajajaJAJAAJajaJAJAjaAJaa!!!!");
};

request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);
};

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("notes", { keyPath: 'id'});
    // for (var i in customerData) {
    //         objectStore.add(customerData[i]);
    // }
}

function add( elem ) {
    console.log(elem);
    var request = db.transaction(["notes"], "readwrite")
        .objectStore("notes")
        .add(elem);//.add({ dateCreated: "123321", dateModified: "321123", textNote: "first note", id: "01" });
    request.onsuccess = function (event) {
        console.log("note was saved!");
    };
    request.onerror = function (event) {
        console.log("Unable to save data!");
    }
}

function read(){
    var transaction = db.transaction(["notes"]);
    var objectStore = transaction.objectStore("notes");
    var request = objectStore.get(01);
    request.onerror = function (event) {
        console.log("unable to retrieve data from dataBase");
    };
    request.onsuccess = function (event) {
        if (request.result) {
            console.log("\nDate Created: " + request.result.dateCreated +
                "\nDate Modified: " + request.result.dateModified +
                "\nText: " + request.result.textNote);
        }
        else{
            console.log("Couldn't find the data");
        }
    }
}

function readAll(){
    var objectStore = db.transaction("notes").objectStore("notes");
    objectStore.openCursor().onsuccess = function(event){
        var cursor = event.target.result;
        if(cursor){
            console.log("\nid: " + cursor.key + 
            "\ndateCreated: "+ cursor.value.dateModified +
            "\nText: "+ cursor.value.textNote);
            cursor.continue();
        }
        else{
            console.log("No more info.");
        }
    };
}

function remove(){
    var request = db.transaction(["notes"], "readwrite")
            .objectStore(["notes"])
            .delete("01");
            request.onsuccess = function(event){
                console.log("Entry '01' has been deleted");
            };
}

// Import Admin SDK
var admin = require("firebase-admin");
var new_chat_added = require('./new_chat_added');
var serviceAccount = require('./config/abhi_creds.json');
//console.log(serviceAccount);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://android-chat-firebase-74367.firebaseio.com/'
});

// Get a database reference to our posts
var db = admin.database();
var ref = db.ref("/Chats");

function addListener(key) {
    var all_keys = [];
    console.log('listener added', key);
    var _ref = db.ref('/Chats/' + key);
    _ref.once("value", function (snapshot) {

        //console.log('value',snapshot.val());

        snapshot.forEach(function (data) {
            all_keys.push(data.key);
        });

    });

    _ref.on("child_added", function (snapshot, prevChildKey) {
        var newPost = snapshot.val();
        if (!all_keys.includes(snapshot.key))
            new_chat_added(key, newPost, prevChildKey,db)
    });
}


ref.on("child_added", function (snapshot, prevChildKey) {
    addListener(snapshot.key);
});
console.log('running');


/**
 * Created by lalitchawla on 28/06/18.
 */

var gcm = require("node-gcm");
function new_chat_added(key, value, prev_key,db) {
    console.log("New Chat", key, JSON.stringify(value), prev_key);
    var new_chat = JSON.parse(JSON.stringify(value));

    console.log('sender',new_chat.messageUser);

    var ref=db.ref("/mapping");

    var recipient="";

    let sender = new gcm.Sender("YOUR_API_KEY");

    let message = new gcm.Message({
        notification: {
            title: "You have a new message from "+new_chat.messageUser,

            tag: key,

            body: new_chat.messageText
        },
    });








    if(new_chat.messageUser==='Admin'){

        console.log('Admin block','in here');




       ref.on('value',function(snapshot){

           console.log('Admin block',snapshot.val());

           snapshot.forEach(function(childSnapshot) {


               if(childSnapshot.key===key){

                   recipient=childSnapshot.val();


               }


           });

           console.log('recipient',recipient);

           sender.sendNoRetry(message, [recipient], (err, response) => {
               if (err) console.error(err);
               else console.log(response);
           });

        });





    }else{

        console.log('User block','in here');

        ref.on('value',function(snapshot){

            snapshot.forEach(function(childSnapshot) {


                if(childSnapshot.key==='Admin'){

                    recipient=childSnapshot.val();


                }


            });

            console.log('recipient',recipient);

            sender.sendNoRetry(message, [recipient], (err, response) => {
                if (err) console.error(err);
                else console.log(response);
            });

        });







    }




}
module.exports = new_chat_added;

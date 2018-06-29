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

    let sender = new gcm.Sender("AAAAVMreG_k:APA91bFALj-x4aaur_fMeMLCa4MrzSNppQkSpcYJNaZsP_IyFitMO2gecHzfwBFjxXTowm6nl_GXO2ib6jK--nk8IOojeNDP_cBbG3AsCI7wgATsliLoAfP70Az9VgaWfQEtqL6GpVOh");

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

               else{


                   recipient="eMTNSgzes4M:APA91bHsxHj3xnRw4Min4VRKRhzVLlbFbvu7PnFx9tJUuHF2kHXS6SIUdz5Px_gp9tmOFN0RG8LSwR53m69UK9QBX8kBbLGywdNZMVku_H4tPgkV0J1GEN8L_o3_6GiBRACpZ1uXWvR-oH-NNmH7dOaqnAcI6Fqamw";



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

                else{


                    recipient="eMTNSgzes4M:APA91bHsxHj3xnRw4Min4VRKRhzVLlbFbvu7PnFx9tJUuHF2kHXS6SIUdz5Px_gp9tmOFN0RG8LSwR53m69UK9QBX8kBbLGywdNZMVku_H4tPgkV0J1GEN8L_o3_6GiBRACpZ1uXWvR-oH-NNmH7dOaqnAcI6Fqamw";



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
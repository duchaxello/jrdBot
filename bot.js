const imp = require("./imports.js");

imp.client.on("ready", () => {
  console.log("Ready! Ready! Let's scavenge the battlefield!");
});

const prefix_gob = "!gob ";
const prefix_gob_size = prefix_gob.length;
const prefix_rp = "!rp ";
const prefix_rp_size = prefix_rp.length;
const TIMESTUN = 10000;

var stunned = [];

imp.client.on("message", (message) => {
        if (stunned.indexOf(message.author) != -1) {
          message.delete();
          message.channel.send("Les gens KO doivent se taire " + message.author.toString() + " !");
        }
        if (message.content.startsWith(prefix_gob)) {
          console.log(message.content);
          message.content = message.content.slice(prefix_gob_size);
          var mention1 = message.mentions.users.first();

          if (message.content.startsWith("Ping")) {

            message.channel.send("pong!");

          } else if (message.content.startsWith("d")) {

            message.channel.send(imp.calc.lancerDes(message.content));

          } else if (message.content.startsWith("send ")) {
            /* Envoie un message avec le bot à la première personne mentionnée
            sans laisser de trace. */
            message.content = message.content.slice(5);

            if (mention1 == null) { return; }

            message.delete();
            mention1.send(message.content);
            message.channel.send("C'est bon chef, on l'a insulté :^D");

          } else if (message.content.startsWith("notif ")) {

            /* Envoie un message avec le bot à la première personne mentionnée
            sans laisser de trace. */
            message.content = message.content.slice(5);

            if (mention1 == null) { return; }

            message.delete();
            mention1.send(message.content).then(msg => { msg.delete(3000) });

          } else if (message.content.startsWith("stun")) {
            /* On stun qqun => tous les messages qu'il envoie pendant les 5 prochaines
             secondes seront supprimées puis réécrites. */


             message.channel.send("Et tiens ! " + mention1.toString() + " Prends ça ! *bonk*");
             stunned.push(mention1);
             setTimeout(function() {
               var index = stunned.indexOf(mention1);
               if (index > -1) {
                 stunned.splice (index, 1);
               }
               console.log(mention1.toString() + " is no longer stunned");
             }, TIMESTUN);


          } else if (message.content.startsWith("unstun")) {

            stunned = [];
            console.log(stunned);

          } else {
              message.channel.send("Toi y en a pas comprendre... :eyes:");
          }

        } else if (message.content.startsWith(prefix_rp)) {

          message.content = message.content.slice(prefix_rp_size);
          console.log("Passage au menu RP.");
          imp.rp.menuRP(message);

        } else if (message.content.startsWith("💩")) {
          message.channel.send("Shit! You're shit, you shitty dumb shitty piece of shit !", {files: ["./images/chef_bourrebide.png"]});
        }

      });



imp.client.login("NDk0NzkwNzUzMzk1MTQ2Nzcz.Do4rDQ.cuyWDoedNYNt9JzN_1cafwyXF60");

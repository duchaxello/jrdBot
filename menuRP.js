const imp = require("./imports.js");

module.exports = {
  menuRP: function(message) {
    message.channel.send("Menu RP --> " + message.content);
    if (message.content.startsWith("create")) {
      var perso = new imp.personnage.Personnage(message);
      console.log("Personnage crée : ", perso);
    }
  }
}

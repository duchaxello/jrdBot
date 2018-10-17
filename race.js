const imp = require("./imports.js");
// console.log(imp);
const pathRaces = "./races/";
let choixDeRace = "T'as 10 secondes pour me dire ta race. \n";
let racesExistantes = new Map();


imp.fs.readdir(pathRaces, function(err, items) {
    // console.log(items);

    for (var i=0; i<items.length; i++) {
        choixDeRace += (i+1) + " - " + items[i].slice(0, -3) + "\n";
        racesExistantes.set(""+(i+1), items[i].slice(0, -3));
    }
});




class Race {

  constructor(message) {
    message.channel.send(choixDeRace);
    const collector =
      new imp.discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
    console.log("race.js", collector);
    collector.on('collect', message => {
      console.log("choix de race :_" + message.content + "_");
      if (racesExistantes.has(message.content)) {
        console.log("Race existante : " + racesExistantes.get(message.content));
        message.channel.send("Tu as choisi une classe valide, Bravo !");
      }
    })
  }


}


module.exports = { Race }

const imp = require("./imports.js");


/* Variables d'output */



class Personnage {

  constructor(message) {
    /* On garde en mémoire l'utilisateur discord qui va jouer ce gobelin */
    this.compte = message.author;
    this.channel = message.channel;

    /* On donne un nom de gobelin au hasard. */
    // this.nom = donnerNomGobelin();

    /* On roll les calc au pif. */
    this.for = imp.calc.lancerStatPathfinder();
    this.dex = imp.calc.lancerStatPathfinder();
    this.con = imp.calc.lancerStatPathfinder();
    this.int = imp.calc.lancerStatPathfinder();
    this.sag = imp.calc.lancerStatPathfinder();
    this.cha = imp.calc.lancerStatPathfinder();
    // Ne pas oublier d'arrondir
    this.modFor = (this.for - 10) / 2;
    this.modDex = (this.dex - 10) / 2;
    this.modCon = (this.con - 10) / 2;
    this.modInt = (this.int - 10) / 2;
    this.modSag = (this.sag - 10) / 2;
    this.modCha = (this.cha - 10) / 2;

    this.bonusCa = 0;
    this.bonusToucher = 0;
    this.bonusDegats = 0;

    this.ca = 10 + this.modDex + this.bonusCa;
    this.pv = -1;

    /* On les montre à la personne en question. */
    this.montrercalc();

    /* On demande de choisir une race. */
    this.race = new imp.race.Race(message);

    /* Afin qu'il puisse choisir la classe qui lui convient. */
    this.classe = new imp.classe.Classe(message);

  }



  montrercalc() {
    this.channel.send("```" + this.compte.toString() + " tes stats sont :\n" +
      "For: " + this.for + "\n" +
      "Dex: " + this.dex + "\n" +
      "Con: " + this.con + "\n" +
      "Int: " + this.int + "\n" +
      "Sag: " + this.sag + "\n" +
      "Cha: " + this.cha + "\n" +
      "\n" +
      "PV: " + this.pv + "\n" +
      "CA: " + this.ca + "\n" +
      "```"
    );
  }


  async choisirClasse() {
    this.channel.send("```Dis-moi ta classe " + this.compte.toString() + ".```");
    this.channel.send(choixDeClasse);


    // var rep_tmp = this.channel.awaitMessages();
    var rep_tmp = await this.channel.awaitMessages(m => m.author.id === this.compte.id, { time: 10000 });
    await console.log(rep_tmp);
    console.log(rep_tmp.message);
    console.log(rep_tmp[author]);
    console.log(rep_tmp.content, rep_tmp.content == '2');

    switch (rep_tmp.content) {
      case '1':
        this.classe = "Guerrier";
        this.pv = 10 + this.modCon + 1;

        /** Bonus de classe **/
        /* On donne 1CA bonus au guerrier */
        this.bonusCa = 1;
        this.bonusToucher = 0;
        this.bonusDegats = 0;


        this.ca = 10 + this.modDex + this.bonusCa;
        // this.skill1 = atkPuissante();
        break;
      case '2':
        this.classe = "Roublard";
        this.pv = 8 + this.modCon + 1;

        /** Bonus de classe **/
        this.bonusCa = 0;
        this.bonusToucher = 0;
        this.bonusDegats = 0;


        this.ca = 10 + this.modDex + this.bonusCa;
        // this.skill1 = buffFor();
        break;
      case '3':
        this.classe = "Sorcier";
        this.pv = 6 + this.modCon + 1;

        /** Bonus de classe **/
        this.bonusCa = 0;
        this.bonusToucher = 1;
        this.bonusDegats = 0;


        this.ca = 10 + this.modDex + this.bonusCa;
        // this.skill1 = malefice();
        break;
      default:
        this.classe = "Clodo";
        this.pv = 6 + this.modCon + 1;

        /** Bonus de classe **/
        this.bonusCa = 0;
        this.bonusToucher = 0;
        this.bonusDegats = 0;


        this.ca = 10 + this.modDex + this.bonusCa;
        // this.skill1 = graisse();
        break;
      }
      this.channel.send("```Ah tu es donc un **" + this.classe + "**. ```");
  }


}

module.exports = { Personnage }

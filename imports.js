var imp = module.exports =  {}

imp.crawler = require("js-crawler");
imp.discord = require("discord.js");
imp.client = new imp.discord.Client();
imp.fs = require('fs');

imp.calc = require('./calc.js');
imp.rp = require('./menuRP.js');

imp.personnage = require('./personnage.js');
imp.race = require('./race.js');
imp.classe = require('./classe.js');

imp.gobelin = require('./races/gobelin.js');

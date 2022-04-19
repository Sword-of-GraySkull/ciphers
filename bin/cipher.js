#!/usr/bin/env node

const index = require('../index.js');

const argv = process.argv.slice(2);
switch (argv[0]) {
  case "caesar":
    console.log("Encrypted message", index.caesarCipher(argv[1], argv[2]));
    break;
  case "playfair":
    console.log("Encrypted message", index.playFairCipher(argv[1], argv[2]));
    break;
  case "vignere":
    console.log("Encrypted message", index.vignereCipher(argv[1], argv[2]));
    break;
  case "hill":
    console.log("Encrypted message", index.hillCipher(argv[1], argv[2]));
    break;
  default:
    console.log("Commands: \n cipher <method> <message> <key> \n\n Options: \n\t--version    Show version number\n\t--help       Show help");
}

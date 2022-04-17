(function() {
  console.log("Try reading the README.md file if you are lost or dunno what to do. Because thats the reason why it is there");
  module.exports = { caesarCipher, playFairCipher, vignereCipher, hillCipher };
})();

function caesarCipher(text, s) {
  let result="";
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (char.toUpperCase(text[i])) {
      let ch =  String.fromCharCode((char.charCodeAt(0) + s-65) % 26 + 65);
      result += ch;
    } else {
      let ch = String.fromCharCode((char.charCodeAt(0) + s-97) % 26 + 97);
      result += ch;
    }
  }
  return result;
}

function playFairCipher(input, passkey="monarchy") {
  let output = '';
  const gridChars = 'abcdefghijklmnopqrstuvwxyz0123465789';

  //Removes duplicate characters from string. Will need this function later.
  const removeDuplicateCharacters = (string) => {
    return string
      .split('')
      .filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
      })
    .join('');
  }

  input = input.toLowerCase();
  input = input.replace(/[^a-zA-Z0-9]/g, '');
  if (input.length%2 != 0) {
    input += 'z';
  };

  let inputArray = [];
  for (let i = 0; i < input.length; i += 2) {
    let subArray = [input[i], input[i+1]];
    inputArray.push(subArray);
  };

  passkey = passkey.toLowerCase();
  passkey = passkey.replace(/[^a-z0-9]/g,'');
  passkey = passkey += gridChars;
  passkey = removeDuplicateCharacters(passkey);

  let playfairArray = [];
  for (let i = 0; i < passkey.length; i += 6) {
    let subArray = [passkey[i], passkey[i+1], passkey[i+2], passkey[i+3], passkey[i+4], passkey[i+5]];
    playfairArray.push(subArray);
  }

  for (i = 0; i < inputArray.length; i++) {
    let char1 = inputArray[i][0];
    let char2 = inputArray[i][1];
    let pos1;
    let pos2;
    let row1;
    let row2;
    for (y = 0; y < playfairArray.length; y++) {
      for (x = 0; x < playfairArray[y].length; x++) {
        if (char1 === char2 && char1 === playfairArray[y][x]) {
          pos1 = x;
          pos2 = x;
          row1 = y;
          row2 = y;
        } else if (char1 === playfairArray[y][x]) {
          pos2 = x;
          row1 = y;
        } else if (char2 === playfairArray[y][x]) {
          pos1 = x;
          row2 = y;
        }
      }
    }
    output += playfairArray[row1][pos1] + playfairArray[row2][pos2];
}

  return output;
}

function generateKey(str,key) {

     key=key.split("");
    if(str.length == key.length)
        return key.join("");
    else
    {
        let temp=key.length;
        for (let i = 0;i<(str.length-temp) ; i++)
        {

            key.push(key[i % ((key).length)])
        }
    }
    return key.join("");
}

function vignereCipher(str,key) {
  key = generateKey(str, key);
  let cipher_text="";
  for (let i = 0; i < str.length; i++) {
    let x = (str[i].charCodeAt(0) + key[i].charCodeAt(0)) %26;
    x += 'A'.charCodeAt(0);
    cipher_text+=String.fromCharCode(x);
  }
  return cipher_text;
}

function originalText(cipher_text,key) {
    let orig_text="";

    for (let i = 0 ; i < cipher_text.length ; i++)
    {
        let x = (cipher_text[i].charCodeAt(0) -
                    key[i].charCodeAt(0) + 26) %26;

        x += 'A'.charCodeAt(0);
        orig_text+=String.fromCharCode(x);
    }
    return orig_text;
}

function LowerToUpper(s) {
    let str =(s).split("");
    for(let i = 0; i < s.length; i++)
    {
        if(s[i] == s[i].toLowerCase())
        {
            str[i] = s[i].toUpperCase();
        }
    }
    s = str.toString();
    return s;
}

function getKeyMatrix(key,keyMatrix) {
  let  k = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      keyMatrix[i][j] = (key[k]).charCodeAt(0) % 65;
      k++;
    }
  }
}

function encrypt(cipherMatrix,keyMatrix,messageVector) {
  let x, i, j;
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 1; j++) {
      cipherMatrix[i][j] = 0;

      for (x = 0; x < 3; x++) {
        cipherMatrix[i][j] +=
            keyMatrix[i][x] * messageVector[x][j];
      }

      cipherMatrix[i][j] = cipherMatrix[i][j] % 26;
    }
  }
}

function hillCipher(message, key) {
  let keyMatrix = new Array(3);
  for(let i=0;i<3;i++) {
    keyMatrix[i]=new Array(3);
    for(let j=0;j<3;j++)
      keyMatrix[i][j]=0;
  }
  getKeyMatrix(key, keyMatrix);

  let messageVector = new Array(3);
  for(let i=0;i<3;i++) {
    messageVector[i]=new Array(1);
    messageVector[i][0]=0;
  }

  for (let i = 0; i < 3; i++)
    messageVector[i][0] = (message[i]).charCodeAt(0) % 65;

  let cipherMatrix = new Array(3);
  for(let i=0;i<3;i++) {
    cipherMatrix[i]=new Array(1);
    cipherMatrix[i][0]=0;
  }

  encrypt(cipherMatrix, keyMatrix, messageVector);

  let CipherText="";

  for (let i = 0; i < 3; i++)
    CipherText += String.fromCharCode(cipherMatrix[i][0] + 65);

  return CipherText;
}

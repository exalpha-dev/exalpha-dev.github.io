let EndBytes = [39, 86, 26, 72, 13, 91, 23]
function makeKeyFromName(username) {
  username = username.toUpperCase()
  if (username.length > 15) {
    console.log('Name too long')
    return '#'
  }
  for (var i = 0; i < username.length; i++) {
    var char = username.charAt(i)
    if ((char < 'A' || char > 'Z') && char != '_' && (char < '0' || char > '9')) {
      console.log('Invalid character, use only A to Z uppercase')
      return '#'
    }
  }
  var keyValueFirst = '', keyLength = 0
  for (var i = 0; i < username.length; i++) {
    keyValueFirst += (70 - (26 - (username.charCodeAt(i) - 'A'.charCodeAt(0)))).toString()
    keyLength++
  }
  keyValueFirst += EndBytes[Math.floor(Math.random() * EndBytes.length)].toString()
  keyLength++
  var keyValueSecond = keyValueFirst
  while (keyLength != 15) {
    keyValueSecond += (10 + Math.floor(Math.random() * 89)).toString()
    keyLength++
  }
  var keyNumberFirst = 0
  for (var i = 0; i < keyValueSecond.length; i++) {
    keyNumberFirst += keyValueSecond.charCodeAt(i) - '0'.charCodeAt(0)
  }
  var keyNumberSecond = 0
  for (var i = 0; i < keyValueFirst.length; i++) {
    keyNumberSecond += keyValueFirst.charCodeAt(i) - '0'.charCodeAt(0)
  }
  keyNumberSecond %= 100
  var keyNumberCombined = keyNumberFirst + Math.floor(Math.random() * (999 - keyNumberFirst)),
    keyNumberSubtract = keyNumberCombined - keyNumberFirst,
    finalKey = ''
  finalKey += ('000' + keyNumberCombined).slice(-3)
  finalKey = finalKey.split('').reverse().join('')
  finalKey += keyValueSecond
  finalKey += ('000' + keyNumberSubtract).slice(-3)
  finalKey += ('00' + keyNumberSecond).slice(-2)
  finalKey = finalKey.slice(0, 6) + '-' + finalKey.slice(6)
  finalKey = finalKey.slice(0, 15) + '-' + finalKey.slice(15)
  finalKey = finalKey.slice(0, 23) + '-' + finalKey.slice(23)
  finalKey = finalKey.slice(0, 31) + '-' + finalKey.slice(31)
  finalKey = finalKey.slice(0, 36) + '-' + finalKey.slice(36)
  return finalKey
}
function genKeyAfterTime() {
  document.getElementById('key').innerHTML = 'Please wait...'
  setTimeout(function () {
    generateKey()
  }, 1000)
}
function generateKey() {
  var name_value = document.getElementById('name').value
  if (name_value == '') {
    document.getElementById('key').innerHTML = 'Errors occurred during key generation:<br> * name cannot be empty'
    return
  }
  var key_from_name = makeKeyFromName(name_value)
  if (name_value.startsWith('dev')) {
    document.getElementById('key').innerHTML = 'Errors occurred during key generation:<br> * this username format is reserved for internal use'
  } else {
    if (name_value.length > 15) {
      document.getElementById('key').innerHTML = 'Errors occurred during key generation:<br> * username too long'
    } else {
      key_from_name == '#'
        ? (document.getElementById('key').innerHTML = 'Errors occurred during key generation:<br> * invalid character in username')
        : (document.getElementById('key').innerHTML = 'Success! Your key is: <br>' + key_from_name)
    }
  }
}

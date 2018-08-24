const User = require('./../models/user')

function userExistsByKey (key, value) {
  const obj = {}
  obj[key] = value
  return new Promise((resolve, reject) => {
    User.find(obj)
      .exec((err, doc) => {
        if (err) return reject(err)
        else return resolve(doc.length !== 0)
      })
  })
}

module.exports = {
  userExistsByKey
}

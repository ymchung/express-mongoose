const User = require('./../models/user')

function usernameExists(value){
    return new Promise((resolve, reject) => {
        User.find({username: value.toLowerCase()})
          .exec((err, doc) => {
            if (err) return reject(err)
            else return resolve(doc.length != 0)
          })
    })
 }

 function emailExists(value){
    return new Promise((resolve, reject) => {
        User.find({email:value})
          .exec((err, doc) => {
            if (err) return reject(err)
            else return resolve(doc.length != 0)
          })
    })
 }

 module.exports = {
    usernameExists, 
    emailExists
 }
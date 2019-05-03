import { resolve } from "path";

// const doWorkCallback = (callback) => {
//   setTimeout(() => {
//     //callback('this is my error', undefined)
//     callback(undefined, 'Yes we got it');
//   },2000)

// }

// doWorkCallback((error, result) => {
//   if(error) {
//     return console.log(error)
//   }
//   console.log(result)
// })


const doWork = async () => {
  return 'Andrew'
}
doWork().then((result) => {
  console.log('result',result)
}).catch((e) => {
  console.log(e)
})
console.log()


const add = (a,b) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 2000)
  })
}
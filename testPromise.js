

require('../nodeMongo/src/db/mongoose')

const User = require('../nodeMongo/src/models/user')


//5cc99c282aacea5b5804efab

// User.findByIdAndUpdate('5cc99c282aacea5b5804efab', { age: 1 }).then((user) => {
//   console.log(user)
//   return User.countDocuments({ age: 1 })
// }).then((result)=> {
//   console.log(result)
// }).catch((e)=> {
//   console.log(e)
// })

// const updateAgeAndCount = async (id, age) => {
//   const user = await User.findByIdAndUpdate(id, { age })
//   const count = await User.countDocuments({ age })
//   return count
// }

// updateAgeAndCount('5cc99c282aacea5b5804efab', 2).then((count)=> {
//   console.log(count)
// }).catch((e) => {
//   console.log(e)
// })


const deleteTaskAndCount = async (id) => {
  const user = await User.findByIdAndDelete(id)
  const count = await User.countDocuments()
  return count
}

deleteTaskAndCount('5cc9b8635222ec78181dd744').then((count)=> {
  console.log(count)
}).catch((e) => {
  console.log(e)
})





// const add = (a, b) => {
//   return new Promise((resolve, reject)=> {
//     setTimeout(()=> {
//         resolve(a + b)
//     }, 2000)
//   })  
// }

// // add(1,3).then((sum) => {
// //   console.log(sum)
// // }).catch((e)=> {
// //   console.log(e)
// // })

// add(1,1).then((sum) => {
//   console.log(sum)
//   return add(sum, 4)
// }).then((sum2)=> {
//   console.log(sum2)
// }).catch((e)=> {
//   console.log(e)
// })

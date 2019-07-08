require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.create({
//     description: 'Babysit the onion',
//     completed: true
// }).then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: true })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findOneAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount("5d192fb6f9121d931a4f0c55").then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
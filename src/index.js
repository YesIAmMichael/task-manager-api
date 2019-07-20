const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

//MIDDLEWARE
// Next is specific to middleware
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// Site maintenance message
// app.use((req, res, next) => {
//     res.status(503).send('Site under maintenance. Check back soon.')
// })




app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//
// Without middleware: new request -> run route handler
// 
// With middleware:    new request -> do something -> run route handler
//

app.listen(port, () => {
    console.log(port + ' is aliiiiiiiiive!!!')
})
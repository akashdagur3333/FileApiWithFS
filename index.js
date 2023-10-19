const express= require('express')
const ejs=require('ejs')
const bodyParser=require('body-parser')

let app=express()

app.set('view engine','ejs')
app.set('View','view')

app.use(bodyParser.urlencoded({extended:false}))

let mainRouter=require('./router/mainRouter')

let PORT=3000
app.listen(PORT,()=>{
    console.log(`Server start on port ${PORT}`)
})


app.use('/test',mainRouter
)

app.use('/',(req,res)=>{
    res.redirect('test/Object')
})

app.use((req,res)=>{
    res.render('pageNotFound',{title:'Page Not Found'})
})
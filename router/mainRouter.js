const express=require('express')
const file=require('fs')
let path=require('path')
let route =express.Router()

let Maindir=path.join(__dirname,'../')

route.get('/Object',(req,res)=>{
    res.render('postobject')})


    route.get('/getObject',(req,res)=>{
        file.readdir(Maindir+'Objects',(err,files)=>{
            if(err){
            console.log(err)
            }
            res.render('getObject',{files:files})})
           })


      

    let val=0


route.post('/Object',(req,res)=>{
       file.readdir(Maindir+'Objects',(err,files)=>{
        if(!err){
            val=val+1
            console.log(val)
            file.writeFile(`${Maindir}/Objects/${req.body.fileName}${val}.txt`,req.body.fileContent,(err)=>{
               if(err){
                   console.log(err)
               }
               console.log('file Added')
            })
          
        }
        else{
            console.log(err)

        }
      
       })
        res.redirect('/')
    })


route.post('/deleteObject/:id',(req,res)=>
    {
        const filename=req.params.id
        file.unlink(`${Maindir}/Objects/${filename}`,(err,done)=>{
            if(err){
                console.log(err)
            }
            res.redirect('/test/getObject')
            console.log('file deleted successfully')
        })
    //   const filename=req.body.fileName
      
    })


    route.post('/updateObject/:id',(req,res)=>
    {
        const filename=req.params.id
        
   res.render('updateObject',{name:filename})
      
    })

    route.post('/changeObject',(req,res)=>{
        const prev=req.body.name
        const curr=req.body.updatedName
        file.rename(`${Maindir}/Objects/${prev}`,`${Maindir}/Objects/${curr}`,(err,change)=>
        {
            if(!err){
                console.log('File Name Changed')
            }
            else{
                console.log(err)
            }
        })

        res.redirect('/test/getObject')
    })


    route.post('/readObject',(req,res)=>{
        const fileName=req.body.fileName
        file.readFile(`${Maindir}/Objects/${fileName}`,(err,content)=>{
            if(!err){
                res.render('readFile',{title:fileName,con:content.toString()})
            }
            else{
                console.log(err)

            }
        })
     
    })


 

module.exports=route

const expr=require('express')
const rout=express.Router(); 
//const bcrypt = require('bcrypt');
const jwtoken = require('jsonwebtoken');
const middleware =require('../Auth/middleware')
const { PrismaClientt } = require('@prisma/client');
const prismax = new PrismaClientt();
import  http from 'http'
import WebSocket, { WebSocketServer } from 'ws';
const server=http.createServer( function(req:any,res:any) {

 console.log((new Date()) + ' Received request for ' + req.url);
    res.end("hi there");


})
const wss=  new WebSocketServer ({server})

wss.on('connection',function(ws){
  ws.on('error', console.error);


  ws.on('message', function message(data,IsBinary){
   wss.clients.forEach(function each(client){
  if(client.readyState==WebSocket.OPEN){
    client.send(data,{binary:IsBinary})
  }
 

   })

 ws.send('hello from server')
  })


})


server.listen(3000,function(){
    console.log((new Date())+'server is running');
})


  

const IsMatch=rout.get('/isMatch', async(req:any,res:any)=>{

   
     


 


})
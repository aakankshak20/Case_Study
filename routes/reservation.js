const express= require('express');
const Reservation = require('../model/reservation.model');
const router = express.Router();

//for making reservation
router.post('/login/reservation',function(req,res){
    
       const reservation = new Reservation({
        Reservation_Date:req.body.Reservation_Date,
        Source:req.body.Source,
        Destination:req.body.Destination,
        Train_Name:req.body.Train_Name,
        Fare:000,
        Book:true,
        Passenger:req.body.Passenger,
        Class:req.body.Class
       });

      
        reservation.save(function(err){
            if(err){
                res.send(err.message);
            }else{
                res.send({
                    message:"Your Reservation Details are below Please keep a note of _id in oreder to get reservation details",
                    reservation
                });
            }
        });

});

//for getting all reservations
router.get('/login/reservations',  async function (req, res) {
    try {
        const result = await Reservation.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});


//for getting specific id
router.get('/login/reservations/:id',function(req,res){
    const id= req.params.id;
    try{
        Reservation.findById({_id:id},(err,val)=>{
            if(err){
                console.log(err)
            }else{
                if(val){
                    res.status(200).json(val)
                }else{
                    res.status(401).json(err)
                }
            }
        });
    }catch(err){
        res.status(500).json(err)
    }
});


//for delete reservation
router.delete('/login/reservations/:id',function(req,res){
 const id=req.params.id
 try{
     Reservation.findByIdAndRemove(id,(err,val)=>{
         if(err){
             console.log(err)
         }else{
             if(val){
                 res.status(200).json({
                    message:'You have deleted this reservation', 
                    val})
             }else{
                 res.status(401).send('Unable to proceed please check Reservation id')
             }
         }
     });
 }catch(err){
     res.status(500).json(err)
 }
   
});

//for updating reservation
router.put('/login/reservation/:id',function(req,res,next){
    Reservation.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Reservation.findOne({_id:req.params.id}).then(function(reserved){
            res.send({
                message:"Your Updated reservation details,Please find below details ",
                reserved});
        });
    });
});


module.exports = router;
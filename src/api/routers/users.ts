
import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { protect } from '../../middlewares/authentication';


const router = Router();

router

.put('/signup',protect({allowIf:'unauthenticated'}),  ()=>{})
.post('/login', protect({allowIf:'unauthenticated'}), passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', failureMessage: "not logged"}), (req:Request, res:Response, next:NextFunction)=>{
    console.log(req.user);
})
.delete('/delete', protect({allowIf: 'authenticated'}));


export default router;
import express from 'express'
import passport from 'passport';

const router = express.Router();

router.get('/auth/google',passport.authenticate('google',{
    scope: ['profile','email']
}))

router.get('/auth/google/callback', passport.authenticate('google',{
        successRedirect: '/recipe/list',
        failureRedirect: '/login'
    })
)

router.get('/api/logout',(req, res)=>{
    req.logout();
    res.send(req.user)
})

router.get('/api/current_user',(req, res)=>{
    res.send(req.user)
})

export default router
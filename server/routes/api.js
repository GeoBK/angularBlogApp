const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const article=require('../models/article');
const db="mongodb://blogUser:1234@ds255588.mlab.com:55588/blogappdb";
mongoose.Promise=global.Promise;
mongoose.connect(db,function(err){
    if(err){
        console.log("Error connecting")
    }
})
router.get('/all',function(req,res){
    article.find({})
        .exec(function(err,articles){
            if(err){
                console.log("Error getting the articles");
            }else{
                console.log(articles);
                res.status(200).json(articles);
            }
        })
})
router.get('/articles/:id',function(req,res){
    console.log('Requesting a specific article');
    article.findById(req.params.id).exec(function(err,article){
        if(err){
            console.log("Error getting the article");
        }else{
            console.log(article);
            res.status(200).json(article);
        }
    })
});
router.post('/create',function(req,res){
    console.log("Posting an article");
    var newArticle=new article();
    newArticle.title=req.body.title;
    newArticle.content=req.body.content;
    newArticle.save(function(err,article){
        if(err){
            console.log('Error inserting the article');            
        }else{
            res.status(200).json(article);
        }
    })
});

router.post('/update/:id',function(req,res){
    console.log("Updating an article");
    article.findById(req.params.id).exec(function(err,article){
        if(err){
            console.log("Could not find the article");
        }else{
            article.title=req.body.title;
            article.content=req.body.content;
            article.save();
            res.status(200).json(article);
        }
    })
});

router.get('/delete/:id',function(req,res){
    console.log('Deleting an article');
    article.findByIdAndRemove(req.params.id).exec(function(err,article){
        if(err){
            console.log("Error deleting");
        }else{
            console.log(article);
            res.status(200).json(article);
        }
    })
});
module.exports=router;
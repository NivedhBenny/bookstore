import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// route to get all books
router.get('/',async(req,res)=>{
    try{
        const books = await Book.find({});
        res.status(200).json({
            count:books.length,
            data:books
        });
    }catch(err){
        console.log(err);
    }
});
// route to get a specific book based on its id
router.get('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const book = await Book.findById(id);
        res.status(200).json(book);
    }catch(err){
        console.log(err);
    }
})
// route to post a new book
router.post('/',async(req,res)=>{
    try{
        if(req.body.title && req.body.author && req.body.publishYear){
            const newBook = {
                title:req.body.title,
                author:req.body.author,
                publishYear:req.body.publishYear
            };

            const book = await Book.create(newBook);

            return res.status(201).send(book);
        }else{
            return res.status(400).send({message: "provide all the fields"});
        }
    }catch(err){
        console.log(err);
        res.status(500).send({message:err.message});
    }
});

// route to update a book
router.put('/:id',async(req,res)=>{
    try{
        if(req.body.title && req.body.author && req.body.publishYear){
            const id = req.params.id;
            const result = await Book.findByIdAndUpdate(id,req.body);
            if(!result){
                return res.send("book not found");
            }else{
                return res.send("book updated successfully")
            }
        }else{
            res.send("send all fields");
        }
    }catch(err){
        console.log(err);
    }
});
//route to delete a book
router.delete('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.send("Book doesnt exits");
        }else{
            return res.send("Book successfully deleted");
        }
    }catch(err){
        console.log(err);
    }
});

export default router
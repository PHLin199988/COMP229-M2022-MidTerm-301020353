// modules required for routing
import express from 'express';
import { CallbackError } from 'mongoose';
const router = express.Router();
export default router;

// define the book model
import book from '../Models/books';

/* GET books List page. READ */
router.get('/', (req, res, next) => 
{
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        page: 'books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', { 
    title: 'Add', 
    page: 'details', 
    books: ''})
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
 // instantiate a new book to Add
 let newBook = new book
 ({
  "Title": req.body.title,
  "Price": req.body.price,
  "Author": req.body.author,
  "Genre": req.body.genre 
 });

 // Insert the new book object into the database
 book.create(newBook, function(err: CallbackError)
 {
   if(err)
   {
     console.error(err);
     res.end(err);
   }

   // new movie has been added
   res.redirect('/books');
 })

});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

  let id = req.params.id;

  book.findById(id, {}, {}, function(err, BookToEdit)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.render('books/details', {
        title: 'Edit',
        page: 'details', 
        books: BookToEdit})
  });
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id;

  let updatedBook = new book
  ({
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });
  // update the book in the database
  book.updateOne({_id: id}, updatedBook, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
    // edit was successful
    res.redirect('/books');
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

     let id = req.params.id;
     // pass the id to the database and delete data
     book.remove({_id:id}, function(err: CallbackError)
     {
       if(err)
       {
         console.error(err);
         res.end(err);
       }
       // delete was successful
       res.redirect('/books');
     });
});


//module.exports = router;

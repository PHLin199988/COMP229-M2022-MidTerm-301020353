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
router.get('/add',  function (req: express.Request, res: express.Response, next: express.NextFunction): void {
  res.render('books/details', { 
    title: 'Add', 
    page: 'details', 
    books: ''})
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', function (req: express.Request, res: express.Response, next: express.NextFunction): void {
 // instantiate a new book to Add
 let newBook = new book
 ({
  "Title": req.body.Title,
  "Price": req.body.Price,
  "Author": req.body.Author,
  "Genre": req.body.Genre 
 });

 // Insert the new book object into the database
 book.create(newBook, function(err: CallbackError)
 {
   if(err)
   {
     console.error(err);
     res.end(err);
   }

   // new movie has been added -> refresh the movie-list
   res.redirect('/books');
 })

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

     let id = req.params.id;
     // pass the id to the database and delete the movie
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

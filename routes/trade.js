const express = require('express');
const router = express.Router();
const User = require('../models').User;
const Book = require('../models').Book;
const Trade = require('../models').Trade;

// Routers
router.get('/',isLoggedIn, function(req,res) {
  res.render('trade', {
    title: "Trade"
  });
});

// Accept Trade Request
router.post('/acceptRequest/:tradeID',isLoggedIn, function(req,res) {
  let trade_id = req.params.tradeID;
  // Find the Trade
  Trade.findById(trade_id).populate({path:'book',model:'book'}).exec(function(err,trade) {
    let book_id = trade.book._id;
    // Search Book ID
    Book.findById(book_id).populate({path:'owner',model:'user'}).exec(function(err,book) {
      // Update new owner for book owner & book status
      let theOldOwnerId = book.owner;
      let theNewOwnerId = trade.from;
      book.owner = theNewOwnerId;
      book.status = 'available';
      book.save(function(err) {
        if (err) {
          console.log(err);
          return;
        }
        // Add new book to new owner's book list
        User.findById(theNewOwnerId).exec(function(err,user) {
        user.local.addedbooks.push(book_id);
        user.save(function(err) {
          if (err) {
            console.log(err);
            return;
          }
          // Remove the trade book from the old book owner's book list
          User.findById(theOldOwnerId).exec(function(err,user) {
            if (err) {
              console.log(err);
              return;
            }
            let bookIndex = user.local.addedbooks.indexOf(book_id);
            // Pop the book out of the array
            user.local.addedbooks.splice(bookIndex,1);
            user.save(function(err) {
              if (err) {
                console.log(err);
                return;
              }
              // Remove the trade transaction
              trade.remove(function(err) {
                if (err) {
                  console.log(err);
                  return;
                }
                res.redirect('/allbooks');
              });
            });
          });
        });
      });
    });
     
  });
  });
});

// Reject the Request
router.post('/rejectRequest/:tradeID', isLoggedIn, function(req,res) {
  let trade_id = req.params.tradeID;
  Trade.findById(trade_id).populate({path:'book',model:'book'}).exec(function(err,trade) {
    if (err) {
      console.log(err);
      return;
    }
    let book_id = trade.book._id;
    Book.findById(book_id).exec(function(err,book) {
      book.status = 'available';
      book.save(function(err) {
        if (err) {
          console.log(err);
          return;
        }
        trade.remove(function(err) {
          if (err) {
            console.log(err);
            return;
          }
          res.redirect('/allbooks');
        });
      });
    });
  });
  res.send('rejected request');
});

// Cancel the Request
router.post('/cancelRequest/:tradeID',isLoggedIn,function(req,res) {
  // Cancel request from Current User to book owner
  let trade_id = req.params.tradeID;
  Trade.findById(trade_id).populate({path:'book',model:'book'}).exec(function(err,trade) {
    if (err) {
      console.log(err);
      return;
    }
    let book_id = trade.book._id;
    Book.findById(book_id).exec(function(err,book) {
      console.log(book);
      book.status = 'available';
      book.save(function(err) {
        if (err) {
          console.log(err);
          return;
        }
        trade.remove(function(err) {
          if (err) {
            console.log(err);
            return;
          }
          res.redirect('/allbooks');
        });
      });
    });
  });
});

// LogIn function
function isLoggedIn(req,res,next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
# Book Trading Club

The purpose of the project is to build a book trading club similar to https://manage-a-book-trading-club.freecodecamp.rocks/

The book trading club has something for everyone.  Items include Web Development, Sports, etc.

## UX

**User Stories**

As a user, I can view all books posted by every user.

As a user, I can add a new book.

As a user, I can update my settings to store my full name, city and state.

As a user, I can propose a trade and wait for the other user to accept the trade.

**Information Architecture**

Book consists of title, description, author, publisher, link, imageurl, category, bookid, owner and status.  All are string except owner, which is an Object ID.  Status is `available` or `pending`.  The default for status is `available`. 

The user consists of local - username, email, password, addedbooks, city, county and country.  All are string except addedbooks, which is an Object ID.  username, email and password are required.  In addition, addedbooks is an array.

The trade consists of from, to, book, status and created_at.  The from, to and book fields have type of Object ID.  The status is a string - it has `pending`, `approved` or `rejected`.  The status default is `pending`.  The created_at field is a date.  It is currently at the present date.

## Technologies

Uses Bcrypt, Body Parser, Connect Flash, Express, Google Books Search, Passport, MongoDB, Pug and Mongoose.

## Deployment

This project is on REPL.

## Credits

### Content

Taken from [Jeremy L Shepherd - GitHub Profile](https://github.com/jeremylshepherd), accessed on 17 September 2021.

Tri Vi 

Information Accessed between 17 September 2021 and 23 September 2021.  Did searches on GitHub and FreeCodeCamp Forums.

### Acknowledgements

- [Jeremy L Shepherd](https://jeremylshepherd.io/598a63ca1a426b0012850853)
- [Tri Vi - GitHub Repository ](https://github.com/triminhvi/Book_Trading_Club)
- [Sam Milledge - GitHub Repository on Google Search Books](https://github.com/smilledge/node-google-books-search)
- [Pug](https://pugjs.org)
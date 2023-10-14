module.exports = (mongoose) => {
    const Books = mongoose.model(
      'books',
      mongoose.Schema({
        book_id: { 
          type: Number ,
        },
        title: {
          type: String
        },
        author: {
          type: String
        },
        date_published: {
          type: Number
        },
        page_number: {
          type: Number
        },
        genre: {
          type: String
        },
        ISBN: {
          type: String
        },
        series: {
          type: String
        }
      })
    );
  
    return Books;
  };
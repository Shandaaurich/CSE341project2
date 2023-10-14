module.exports = (mongoose) => {
  const Series = mongoose.model(
    'series',
    mongoose.Schema({
      _id: { 
        type: String, 
      },
      series: {
        type: String
      },
      author: {
        type: String
      },
      number_of_books: {
        type: Number
      },
      genre: {
        type: String
      }
    })
  );

  return Series;
};
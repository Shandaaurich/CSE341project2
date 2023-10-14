module.exports = (mongoose) => {
  const Series = mongoose.model(
    'series',
    mongoose.Schema({
      series_id: { 
        type: Number, 
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
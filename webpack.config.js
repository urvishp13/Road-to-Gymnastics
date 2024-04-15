const path = require('path');

module.exports = {
  // The entry point file described above
  entry: {
    database: './assets/javascript/firestore.js',
    exercises: './assets/javascript/all-exercises.js',
    newExercise: './assets/javascript/new-exercise.js',
  },
  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true
  },
  watch: true,
  // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
  devtool: 'eval-source-map',
};

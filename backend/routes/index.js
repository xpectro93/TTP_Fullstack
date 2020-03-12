const index = require ('express').Router ();

index.get ('/', (req, res) => {
  res.json ({title: 'Expresss, Welcome to stonks'});
});



module.exports = index;
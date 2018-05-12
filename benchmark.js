const siege = require('siege');

siege()
  .concurrent(600)
  .on(3000)
  .for(1000000).times
  .get('/api/review/1857813/1/0')
  .attack()
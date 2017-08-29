$(function(){
  var map = new Map('map');
  
  genPicker({
    parent: '.all-options',
    title: 'Hotels',
    options: hotels
  })

  genPicker({
    parent: '.all-options',
    title: 'Restaurants',
    options: restaurants
  })

  genPicker({
    parent: '.all-options',
    title: 'Activities',
    options: activities
  })
});

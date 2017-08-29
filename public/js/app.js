$(function(){
  var map = new Map('map');


  function Day() {
    this.hotels = [];
    this.restaurants = [];
    this.activities = [];
  }

  let days = [
    new Day(),
    new Day()
  ];

  let newDay = new Day();

  drawPicker({
    parent: '.all-options',
    title: 'Hotels',
    options: hotels,
    appendTo: '#today-hotel',
    container: newDay.hotels,
    fn: function(arr, item) {
      if (!arr.length) arr.push(item);
      else {
        arr[0] = item;
      }
      drawPick({
        parent: '#today-hotel',
        name: item,
        replace: true
      })
    }
  })

  drawPicker({
    parent: '.all-options',
    title: 'Restaurants',
    options: restaurants,
    appendTo: '#today-restaurant',
    container: newDay.restaurants
  })

  drawPicker({
    parent: '.all-options',
    title: 'Activities',
    options: activities,
    appendTo: '#today-activity',
    container: newDay.activities
    // fn: function(container) {
    //   container.append('<span>stuff</span>');
    // }
  })
});

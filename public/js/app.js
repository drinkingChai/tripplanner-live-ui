$(function(){
  var map = new Map('map');


  function Day() {
    this.hotels = [];
    this.restaurants = [];
    this.activities = [];
  }

  $('#add-day').on('click', function() {
    $('#tabs li.active').removeClass('active');

    let newDay = new Day();
    days.push(newDay);
    active = newDay;

    drawDay({
      parent: '#days',
      active
    });

    drawTab({
      parent: '#tabs',
      associate: newDay
    })


    console.log(days)
  })


  let days = [];
  let newDay = new Day();
  days.push(newDay);
  let active = newDay;

  drawDay({
    parent: '#days',
    active
  });

  drawTab({
    parent: '#tabs',
    associate: newDay,
    num: 1
  })
});

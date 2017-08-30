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

    $('#tabs li').each(function(index) {
      $(this).find('a').html(index + 1);
    })
  })

  $('#remove-day').on('click', function() {
    let $current = $('#tabs li.active'),
      hasNext = $current.next().length;
    if (hasNext) $current.next().addClass('active');
    else $current.prev().addClass('active');

    let index = $current.index();
    if (days[index + 1]) active = days[index + 1];
    else if (days[index - 1]) active = days[index - 1];
    else active = null;

    days.splice(index, 1);

    if (active) {
      drawDay({
        parent: '#days',
        active
      });
    }

    $current.remove();

    $('#tabs li').each(function(index) {
      $(this).find('a').html(index + 1);
    })
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

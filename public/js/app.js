$(function(){
  var map = new Map('map');

  // hotels, restaurants, activities
  /*
    days
      day
        domEl
        items: {
          hotels: arr
          restaurants: arr
          activities: arr
        },
        addTo,
        removeFrom
  */
  let data = {
    days: [],
    activeDay: null,
  }

  class Day {
    constructor() {
      this.hotels = [];
      this.restaurants = [];
      this.activities = [];
    }

    addTo(arr, item) {
      // adds and redraws
      // constraints
      if (arr == 'hotels') this[arr][0] = item;
      else if (arr == 'restaurants' && this[arr].length == 3) return;
      else if (this[arr].includes(item)) return;
      else this[arr].push(item);

      this.draw();
    }

    removeFrom(arr, item) {
      // removes and redraws
      this[arr] = this[arr].filter(i=> i.name != item.name);
      this.draw();
    }

    draw() {
      // draw the template
      // draw each button
      // attach removeFrom to each day's button El
      $('#day-panels').empty();
      genDay({
        panelParent: '#day-panels',
        tabParent: '#tabs',
        day: this
      })
    }
  }



  genPicker({
    parent: '.all-options',
    title: 'Hotels',
    options: hotels,
    arrName: 'hotels',
    data
  })

  genPicker({
    parent: '.all-options',
    title: 'Restaurants',
    options: restaurants,
    arrName: 'restaurants',
    data
  })

  genPicker({
    parent: '.all-options',
    title: 'Activities',
    options: activities,
    arrName: 'activities',
    data
  })

  genTabPanel({
    parent: '#tabs',
    data
  })

  const drawTabs = ()=> {
    $('#tabs').empty();
    genTabPanel({
      parent: '#tabs',
      data
    })
  }

  const addDay = ()=> {
    let newDay = new Day();
    data.days.push(newDay);
    data.activeDay = newDay;
    data.activeDay.draw();
    drawTabs();
  }

  const removeDay = ()=> {
    // check if next exists
    // check if prev exists
    // if len 1 return
    // else remove and set next
    if (data.days.length == 1) return;

    let curDay = data.activeDay,
      index = data.days.indexOf(data.activeDay),
      next = data.days[index + 1];

    data.days = data.days.filter(day=> day != curDay);

    if (next) data.activeDay = next;
    else data.activeDay = data.days[data.days.length - 1];

    data.activeDay.draw();
    drawTabs();
  }

  $('#add-day').on('click', function() {
    addDay();
  })

  $('#remove-day').on('click', function() {
    removeDay();
  })

  // data.activeDay = new Day();
  addDay();

});

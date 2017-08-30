// NOTE: requires bootstrap for styling

const drawOption = (config)=> {
  let template = `
    <option value='${config.value}'>
      ${config.name}
    </option>
  `;

  let $html = $(template);
  $(config.parent).append($html);
}

const drawPick = (config)=> {
  let template = `
    <li class='list-group-item'>
      ${config.name}
      <button class='btn btn-warning btn-sm pull-right'>x</button>
      <br clear='both' />
    </li>
  `;

  let $html = $(template);

  $html.on('click', 'button', function() {
    $html.remove();
    // console.log(config.name);
    // config.container = config.container.filter(function(name) {
    //   return name !== config.name;
    // });
    config.container.splice(config.container.indexOf(config.name), 1);
  })

  if (config.replace) $(config.parent).html($html);
  else $(config.parent).append($html);
}


const drawPicker = (config)=> {
  let template = `
    <li class='list-group-item'>
      ${config.title}
      <br />
      <select style='width: 80%' class='form-control input-sm pull-left'></select>
      <button class='btn btn-primary btn-sm pull-right'>+</button>
      <br clear='all'/>
    </li>
  `;

  let $html = $(template),
    $select = $html.find('select'),
    $button = $html.find('button');

  config.options.forEach(option=> {
    drawOption({
      parent: $select,
      name: option.name,
      value: option.id
    })
  })

  $html.on('click', 'button', function() {
    let name = $select.find(':selected').text().trim()
    if (config.container.includes(name)) return;

    if (config.fn) config.fn(config.container, name);
    else {
      $(config.appendTo).append()
      drawPick({
        parent: config.appendTo,
        name,
        container: config.container
      })

      config.container.push(name);
    }
  })

  $(config.parent).append($html);
}


const drawDay = (config)=> {
  let template = `
    <div>
      <div>
        Hotels
        <ul id='today-hotel' class='list-group'>
        </ul>
      </div>

      <div>
        Restaurants
        <ul id='today-restaurant' class='list-group'>
        </ul>
      </div>

      <div>
        Activities
        <ul id='today-activity' class='list-group'>
        </ul>
      </div>
    </div>
  `;

  let $html = $(template);
  $(config.parent).empty();
  $(config.parent).append($html);
  $('.all-options').empty();

  drawPicker({
    parent: '.all-options',
    title: 'Hotels',
    options: hotels,
    appendTo: '#today-hotel',
    container: config.active.hotels,
    fn: function(arr, item) {
      if (!arr.length) arr.push(item);
      else {
        arr[0] = item;
      }
      drawPick({
        parent: '#today-hotel',
        name: item,
        replace: true,
        container: arr
      })
    }
  })

  drawPicker({
    parent: '.all-options',
    title: 'Restaurants',
    options: restaurants,
    appendTo: '#today-restaurant',
    container: config.active.restaurants
  })

  drawPicker({
    parent: '.all-options',
    title: 'Activities',
    options: activities,
    appendTo: '#today-activity',
    container: config.active.activities
  })

  config.active.hotels.forEach(hotel=> {
    drawPick({
      parent: $('#today-hotel'),
      name: hotel,
      container: config.active.hotels
    })
  })

  config.active.restaurants.forEach(restaurant=> {
    drawPick({
      parent: $('#today-restaurant'),
      name: restaurant,
      container: config.active.restaurants
    })
  })

  config.active.activities.forEach(activity=> {
    drawPick({
      parent: $('#today-activity'),
      name: activity,
      container: config.active.activities
    })
  })

  return $html;
}

const drawTab = (config)=> {
  let template = `
    <li class='active'>
      <a href='#'>${config.num}</a>
    </li>
  `;

  let $html = $(template);
  $(config.parent).append($html);

  $html.on('click', 'a', function() {
    active = config.associate;
    $('#tabs li.active').removeClass('active');
    $(this).parent().addClass('active');

    drawDay({
      parent: '#days',
      active
    });
  })
}

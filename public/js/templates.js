// NOTE: requires bootstrap for styling

const genOption = (config)=> {
  let template = `
    <option value='${config.value}' data-name='${config.name}' data-id='${config.value}'>
      ${config.name}
    </option>
  `;

  let $html = $(template);
  $(config.parent).append($html);
}

const genPicker = (config)=> {
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
    genOption({
      parent: $select,
      name: option.name,
      value: option.id
    })
  })

  $button.on('click', function() {
    let $current = $select.find(':selected');

    config.data.activeDay.addTo(config.arrName, $current.data() )
  })

  $(config.parent).append($html);
}

const genTabPanel = (config)=> {
  let template = `
    <li class=''>
      <a href='#'></a>
    </li>
  `;

  config.data.days.forEach((day, i)=> {
    let $html = $(template);
    $html.find('a').html(i + 1)
    if (day == config.data.activeDay) $html.addClass('active');

    $html.on('click', 'a', function() {
      config.data.activeDay = day;
      config.data.activeDay.draw();
      $(config.parent).find('li').removeClass('active');
      $html.addClass('active');
    })

    $(config.parent).append($html);
  })
}

const genItem = (config)=> {
  let template = `
  <li class='list-group-item'>
    <span>${config.item.name}</span>
    <button class='btn btn-warning btn-sm pull-right'>x</button>
    <br clear='both' />
  </li>
  `;

  let $html = $(template);

  $html.on('click', 'button', function() {
    config.day.removeFrom(config.arrName, config.item);
  })

  $(config.parent).append($html);
}

const genDay = (config)=> {
  // a tab
  // a container
  let template = `
    <div class="panel-body">
      <div class="hotels">
        Hotels
        <ul class="list-group"></ul>
      </div>
      <div class="restaurants">
        Restaurants
        <ul class="list-group"></ul>
      </div>
      <div class="activities">
        Activities
        <ul class="list-group"></ul>
      </div>
    </div>
  `;



  let $panel = $(template),
    $hotels = $panel.find('.hotels ul'),
    $restaurants = $panel.find('.restaurants ul'),
    $activities = $panel.find('.activities ul');

  config.day.hotels.forEach(item=> {
    genItem({
      parent: $hotels,
      item: item,
      day: config.day,
      arrName: 'hotels'
    })
  })

  config.day.restaurants.forEach(item=> {
    genItem({
      parent: $restaurants,
      item: item,
      day: config.day,
      arrName: 'restaurants'
    })
  })

  config.day.activities.forEach(item=> {
    genItem({
      parent: $activities,
      item: item,
      day: config.day,
      arrName: 'activities'
    })
  })

  $(config.panelParent).append($panel);
}

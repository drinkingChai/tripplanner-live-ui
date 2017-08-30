// NOTE: requires bootstrap for styling

const genOption = (config)=> {
  let template = `
    <option value='${config.value}'>
      ${config.name}
    </option>
  `;

  let $html = $(template);
  $(config.parent).append($html);
}

const genItem = (config)=> {
  let template = `
  <li class='list-group-item'>
    <span>${config.name}</span>
    <button class='btn btn-warning btn-sm pull-right'>x</button>
    <br clear='both' />
  </li>
  `;

  let $html = $(template);
  $(config.parent).append($html);
  return $html;
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

  $html.on('click', 'button', function() {
    // send the option
    // find children
    let children = $(config.appendTo).children().map(function(item) {
      return $(this).find('span').text().trim();
    }).toArray();

    let name = $select.find(':selected').text().trim();
    if (children.includes(name)) return;

    genItem({
      parent: config.appendTo,
      name
    })
  })

  $(config.parent).append($html);
}

// helper
const switchTab = (tab, panel)=> {
  let $panels = $('#day-panels').children('.panel-body');
  $panels.hide();
  $('#day-panels .activeDay').removeClass('activeDay');
  $('#tabs .active').removeClass('active');

  panel.addClass('activeDay');
  panel.show();
  tab.addClass('active');

  renameTabs();
}

const renameTabs = ()=> {
  $('#tabs li').each(function(index) {
    $(this).children('a').html(index + 1);
  })
}

const makeDay = (config)=> {
  // a tab
  // a container
  let template = `
    <div class="panel-body">
      <div class="hotels">
        Hotels
        <ul></ul>
      </div>
      <div class="restaurants">
        Restaurants
        <ul></ul>
      </div>
      <div class="activities">
        Activities
        <ul></ul>
      </div>
    </div>
  `;

  let tabTemplate = `
    <li class='active'>
      <a href='#'></a>
    </li>
  `;

  let $panel = $(template),
    $tab = $(tabTemplate);

  $tab.on('click', function() {
    switchTab($tab, $panel);
  })

  $(config.panelParent).append($panel);
  $(config.tabParent).append($tab);

  switchTab($tab, $panel);
}

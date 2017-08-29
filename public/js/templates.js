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
    // $button = $html.find('button');

  $html.on('click', 'button', function() {
    $html.remove();
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
        name
      })

      config.container.push(name);
    }
  })

  $(config.parent).append($html);
}

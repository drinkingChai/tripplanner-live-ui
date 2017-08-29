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
    console.log('did stuff');
  })

  $(config.parent).append($html);
}


/*
<li class='list-group-item'>
  Hotels
  <br />
  <select id="dd-hotels" style='width: 80%' class='form-control input-sm pull-left'>
    <!-- {% for item in hotels %}
    <option value='{{ item.id }}'>
      {{ item.name }} 
    </option>
    {% endfor %} -->
  </select>
  <button class='btn btn-primary btn-sm pull-right'>+</button>
  <br clear='all' />
</li>
*/

/*
  hotels.forEach(hotel=> genOption({
    parent: '#dd-hotels',
    name: hotel.name,
    value: hotel.id
  }))
*/
$(function(){
  var map = new Map('map');

  // templates
  const genOption = (config)=> {
    let template = `
      <option value='${config.value}'>
        ${config.name}
      </option>
    `;

    let $html = $(template);
    $(config.parent).append($html);
  }


  hotels.forEach(hotel=> genOption({
    parent: '#dd-hotels',
    name: hotel.name,
    value: hotel.id
  }))

  restaurants.forEach(restaurant=> genOption({
    parent: '#dd-restaurants',
    name: restaurant.name,
    value: restaurant.id
  }))

  activities.forEach(activitie=> genOption({
    parent: '#dd-activities',
    name: activitie.name,
    value: activitie.id
  }))


  // $('#dd-hotels')
  // $('#dd-restaurants')
  // $('#dd-activities')
});

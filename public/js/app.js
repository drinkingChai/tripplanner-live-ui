$(function(){
  var map = new Map('map');
  $('#add-day').on('click', function() {
    makeDay({
      panelParent: '#day-panels',
      tabParent: '#tabs'
    })
  })

  $('#remove-day').on('click', function() {
    if ($('#day-panels').children('.panel-body').length == 1) return;
    
    let $activePanel = $('.activeDay'),
      $activeTab = $('#tabs .active');

    if ($activePanel.next().length) {
      switchTab($activeTab.next(), $activePanel.next())
    } else if ($activePanel.prev().length) {
      switchTab($activeTab.prev(), $activePanel.prev())
    }

    $activePanel.remove();
    $activeTab.remove();

    renameTabs();
  })

  makeDay({
    panelParent: '#day-panels',
    tabParent: '#tabs'
  })

  genPicker({
    parent: '.all-options',
    title: 'Hotels',
    options: hotels,
    appendTo: '.activeDay .hotels'
  })

  genPicker({
    parent: '.all-options',
    title: 'Restaurants',
    options: restaurants,
    appendTo: '.activeDay .restaurants'
  })

  genPicker({
    parent: '.all-options',
    title: 'Activities',
    options: activities,
    appendTo: '.activeDay .activities'
  })
});

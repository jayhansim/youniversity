$(document).ready(function(){

  // columnize the FAQ and 3 Things block
  $('.important-container').columnize({ width: 400 });
  $('.faq-container').columnize({ width: 400 });



  // Making the tab works
  var href,
      tabsContent = $('#comparison-tabs-content').children();

  tabsContent.not(':first').hide();

  $('#comparison-tabs li').on('click', 'a', function(e){
    $(this).parent('li').addClass('selected').siblings().removeClass('selected');
    href = $(this).attr('href');
    document.location.hash = href.replace(/^.*#/,'/');
    tabsContent.hide().siblings(href).show();
    e.preventDefault();
  });


  // checking the hash change event
  $(window).on('hashchange', function(){

    if(document.location.hash == '') {
      $('#comparison-tabs').find('a[href="#compare"]').click();
    } else {
      var target = $('#comparison-tabs').find('a[href="' + document.location.hash.replace(/\//, '') + '"]');
      target.click();
    }
  }).trigger('hashchange');



  // tablesorter
  $.tablesorter.addParser({
    // set a unique id
    id: 'data',
    is: function(s) {
      // return false so this parser is not auto detected
      return false;
    },
    format: function(s, table, cell, cellIndex) {
      var $cell = $(cell);
      if (cellIndex === 2) {
        return $cell.attr('data-fee') || s;
      // } else if (cellIndex === 3) {
      //   return $cell.attr('data-fee') || s;
      } else if (cellIndex === 5) {
        return $cell.attr('data-month') || s;
      }
      return s;
    },
    parsed: false,
    // set type, either numeric or text
    type: 'text'
  });

  $('.comparison-table').tablesorter({
    sortList: [[2,1]],
    widgets : ["zebra", "columns", "filter"],
    widgetOptions: {
      filter_functions: {
        2 : {
          //"> $0": function(e, n, f, i) { return n > 0;},
          "< $20000": function(e, n, f, i) { return n <= 20000;},
          "$20001 - $30000": function(e,n,f,i){return n >= 20001 && n <= 30000;},
          "> $30001": function(e,n,f,i){return n >= 30001;}
        }
      }
    },

    headers: {
      2: {
        sorter: 'data',
        sortInitialOrder: 'desc'
      },
      // 3: {
      //   sorter: 'data'
      // },
      5: {
        sorter: 'data'
      },
      6: {
        sorter: false
      }
    },
    initialized: function(table) {
        // target select
        var i, o, select = $(table).find('select.tablesorter-filter');
        $('#tuition-fee').change(function() {
            i = $(this).val();
            select[0].options[i].selected = true;
            select.trigger('change');
        });
    }
  });

  // $('#tuition-fee').change(function(){
  //   var filterColumn = $(this).data('filter-column');
  //   //console.log(filterColumn);
  //   var filters = [],
  //     col = filterColumn, // zero-based index
  //     txt = $(this).val();

  //   filters[col] = txt;
  //   // using "table.hasFilters" here to make sure we aren't targetting a sticky header
  //   $.tablesorter.setFilters( $('.comparison-table'), filters, true ); // new v2.9
  //   return false;
  // });


  // Modal

  // Get the course name
  $('#more-course-name').text($('.comparison-header-title').text());
  $('#courseName').attr('value',$('.comparison-header-title').text());

  // Get the school name
  $('.btn-moreinfo').on('click', function(){
    $('#more-school-name').text($(this).parents('tr').find('.uni-info-title').text());
    $('#schoolName').attr('value',$(this).parents('tr').find('.uni-info-title').text());
    if($('.more-form').is(':hidden')) {
      $('.more-form').show().siblings('.more-success').hide();
    }

  });

  $('.btn-moreinfo').fancybox({
    padding: 0,
    autoSize: false,
    autoHeight: true
  });


  // form submit

  $('#leadform').submit(function(e){
    //var toEmail = window.atob('amF5aGFuMjAwM0BnbWFpbC5jb20=');

    // $.ajax({
    //   type: 'POST',
    //   url: 'https://mandrillapp.com/api/1.0/messages/send.json',
    //   data: {
    //     'key': '6HbKslPPJKF61NBRn45rxg',
    //     'message': {
    //       'from_email': $('#email').val(),
    //       'from_name': $('#name').val(),
    //       'headers': {
    //                     'Reply-To': $('#email').val()
    //                 },
    //       'to': [
    //           {
    //             'email': toEmail,
    //             'name': 'Jayhan Sim',
    //             'type': 'to'
    //           }
    //         ],
    //       'subject': 'YOUniversity enquiries',
    //       'html': '<p>Name: ' + $('#name').val() + '</p>' +
    //               '<p>Email: ' + $('#email').val() + '</p>' +
    //               '<p>Phone: ' + $('#phone').val() + '</p>' +
    //               '<p>Enquiries: ' + $('.comparison-header-title').text() + ' in ' +  $('#more-school-name').text()
    //     }
    //   },
    //   beforeSend: function(){
    //     $('#btn-submit').text('Submitting...');
    //   }
    //  }).done(function(response) {
    //     $('.more-form').hide().siblings('.more-success').fadeIn();
    //     console.log(response);
    //  });

    /*var data =  '<p>Name: ' + $('#name').val() + '</p>' +
                '<p>Email: ' + $('#email').val() + '</p>' +
                '<p>Phone: ' + $('#phone').val() + '</p>' +
                '<p>Enquiries: ' + $('.comparison-header-title').text() + ' in ' +  $('#more-school-name').text();*/

    $.ajax({
      type: 'POST',
      url: 'php/sendmail.php',
      data: $('#leadform').serialize(),
      beforeSend: function(){
        $('#btn-submit').text('Submitting...');
      }
    }).done(function(){
      $('.more-form').hide().siblings('.more-success').fadeIn();
      $('#btn-submit').text('Submit');
      //console.log(response);
    });


    e.preventDefault();
  });



  // charLimit
  $('#questions').on('keyup', function(){

    var length = $(this).val().length,
        maxLength = 250;

    if (length > maxLength) {
      $('#charLimit').addClass('text-danger').text( length - maxLength + ' characters exceeded');
    } else {
      $('#charLimit').removeClass('text-danger').text( maxLength - length + ' characters left');
    }
  });

});

//Fades the main text of the page in
$(document).ready(function() {
    setTimeout(function() {
        $('.hero-desc').fadeIn(700);
        $('.desc-hide').fadeIn(1500);
    }, 500);
});

//Control for Toggling the Navigation Menu
function toggleMenu() {
    $('.navigate-list').slideToggle(300);
}

var wW = 880;
$(window).resize(function() {
    if ($(window).width() > wW) {
        $('.navlist').hide();
    }
});

//Makes the Hero image the appropriate size for the the size of the screen
$(document).ready(function() {
    var windowH = $(window).height();

    var navH = $('.nav').outerHeight();

    var tH = windowH - navH;

    if (tH > 700) {
        $('.hero').css('height', tH);
    } else {
        $('.hero').css('height', '100vh');
    }
});

//Opens the contact form with a passed parameter for the subject
function openForm(x) {
    document.getElementById('ContactModal').style.height = '100%';
    $('#tactusFrm').reset();
    $('#email').val(x);
    setTimeout(function() {
        $('body').css('overflow', 'hidden');
    }, 500);
}

//Closes the contact form
function closeForm() {
    document.getElementById('ContactModal').style.height = '0%';
    $('body').css('overflow', 'auto');
}

//Updates the current year on the page
$(document).ready(function() {
    var year = new Date().getFullYear();
    $('#YEAR').html(year);
});

//Handles the Contact Form Posting
function postForm(obj, event) {
    event.preventDefault();
    $.post(
        'http://api.tackter.io/api/UserForms',
        $(obj).serialize(),
        alertSend
    );
}

//Confirmation Message For Form Post
function alertSend() {
    swal({
        title: 'Success!',
        text: 'Your Message Has Been Sent',
        type: 'success',
        timer: 2000,
        showConfirmButton: false,
    });

    closeForm();
    $('#submitbtn').html('Submit');
}

//Changes the submit button test to a loader
function playLoad() {
    var isValid = formValid();
    if (isValid == true) {
        $('#submitbtn').html(
            '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>'
        );
    } else {
        swal('Error');
    }
}

//Makes sure the form has no empty values
function formValid() {
    var email = $('#email').val();
    if ($('#form-name').val() == '') {
        return false;
    } else if ($('#form-email').val() == '') {
        return false;
    } else if ($('#form-message').val() == '') {
        return false;
    } else if ($('#email').val() == '') {
        return false;
    } else {
        return true;
    }
}

//Creates a global variable containing the JSON data
var gvar;

$(document).ready(function() {
    //Gets the Current URL
    var currURL = document.URL;

    fetch('pricing.json')
        .then(res => res.json())
        .then(function(priceArray) {
            // //Parse the data from the JSON file
            // var priceArray = JSON.parse(priceData);

            //Initialize the table that will hold the JSON data
            var table =
                "<table id='pricetable' class='pricing-table'><tr><td>Workshop Type</td><td>Price Per Student</td><td>Payment Period</td></tr>";

            //Iterate through the items in the JSON file and add them to a table
            for (var i = 0; i < priceArray.item.length; i++) {
                if (i == 0) {
                    table +=
                        '<tr><td>' +
                        priceArray.item[i] +
                        '</td><td><strong>' +
                        'R ' +
                        priceArray.price[i] +
                        '.00' +
                        '</strong></td><td><strong>Per</strong> ' +
                        priceArray.paytype[i] +
                        '</td></tr>';
                } else {
                    table +=
                        '<tr><td>' +
                        priceArray.item[i] +
                        '</td><td><strong>' +
                        'R ' +
                        priceArray.price[i] +
                        '.00' +
                        '</strong></td><td><strong>Per</strong> ' +
                        priceArray.paytype[i] +
                        '</td></tr>';
                }
            }

            //Closes the table
            table += '</table>';

            //Inserts the table into the the document
            $('#pCont').html(table);

            //Add the JSON data to the global variable
            gvar = priceArray;
        });
});




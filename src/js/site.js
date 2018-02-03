
//Fades the main text of the page in
$(document).ready(function () {
    setTimeout(function () {
        $(".hero-desc").fadeIn(700);
        $(".desc-hide").fadeIn(1500);
    }, 500);
});


//Control for Toggling the Navigation Menu
function toggleMenu() {
    $(".navigate-list").slideToggle(300);
}


var wW = 880;
$(window).resize(function () {
    if ($(window).width() > wW) {
        $(".navlist").hide();
    }
})

//Makes the Hero image the appropriate size for the the size of the screen
$(document).ready(function () {

    var windowH = $(window).height();

    var navH = $(".nav").outerHeight();

    var tH = windowH - navH;


    if (tH > 700) {
        $(".hero").css("height", tH);
    } else {
        $(".hero").css("height", "100vh");
    }


})

//Opens the contact form with a passed parameter for the subject
function openForm(x) {
    document.getElementById("ContactModal").style.height = "100%";
    $("#tactusFrm").reset();
    $("#email").val(x);
    setTimeout(function () { $("body").css("overflow", "hidden"); }, 500)
}

//Closes the contact form
function closeForm() {
    document.getElementById("ContactModal").style.height = "0%";
    $("body").css("overflow", "auto");
}

//Updates the current year on the page
$(document).ready(function () {
    var year = new Date().getFullYear();
    $("#YEAR").html(year);
});


//Handles the Contact Form Posting
function postForm(obj, event) {

    event.preventDefault();
    $.post("http://api.tackter.io/api/UserForms", $(obj).serialize(), alertSend);
};

//Confirmation Message For Form Post
function alertSend() {
    swal({
        title: "Success!",
        text: "Your Message Has Been Sent",
        type: "success",
        timer: 2000,
        showConfirmButton: false
    });

    closeForm();
    $("#submitbtn").html('Submit')
};

//Changes the submit button test to a loader
function playLoad() {

    var isValid = formValid();
    if (isValid == true) {
        $("#submitbtn").html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>')
    } else {
        swal("Error")
    }

};

//Makes sure the form has no empty values
function formValid() {
    var email = $("#email").val();
    if ($("#form-name").val() == "") {
        return false;
    } else if ($("#form-email").val() == "") {
        return false;
    } else if ($("#form-message").val() == "") {
        return false;
    } else if ($("#email").val() == "") {
        return false;
    } else {
        return true;
    }
}

//Creates a global variable containing the JSON data
var gvar;

$(document).ready(function () {

    //Gets the Current URL
    var currURL = document.URL;

    //Handles the cross server cunundrum
    if (currURL == "http://www.creatorworkshops.com/quote.html") {
        var priceData = $.ajax({
            url: "http://www.creatorworkshops.com/pricing.json",
            async: false
        }).responseText;
    } else {
        var priceData = $.ajax({
            url: "http://creatorworkshops.com/pricing.json",
            async: false
        }).responseText;
    }

    //Parse the data from the JSON file
    var priceArray = JSON.parse(priceData);

    //Initialize the table that will hold the JSON data
    var table = "<table id='pricetable' class='pricing-table'><tr><td>Workshop Type</td><td>Price Per Student</td><td>Payment Period</td></tr>";

    //Iterate through the items in the JSON file and add them to a table
    for (var i = 0; i < priceArray.item.length; i++) {

        if (i == 0) {
            table += "<tr><td>" + priceArray.item[i] + "</td><td><strong>" + "R " + priceArray.price[i] + ".00" + "</strong></td><td><strong>Per</strong> " + priceArray.paytype[i] + "</td></tr>";

        } else {
            table += "<tr><td>" + priceArray.item[i] + "</td><td><strong>" + "R " + priceArray.price[i] + ".00" + "</strong></td><td><strong>Per</strong> " + priceArray.paytype[i] + "</td></tr>";
        }

    }

    //Closes the table
    table += "</table>";


    //Inserts the table into the the document
    $("#pCont").html(table);

    //Add the JSON data to the global variable
    gvar = priceArray;
});


//Starts a dynamic quoting system based on JSON data
function getQuote() {

    //Initialize select menu of option types
    var options = "<select id='course-type' onchange='quotenxt()'><option selected>Choose...</option>";

    //Iterates through items adding them to a select list
    for (var u = 0; u < gvar.item.length; u++) {
        options += "<option vlaue='" + gvar.item[u] + "'>" + gvar.item[u] + "</option>";
    }

    //Closes the select list
    options += "</select>";

    //Inserts the select list into the document
    $("#drop-list").html(options);

    //Shows the select list
    $("#get-quote").show();
}

//Creates a global variable for the type of course chosen
var gval;

//Show the next part of the quote form
function quotenxt() {
    $("#kidssect").hide();
    $("#rQuote").hide();

    var value = $("#course-type").val();
    gval = value;

    var i = gvar.item.indexOf(value);


    console.log(gvar.price[i])
    showKids(i);

}

//Gets the number of students coming to the course and works out pricing (optional discount)
function showKids(x) {
    $("#kidssect").show();
    console.log(x + "Hello");

    $("#nxtbtn").click(function () {

        //Total amount of attending students
        var amount = $("#kidnum").val();

        var tAmount = parseInt(amount);

        //Large group discount calculator
        var disc = rateDiscount(amount);

        var tDisc = parseInt(disc);

        //Work Out the Item Price With Discount
        var itemPrice = gvar.price[x];

        var itemP = parseInt(itemPrice);

        itemP = itemP - tDisc;

        var tPrice = tAmount * itemP;

        sumQuote(tPrice, itemP);

    })
}

//Works out the discount for number of students attending
function rateDiscount(y) {

    if (y < "15") {
        return "0";
    } else if (y > "15" && y < "30") {
        return "0";
    } else if (y >= "30") {
        return "0";
    }

}

//Creates a summary table for the quote and writes the information to an email that will be sent to the host
function sumQuote(t, g) {

    var client = new ClientJS(); // Create A New Client Object

    var fingerprint = client.getFingerprint();


    var juid = jUid(fingerprint)
    $("#rQuote").show();

    $("#cType").html(gval);
    $("#pPStudent").html('R' + g + '.00/student');

    switch (gval) {
        case "Weekly":
            $("#tPrice").html('R' + t + '.00/term');
            break;
        case "Holiday":
            $("#tPrice").html('R' + t + '.00/day');
            break;
        case "Pilot Week":
            $("#tPrice").html('R' + t + '.00 for <strong>' + $("#kidnum").val() + '</strong> students for the full week');
            break;

        default:
            $("#tPrice").html('R' + t + '.00');
            break;
    }


    $("#q-ctype").val(gval);
    $("#q-ppstudent").val('R' + g + '.00');
    $("#q-tprice").val('R' + t + '.00');
    $("#q-jobid").val(juid);
    $("#q-clientid").val(fingerprint);

}

//Creates a PDF with the quote information
function alertQSend() {
    var doc = new jsPDF();

    doc.setFontSize(15);
    doc.text(105, 20, 'Your Quote For', null, null, 'center');

    doc.setFontSize(30);
    doc.text(105, 40, 'Creator Workshops', null, null, 'center');

    doc.setFontSize(15);
    doc.text(20, 80, 'Event Type:   ' + $("#q-ctype").val());

    doc.setFontSize(15);
    doc.text(20, 100, 'Number of Students:   ' + $("#kidnum").val());

    doc.setFontSize(15);
    doc.text(20, 120, 'Price per Student:   ' + $("#q-ppstudent").val() + '/student');

    doc.setFontSize(15);
    doc.text(20, 140, 'Total Price:   ' + $("#q-tprice").val());

    doc.setFontSize(10);
    doc.text(20, 270, 'Your Job ID:   ' + $("#q-jobid").val());

    doc.save('creatorwork-quote-' + $("#q-clientid").val() + '.pdf');

    $("#q-btn").html("Submit");
    $("#get-quote").hide();
    $("#SubMessage").show();
};

//Posts the quote form
function postQuoteForm(obj, event) {

    event.preventDefault();
    $.post("http://api.tackter.io/api/UserForms", $(obj).serialize(), alertQSend);
};

//Adds a loader to the submit button
function isload() {
    $("#q-btn").html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>')
}

//Creates a Job ID
function jUid(c) {
    var date = new Date();

    var d = date.getTime();

    var juid = c + '' + d;
    return juid;
}

//Generates a unique name for the the three PDFs
$(document).ready(function () {
    var cli = new ClientJS(); // Create A New Client Object

    var fingerprint = cli.getFingerprint();

    $("#pilot").attr("download", "PilotWeek-Info-" + fingerprint + ".pdf");

    $("#begin").attr("download", "BeginnerCourse-Info-" + fingerprint + ".pdf")

    $("#advance").attr("download", "AdvancedCourse-Info-" + fingerprint + ".pdf")
})


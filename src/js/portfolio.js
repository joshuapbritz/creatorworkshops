

function prevPort() {
    var iN = $(".port-content").attr("index-number");
    var prevSlide = prevSlider(iN);

    $(".port-content").attr("index-number", prevSlide);
    $("#port-" + iN).hide();
    $("#port-" + prevSlide).fadeIn(700);
    };

function prevSlider(i) {

    switch (i) {
        case "one":
            return "ten";
            break;
        case "ten":
            return "nine";
            break;
        case "nine":
            return "eight";
            break;
        case "eight":
            return "seven";
            break;
        case "seven":
            return "six";
            break;
        case "six":
            return "five";
            break;
        case "five":
            return "four";
            break;
        case "four":
            return "three";
            break;
        case "three":
            return "two";
            break;
        case "two":
            return "one";
            break;
    }
}

function nextPort() {
    var iN = $(".port-content").attr("index-number");
    var nextSlide = nextSlider(iN);

    $(".port-content").attr("index-number", nextSlide);
    $("#port-" + iN).hide();
    $("#port-" + nextSlide).fadeIn(700);
    };



function nextSlider(i) {

    switch (i) {
        case "one":
            return "two";
            break;
        case "two":
            return "three";
            break;
        case "three":
            return "four";
            break;
        case "four":
            return "five";
            break;
        case "five":
            return "six";
            break;
        case "six":
            return "seven";
            break;
        case "seven":
            return "eight";
            break;
        case "eight":
            return "nine";
            break;
        case "nine":
            return "ten";
            break;
        case "ten":
            return "one";
            break;
    }
}
var mybet_id, mybet_cash = 0, win_number, win_cash = 0, firstclick = true, settings_on = false, withdrawal = false, adding = false, clickable = true;
var i_row, i_12, is_18, is_s18, is_even, is_odd, is_red, is_black, glek, final_win, stylecount = 0, winstreak = 0;

$(document).ready(function () {
    if (localStorage.getItem('CurrentCash') !== null)
        $("#current").html(localStorage.getItem('CurrentCash'));
    if (localStorage.getItem('stylecount') !== null) {
        $("body").css("background-image", "url(pics/background" + localStorage.getItem('stylecount') + ".jpg)");
        stylecount = localStorage.getItem('stylecount');
    }
    if (localStorage.getItem('streak') !== null)
        winstreak = localStorage.getItem('streak');
    $("#my_streak").html(winstreak);

//    current_cash = $("#current").html();
    $("#f12b").on("mouseover", {name: "td[class]:not(.1stb)"}, twelvebot);
    $("#s12b").on("mouseover", {name: "td[class]:not(.2ndb)"}, twelvebot);
    $("#t12b").on("mouseover", {name: "td[class]:not(.3rdb)"}, twelvebot);
    $("#f12").on("mouseover", {name: "td[class]:not(.first-row td[class])"}, twelvebot);
    $("#s12").on("mouseover", {name: "td[class]:not(.second-row td[class])"}, twelvebot);
    $("#t12").on("mouseover", {name: "td[class]:not(.third-row td[class])"}, twelvebot);
    $("#redbet").on("mouseover", {name: "rgb(0, 0, 0)"}, rgbutton);
    $("#blackbet").on("mouseover", {name: "rgb(255, 0, 0)"}, rgbutton);
    $("#even").on("mouseover", {name: 1}, values);
    $("#odd").on("mouseover", {name: 0}, values);
    $("#f18").on("mouseover", {name: 18}, values);
    $("#s18").on("mouseover", {name: 36}, values);
    $(".circles").on("click", bet);
    $(".1stb, .2ndb, .3rdb, #zero, #f12b, #s12b, #t12b, #f18, #s18, #redbet, #blackbet, #odd, #even, #f12, #s12, #t12").on("click", idbet);
//    $("#win_num").on("mouseover", random);

    $("#cancel").on("click", cancel);
    $("#settings img").on("click", settings);
    $("#style").on("click", styleset);

    $("#wallet_icon").click(function () {
        $("#popup, #popup_overlay").show();
    });
    $("#popup_overlay").click(function () {
        $("#popup, #popup_overlay").hide();
    });
    $("#add").on("click", {name: "add"}, cashier);
    $("#withdraw").on("click", {name: "withdraw"}, cashier);
    $(document).on("click", "#c_but", add);
    $("#roulette").on("click", random);
    $("#rules").click(function () {
        var win = window.open('https://en.wikipedia.org/wiki/Roulette', '_blank');
        win.focus();
    });
});
function rgbutton(event) {
    $("td").each(function () {

        if ($(this).css("background-color") === event.data.name) {
            $(this).css("opacity", "0.25");

        }
    });

    $("#zero").css("opacity", "0.3");
    $(this).mouseout(function () {
        $("td").css("opacity", "1");
    });
}

function twelvebot(event) {

    var a = event.data.name;


    $(a).css("opacity", "0.3");
    $("#zero").css("opacity", "0.3");
    $(this).mouseout(function () {
        $("td").css("opacity", "1");
    });
}

function values(event) {

    if (event.data.name === 18) {
        $(".1stb, .2ndb, .3rdb").each(function () {
            if ($(this).html() > 18) {
                $(this).css("opacity", "0.3");
            }

        });
    }
    if (event.data.name === 36) {
        $(".1stb, .2ndb, .3rdb").each(function () {
            if ($(this).html() <= 18) {
                $(this).css("opacity", "0.3");
            }

        });
    }

    $(".1stb, .2ndb, .3rdb").each(function () {

        if (($(this).html() % 2) === event.data.name)
            $(this).css("opacity", "0.3");

    });

    $("#zero").css("opacity", "0.3");

    $(this).mouseout(function () {
        $("td").css("opacity", "1");
    });

}

function checkbalance(newbet) {
//    localStorage.setItem('CurrentCash', parseInt($("#current").html()));
    if ($("#current").html() - newbet >= 0) {
        return true;
    }

}
function badbalance() {
//    localStorage.setItem('CurrentCash', parseInt($("#current").html()));
    if (mybet_cash === 0)
        $("#errorcash").html("Choose a bet!");
    else
        $("#errorcash").html("Not enough funds for bet!");
    if (parseInt($("#current").html()) === 0)
        $("#errorcash").html("Not enough funds for bet!");

    $("#errorcash").slideDown('250');
    setTimeout(function () {
        $("#errorcash").slideUp('350');
    }, 1500);
    $('html, body').animate({scrollTop: 0}, 200);
//    firstclick=true;
    $(".circles").css("borderWidth", "4px");
    $(".circles").css("borderColor", "white");

}
function bet() {
    if (clickable) {
        if (firstclick)
            $("#column1 *:not(:first), #column2 *:not(:first)").remove();
        firstclick = false;
        $(".circles").css("borderWidth", "4px");
        $(".circles").css("borderColor", "white");
        $(this).css("borderWidth", "7px");
        $(this).css("borderColor", "#f5de05");
        var a = $(this).attr("id");
        var bet1;
        mybet_cash = 0;
        switch (a) {
            case "five":
                bet1 = 5;
                break;
            case "twentyf":
                bet1 = 25;
                break;
            case "fifty":
                bet1 = 50;
                break;
            case "hund":
                bet1 = 100;
                break;
            case "fhund":
                bet1 = 500;
                break;
        }

        if (checkbalance(bet1)) {
            mybet_cash = bet1;
        } else
            badbalance();

    }
}
function idbet() {

    if (mybet_cash !== 0 && checkbalance(mybet_cash)) {


        mybet_id = $(this).html().replace(/\s/g, "");
        if (mybet_id === "<p>0</p>")
            mybet_id = "0";
        if ($(this).attr("id") === "f12")
            mybet_id = "FirstRow";
        if ($(this).attr("id") === "s12")
            mybet_id = "SecondRow";
        if ($(this).attr("id") === "t12")
            mybet_id = "ThirdRow";
//        console.log(mybet_id);
        alreadybet(mybet_id);

        $("#current").html($("#current").html() - mybet_cash);
        localStorage.setItem('CurrentCash', parseInt($("#current").html()));
        $("#totalbet").html(parseInt($("#totalbet").html()) + mybet_cash);

    } else
        badbalance();
}
function alreadybet(ids) {
    var c = 0;
    $("#column1 p").each(function () {
//        console.log($(this).html());
        if (ids === $(this).html()) {
//            console.log($("#bet"+ids).html());
            $("#bet" + ids).html(parseInt($("#bet" + ids).html()) + mybet_cash);
            c = 1;
        }
    });
    if (c === 0) {
        $("#column1").append($("<p>" + mybet_id + "</p>").attr("id", "id" + mybet_id));
        $("#column2").append($("<p>" + mybet_cash + "</p>").attr("id", "bet" + mybet_id));
    }
}
function random() {
    if (firstclick === true || parseInt($("#totalbet").html()) === 0)
        badbalance();
    else {
        clickable = false;
        spin();




        firstclick = true;
        mybet_cash = 0;
        $(".circles").css("borderWidth", "4px");
        $(".circles").css("borderColor", "white");
        win_cash = 0;
        setTimeout(function () {
            win_number = final_win;
//        win_number = 4;
            $("#win_num p").html(win_number);
            win_number_param(win_number);
            $("#column1 p").each(function () {
                if ($.isNumeric($(this).html()) && win_number === parseInt($(this).html())) {
                    $(this).css("color", "#53fd0d");
//            console.log($(this).html());
                    var i = $(this).attr("id");
                    i = i.slice(2);
                    $("#bet" + i).css("color", "#53fd0d");
                    win_cash += parseInt($("#bet" + i).html()) * 36;
                    console.log(win_cash);
                }
                if (($(this).html() === "1st12" || $(this).html() === "2nd12" || $(this).html() === "3rd12") && parseInt($(this).html().substring(0, 1)) === i_12) {
                    $(this).css("color", "#53fd0d");
                    var i = $(this).attr("id");
                    i = i.slice(2);
                    $("#bet" + i).css("color", "#53fd0d");
                    win_cash += parseInt($("#bet" + i).html()) * 3;
                    console.log(win_cash);
                }
                if ($(this).html() === "1to18" && is_18) {
                    $(this).css("color", "#53fd0d");
                    var i = $(this).attr("id");
                    i = i.slice(2);
                    $("#bet" + i).css("color", "#53fd0d");
                    win_cash += parseInt($("#bet" + i).html()) * 2;
                    console.log(win_cash);
                }
                if ($(this).html() === "19to36" && is_s18) {
                    $(this).css("color", "#53fd0d");
                    var i = $(this).attr("id");
                    i = i.slice(2);
                    $("#bet" + i).css("color", "#53fd0d");
                    win_cash += parseInt($("#bet" + i).html()) * 2;
                    console.log(win_cash);
                }
                if ($(this).html() === "FirstRow" && i_row === 1) {
                    $(this).css("color", "#53fd0d");
                    var i = $(this).attr("id");
                    i = i.slice(2);
                    $("#bet" + i).css("color", "#53fd0d");
                    win_cash += parseInt($("#bet" + i).html()) * 3;
                    console.log(win_cash);
                }
                if ($(this).html() === "SecondRow" && i_row === 2) {
                    $(this).css("color", "#53fd0d");
                    var i = $(this).attr("id");
                    i = i.slice(2);
                    $("#bet" + i).css("color", "#53fd0d");
                    win_cash += parseInt($("#bet" + i).html()) * 3;
                    console.log(win_cash);
                }
                if ($(this).html() === "ThirdRow" && i_row === 3) {
                    $(this).css("color", "#53fd0d");
                    var i = $(this).attr("id");
                    i = i.slice(2);
                    $("#bet" + i).css("color", "#53fd0d");
                    win_cash += parseInt($("#bet" + i).html()) * 3;
                    console.log(win_cash);
                }
                if ($(this).html() === "Even" && is_even) {
                    $(this).css("color", "#53fd0d");
                    var i = $(this).attr("id");
                    i = i.slice(2);
                    $("#bet" + i).css("color", "#53fd0d");
                    win_cash += parseInt($("#bet" + i).html()) * 2;
                    console.log(win_cash);
                }
                if ($(this).html() === "Odd" && is_odd) {
                    $(this).css("color", "#53fd0d");
                    var i = $(this).attr("id");
                    i = i.slice(2);
                    $("#bet" + i).css("color", "#53fd0d");
                    win_cash += parseInt($("#bet" + i).html()) * 2;
                    console.log(win_cash);
                }
                if ($(this).html() === "RED" && is_red) {
                    $(this).css("color", "#53fd0d");
                    var i = $(this).attr("id");
                    i = i.slice(2);
                    $("#bet" + i).css("color", "#53fd0d");
                    win_cash += parseInt($("#bet" + i).html()) * 2;
                    console.log(win_cash);
                }
                if ($(this).html() === "BLACK" && is_black) {
                    $(this).css("color", "#53fd0d");
                    var i = $(this).attr("id");
                    i = i.slice(2);
                    $("#bet" + i).css("color", "#53fd0d");
                    win_cash += parseInt($("#bet" + i).html()) * 2;
                    console.log(win_cash);
                }

            });

            console.log("total win" + win_cash);
            $("#current").html(parseInt($("#current").html()) + win_cash);
            localStorage.setItem('CurrentCash', parseInt($("#current").html()));
            $("#totalbet").html("0");
            if (win_cash !== 0) {
                $("#final_score").css("color", "#57fc2e");
                $("#final_score").html("You won " + win_cash + "!");
                winstreak++;

                localStorage.setItem('streak', winstreak);
            } else {
                $("#final_score").html("You lost!");
                $("#final_score").css("color", "red");
                winstreak = 0;
                localStorage.setItem('streak', winstreak);
            }
            $("#my_streak").html(winstreak);
            $("#final_score").fadeIn(320);
            setTimeout(function () {
                $("#final_score").fadeOut(500);
            }, 1500);
            clickable = true;
        }, 2600);
    }

}

function win_number_param(num) {
    var temp_color, temp_row;
    $("#win_num").css("background-color", "#2ef200");
    i_row = 0;
    i_12 = 0;
    is_18 = false;
    is_s18 = false;
    is_even = false;
    is_odd = false;
    is_red = false;
    is_black = false;
    if (num !== 0) {
        if (num % 2 === 0)
            is_even = true;
        else
            is_odd = true;
        if (num <= 12)
            i_12 = 1;
        if (num > 12 && num <= 24)
            i_12 = 2;
        if (num > 24)
            i_12 = 3;
        if (num <= 18)
            is_18 = true;
        else
            is_s18 = true;

        $(".1stb, .2ndb, .3rdb").each(function () {
            if (parseInt($(this).html()) === num) {
                temp_color = $(this).css("background-color");
                temp_row = $(this).parent().attr("class");
            }
        });

        if (temp_color === "rgb(255, 0, 0)") {
            is_red = true;
            $("#win_num").css("background-color", "red");
        } else {
            is_black = true;
            $("#win_num").css("background-color", "black");
        }
        if (temp_row === "first-row")
            i_row = 1;
        if (temp_row === "second-row")
            i_row = 2;
        if (temp_row === "third-row")
            i_row = 3;

    }
}
function cancel() {
    if (parseInt($("#totalbet").html()) !== 0) {
        $("#column1 p:last-child").remove();
        var r = parseInt($("#column2 p:last-child").html());
        $("#current").html(parseInt($("#current").html()) + r);
        localStorage.setItem('CurrentCash', parseInt($("#current").html()));
        $("#totalbet").html(parseInt($("#totalbet").html()) - r);
        $("#column2 p:last-child").remove();
    }
}
function settings() {
    if (settings_on) {
        $("#settings_menu *").fadeOut(400);

        $("#settings_menu").animate({
            marginLeft: 6 + "%"
        }, 400);
        setTimeout(function () {
            $("#settings_menu").css("margin-left", "6%");
        }, 400);
        settings_on = false;
        settings_ic();
    } else {

        $("#settings_menu").animate({
            marginLeft: 2 + "%"
        }, 400);
        $("#settings_menu *:not(#style *)").fadeIn(400);
        settings_on = true;
        settings_ic();

    }

}

function settings_ic() {
    console.log(1);
//    if (settings_on){

    $("#settings_icon").toggleClass("rotate");

//    }
}

function styleset() {
    stylecount++;
    if (stylecount === 5)
        stylecount = 0;
    $("body").css("background-image", "url(pics/background" + stylecount + ".jpg)");
    localStorage.setItem('stylecount', stylecount);
}
function cashier(event) {
    if (event.data.name === "add") {
        adding = true;
        withdrawal = false;
//        console.log("a"+adding);
//        console.log("w"+withdrawal);
    }
    if (event.data.name === "withdraw") {
        withdrawal = true;
        adding = false;
//        console.log("a"+adding);
//        console.log("w"+withdrawal);
    }
    $("#cashierbody").load(event.data.name + ".html");

}
function add() {
    if (adding) {
        if ($("#input_num").val() <= 20000) {
            $("#amount").html($("#input_num").val() + " has been credited to your account balance");
            $("#more20000").html("");
            $("#current").html(parseInt($("#current").html()) + parseInt($("#input_num").val()));
            localStorage.setItem('CurrentCash', parseInt($("#current").html()));
        } else
        {
            $("#amount").html("");
            $("#more20000").html("Upper limit is 20000!");
        }
    }
    if (withdrawal) {
        if (checkbalance($("#input_num").val())) {
            $("#amount").html($("#input_num").val() + " has been withdrawn from your account balance");
            $("#withdraw_error").html("");
            $("#current").html(parseInt($("#current").html()) - parseInt($("#input_num").val()));
            localStorage.setItem('CurrentCash', parseInt($("#current").html()));
        } else
        {
            $("#amount").html("");
            $("#withdraw_error").html("Not enough money!");
        }

    }
}
function spin() {
    var idr = parseInt(Math.random() * 37);
    console.log("id on roul: " + idr);

    if (idr === 0) {
        final_win = 0;
        console.log("zeroooooooooooooooooooo");
    } else {
        final_win = parseInt($("#" + (idr - 1)).html());
    }
    console.log(final_win);

//    setTimeout(function () {
//        random();
//    }, 100);


    $({deg: 0}).animate({deg: 9.72972972972973 * idr + 1080}, {
        duration: 2500,
        step: function (now) {
            // in the step-callback (that is fired each step of the animation),
            // you can use the `now` paramter which contains the current
            // animation-position (`0` up to `angle`)
            $("#roulette").css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
}
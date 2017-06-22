$(document).ready(function() {

    var index = '';
//default options for ajax call
    var options = {
        results: 12,
        nat: "US",
        gender: " ",
    };
    var url = 'https://randomuser.me/api/';
    $.getJSON(url, options, display);


    var email = document.querySelectorAll('.name');
    var pic = document.querySelectorAll('.avatar');
    var personContainer = '<ul class = container>';


//code for splitting up birthday returned from the api in order to make it more readable
    function birthDay(birthD) {
        var bDay = birthD.split(' ');
        var bfDay = bDay[0];
        var month = bfDay.substr(5, 6);
        var year = bfDay.substr(0, 4);
        return date = month + '-' + year;
    }

//function to capiatlize first letters of strings passed into it
    function capitalize_Words(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
//function for rendering the modal when a users profile is selected
    function renderModal(data) {
        console.log(data.results[index].name.first);


        var firstName = capitalize_Words(data.results[index].name.first);
        var lastName = capitalize_Words(data.results[index].name.last);
        var dataI = data.results[index];
        var bDay = birthDay(data.results[index].dob);
        var city = capitalize_Words(dataI.location.city);
        var state = capitalize_Words(dataI.location.state);
        var street = capitalize_Words(dataI.location.street);
        var mod = '<div class = modalDialog>';
        mod += '<span id = close>  &#10006  </span>';
        mod += '<span class = arrow id = right>    &#8680     </span>';
        mod += '<span class = arrow id = left>  &#8678     </span>';

        mod += '<div class = moCont>';
        mod += '<img class = avatar src="' + data.results[index].picture.large + '">';
        mod += '<h2>' + firstName + ' ' + lastName + '</h2>';
        mod += '<span>' + data.results[index].login.username + '</span>';
        mod += '<span>' + data.results[index].email + '</span>';
        mod += '<span>' + city + '</span>';
        mod += '<hr>';
        mod += '<span>' + dataI.cell + '</span>';
        mod += '<span>' + street + ', ' + state + ' ' + dataI.location.postcode + '</span>';
        mod += '<span>' + 'Birthday:' + ' ' + bDay + '</span>';
        mod += '</div>';
        mod += '</div>';
        $('.main').prepend(mod);
        console.log(data);
        modButtons(data);

    }
//function for attaching an event handler to persons to invoke modal
    function eHandler(data) {

        $(".person").click(function() {

            $('.modalDialog').remove();

            index = $(this).index();

            renderModal(data);

            console.log(index);
        });

    }

//function for assigning the next/previous and close buttons to the modal

    function modButtons(data) {

        $("#close").click(function() {
            $('.modalDialog').remove();

        });


        $('#right').click(function() {
            $('.modalDialog').remove();

            index += 1;

            renderModal(data);

        });

        $('#left').click(function() {
            $('.modalDialog').remove();

            index -= 1;

            renderModal(data);

        });

    }



//function for displaying the results of the random perosn APi on the screen 
    function display(data) {
        console.log(data);
        var personContainer = '<ul class = container>';
        $.each(data.results, function(i, entry) {
            var firstName = capitalize_Words(entry.name.first);
            var lastName = capitalize_Words(entry.name.last);
            personContainer += '<li class = person>';
            personContainer += '<div class = image>';
            personContainer += '<img class = avatar src="' + entry.picture.medium + '">';
            $('.avatar').attr("src", entry.picture.medium);
            personContainer += '<h3 class = name>' + firstName + ' ' + lastName + '</h3>';

            personContainer += '<span class = e-mail>' + entry.email + '</span>';
            personContainer += '<span class = phone>' + entry.cell + '</span>';
            personContainer += '</div>';
            personContainer += '</li>';
        });
        personContainer += '</ul>';
        $('.main').html(personContainer);
        eHandler(data);
    }



//submit function for caputring user inputs to query the random persons api
    $("form").submit(function(e) {
        e.preventDefault();
        var testNum = parseInt($('#numP').val());
        var genderS = $("#gender option:selected").val();
        var nat = $("#nation option:selected").val();
        if ($('#numP').val()) {
            options.results = testNum;
        } else {
            options.results = 10;
        }
        options.gender = genderS;
        options.nat = nat;
        console.log(options);

        $.getJSON(url, options, display);

    });


});
$(document).ready(function(){
	var options = {
	results: 10,
	nat: "US"
	}
var url = 'https://randomuser.me/api/'
$.getJSON(url, options, display)


var email = document.querySelectorAll('.name')
var pic = document.querySelectorAll('.avatar')
var personContainer = '<ul class = container>'

function capitalizeFirstLetter(string) {
 return string.charAt(0).toUpperCase() + string.slice(1);
}


function eHandler(data) {
$(".person").click(function(){
var index =  $(this).index();
let firstName = capitalizeFirstLetter(data.results[index].name.first)
let lastName = capitalizeFirstLetter(data.results[index].name.last )
var dataI = data.results[index]
var mod = '<div class = modalDialog>' 
mod += '<div class = moCont>'
mod += '<img class = avatar src="' + data.results[index].picture.large + '">'
mod += '<h2>' + firstName + ' ' + lastName +'</h3>'
mod += '<span>' + data.results[index].login.username + '</span>'
mod += '<span>' + data.results[index].email + '</span>'
mod += '<span>' + dataI.cell + '</span>'
mod += '<span>' + dataI.location.street + ' ' + dataI.location.city + ', ' + dataI.location.state + ' ' + dataI.location.postcode + '</span>'
mod += '<span>' + data.results[index].dob + '</span>'
mod += '</div>'
mod += '</div>'	
	$('.main').prepend(mod)	
})
}	

$("h3").click(function(){
$('.modalDialog').remove();

})

function display (data){

	var personContainer = '<ul class = container>'
	$.each(data.results, function(i, entry) {
	var firstName = capitalizeFirstLetter(entry.name.first)
	var lastName = capitalizeFirstLetter(entry.name.last)
	personContainer += '<li class = person>';
	personContainer += '<div class = image>'
	personContainer += '<img class = avatar src="' + entry.picture.medium + '">'
	$('.avatar').attr("src", entry.picture.medium)
	personContainer += '<h3 class = name>' + firstName + ' ' + lastName +'</h3>'
	
	personContainer += '<span class = e-mail>' + entry.email + '</span>'
	personContainer += '<span class = phone>' + entry.cell + '</span>'
	personContainer += '</div>'
	personContainer += '</li>'
	})
	personContainer += '</ul>'
	$('.main').html(personContainer)
	eHandler(data)
}




$("form").submit (function (e) {
	e.preventDefault();
	var testNum =  parseInt($('#numP').val())
	options.results = testNum
	$.getJSON(url, options, display)
	
});


})







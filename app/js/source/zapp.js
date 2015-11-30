$(function() {
	var $date = $('.date');
	var title = moment($date.attr('title')).format("dddd, MMMM Do YYYY");
	$date.text(title);
});
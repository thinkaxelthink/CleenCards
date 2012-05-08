var card = '<ul id="cards">{{#each cards}}<li><h2>{{title}}</h2><img src="{{image}}" width="150" height="150" /><p>{{description}}</p></li>{{/each}}</ul>';

require.config({
	baseUrl: '/static/js',
	paths: {
		'sb': 'sb/',
		'libs': 'libs/',
		"jquery": '//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min'
	}
});

require(['require', 'jquery', 'libs/respond.min', 'plugins', 'libs/handlebars', 'libs/jquery.csv', 'sb/sb.events'], onDependsLoaded);


function onDependsLoaded(req,$,modernizer,respond,plugins,csv,SBMediator) {
		//log('csv2Array', $.csv2Array);
		// We load any document level dependancies here.
		$.get('static/csv/ProductionCards.csv', onCSVLoaded);
}

function onCSVLoaded(d){

	var template = Handlebars.compile(card);
	var dict = $.csv2Dictionary(d);
	var data = {cards:[]};
	for (var i = dict.length - 1; i >= 0; i--) {
		
		if(dict[i].Name !== "" && dict[i].Name !== "Total")
		{
			log(dict[i]);
			data.cards.push(dict[i]);
		}
	};
	
	var datad = { cards: [
	{title: "Patient Zero", 
	image: 'static/img/placeholder.png',
	description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
	{title: "Hooookkh",
	image: 'static/img/placeholder.png',
	description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
	{title: "SSSSShooo Cookk",
	image: 'static/img/placeholder.png',
	description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
	{title: "In The Trenches",
	image: 'static/img/placeholder.png',
	description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
	{title: "POO POO",
	image: 'static/img/placeholder.png',
	description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}]};

	$('#main').html(template(datad));
};
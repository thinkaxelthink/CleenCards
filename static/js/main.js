var card = '<ul id="cards">{{#each cards}}<li><div class="points">{{points}}</div><h2>{{title}}</h2><img src="{{image}}" width="150" height="150" /><p>{{description}}</p></li>{{/each}}</ul>';

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
		
		if(dict[i].name !== "" && dict[i].name !== "Total")
		{
			for (var j = parseInt(dict[i].quantity,10) - 1; j >= 0; j--)
			{
				data.cards.push({title: dict[i].name, image: 'static/img/placeholder.png', description: dict[i].description, points: dict[i].point_value});
				log(dict[i], data.cards[data.cards.length-1]);
			}
		}
	};
	
	$('#main').html(template(data));
};
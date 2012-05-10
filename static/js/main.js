var prod_card = '{{#each production}}<li><div class="points">{{points}}</div><h2>{{title}}</h2><p>{{description}}</p></li>{{/each}}';
var action_card = '{{#each actions}}<li><h2>{{title}}</h2><img src="{{image}}" width="150" height="150" /><p>{{description}}</p></li>{{/each}}';
var card = '{{#each actions}}<li><h2>{{title}}</h2><p>{{description}}</p></li>{{/each}}';
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
		// $.get('static/csv/ProductionCards.csv', onProductionCSVLoaded);
		$.get('static/csv/ActionsCards.csv', onActionCSVLoaded);
}

function onProductionCSVLoaded(d)
{
	var template = Handlebars.compile(prod_card);
	var dict = $.csv2Dictionary(d);
	var data = {production:[]};
	var img = 'static/img/placeholder.png';

	for (var i = dict.length - 1; i >= 0; i--)
	{
		if(dict[i].name !== "" && dict[i].name !== "Total")
		{
			for (var j = parseInt(dict[i].quantity,10) - 1; j >= 0; j--)
			{
				data.production.push({title: dict[i].name, description: dict[i].description, points: dict[i].point_value});
				//log(dict[i], data.cards[data.cards.length-1]);
			}
		}
	}
	
	$('#production_cards').html(template(data));
}

function onActionCSVLoaded(d)
{
	//log('onActionCSVLoaded', d);
	var template = Handlebars.compile(action_card);
	var dict = $.csv2Dictionary(d);
	var data = {actions:[]};
	var img = 'static/img/placeholder.png';
	log('onActionCSVLoaded', dict);
	for (var i = dict.length - 1; i >= 0; i--)
	{
		if(dict[i].name !== "" && dict[i].name !== "Total")
		{
			for (var j = parseInt(dict[i].quantity,10) - 1; j >= 0; j--)
			{
				data.actions.push({title: dict[i].name, image: img, description: dict[i].description});
				//log(dict[i], data.cards[data.cards.length-1]);
			}
		}
	}

	$('#action_cards').html(template(data));
}

function renderCard(dict, card_type)
{
	// TODO: add 'default' behavior that will draw a different kind of card in another list
	// I'm thinking this will be useful for rule cards, credits, etc.
	switch(card_type)
	{
		case 'PRODUCTION':
			$('#production_cards').html(template(data));
		break;

		case 'ACTION':
			$('#action_cards').html(template(data));
		break;
	}
}
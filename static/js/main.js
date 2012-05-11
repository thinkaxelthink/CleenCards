var productionCardTemplate,actionCardTemplate,cardTemplate;
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
		cardTemplate = Handlebars.compile('{{#each actions}}<li><h2>{{title}}</h2><p>{{description}}</p></li>{{/each}}');
		productionCardTemplate = Handlebars.compile('{{#each production}}<li><div class="points">{{points}}</div><h2>{{title}}</h2>{{#if image}}<img src="{{image}}" width="150" height="150" />{{/if}}{{#if description}}<p>{{description}}</p>{{/if}}{{#if turns}}<div class="turns">Turns: {{turns}}</div>{{/if}}{{#if sheep_cost}}<div class="cost">Sheep cost: {{sheep_cost}}</div>{{/if}}</li>{{/each}}');
		actionCardTemplate = Handlebars.compile('{{#each actions}}<li><h2>{{title}}</h2><img src="{{image}}" width="150" height="150" /><p>{{description}}</p></li>{{/each}}');
		$.get('static/csv/ProductionCards.csv', onProductionCSVLoaded);
		$.get('static/csv/ActionsCards.csv', onActionCSVLoaded);
}

function onProductionCSVLoaded(d)
{
	var dict = $.csv2Dictionary(d);
	var data = {production:[]};
	var img = 'static/img/placeholder.png';

	for (var i = dict.length - 1; i >= 0; i--)
	{
		if(dict[i].name !== "" && dict[i].name !== "Total")
		{
			for (var j = parseInt(dict[i].quantity,10) - 1; j >= 0; j--)
			{
				var item = {title: dict[i].name,
					points: dict[i].point_value};

				if(dict[i].description !== '') { item.description = dict[i].description; }
				if(parseInt(dict[i].turn_requirements,10) > 0) { item.turns = dict[i].turn_requirements; }
				if(parseInt(dict[i].sheep_requirements,10) > 0) { item.sheep_cost = dict[i].sheep_requirements; }
				data.production.push(item);
			}
		}
	}
	renderCard(data, 'PRODUCTION');
}

function onActionCSVLoaded(d)
{
	//log('onActionCSVLoaded', d);
	var dict = $.csv2Dictionary(d);
	var data = {actions:[]};
	
	log('onActionCSVLoaded', dict);
	for (var i = dict.length - 1; i >= 0; i--)
	{
		if(dict[i].name !== "" && dict[i].name !== "Total")
		{
			for (var j = parseInt(dict[i].quantity,10) - 1; j >= 0; j--)
			{
				data.actions.push({title: dict[i].name, 
					image: dict[i].image, 
					description: dict[i].description});
			}
		}
	}
	renderCard(data, 'ACTION');
}

function renderCard(dict, card_type)
{
	// TODO: add 'default' behavior that will draw a different kind of card in another list
	// I'm thinking this will be useful for rule cards, credits, etc.
	switch(card_type)
	{
		case 'PRODUCTION':
			$('#production_cards').html(productionCardTemplate(dict));
		break;

		case 'ACTION':
			$('#action_cards').html(actionCardTemplate(dict));
		break;
	}
}
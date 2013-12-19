App.VerbChartComponent = Ember.Component.extend({
	persons: function() {
		var code = this.get('code');
		var forms = this.get('forms');

		var mood_code = this.get('code')[0];
		var voice_code = this.get('code')[1];
		var number_code = this.get('code')[2];

		var persons = App.persons.map(function(person) {
			return App.tenses.map(function(tense) {
				if(typeof forms['V-' + person.code + tense.code + voice_code + mood_code + '-' + number_code + '--'] !== 'undefined') {
					return {
						raw: forms['V-' + person.code + tense.code + voice_code + mood_code + '-' + number_code + '--'][0][1],
						frequency: forms['V-' + person.code + tense.code + voice_code + mood_code + '-' + number_code + '--'].length
					}
				} else {
					return {};
				}
			});
		});

		// console.log('persons',persons);

		return persons;

		// // {{wordData.forms['V-' + person.code + tense.code + voice.code + mood.code + '-' + number.code + '--'][0][1]}}
	}.property('code','forms')
});
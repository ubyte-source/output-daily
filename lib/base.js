(function (window) {

	'use strict';

	class Dictionary {

		static power() {
			return 'potenza';
		}
		static daily() {
			return 'curva di carico del giorno';
		}
	}

	class Um {

		static power() {
			return 'kW';
		}
	}

	class Color {

		static power() {
			return '#c9302c';
		}
	}


	class Daily {

		static format() {
			return 'dddd DD MMMM YYYY';
		}

		static template() {
			return {
				chart: {
					type: 'line',
					animation: false
				},
				plotOptions: {
					series: {
						animation: false
					}
				},
				credits: {
					enabled: false
				},
				title: {
					text: null
				},
				subtitle: {
					text: null
				},
				yAxis: {
					title: {
						text: window.Daily.Dictionary.power(),
						style: {
							color: window.Daily.Color.power()
						}
					},
					showEmpty: false,
					labels: {
						style: {
							color: window.Daily.Color.power()
						},
						formatter: function () {
							let value = this.value / 1e3;
							return value.toString() + String.fromCharCode(32) + window.Daily.Um.power();
						},
					},
				},
				xAxis: {
					type: 'datetime'
				},
				series: []
			};
		}

		constructor(registered) {
			this.registered = registered;
			this.elements = {};
		}

		getRegistered() {
			return this.registered;
		}
		setDate(unix) {
			let date = this.getDate(),
				moment = window.Daily.Dictionary.daily() + String.fromCharCode(32) + window.moment.unix(unix).utc().format(this.constructor.format()),
				node = document.createTextNode(moment);

			date.innerText = '';
			date.appendChild(node);

			return this;
		}
		getDate() {
			if (this.elements.hasOwnProperty('date')) return this.elements.date;
			this.elements.date = document.createElement('h3');
			this.elements.date.className = 'date';
			return this.elements.date;
		}
		getWrapper() {
			if (this.elements.hasOwnProperty('p')) return this.elements.p;
			let figure = this.getFigure(),
				date = this.getDate();

			this.elements.p = document.createElement('p');
			this.elements.p.className = 'daily';
			this.elements.p.appendChild(date);
			this.elements.p.appendChild(figure);

			return this.elements.p;
		}
		getFigure() {
			if (this.elements.hasOwnProperty('figure')) return this.elements.figure;
			this.elements.figure = document.createElement('figure');
			this.elements.figure.className = 'highcharts-figure';
			return this.elements.figure;
		}
		getConfiguration() {
			let configuration = this.constructor.template(),
				registered = this.getRegistered();

			configuration.series = [];
			configuration.series.push({
				name: window.Daily.Dictionary.power(),
				data: registered
			});
			return configuration;
		}
		render() {
			let figure = this.getFigure(),
				configuration = this.getConfiguration();

			Highcharts.chart(figure, configuration);
			return this;
		}
		out() {
			return this.getWrapper();
		}
	}

	window.Daily = Daily;
	window.Daily.Um = Um;
	window.Daily.Color = Color;
	window.Daily.Dictionary = Dictionary;

})(window);
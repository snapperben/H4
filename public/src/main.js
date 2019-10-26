/**

 */
"use strict";
//import ballController from '/src/BallController.js'
window.addEventListener('load', (event) => {
	Vue.component('h4-parameter', {
	  methods: {
		  canvasClick: function (_event) {
		  	this.$root.ballController.canvasClick(_event)
		  }
	  },
	  template: '<div></div>',
		props:{

		}
	});
	Vue.component('h4-canvas', {
	  methods: {
		  canvasClick: function (_event) {
		  	this.$root.ballController.canvasClick(_event)
		  }
	  },
	  template: '<canvas id="h4-canvas" v-on:click="canvasClick($event)" width="800px" height="500px"></canvas>'
	});
	var vueData = {
		el: '#app',
		data: {message: 'Hello H4'},
		mounted: function () {
			import('/src/BallController.js').then(function (_module) {
				this.ballController = _module.default
				this.ballController.setup(document.getElementById('h4-canvas'))
			}.bind(this))
		}
	};
	var app = new Vue(vueData);
});


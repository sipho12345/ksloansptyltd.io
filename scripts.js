$(function() {

	var Calc = function(options) {
		$.extend(this, options, {
			currency: '',
			days: 34
		});
		this.cache();
		this.variables();
		this.bind();

		return this;
	};

	var Calc1 = function(options) {
		$.extend(this, options, {
			currency: '',
			amount: 5000
		});
		this.cache();
		this.variables();
		this.bind();

		return this;
	};


	$.extend(Calc.prototype, {
		cache: function() {
			this.$convertDollar = $('.convert-dollar');
			this.$convertEuro = $('.convert-euro');
			this.$amount = $('#amount');
			this.$initamount = $('.initamount');
			this.$slider = $('.slider');
			this.$slider2 = $('.slider2');
			this.$rangeValue = $('.rangevalue');
			this.$rangeValue2 = $('.rangevalue2');
			this.$credit = $('.credit');
			this.$percent = $('#percent');
			this.$pay = $('.pay');
			this.$monthPay = $('.month-pay');
			this.$results = $('.results');
			this.$validate = $('.validate');
			this.$fees = $('.fees');
			this.$interest = $('.interest');
			this.$intfees = $('.intfees');
			this.$currentDate = $('.currentDate');
			this.$futureDate = $('.futureDate');

		},
		variables: function(){
			this.usdUrl = "http://www.freecurrencyconverterapi.com/api/v3/convert?q=RUB_USD&compact=y";
			this.eurUrl = "http://www.freecurrencyconverterapi.com/api/v3/convert?q=RUB_EUR&compact=y";
			this.numberPat = /[0-9]+([\.|,][0-9]+)?/;
			this.emailPat = /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
		},
		bind: function() {
			this.$results.hide();
			this.getDate();
			this.getAmount();
			this.validate();

			this.$slider.on('input', $.proxy(this.getDate, this));
			this.$slider2.on('input', $.proxy(this.getAmount, this));
			this.$credit.on('submit', $.proxy(this.calculate, this));
			console.log(this.currency);

			this.$validate.on('blur', this.rty);
		},

		getCurrencies: function(){
			var $loader = $('.spinner'),
				$convertDollar = $('.convert-dollar'),
				$convertEuro = $('.convert-euro')


			$.ajax({
				type: "GET",
				url: this.usdUrl,
				dataType: "jsonp",
				cache: true,
				beforeSend: function(){
					$loader.removeClass('hide');
				},
				success: function(data) {
					console.log(data.RUB_USD.val);
					$convertDollar.text('$ '+ ($slider2.val() * data.RUB_USD.val).toFixed(2));
					$loader.addClass('hide');
				},
				error: function(){
					$convertDollar.text('error');
				}
			});
			$.ajax({
				type: "GET",
				url: this.eurUrl,
				dataType: "jsonp",
				cache: true,
				beforeSend: function(){
					$loader.removeClass('hide');
				},
				success: function(data) {
					console.log(data.RUB_EUR.val);
					$convertEuro.text('€ '+ ($slider2.val() * data.RUB_EUR.val).toFixed(2));
					$loader.addClass('hide');
				},
				error: function(){
					$convertDollar.text('error');
				}
			});
		},
		getDate: function(){
			this.$slider.attr('max', this.days);

			this.$rangeValue.text(this.$slider.val());
		},

		getAmount: function(){
			this.$slider2.attr('max', this.amount);
			this.$rangeValue2.text(this.$slider2.val());
		},

		calculate: function(event){
			event.preventDefault();

			if(this.$slider2.val()<1001){
				var payment = (+this.$slider2.val() * ((0.0018*this.$slider.val())) / 100)+ +this.$slider2.val()+(this.$slider2.val())*0.165+50;
				console.log(payment);


			this.$results.fadeIn();
			this.$initamount.text(this.$slider2.val());
			this.$pay.text(payment.toFixed(2) + this.currency);
			this.$monthPay.text( (payment / this.$slider.val()).toFixed(2) + this.currency);
			this.$fees.text((this.$slider2.val())*0.165);
			this.$interest.text((this.$slider2.val()*0.0018*this.$slider.val()).toFixed(2));


			var Cdate = new Date();
			Cdate.setDate(Cdate.getDate());
            console.log(Cdate);
			this.$currentDate.text(Cdate);


			var dayi = this.$slider.val();
			var date = new Date();
			date.setDate(date.getDate().valueOf()+ +dayi);
            console.log(date);
			this.$futureDate.text(date);
			}
			else
			{
				var payment = (+this.$slider2.val() * ((0.0018*this.$slider.val())) / 100)+ +this.$slider2.val()+(this.$slider2.val())*0.10+50;
			console.log(payment);


			this.$results.fadeIn();
			this.$initamount.text(this.$slider2.val());
			this.$pay.text(payment.toFixed(2) + this.currency);
			this.$monthPay.text( (payment / this.$slider.val()).toFixed(2) + this.currency);
			this.$fees.text((this.$slider2.val())*0.10);
			this.$interest.text((this.$slider2.val()*0.0018*this.$slider.val()).toFixed(2));


			var Cdate = new Date();
			Cdate.setDate(Cdate.getDate());
            console.log(Cdate);
			this.$currentDate.text(Cdate);


			var dayi = this.$slider.val();
			var date = new Date();

			date.setDate(date.getDate().valueOf()+ +dayi);
            console.log(date);
			this.$futureDate.text(date);
			}


var xValues = ["Service fees", "Initial fees", "Interest", "Principal Amount"];
var yValues = [50, this.$slider2.val()*0.165, (this.$slider2.val()*0.0018*this.$slider.val()).toFixed(2),this.$slider2.val()];
var barColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#1e7145"
];

new Chart("myChart", {
  type: "doughnut",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "Interest and fees breakdown"
    }
  }
});
		},
		validate: function(){
			var inputEmail = this.emailPat,
			inputPassword = this.passwordPat;

			$('.validate').on('keyup', function(){
				var inputType = $(this).attr('type'),
					$self = $(this);

				switch (inputType) {

					case 'email':
				        if($self.val().match(inputEmail)){
							$self.closest('.form-group').removeClass('has-error').addClass('has-success');
							console.log('email yes');
						}else{
							$self.closest('.form-group').addClass('has-error').removeClass('has-success');
							console.log('email no');
						}
				        break;

				    case 'password':
						if($self.val().match(inputPassword)){
							$self.closest('.form-group').removeClass('has-error').addClass('has-success');
							console.log('password yes');
						}else{
							$self.closest('.form-group').addClass('has-error').removeClass('has-success');
							console.log('password no');
						}
				        break;
				}
			});
		}
	});
	window.Calc = Calc;
	window.Calc1 = Calc1;
});



$(function() {
	var app = new Calc({days: 34});
	var app2 = new Calc({amount: 5000})

});

var siteWidth = 1280;
var scale = screen.width /siteWidth;

document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+scale+'');














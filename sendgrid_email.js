/* *********************************************************************** *
	Main module for sending emails.
	The rest of the application uses this module 
	to sent emails when it needs to.
 * *********************************************************************** */

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var helper = require('sendgrid').mail;

var StorageProvider = require('../models/storageProvider');

var ANTHILL_global_vars = require('../anthill_global_vars');
var anthill_global = ANTHILL_global_vars();

// expose our features directly to our application using module.exports
module.exports = {

	sendWelcomeEmail : function(in_email, user_id){
	    var request = sg.emptyRequest({
	    method: 'POST',
	    path: '/v3/mail/send',
	    body: helper.Mail(helper.Email('hello@theanthill.io'), 
	      'Welcome to anthill', 
	      helper.Email(in_email), 
	      helper.Content('text/html', 
	          '<h2>You\'re now part of the anthill community</h2>'+
			  'You have taken your first steps to finding great services from the anthill network<br>\n\n'+
			  'To get you <strong>Bonus Tokens</strong> please click the account activation link below!<br><br>\n\n'+
			  '<a href="https://app.theanthill.io/account/activate/'+user_id+'">Activate Account and receive Bonus Tokens!</a>\n\n'+
			  '<strong>https://app.theanthill.io/account/activate/'+user_id+'<strong>\n\n'+
			  '<table></table>'+
	          '\n\n' +
	          '<h3>&nbsp;-&nbsp;anthill team</h3>')
	      ).toJSON(),
	  });
	  //With callback
	  sg.API(request, function(error, response) {
		if (error) {
	      console.log('Error response received');
		}
		console.log("Sendgrid status: "+response.statusCode);
	    //   console.log(response.statusCode)
	    //   console.log(response.body)
	    //   console.log(response.headers)
	      //req.flash('error', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
	      // done(error, 'done');
	  });
	},

	sendAlertEmail : function(in_email, in_message, in_from_user, in_url, in_title){
		  var request = sg.emptyRequest({
		  method: 'POST',
		  path: '/v3/mail/send',
		  body: helper.Mail(helper.Email('hello@theanthill.io'), 
		    'A user has sent you a message', 
		    helper.Email(in_email), 
		    helper.Content('text/html', 
		        '<h2>You have been sent a new message</h2><br>\n\n'+
		        '<strong>A user ('+in_from_user+') has sent you the follwing message:</strong><br>\n\n'+
		        '<pre>'+in_message+'</pre><br>\n\n'+
		        'The message was left for you on the following page '+
		        '<a href="'+in_url+'">'+in_title+'</a>. Reply by going to the page linked, only reply to this email to alert the support team!<br>\n\n' +
		        'If there is any problems with this message - please contact us at hello@theanthill.io and we will investigate.<br>\n\n'+
				'<h3>&nbsp;-&nbsp;anthill team</h3>')
		        
		    ).toJSON()
		});
		//With callback
		sg.API(request, function(error, response) {
		    if (error) {
		    console.log('Error response received');
		    }
		    console.log(response.statusCode)
		    console.log(response.body)
		    console.log(response.headers)
		    //req.flash('error', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
		    // done(error, 'done');
		});
	},

	sendReportEmail : function( from, about, more_info ){
		  var request = sg.emptyRequest({
		  method: 'POST',
		  path: '/v3/mail/send',
		  body: helper.Mail(helper.Email('hello@theanthill.io'), 
		    'REPORT SUBMITTED - ANTHILL', 
		    helper.Email("hello@theanthill.io"), 
		    helper.Content('text/html', 
		        '<h2>A user has made a complaint</h2><br>\n\n'+
		        '<strong>A user ('+from.nickname+') has sent you the follwing message:</strong><br>\n\n'+
		        '<h3>From:</h3>'+
		        '<pre>'+JSON.stringify(from)+'</pre><br>\n\n'+		        
		        '<h3>About:</h3>'+
		        '<pre>'+JSON.stringify(about)+'</pre><br>\n\n'+
		        '<h3>More:</h3>'+
		        '<pre>'+JSON.stringify(more_info)+'</pre><br>\n\n'+		        
		        '<h3>&nbsp;-&nbsp;anthill team</h3>')
		    ).toJSON()
		});
		//With callback
		sg.API(request, function(error, response) {
		    if (error) {
		    console.log('Error response received');
		    }
		    console.log(response.statusCode);
		    console.log(response.body);
		    console.log(response.headers);
		    //req.flash('error', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
		    // done(error, 'done');
		});
	},
};

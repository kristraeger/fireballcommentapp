// set a reference to link data to database using a personalized link
var myDataRef = new Firebase('https://mos6j75jk6a.firebaseio-demo.com/')

// send chat to data base
$('#messageInput').keypress(function (e) {

	// if user hits enter key
	if (e.keyCode == 13) {
	
		// grab value from name input field
	  	var name = $('#nameInput').val()
	  	// grab value from text input field
	  	var text = $('#messageInput').val()

	  	//check if user entered value
	  	if (text.length === 0) {
                alert('Comments are required to continue!');
            } else {

	  	// call set() on data reference to write data to data base 
	  	// myDataRef.set('User ' + name + ' says ' + text)

	  	// or use set() on a data reference to write an object. 
	  	// When objects are written to the database, the structure of the object is mapped to database locations. 
	  	// In this example, when the object {name: name, text: text} is set, locations for name and text are automatically 
	  	// created as children of the location referenced by myDataRef.
	  	// myDataRef.set({name: name, text: text})

	  	// if you want to store a list of data instead of just one, use push()

	 		myDataRef.push({name: name, text: text}, function(error) {
                if (error !== null) {
                    alert('Unable to push comments to Firebase!')
                }
	  		})

	  		// clear message input field
	  		$('#messageInput').val('')
	  	}
	  	return false
	}
})

// us on () as callback to notify user when new chat message arrives at data base
myDataRef.on('child_added', function(snapshot) {

	 // extract message data from the snapshot
	  var message = snapshot.val() 
	  console.log(typeof(message.name))

	 if (typeof(message.name) !== "undefined") {
	  // display messages on the page
	  displayChatMessage(message.name, message.text)
	 }
})

function displayChatMessage(name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'))
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
}





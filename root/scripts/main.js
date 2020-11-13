/*
* Author: Hendrik Braasch
* File: main.js
* Description: Contains all javascript code required for the app
*/
    var vm = new Vue({
        el:'#app',
        data: {
			users: [],
			messages: [],
			details: [],
			tableHeading: "Users",
			isMessageSelected: false,
			isMessageReady: false,
			selectedUser: null
		},
		methods:{
			//fetches all users
			getUsers: function(){
				var url = "http://jsonplaceholder.typicode.com/users";
				fetch(url)
				.then(r=>r.json())
				.then(json => {
					this.users = json;
				})
			},
			//fetches messages of a specific user
			getMessages: function(userId){
				//hide message details
				this.isMessageSelected = false;

				var url = 'http://jsonplaceholder.typicode.com/users/' + userId + '/posts?_limit=10';
				fetch(url)
            	.then(r=>r.json())
            	.then(json => {
					this.messages = json;
				})
				//get the name of the selected user
				for(i = 0; i < this.users.length; ++i){
					if(this.users[i].id == userId)
					{
						this.selectedUser = this.users[i].name;
						break;
					}
				}
				//show list of messages
				this.isMessageReady = true;
			},
			//fetches message details
			getMessageDetail: function(msgId){
				var url = 'http://jsonplaceholder.typicode.com/posts/' + msgId;
				fetch(url)
				.then(r=>r.json())
				.then(json => {
					this.details = json;
				})
				//show message details
				this.isMessageSelected = true;	
			},
			setSelectedUser: function(username){
				this.selectedUser = username;
			}
		},
        created: function() {
			this.getUsers();
		},
	})
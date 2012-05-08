/* 
		      _____                    _____          
	         /\    \                  /\    \         
	        /::\    \                /::\    \        
	       /::::\    \              /::::\    \       
	      /::::::\    \            /::::::\    \      
	     /:::/\:::\    \          /:::/\:::\    \     
	    /:::/__\:::\    \        /:::/__\:::\    \    
	    \:::\   \:::\    \      /::::\   \:::\    \   
	  ___\:::\   \:::\    \    /::::::\   \:::\    \  
	 /\   \:::\   \:::\    \  /:::/\:::\   \:::\ ___\ 
	/::\   \:::\   \:::\____\/:::/__\:::\   \:::|    |
	\:::\   \:::\   \::/    /\:::\   \:::\  /:::|____|
	 \:::\   \:::\   \/____/  \:::\   \:::\/:::/    / 
	  \:::\   \:::\    \       \:::\   \::::::/    /  
	   \:::\   \:::\____\       \:::\   \::::/    /   
	    \:::\  /:::/    /        \:::\  /:::/    /    
	     \:::\/:::/    /          \:::\/:::/    /     
	      \::::::/    /            \::::::/    /      
	       \::::/    /              \::::/    /       
	        \::/    /                \::/____/        
	         \/____/                  ~~              
			         Socialbomb, inc.
		         Since naughtical times
		         
				Author: Axel Esquite
				Date: Weds October 19, 2011
*/

define(function(){
	
	function sub(channel, fn)
	{
		if (!this.channels[channel]) this.channels[channel] = [];
        this.channels[channel].push({ context: this, callback: fn });
        return this;
	}

	function pub(channel)
	{
		if (!this.channels[channel]) return false;
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
	}

	return {
		channels: {},
		publish: pub,
		subscribe: sub, 
		installTo: function(o){
			o.subscribe = subscribe;
			o.publish   = publish;
		}
	};

});
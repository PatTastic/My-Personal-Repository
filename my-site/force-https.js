(function(){
	if(window.location.protocol == 'http:'){
    	window.location.href = 'https' + window.location.href.substr(4);
    }
})();

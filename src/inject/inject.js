var $removePaywall = function(){
	/*
	 * afr: .paywall-panel
	 * the age: .article-counter, .subscription-overlay
	 * */
	$(".paywall-panel, .article-counter, .subscription-overlay").remove();
	var $nodes = $(".scriptable.has-paywall .outer-wrap, .outer-wrap");
	$nodes.show();
	$nodes.css( "display", "block !important");
	$('body').css( "overflow", "visible !important");
	$(".article__content *").each(function(){$(this).is('[style*="color"]')&&"rgb(255, 255, 255)"==$(this).css("color")&&$(this).css("color","black")});
	
	var tealditReferrer = tealditReferrer || undefined;
	if(tealditReferrer == undefined){
		// insert share article toolbar
		inject('//www.tealdit.com/toolbar/v1.js', true);
	}

	return true;
};

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		//console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
		$removePaywall();
	}
	}, 100);
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
		$removePaywall();
    }
  }
);

//var firstHref = $("a[href^='http']").eq(0).attr("href");
//console.log(firstHref);
var injected = [];
function inject(url, exteral) {
	if(injected.indexOf(window.top.location.href) < 0){
		if (!external){
		   url = chrome.extension.getURL(url);
		}
		var scriptElement = document.createElement('script');
		scriptElement.src = url;
		(document.body || document.head || document.documentElement).appendChild(scriptElement);
		
		injected.push(window.top.location.href);
	}
}

console.log("-----initiator loaded");
var scrl = new Scroll({
	elemId:"postingHtmlBox", 
//	statusElemId: "footer",
	id: "scroll", //default
	locale: "en-US",
	//, saveFunction: function(){} //custom save function, default is saved to localStorage
	loadFunction: function(editor){
            //load existing HTML from normal HTML container element
	} //custom load function, default is loaded from localStorage on page load
});

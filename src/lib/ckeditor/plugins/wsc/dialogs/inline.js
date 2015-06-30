function gup( name )
{
	name = name.replace( /[\[]/, '\\\[' ).replace( /[\]]/, '\\\]' ) ;
	var regexS = '[\\?&]' + name + '=([^&#]*)' ;
	var regex = new RegExp( regexS ) ;
	var results = regex.exec( window.location.href ) ;

	if ( results )
		return results[ 1 ] ;
	else
		return '' ;
}

var interval;

function sendData2Master()
{
	console.log("----sendData2Master");
	var destination = window.parent.parent ;
	try
	{
		if ( destination.XDTMaster )
		{
			var t = destination.XDTMaster.read( [ gup( 'cmd' ), gup( 'data' ) ] ) ;
			window.clearInterval( interval ) ;
		}
	}
	catch (e) {}
}

function OnMessage (event) {
	        var message = event.data;
	        var destination = window.parent.parent;
	        destination.XDTMaster.read( [ 'end', message, 'fpm' ] ) ;
}

function listenPostMessage() {
    window.addEventListener ("message", OnMessage, false);
}

function onLoad()
{
	interval = window.setInterval( sendData2Master, 100 );
	listenPostMessage();
}
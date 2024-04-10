$(function () {
    var syncClient;
    var syncStream;
    var message = document.getElementById('message');
    var text_area = document.getElementById('text_area');
    var select_element = document.getElementById('select')
    var background_color;


    $.getJSON('/token', function(tokenResponse) {
        syncClient = new Twilio.Sync.Client(tokenResponse.token, { logLevel: 'info' });

        // create the stream object
        syncClient.stream('messageData').then(function(stream) {
            syncStream = stream;
            // listen update and sync drawing data
            syncStream.on('messagePublished', function(event) {
                console.log('syncStream:',event.message.value);
                syncDrawingData(event.message.value);


            });
        });
    });
    
    function syncDrawingData(data) {

        console.log(data)
        document.getElementById('text_area').value = data.textarea_value

        if (data.textarea_color == 'white'){
        document.getElementById("text_area").style.backgroundColor = "white"
        }
        if (data.textarea_color == 'red'){
        document.getElementById("text_area").style.backgroundColor = "red"
        }
        if (data.textarea_color == 'yellow'){
        document.getElementById("text_area").style.backgroundColor = "yellow"
        }
        if (data.textarea_color == 'green'){
        document.getElementById("text_area").style.backgroundColor = "green"
        }

    }


    function messageSync()
{
	text = document.getElementById("text_area").value;

    setTimeout(function(){
        SettingSyncData()
        },
        1700);

}

    function SettingSyncData(){
    syncStream.publishMessage({ 
            textarea_color:background_color,
            textarea_value:text
        });
    }
    
    function select_color(){
     selected_color = document.getElementById("select").value

     if (selected_color == 'white'){
      background_color = 'white'
     }
     if (selected_color == 'red'){
      background_color = 'red'
     }
     if (selected_color == 'yellow'){
      background_color = 'yellow'
     }
     if (selected_color == 'green'){
      background_color = 'green'
     }

    }

    text_area.addEventListener("keyup", messageSync) 
    select_element.addEventListener('change',select_color)

});

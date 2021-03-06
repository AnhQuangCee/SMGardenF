//Processbar
//Template
var bar = new ProgressBar.Circle(template, {
  color: '#FF7043',
  strokeWidth: 4,
  trailWidth: 1,
  easing: 'easeInOut',
  duration: 1400,
  text: {
    autoStyleContainer: false
  },
  from: { color: '#FF7043', width: 4 },
  to: { color: '#FF7043', width: 4 },
  step: function(state, circle) {
    circle.path.setAttribute('stroke', state.color);
    circle.path.setAttribute('stroke-width', state.width);

    var value = Math.round(circle.value() * 100);
    if (value === 0) {
      circle.setText('');
    } else {
      circle.setText(value);
    }
  }
});
bar.text.style.fontFamily = '"Lato", sans-serif';
bar.text.style.fontSize = '50px';

//Humidity
var bar1 = new ProgressBar.Circle(humidity, {
  color: '#0277BD',
  strokeWidth: 4,
  trailWidth: 1,
  easing: 'easeInOut',
  duration: 1400,
  text: {
    autoStyleContainer: false
  },
  from: { color: '#0277BD', width: 4 },
  to: { color: '#0277BD', width: 4 },
  step: function(state, circle) {
    circle.path.setAttribute('stroke', state.color);
    circle.path.setAttribute('stroke-width', state.width);

    var value = Math.round(circle.value() * 100);
    if (value === 0) {
      circle.setText('');
    } else {
      circle.setText(value);
    }

  }
});
bar1.text.style.fontFamily = '"Lato", sans-serif';
bar1.text.style.fontSize = '50px';


//Socket
var socket = io("http://localhost:3000");
socket.on("Server-send-data",function(data){
  // socket.emit("client-send-data",{ my: 'data' });
  bar.animate((data.temperature)/100);  // Number from 0.0 to 1.0
  bar1.animate((data.humidity)/100);  // Number from 0.0 to 1.0  

  //Light
  if(data.light == 1){
    document.getElementById("light").innerHTML = "Sunny";
  }
  else if(data.light == 0){
    document.getElementById("light").innerHTML = "Rain";    
  }
  //Soil Moisture
  document.getElementById("soil1").innerHTML = data.SoilMoisture1;
  document.getElementById("soil2").innerHTML = data.SoilMoisture2;
});

// Event script
// Socket.io: Website => Socket server => NodeMcu
//Pump water
var pump = document.querySelector('.pump');
var pump2 = document.querySelector('.pump2');

var pumpJson = {
    "pumpOn": 1,
}
var pumpJson2 = {
    "pumpOff": 2,
}

var pumpJsonB = {
  "pumpOnB": 1,
}
var pumpJson2B = {
  "pumpOffB": 2,
}

//Pump khay A
$(function() {
  $('#toggle-event').change(function() {
    $('#console-event').html('Toggle: ' + $(this).prop('checked'));
    if( $(this).prop('checked') == true){
      socket.emit("PumpOn-send-sever-data", pumpJson);
    } else{
      socket.emit("PumpOff-send-sever-data", pumpJson2);
    };
  })
})
//Pump Khay B
$(function() {
  $('#toggle-event2').change(function() {
    $('#console-event').html('Toggle: ' + $(this).prop('checked'));
    if( $(this).prop('checked') == true){
      socket.emit("PumpOnB-send-sever-data", pumpJsonB);
    } else{
      socket.emit("PumpOffB-send-sever-data", pumpJson2B);
    };
  })
})

//DateTimePicker 
$( document ).ready(function() {
  $('.date-time').datetimepicker();
});
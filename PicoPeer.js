function pico8_gpio_set(index){
    if (index<64){
        SendData(index);
    }
}
var peer = new Peer();
var connin = null;
var connout = null;
var newID;
var stdout = document.getElementById("demo");
var Status = document.getElementById("status");
peer.on('open', function(id) {
    newID = id;
    document.getElementById("peerID").innerHTML = "My peer ID is:"+newID;
});
function TryConnect() {
    var connectID = document.getElementById("myText").value;
    connout = peer.connect(connectID);
}
function SendData(index){
    if (connout){
        connout.send({arg1:dummy_gpio[index],arg2:index});
    }
}
peer.on('connection',function(connin){
    console.log("on connection");
    connected = true
    if (connout==null){
        connout = peer.connect(connin.peer)
    }
    Status.innerHTML = "Connected to: "+connin.peer;
})
peer.on('connection', function (c) {
    connin = c;
    console.log("Connected to: " + connin.peer);
    connin.on('data', function (data){
        //console.log("data recived",data.arg1,data.arg2);
        pinIndex = Number(data.arg2)
        //stdout.innerHTML = "data recived: "+data.arg1;
        dummy_gpio[64+pinIndex] = data.arg1;
    });
});
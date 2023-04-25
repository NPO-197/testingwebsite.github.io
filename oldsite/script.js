
var peer = new Peer();
var connin = null;
var connout = null
var newID;
var stdout = document.getElementById("demo");
var Status = document.getElementById("status");
peer.on('open', function(id) {
    newID = id;
    var x = document.createTextNode('My peer ID is: '+ newID);
    document.body.appendChild(x);
});
function TryConnect() {
    var connectID = document.getElementById("myText").value;
    connout = peer.connect(connectID);
}
function SendHello(){
    if (connout){
        console.log("sending");
        connout.send(document.getElementById("myText").value);
    }
}


peer.on('connection',function(connin){
    console.log("on connection");
    Status.innerHTML = "Connected to: "+connin.peer
})
peer.on('connection', function (c) {
    connin = c;
    console.log("Connected to: " + connin.peer);
    connin.on('data', function (data){
        console.log("data recived",data);
        stdout.innerHTML = "data recived: "+data;
    });
});
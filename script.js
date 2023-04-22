
var peer = new Peer();
var conn;
var newID;
peer.on('open', function(id) {
    newID = id;
    var x = document.createTextNode('My peer ID is: '+ newID);
    document.body.appendChild(x);
});
function myFunction() {
    var connectID = document.getElementById("myText").value;
    conn = peer.connect(connectID);
}
peer.on('connection',function(conn){
    document.getElementById("demo").innerHTML = 'Connected to:'+conn.peer;
})

// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Olympics/api/Athletes/');
    self.records = ko.observableArray([]);
    self.athletes = function(){
        if (self.records().length < 48){
            let sebastiao = Math.floor(Math.random() * 135000) + 1;
            $.ajax({
                url:self.baseUri() + sebastiao,
                type: 'GET',
                timeout: 15000, 
                success:function(data){
                if (data["Photo"] != null){
                    self.records.push(data)
                    self.athletes();
                }}
            
            })}
    }
    self.getrecords = function(){
        return self.records()
    }
}

var jsp = new vm()
$().ready(function(){
    jsp.athletes()
    ko.applyBindings(jsp)
})
function martim(){
    return jsp.getrecords()
} 

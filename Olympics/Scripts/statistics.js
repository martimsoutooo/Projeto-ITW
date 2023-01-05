var CounterMds = [];
var NameMds = [];

                $.ajax({
                type: 'GET',
                url: 'http://192.168.160.58/Olympics/api/Statistics/Games_Modalities',
                headers: {
                'Content-Type': 'application/json'
                },
                success: function (data, status, xhr) {

                    var mdsData = data;

                    mdsData.forEach(element => {
                    CounterMds.push(element.Counter);
                    NameMds.push(element.Name);
                    });

                    createBarGraph(CounterMds, NameMds);

                    }
                });

                function createBarGraph(Counter, Name) {
                let barChartz = new Chart("modalidades", {
                    type: "bar",
                    data: {
                        labels: NameMds,
                        datasets: [{
                        data: CounterMds,
                        label: 'Number of Modalities per Olympic Games edition',
                        backgroundColor: ['rgba(250, 138, 52, 0.4)','rgba(52, 230, 250, 0.4)',],
                        borderColor: ['rgba(250, 131, 40, 0.6)','rgba(54, 162, 235, 0.6)',],
                        borderWidth: 1
                    }]
                    },
                    options:{
                        animations: {
                        tension: {
                            duration: 1000,
                            easing: 'linear',
                            from: 1,
                            to: 0,
                            loop: true
                        }
                        },
                }
                });
                }

var CounterAth = [];
var NameAth = [];

                $.ajax({
                type: 'GET',
                url: 'http://192.168.160.58/Olympics/api/Statistics/Games_Athletes',
                headers: {
                'Content-Type': 'application/json'
                },
                success: function (data, status, xhr) {
                
                    var athData = data;
                
                    athData.forEach(element => {
                    CounterAth.push(element.Counter);
                    NameAth.push(element.Name);
                    });
                
                    createBarGraphs(CounterAth, NameAth);
                
                    }
                });

                function createBarGraphs(Counter, Name) {
                let barChartz = new Chart("atletas", {
                    type: "bar",
                    data: {
                labels: NameAth,
                datasets: [{
                data: CounterAth,
                label: 'Number of Athletes per Olympic Games edition',
                backgroundColor: ['rgba(248, 250, 129)','rgb(154, 250, 151)',],
                borderColor: ['rgb(221, 223, 122)','rgb(148, 240, 145)',],
                borderWidth: 1
                    }]
                    },
                    options:{
                animations: {
                tension: {
                    duration: 1000,
                    easing: 'linear',
                    from: 1,
                    to: 0,
                    loop: true
                }
                },
                }
                });
                }

var CounterCt = [];
var NameCt = [];
                $.ajax({
                type: 'GET',
                url: 'http://192.168.160.58/Olympics/api/Statistics/Games_Countries',
                headers: {
                'Content-Type': 'application/json'
                },
                success: function (data, status, xhr) {
                
                    var ctData = data;
                
                    ctData.forEach(element => {
                    CounterCt.push(element.Counter);
                    NameCt.push(element.Name);
                    });
                
                    createBarGraphss(CounterCt, NameCt);
                
                    }
                });
        
                function createBarGraphss(Counter, Name) {
                let barChartz = new Chart("paises", {
                    type: "bar",
                    data: {
                labels: NameCt,
                datasets: [{
                data: CounterCt,
                label: 'Number of Countries per Olympic Games edition',
                backgroundColor: ['rgb(255, 179, 255)','rgb(165, 178, 238)',],
                borderColor: ['rgb(238, 165, 238)','rgb(148, 160, 212)',],
                borderWidth: 1
                    }]
                    },
                    options:{
                animations: {
                tension: {
                    duration: 1000,
                    easing: 'linear',
                    from: 1,
                    to: 0,
                    loop: true
                }
                },
                }
                });
                }

var countryName = [];
var counterMedG = [];
    $.ajax({
    type: 'GET',
    url: 'http://192.168.160.58/Olympics/api/Statistics/Medals_Country',
    headers: {
    'Content-Type': 'application/json'
    },
    success: function(data){ 
        for(let i=0; i<data.lenght; i++){
            countryName.push(data.CountryName);
            counterMedG.push(data.Medals[0]); 
        }
        createPieGraphs()
    }});
            
    function createPieGraphs() {
    let PieChartz = new Chart("medalsG", {
        type: "pie",
        data: {
        labels: countryName,
        datasets: [{
        data: counterMedG
        }]
        },  
    })
    };




/*var countryName = []
var counterMedG = []
var counterMedS = []
var counterMedB = []

  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
        $.ajax({
            type: 'GET',
            url: 'http://192.168.160.58/Olympics/api/Statistics/Medals_Country',
            success: function(data){ 
                for(let i=0; i<data.lenght; i++){
                    countryName.push(data.CountryName);
                    counterMedG.push(data.Medals[0]); 
                    counterMedS.push(data.Medals[1]);
                    counterMedB.push(data.Medals[2]);
                }
            }

        });
    function pushArrayG(){
        lst= [['Countries', 'Medals']];
        for(let i = 0; i<counterMedG.lenght; i++){
            lst.push([countryName[i],counterMedG[i]])
        }
        return lst
    }
    
  function drawChart() {
    var data = google.visualization.arrayToDataTable(
      pushArrayG()
    )};

            
    var options = {
      title: 'My Daily Activities',
      is3D: true,
    };
            
    var chart = new google.visualization.PieChart(document.getElementById('gold'));
    chart.draw(data, options);*/

    
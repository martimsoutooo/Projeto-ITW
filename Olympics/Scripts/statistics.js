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

  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart); 
  function drawChart() {
        lst= [['Countries', 'Medals']];
        $.ajax({
            type: 'GET',
            url: 'http://192.168.160.58/Olympics/api/Statistics/Medals_Country',
            success: function(data){ 
                var countryName = []
                var counterMedG = []
                console.log(data.length)
                for(let i=0; i<data.length; i++){
                    console.log('oi');
                    countryName.push(data[i].CountryName);
                    counterMedG.push(data[i].Medals[0].Counter); 
                }
                for(let i = 0; i<counterMedG.length; i++){
                lst.push([countryName[i],counterMedG[i]])
                }
                var data1 = google.visualization.arrayToDataTable(lst);    
                var options = {
                    title: 'Gold Medals per Country',
                    is3D: true,
              };
                      
              var chart = new google.visualization.PieChart(document.getElementById('gold'));
              chart.draw(data1, options);
             
        }});
      
         
    };

        

    
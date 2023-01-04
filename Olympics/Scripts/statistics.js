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
var CounterMed = [];
var CountryName = [];
                $.ajax({
                type: 'GET',
                url: 'http://192.168.160.58/Olympics/api/statistics/Medals_Country?id=' + pg,
                headers: {
                'Content-Type': 'application/json'
                },
                success: function (data, status, xhr) {

                var medData = data;

                medData.forEach(element => {
                CounterMed.push(element.Medals.reduce((accum, ele) => ele.Counter + accum, 0))
                CountryName.push(element.CountryName);
                });

                createPieGraph(CounterMed, CountryName);

                }
                });

                function createPieGraph(Counter, CountryName) {
                let barChart = new Chart("graficosos", {
                type: "bar",
                data: {
                labels: CountryName,
                datasets: [{
                data: Counter,
                label: 'Number of Medals per country in this Olympic Games edition',
                backgroundColor: ["rgba(255, 56, 56, 0.5)", "rgba(59, 255, 131, 0.8)"],
                borderColor: ['rgba(255, 0, 0, 0.8)','rgba(15, 212, 87, 1)',],
                borderWidth: 1  
                }]
                },
                options:{ 
                    indexAxis: 'y',
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

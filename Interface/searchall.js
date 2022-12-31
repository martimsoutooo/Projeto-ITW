// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');

    //---Variáveis locais
    var self = this
    self.athletesr=ko.observableArray([]);
    self.competitionsr=ko.observableArray([]);
    self.countriesr=ko.observableArray([]);
    self.gamesr=ko.observableArray([]);
    self.all=ko.observableArray([]);

    self.displayName = 'Olympic Games editions List';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.records = ko.observableArray([]);
    self.currentPage = ko.observable(1);
    self.pagesize = ko.observable(50);
    self.totalRecords = ko.observable(50);
    self.hasPrevious = ko.observable(false);
    self.hasNext = ko.observable(false);
    self.previousPage = ko.computed(function () {
        return self.currentPage() * 1 - 1;
    }, self);
    self.nextPage = ko.computed(function () {
        return self.currentPage() * 1 + 1;
    }, self);
    self.fromRecord = ko.computed(function () {
        return self.previousPage() * self.pagesize() + 1;
    }, self);
    self.toRecord = ko.computed(function () {
        return Math.min(self.currentPage() * self.pagesize(), self.totalRecords());
    }, self);
    self.totalPages = ko.observable(0);
    self.pageArray = function () {
        var list = [];
        var size = Math.min(self.totalPages(), 9);
        var step;
        if (size < 9 || self.currentPage() === 1)
            step = 0;
        else if (self.currentPage() >= self.totalPages() - 4)
            step = self.totalPages() - 9;
        else
            step = Math.max(self.currentPage() - 5, 0);

        for (var i = 1; i <= size; i++)
            list.push(i + step);
        return list;
    };};
self.activate = function (search,page) {
    console.log('CALL: searchAll...');
    var composedUri = "http://192.168.160.58/Olympics/api/Utils/Search?q=" + search;
    ajaxHelper(composedUri, 'GET').done(function (data) {
        console.log(data);
        self.records(data.slice(0+50*(page-1),50*page));
        self.totalRecords(data.length);
        self.all(data);
        self.currentPage(page);
        if (page==1){
            self.hasPrevious(false)
        }else{
            self.hasPrevious(true)
        }
        if (self.records()-50>0){
            self.hasNext(true)
        }else{
            self.hasNext(false)
        }
        if (Math.floor(self.totalRecords()/50)==0){
            self.totalPages(1);
        }else{
            self.totalPages(Math.ceil(self.totalRecords()/50));
        }
    });
    self.calculatePercentage()
};

    self.calculatePercentage=function(){
        showLoading()
        /* Temporizador necessário para fazer a call ajax primeiro */
        var temp=setInterval(function(){
            for (set of self.all()){
                if (set.Source=='Athletes') self.athleter().push(set)
                else if (set.Source=='Competitions') self.competitionsr().push(set)
                else if (set.Source=='Countries') self.countriesr().push(set)
                else self.gamesr().push(set)
            }
            self.athleter(self.athleter().sort(function(a,b){
                if (a.Text>b.Text) return 1
                if (a.Text<b.Text) return -1
                return 0
            }))
            self.competitionsr(self.competitionsr().sort(function(a,b){
                if (a.Text>b.Text) return 1
                if (a.Text<b.Text) return -1
                return 0
            }))
            self.countriesr(self.countriesr().sort(function(a,b){
                if (a.Text>b.Text) return 1
                if (a.Text<b.Text) return -1
                return 0
            }))
            self.gamesr(self.gamesr().sort(function(a,b){
                if (a.Text>b.Text) return 1
                if (a.Text<b.Text) return -1
                return 0
            }))
            google.setOnLoadCallback(drawChart);
            hideLoading()
            clearInterval(temp)
        },400)
    }
    
    /* Gráfico */
    google.load("visualization", "1", { packages: ["corechart"] });
    
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ['Main National Teams', 'Percentage'],
        ['Athletes', 100*self.athleter().length/self.totalRecords()],
        ['Competitions', 100*self.competitionsr().length/self.totalRecords()],
        ['Countries', 100*self.countriesr().length/self.totalRecords()],
        ['Games', 100*self.gamesr().length/self.totalRecords()]
      ]);
      var options = {
        slices: {
          0: { color: 'orange'}, 1: { color: 'red'}, 2: { color: 'blue'}, 3: { color: 'green'}
        },
        title: self.totalRecords() + ' Results for "'  + self.pesquisado() + '"' 
      };
              
      function selectHandler() {
          $("html").css("cursor","auto")
          var selected = chart.getSelection()[0].row;
          chart.setSelection()
          switch (selected){
              case 0:
                  $("#offcanvasRight").offcanvas('show')
                  break
              case 1:
                  $("#offcanvasRight2").offcanvas('show')
                  break
              case 2: 
                  $("#offcanvasLeft").offcanvas('show')
                  break
              case 3:
                  $("#offcanvasLeft2").offcanvas('show')
                  break
            }
        }

      var chart = new google.visualization.PieChart(document.getElementById('chart'));
      google.visualization.events.addListener(chart, 'select', selectHandler);
      google.visualization.events.addListener(chart, 'onmouseover', function(){
          $("html").css("cursor","pointer")
      });
      google.visualization.events.addListener(chart, 'onmouseout', function(){
        $("html").css("cursor","auto")
      });
      chart.draw(data, options);
    }



    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });
    }

    function sleep(milliseconds) {
        const start = Date.now();
        while (Date.now() - start < milliseconds);
    }



    function showLoading() {
        $("#myModal").modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        console.log("sPageURL=", sPageURL);
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }

    };
    
    
    self.procuraTudo=function(){
        self.pesquisado($("#barraProcura").val().toLowerCase());
        if(self.pesquisado().length>0) window.location.href="searchall.html?search=" + self.pesquisado();
    }


    //--- start ....
    showLoading();
    var pg = getUrlParameter('page');
    self.pesquisado = ko.observable(getUrlParameter('search'));
    if (pg==undefined) self.activate(self.pesquisado(),1)
    else self.activate(self.pesquisado(),pg)
    /* $("#offcanvasLeft").offcanvas('show') */

$(document).ready(function () {
    ko.applyBindings(new vm()); 
});

// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Olympics/api/athletes');
    self.displayName = ko.observable('');
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.records = ko.observableArray([]);
    self.currentPage = ko.observable(1);
    self.pagesize = ko.observable(20);
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
     };

    
    self.metaData = {
        athletes: [],
        competitions: [],
        countries: [],
        games: [],
        modalities: [],
}

self.init = function() {
    for (let k in self.metaData) {
        if (localStorage.getItem(k) != undefined) {
            self.metaData[k] = JSON.parse(localStorage.getItem(k))
        } else {
            self.metaData[k] = []
        }
    }

    

    /* $('.page-number').click(function(e) {
        $('.page-number').removeClass("active")
        $(this).addClass("active")
    }); */


}



    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getGames...');
        var composedUri = self.baseUri() + "?page=" + id + "&pageSize=" + self.pagesize();
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.records(data.Records);
            self.currentPage(data.CurrentPage);
            self.hasNext(data.HasNext);
            self.hasPrevious(data.HasPrevious);
            self.pagesize(data.PageSize)
            self.totalPages(data.TotalPages);
            self.totalRecords(data.TotalRecords);
            //self.SetFavourites();
            self.displayName('Olympic Games Athletes List')
            for (var i = 0; i <= self.records().length; i++){
                self.updateheart((self.records()[i]).Id, 'athletes')
            }
        });
    };

    self.activate2 = function (id, sortby='name') {
        console.log('CALL: getGames...');
        var composedUri = self.baseUri() + "?page=" + id + "&pageSize=" + self.pagesize() + "&sortby=" + sortby;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.records(data.Records);
            self.currentPage(data.CurrentPage);
            self.hasNext(data.HasNext);
            self.hasPrevious(data.HasPrevious);
            self.pagesize(data.PageSize)
            self.totalPages(data.TotalPages);
            self.totalRecords(data.TotalRecords);
            //self.SetFavourites();
            if (sortby == 'Id'){
                self.displayName('Olympic Games Athletes List by Id')
            }
            if (sortby == 'NameUp'){
                self.displayName('Olympic Games Athletes List by Name Ascending')
            }
            if (sortby == 'NameDn'){
                self.displayName('Olympic Games Athletes List by Name Descending')
            }
            if (sortby == 'HeightUp'){
                self.displayName('Olympic Games Athletes List by Height Ascending')
            }
            if (sortby == 'HeightDn'){
                self.displayName('Olympic Games Athletes List by Height Descending')
            }
            if (sortby == 'SexUp'){
                self.displayName('Olympic Games Athletes List by Sex Ascending')
            }
            if (sortby == 'SexDn'){
                self.displayName('Olympic Games Athletes List by Sex Descending')
            }
            if (sortby == 'BornDateUp'){
                self.displayName('Olympic Games Athletes List by Born Date Ascending')
            }
            if (sortby == 'BornDateDn'){
                self.displayName('Olympic Games Athletes List by Born Date Descending')
            }
            if (sortby == 'DiedDateUp'){
                self.displayName('Olympic Games Athletes List by Died Date Ascending')
            }
            if (sortby == 'DiedDateDn'){
                self.displayName('Olympic Games Athletes List by Died Date Descending')
            }
            for (var i = 0; i <= self.records().length; i++){
                self.updateheart((self.records()[i]).Id, 'athletes')
            }
         
        });
    };

    self.formatPosition = function(med) {
        if(med == "1")
          return '<span style="font-size: 17px"> &#129351; </span>';
        if(med == "2")
          return '<span style="font-size: 17px"> &#129352; </span>';
        if(med == "3")
          return '<span style="font-size: 17px"> &#129353; </span>';
        if(med == "4")
          return "";
    };
    
    self.formatSex = function(sexo) {
        if(sexo == "M")
          return '<i style="font-size:17px" class="fa fa-mars" aria-hidden="true"></i>';
        if(sexo == "F")
          return '<i style="font-size:17px" class="fa fa-venus" aria-hidden="true"></i>';
    };

    self.updateLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data))
        console.log(data)
    }

    self.checkButtons = function(id) {
        for (let k in self.metaData) {
            if (self.metaData[k].includes(String(id))) {
                document.getElementById(k + '-button').classList.add("active")
            }
        }
    }

    self.updateMetaData = function(id, name) {
        //Adicionar
        if (self.metaData[name].includes(String(id)) == false) {
            self.metaData[name].push(String(id))
            self.updateLocalStorage(name, self.metaData[name])
        } else {
            //Remover
            self.metaData[name].splice(self.metaData[name].indexOf(String(id)), 1)
            self.updateLocalStorage(name, self.metaData[name])
        }
        self.updateheart(id, name)
    }

    self.updateheart = function(id, name){
        console.log(self.metaData[name].includes(String(id)))
        if (self.metaData[name].includes(String(id)) == true) {
            $('.'+id).removeClass('fa fa-heart-o')
            $('.'+id).addClass('fa fa-heart')
        } else {
            $('.'+id).removeClass('fa fa-heart')
            $('.'+id).addClass('fa fa-heart-o')
    }}


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

    $().ready(function () {
        $("#tagsAthletes").autocomplete({
            minLength: 3,
            source: function (request, response) {
                $.ajax({
                    url: "http://192.168.160.58/Olympics/api/Athletes/SearchByName?q=" + request.term,
                    dataType: "json"
                }).done(function ( APIdata) {
                    data = APIdata;
                    let athletes = data.map(function (athlete) {
                        return {
                            label: athlete.Name,
                            value: athlete.Name,
                            name: athlete.Id
                        }
                             });
                    response(athletes.slice(0, 10));
                });
            },
            select: function (event, ui) {
                window.location.href = "athleteDetails.html?id=" + ui.item.name;
            },
        }).find("li").css({ width: "150px" });

        $('#searchform').submit(function(event) {
            // prevent the default behavior (submitting the form)
            event.preventDefault();
            // get the value of the search bar
            let athleteID = $('#tagsAthletes').val();
            // redirect to the athlete's page using the athlete ID
            if (isValidID(athleteID)) {
            window.location.href = "athleteDetails.html?id=" + athleteID;
            } else {
            // if the ID is not valid, show an error message
            $('#error-message').html('<span class="text-danger"><i class="fa fa-warning" aria-hidden="true"></i> Invalid Athlete ID</span>'); 
            }
          });
          // a function to check the validity of the athlete ID
          function isValidID(id) {
            // a variable to store the result of the API page existence check
            var pageExists = false;
            // make an HTTP GET request to the API URL
            $.ajax({
                url: "http://192.168.160.58/Olympics/api/Athletes/" + id,
                type: "GET",
                async: false, // use the async option to make the request synchronous
                success: function() {
                // if the request is successful, the page exists
                pageExists = true;
          }
            });
            // return the result of the API page existence check
            return pageExists;
            }
    });
    

    //--- start ....
    showLoading();
    self.init()
$("#tagsAthletes").val(undefined);
   
var pg = getUrlParameter('page');
self.sortby = ko.observable(getUrlParameter('sortby'))
console.log(pg);
if (pg == undefined){
    if (self.sortby()!=undefined){
        self.activate2(1, self.sortby());
        $("#divshow").removeClass("d-none")
    }
    else  {self.activate(1);}
}
else {
    if (self.sortby()!=undefined){
        self.activate2(pg, self.sortby())
        $("#divshow").removeClass("d-none")
    }
    else {self.activate(pg);}
}
$("#remover").click(function(){
    $("#divshow").addClass("d-none")
})


    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})
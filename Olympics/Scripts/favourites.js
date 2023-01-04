var vm = function() {
    var self = this

    self.metaData = {
        athletes: [],
        competitions: [],
        countries: [],
        games: [],
        modalities: [],
}

    self.athletesData = ko.observableArray()
    self.competitionsData = ko.observableArray()
    self.countriesData = ko.observableArray()
    self.gamesData = ko.observableArray()
    self.modalitiesData = ko.observableArray()

    self.updateLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data))
        console.log(data)
    }


    self.loadData = function(array) {
        let temp = []
        for (e in array) {
            $.ajax({
                type: "GET",
                url: "http://192.168.160.58/Olympics/api/Athletes/" + array[e],
                async: false,
                success: function(data) {
                    temp.push(data)
                        /* console.log(data) */
                }
            });
        }
        return temp
    }

    self.loadData1 = function(array) {
        let temp = []
        for (e in array) {
            $.ajax({
                type: "GET",
                url: "http://192.168.160.58/Olympics/api/Competitions/" + array[e],
                async: false,
                success: function(data) {
                    temp.push(data)
                        console.log(data)
                }
            });
        }
        return temp
    }

    self.loadData2 = function(array) {
        let temp = []
        for (e in array) {
            $.ajax({
                type: "GET",
                url: "http://192.168.160.58/Olympics/api/Countries/" + array[e],
                async: false,
                success: function(data) {
                    temp.push(data)
                }
            });
        }
        return temp
    }

    self.loadData3 = function(array) {
        let temp = []
        for (e in array) {
            $.ajax({
                type: "GET",
                url: "http://192.168.160.58/Olympics/api/Games/" + array[e],
                async: false,
                success: function(data) {
                    temp.push(data)
                }
            });
        }
        return temp
    }
    self.loadData4 = function(array) {
        let temp = []
        for (e in array) {
            $.ajax({
                type: "GET",
                url: "http://192.168.160.58/Olympics/api/Modalities/" + array[e],
                async: false,
                success: function(data) {
                    temp.push(data)
                }
            });
        }
        return temp
    }



    self.updateMetaData = function(id, name) {
        if (self.metaData[name].includes(String(id)) == false) {
            self.metaData[name].push(String(id))
            self.updateLocalStorage(name, self.metaData[name])
        } else {
            //Remover
            self.metaData[name].splice(self.metaData[name].indexOf(String(id)), 1)
            self.updateLocalStorage(name, self.metaData[name])
        }
        self.athletesData(self.loadData(self.metaData.athletes))
        self.competitionsData(self.loadData1(self.metaData.competitions))
        self.countriesData(self.loadData2(self.metaData.countries))
        self.gamesData(self.loadData3(self.metaData.games))
        self.modalitiesData(self.loadData4(self.metaData.modalities))
    }


    self.init = function() {
        for (let k in self.metaData) {
            if (localStorage.getItem(k) != null) {
                self.metaData[k] = JSON.parse(localStorage.getItem(k))
            } else {
                self.metaData[k] = []
            }
        }
        self.athletesData(self.loadData(self.metaData.athletes))
        self.competitionsData(self.loadData1(self.metaData.competitions))
        self.countriesData(self.loadData2(self.metaData.countries))
        self.gamesData(self.loadData3(self.metaData.games))
        self.modalitiesData(self.loadData4(self.metaData.modalities))
        console.log(self.metaData.athletes)
    }
    self.init()
$("#tagsAthletes").val(undefined)
}



$(document).ready(function() {
    console.log("ready!");
    ko.applyBindings(new vm());
});
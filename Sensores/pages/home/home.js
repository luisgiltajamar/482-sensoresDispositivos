(function () {
    "use strict";
    var sensores = Windows.Devices.Sensors;
    function eventoPosicion(pos) {
        if (!pos.coordinate)
            pos = pos.position;

        var txt = "Latitud: " + pos.coordinate.latitude;
        txt += "<br />Longitud: " + pos.coordinate.longitude;
        txt += "<br />Precision: " + pos.coordinate.accuracy;
        txt += "<br />Altitud: " + pos.coordinate.altitude;

        document.getElementById("gps").innerHTML = txt;
    }

    function extraibles() {
        Windows.Storage.KnownFolders.removableDevices.
            getFoldersAsync().then(function(dispositivos) {
            var capa = document.getElementById("extraibles");
            if (dispositivos.length === 0) {
                capa.innerHTML = "No hay dispositivos";
            } else {
                var lista = document.createElement("ul");
                for (var i = 0; i < dispositivos.length; i++) {
                    var item = document.createElement("li");
                    var tx = document.createTextNode(dispositivos[i].name);
                    item.appendChild(tx);
                    lista.appendChild(item);
                }
                capa.appendChild(lista);
            }


        });
    }

    function gps() {

        var loc = new Windows.Devices.Geolocation.Geolocator();

        loc.getGeopositionAsync().then(function(pos) {
            eventoPosicion(pos);

        });

        loc.addEventListener("positionchanged", eventoPosicion);

    }

    function acelerometroF() {
        var acelerometro = sensores.Accelerometer.getDefault();
        var minimoAcelerometro = acelerometro.minimumReportInterval;
        if (minimoAcelerometro)
            acelerometro.reportInterval =
                minimoAcelerometro > 16 ? minimoAcelerometro : 16;

        acelerometro.addEventListener("readingchanged", function (e) {

            var txt = "X:" + e.reading.accelerationX;
            txt += "<br />Y:" + e.reading.accelerationY;
            txt += "<br />Z:" + e.reading.accelerationZ;

            document.getElementById("acelerometro").innerHTML = txt;

        });



    }
    function girometroF() {
        var girometro = sensores.Gyrometer.getDefault();
        var minimoAcelerometro = girometro.minimumReportInterval;
        if (minimoAcelerometro)
            girometro.reportInterval =
                minimoAcelerometro > 16 ? minimoAcelerometro : 16;

        girometro.addEventListener("readingchanged", function (e) {

            var txt = "X:" + e.reading.angularVelocityX;
            txt += "<br />Y:" + e.reading.angularVelocityY;
            txt += "<br />Z:" + e.reading.angularVelocityZ;

            document.getElementById("acelerometro").innerHTML = txt;

        });



    }
    function orientacionF() {
        var orientacion = sensores.SimpleOrientationSensor.getDefault();
        orientacion.addEventListener("orientationchanged", function (e) {

            var txt = e.orientation;

            document.getElementById("acelerometro").innerHTML = txt;

        });



    }
    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            acelerometroF();
            girometroF();
            orientacionF();
            gps();
            extraibles();
        }
    });
})();

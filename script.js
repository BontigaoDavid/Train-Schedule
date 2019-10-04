var firebaseConfig = {
    apiKey: "AIzaSyDmdkQXDTf6tcoBNUkX0oiIgl91jbj_OOY",
    authDomain: "homework-60c0e.firebaseapp.com",
    databaseURL: "https://homework-60c0e.firebaseio.com",
    projectId: "homework-60c0e",
    storageBucket: "homework-60c0e.appspot.com",
    messagingSenderId: "1018976531801",
    appId: "1:1018976531801:web:b1c0d9f163b6b737ff4848"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var tableContainer = $("#train-schedule-container");

function addTrain(train) {
    var newTableRow = $("<div class='row table-row'></div>");

    var nameTableCell = $("<div class='col table-cell'>" + train.name + "</div>")
    var destinationTableCell = $("<div class='col table-cell'>" + train.destination + "</div>")
    var frequencyTableCell = $("<div class='col table-cell'>" + train.frequency + "</div>")

    var nextArrivalTableCell = $("<div class='col table-cell'>" + train.nextArrival + "</div>")
    var minutesAwayTableCell = $("<div class='col table-cell'>" + train.minutesAway + "</div>")

    newTableRow.append(nameTableCell);
    newTableRow.append(destinationTableCell);
    newTableRow.append(frequencyTableCell);
    newTableRow.append(nextArrivalTableCell);
    newTableRow.append(minutesAwayTableCell);

    tableContainer.append(newTableRow);
}

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    var newTrain = {
        name: $("#train-name-input").val(),
        destination: $("#destination-input").val(),
        frequency: $("#frequency-input").val(),
        startTime: $("#start-input").val()
    };

    var firstTime = newTrain.startTime;
    var currentTime = moment();
    var firstTimeConverted = moment(firstTime, "HH:mm");

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % newTrain.frequency;
    var tMinutesTillTrain = newTrain.frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    newTrain.minutesAway = tMinutesTillTrain;
    newTrain.nextArrival = moment(nextTrain).format("hh:mm a");
    

    database.ref().push(newTrain);
    console.log(nextTrain);
    //console.log(nextTrain);
});

database.ref().on("child_added", function(snapshot) {
    // console.log (snapshot.exportVal());
    var train = snapshot.val();
    addTrain(train);
    // console.log(train.startTime);
});

function updateSchedule() {
    
}

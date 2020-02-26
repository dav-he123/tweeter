$(document).ready(function() {
  // console.log("hello it works!");
  const max = 140;
  $("#areatext").on("input", function() {
    console.log($(this));
    let countPress = $("#areatext").val().length;
    remainingCount = max - countPress;
    $("#counter").text(remainingCount);
    if (remainingCount < 0) {
      $("#counter").addClass("overlimit");
    } else {
      $("#counter").removeClass("overlimit");
    }
  });
});

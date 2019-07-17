$(document).ready(function() {
  $('.new-tweet textarea').on("keyup", function(event) {
      const charCounter = $(this).parent().children('div').children('span');
      const remainingChar = 140-$(this).val().length;

      if (remainingChar < 0) {
        charCounter.addClass("redCounter");
      } else if (charCounter.hasClass("redCounter") && remainingChar >= 0) {
        charCounter.removeClass("redCounter");
      }
      
      // Sets the counter to the remaining value.
      $(charCounter).text(remainingChar);

  })
});


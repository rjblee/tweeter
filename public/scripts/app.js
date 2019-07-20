$(() => {
  const createTweetElement = function(obj) {
    const $article = $("<article>").addClass("tweetPost");
    
    const $header = $("<header>").addClass("tweetHeader");
    $article.append($header);
    
    const $div1 = $("<div>").addClass("avatarAndName");
    $header.append($div1);
  
    const $img1 = $("<img>").attr("src", obj.user.avatars);
    $div1.append($img1);

    const $span1 = $("<span>").text(obj.user.name);
    $div1.append($span1);

    const $span2 = $("<span>").addClass("username").text(obj.user.handle);
    $header.append($span2);

    const $p1 = $("<p>").addClass("tweetText").text(obj.content.text);
    $article.append($p1);

    const $footer = $("<footer>").addClass("tweetFooter");
    $article.append($footer);
    
    const $hr = $("<hr>");
    $footer.append($hr);

    const $p2 = $("<p>").text(moment(obj.created_at).fromNow());
    $footer.append($p2);

    const $div2 = $("<div>").addClass("icons");
    $footer.append($div2);

    const $img2 = $("<img>").attr('src', "https://img.icons8.com/material-rounded/24/000000/flag.png");
    $div2.append($img2);

    const $img3 = $("<img>").attr('src', "https://img.icons8.com/material/24/000000/retweet.png");
    $div2.append($img3);

    const $img4 = $("<img>").attr('src', "https://img.icons8.com/material-sharp/24/000000/filled-like.png");
    $div2.append($img4);

    return $article;
  };

  $("#errorMessage").hide();

  $("#tweetButton").submit(function(event) {
    event.preventDefault();

    $("#errorMessage").hide();

    if ($(".tweetBox").val().length === 0) {
      $("#errorMessage").html("Error: Tweet content is not present");
      $("#errorMessage").slideDown("slow");

    } else if ($(".tweetBox").val().length > 140) {
      $("#errorMessage").html("Error: Tweet content is too long");
      $("#errorMessage").slideDown("slow");

    } else {
      $.post('/tweets', $(this).serialize(), (data, status) => {
        $(".tweetBox").val("");
        loadTweets();
      });
    }

  });

  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
      
    for (let tweet of tweets) {
      const $article = createTweetElement(tweet);
      $("#tweets-container").prepend($article);
    }
  };

  const loadTweets = function() {
    $.get('/tweets', function(data) {
      renderTweets(data);
    });
  };
  
  loadTweets();
  
  $('#arrowDown').click(function() {
    $('#tweetButton').slideToggle();
    $("#errorMessage").hide();
  });
});
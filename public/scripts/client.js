/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac"
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1461113959088
  }
];

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  tweets.forEach(element => {
    // createTweetElement(element);
    console.log(element);
    $("#tweets-container").prepend(createTweetElement(element));
  });
};

const createTweetElement = function(tweet) {
  let $tweet = $("<article>").addClass("tweet");
  let html = `<header>
  <img class="image" src="${tweet.user.avatars}" />
  <span class="username1"> ${tweet.user.name} </span>
  <span class="tweetusername"> ${tweet.user.handle} </span>
  </header>

  <p> ${escape(tweet.content.text)} </p>

  <footer>
  <span class="tweetdate">${tweet.created_at}</span>
  <div class="icons">
  <i class="fas fa-flag"></i>
  <i class="fas fa-retweet"></i>
  <i class="fas fa-heart"></i>
  </div>
  </footer>`;
  $tweet.append(html);

  return $tweet;
};

const loadTweets = () => {
  $.ajax({ url: "/tweets", method: "GET", dataType: "json" }).then(function(
    answer
  ) {
    renderTweets(answer);
  });
};

$(document).ready(function() {
  createTweetElement({
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac"
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  });

  renderTweets(data);

  const $form = $("#new-form-tweet");
  const $textvalue = $("#areatext");

  $form.submit(event => {
    event.preventDefault();

    if ($textvalue.val().length > 140) {
      $(".errormessage").text(
        "Your tweet content is either too long or is not present, please try again."
      );
      return;
    } else if (!$textvalue.val()) {
      $(".errormessage").text("Tweet something.....");
      return;
    }

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $form.serialize(),
      success: () => {
        loadTweets();
      }
    });
  });

  loadTweets();
});

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

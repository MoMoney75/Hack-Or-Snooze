"use strict";

// This is the global list of the stories, an instance of StoryList

let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */
//let listItems = document.querySelectorAll(".storyListItem");
function generateStoryMarkup(story) {
  const hostName = story.getHostName();

  const heart = document.createElement("i");
  heart.innerHTML = "&hearts;";

  //LOOP THROUGH FAVORITES TO COMPARE STORY IDS TO SEE IF A STORY IS ALREADY A FAVORITE
  for (let items of $allStoriesList) {
    if (
      currentUser.favorites.find((s) => {
        return s.storyId === story.storyId;
      })
    ) {
      heart.classList.add("favorited");
    } else {
      heart.setAttribute("class", "hearts");
    }
    items.append(heart);
  }

  heart.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("click", heart);
    if (heart.classList.contains("hearts")) {
      currentUser.addToFavorites(story);
      heart.classList.remove("hearts");
      heart.classList.add("favorited");
    } else if (heart.classList.contains("favorited")) {
      currentUser.removeFavorites(story);
      heart.classList.remove("favorited");
      heart.classList.add("hearts");
    }
  });

  return $(`
  
      <li class="storyListItem" id="${story.storyId}">
      
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
      
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  // console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them

  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);

    $allStoriesList.append($story);
  }
  $allStoriesList.show();
}

//GET DATA FROM STORIES SUBMIT FORM, CALL addStory METHOD , APPEND THE NEW STORY ONTO THE PAGE
//.addStory()
let storySubmitButton = document.getElementById("storySubmitButton");

async function addNewStoryToPage() {
  let title = document.getElementById("titleInput").value;
  let url = document.getElementById("urlInput").value;
  let author = document.getElementById("authorInput").value;
  let user = currentUser.username;

  const storyOBJ = {
    title,
    author,
    url,
    user,
  };

  let newStory = await storyList.addStory(currentUser, storyOBJ);
  let $story = generateStoryMarkup(newStory);
  $allStoriesList.prepend($story);
}

storySubmitButton.addEventListener("click", function (e) {
  addNewStoryToPage();
  document.getElementById("titleInput").value = "";
  document.getElementById("urlInput").value = "";
  document.getElementById("authorInput").value = "";
  $newStoryForm.className = "hidden";
});

"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $favoritedStories.hide();
}
// const hackOrSnooze = document.getElementById("nav-all");
// hackOrSnooze.addEventListener("click", function (e) {
//   navAllStories();
// });
$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

//FUNCTION FOR WHEN USER CLICKS ON "ADD STORY" NAV BAR LINK
const addStoryButton = document.getElementById("addStoryButton");
addStoryButton.addEventListener("click", function (e) {
  showSubmitForm();
});

let $newStoryForm = document.getElementById("newStoryForm");
function showSubmitForm() {
  $newStoryForm.className = "stories-list";
}

const favoriteStoriesList = document.getElementById("favoriteStoriesList");
function putFavoritesOnPage() {
  $allStoriesList.hide();
  $favoritedStories.empty();

  //CREATING A DELETE BUTTON FOR EACH STORY ON THE FAVORITES PAGE
  for (let story of currentUser.favorites) {
    const removeButton = document.createElement("i");
    removeButton.innerHTML = "&hearts;";
    removeButton.classList.add("favorited");

    const $story = generateStoryMarkup(story);

    $story.addClass("stories-list");
    $story.append(removeButton);
    $favoritedStories.append($story);

    removeButton.addEventListener("click", function (e) {
      //REMOVES LI FROM LIST OF FAVORITES
      //REMOVES FAVORITED STORY FROM THE SERVER SIDE
      removeButton.parentElement.remove();

      currentUser.removeFavorites(story);
    });
  }
  $favoritedStories.show();
}

//ADD EVENT LISTENER FOR FAVORITES BUTTON LOCATED ON THE NAV BAR, WILL SHOW THE FAVORITES
favoritesButton.addEventListener("click", function (e) {
  putFavoritesOnPage();
});

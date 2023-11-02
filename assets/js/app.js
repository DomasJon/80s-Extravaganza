/**
 * This is the dataset of quirky music videos that you are required to use in this
 * exam.
 *
 * For more details, see the `dataset.js` file
 */
const database = quirkyVideoDatabaseObject;

/**
 * Window load event handler. Initializes the app when the page is fully loaded.
 *
 * NOTE: Add all initialization code in this function
 */
window.addEventListener('load', function () {
  const thisButton = document.getElementById('add-button');
  thisButton.addEventListener("click", addVideo);
  renderVideoList();
});

/**
 * Creates new information about the video and pushes to the array;
 */
function addVideo() {
  const thisVideo = document.getElementById("video-id");
  const thisArtist = document.getElementById("artist");
  const thisTitle = document.getElementById("title");
  const thisDuration = document.getElementById("duration");

  let theMetrics = true;
  theMetrics = theMetrics && thisVideo.value != "" && thisVideo.value.length == 11;
  theMetrics = theMetrics && thisArtist.value != "" && thisArtist.value.length > 2;
  theMetrics = theMetrics && thisTitle.value != "" && thisTitle.value.length > 2;
  theMetrics = theMetrics && thisDuration.value != "" && !isNaN(thisDuration.value);
  if(theMetrics) {
    database.videos.push({
      videoId: thisVideo.value,
      artist: thisArtist.value,
      title: thisTitle.value,
      duration: thisDuration.value
    });
    thisVideo.value = '';
    thisArtist.value = '';
    thisTitle.value = '';
    thisDuration.value = '';
    renderVideoList();
  }
}

/**
 * Sort videos by title name;
 * Apply the div creation function for each video in the array;
 */
function renderVideoList() {
  const thisPlaylist = document.getElementById("playlist");
  thisPlaylist.innerHTML = "";

  sortByTitle();

  database.videos.forEach(videoElement => thisPlaylist.appendChild(createVideoElement(videoElement)));
  totalAirtime();
}

/**
 * Sorting videos by title;
 */
function sortByTitle() {
  database.videos.sort((itemA, itemB) => {
    if (itemA.title > itemB.title) {
      return 1;
    }
    else if (itemB.title > itemA.title) {
      return -1;
    }
    return 0;
  });
}

/**
 * Calculates total time of all videos duration;
 */
function totalAirtime() {
  const newAirtime = document.getElementById("airtime");
  newAirtime.innerHTML = toTimeForAirtime(database.videos.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.duration;
  }, 0));
}

/**
 *
 * @param {value} videoParameter - parameter for the function;
 * @returns - creates div with all the content from the array;
 */
function createVideoElement(videoParameter) {
  const newArticle = document.createElement("article");
  newArticle.className = "card m-2 p-2";

  const newMedia = document.createElement('div');
  newMedia.className = "media";
  newArticle.appendChild(newMedia);

  const newMediaLeft = document.createElement("div");
  newMediaLeft.className = "media-left";
  newMedia.appendChild(newMediaLeft);

  const newP = document.createElement("p");
  newP.className = "image is-64x64";
  newMediaLeft.appendChild(newP);

  const newImg = document.createElement("img");
  newImg.src = "https://img.youtube.com/vi/" + videoParameter.videoId + "/0.jpg";
  newP.appendChild(newImg);

  const newMediaContent = document.createElement("div");
  newMediaContent.className = "media-content";
  newMedia.appendChild(newMediaContent);

  const newContent = document.createElement("div");
  newContent.className = "content";
  newMediaContent.appendChild(newContent);

  const newA = document.createElement("a");
  newA.href = "https://youtu.be/" + videoParameter.videoId;
  newA.innerHTML = "<strong>" + videoParameter.artist + "</strong> - " + videoParameter.title;
  newContent.appendChild(newA);

  const newMediaRight = document.createElement("div");
  newMediaRight.className = "media-right";
  newMedia.appendChild(newMediaRight);

  const newSpan = document.createElement("span");
  newSpan.className = "has-text-grey-light";
  newSpan.innerHTML = toTime(videoParameter.duration);
  newMediaRight.appendChild(newSpan);
  return newArticle;
}

/**
 *
 * @param {number} seconds -  total number of seconds;
 * @returns - time with hours:minutes:seconds;
 */
function toTimeForAirtime (seconds) {
  const date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
}

/**
 *
 * @param {number} seconds - total number of seconds;
 * @returns - time with minutes:seconds;
 */
function toTime (seconds) {
  const date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().substr(14, 5);
}
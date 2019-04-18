var keyword; //Global variable to store keyword

function getKeyword(url_string){
  var url = new URL(url_string);
  keyword = url.searchParams.get("kw");
}

function searchOnWiki(){
  if(keyword == 'error'){
    displayError();
  }
  else{
    const url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
        keyword + '&limit=1&namespace=0&format=json&callback=handleSummary';
    var scpt = document.createElement("script");
    scpt.src = url;
    document.body.appendChild(scpt);
  }
}

/**
 * The function that is called back by wikipedia api, with result stored as Json array.
 */
function handleSummary(summary){
  var name = summary[1][0];
  var description = summary[2][0];
  var link = summary[3][0];
  if(name == null || name == undefined){
    displayOtherOptions();
  }
  else{
    displayLogoInfo(name, description, link);
  }
}

function displayLogoInfo(name, description, link){
  const nameDiv = document.getElementById("logo-name");
  nameDiv.appendChild(document.createTextNode(name));

  const descriptionDiv = document.getElementById("logo-description");
  descriptionDiv.appendChild(document.createTextNode(description));

  const linkDiv = document.getElementById("logo-link");
  linkDiv.appendChild(document.createTextNode("Read more"));
  linkDiv.href = link;
}

function displayError(){
  const errorDiv = document.getElementById("logo-description");
  errorDiv.appendChild(document.createTextNode("Oops: Cannot find any logo."));
}

function displayOtherOptions(){
  var optionPrompt = document.getElementById('option-prompt');
  optionPrompt.appendChild(document.createTextNode("Do you mean:"));
  var options = keyword.split(" ");
  var displayList = document.getElementById('display-list');
  options.forEach(function(opt) {
    var optBtn = document.createElement("BUTTON");
    optBtn.innerText = opt;
    optBtn.value = opt;
    optBtn.onclick = function() {refreshPage(optBtn.value);}

    var item = document.createElement('li');
    item.appendChild(optBtn);
    displayList.appendChild(item);
  });
}

function refreshPage(keyword){
  window.location.search = "?kw=" + keyword;
}

function buildInfoUI(){
  getKeyword(window.location.href);
  searchOnWiki();
}
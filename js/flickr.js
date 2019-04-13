// APP config
const key = "d5bdef52f659cb9e8f4a43fe668b3765";
const secret = "f4247377f9653ed7";

// API setting
const url = "https://api.flickr.com/services/rest/";

function main(keyword = "landscape") {
  // API paramters
  let params = {};
  params = {
    method: "flickr.photos.search", // https://www.flickr.com/services/api/flickr.photos.search.html
    api_key: key, // Your API application key
    tags: keyword, // A comma-delimited list of tags. Photos with one or more of the tags listed will be returned.
    //   text: keyword, // A free text search. Photos who's title, description or tags contain the text will be returned.
    format: "json",
    nojsoncallback: 1,
    per_page: 10 // chunk size to fetch
  };

  axios
    .get(url, { params })
    .then(function(response) {
      // handle success
      console.log(response);

      const { data } = response;

      $("#galleryTitle").html("");
      $("#galleryTitle").append(data.photos.photo[0].title + " Gallery");

      $("#flickr").html("");
      $.each(data.photos.photo, function(i, gp) {
        const farmId = gp.farm;
        const serverId = gp.server;
        const id = gp.id;
        const secret = gp.secret;

        console.log(farmId + ", " + serverId + ", " + id + ", " + secret);

        //  https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

        const src = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`;
        const className = "img-thumbnail rounded float-left";
        const title = gp.title;

        $("#flickr").append(reander(src, className, title));
      });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      // always executed
    });
}

function reander(imgSrc, imgClass, imgTitle) {
  return `
    <figure class="figure">
      <img src=${imgSrc} class=${imgClass} alt=${imgTitle} />
      <figcaption class="figure-caption" hidden>${imgTitle}</figcaption>
    </figure>
  `;
}

function search() {
  var keyword = document.getElementById("search").value;
  console.log(keyword);

  main(keyword);
}

main();

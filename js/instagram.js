/**
 * For call the search function, it will get the <b>querys</b> and <b>element</b> which store API result and the raw html;
 * @type {{querys: Array, element: Array, search: instagram.search, render: (function(*, *, *): string)}}
 */
var instagram = {
    querys:[],
    element:[],
    search: (tag) => {
        tag = tag.replace(/[\^&\/\\#,+()$~%.'":*?<>{}\!\@\-\=\|\[\]\;]/g, "_"); // Override space input
        axios.get("https://www.instagram.com/explore/tags/" + tag + "/?__a=1")
            .then(function (response) {
                // handle success
                var data = response.data.graphql.hashtag.edge_hashtag_to_media;
                instagram.querys = [];
                instagram.element = [];
                for (enode in data.edges) {
                    var node = {
                        title: null,
                        description: data.edges[enode]["node"]["edge_media_to_caption"]["edges"].length>0?data.edges[enode]["node"]["edge_media_to_caption"]["edges"][0]["node"]["text"]:"",
                        id: data.edges[enode]["node"]["id"],
                        publishAt: data.edges[enode]["node"]["taken_at_timestamp"],
                        thumbnail: {
                            url: data.edges[enode]["node"]["thumbnail_src"]
                        }
                    };
                    instagram.querys.push(node);
                    instagram.element.push(instagram.render(
                        node.thumbnail.url,
                        "img-thumbnail rounded float-left ig-ele",
                        node.description));
                }
                return instagram.querys;
            }).catch(function (error) {
            // handle error
            console.log(error);
            }).then(function () {
                //instagram.element.join();
            });
    },
    render:(imgSrc, imgClass, imgTitle) => {
        return `<figure class="figure">
          <img src=${imgSrc} class=${imgClass} alt=${imgTitle} />
          <figcaption class="figure-caption">${imgTitle}</figcaption>
        </figure>`;
    }
}
//This is example
instagram.search("nba");
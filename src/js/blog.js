
$("#blogger").ready(function () {

    var blogPosts = $.ajax({
        // url: "http://beta.sitego.co.za/creator/blog.json",
        url: "http://localhost:9615/blog.json",
        async: false
    }).responseText;

    var blogArray = JSON.parse(blogPosts);

    var newBlogItem = "";

    for (var b = 0; b < blogArray.blogTitle.length; b++) {
        newBlogItem += "<div class='blog-item'><div class='blog-img' style='background-image: url('" + blogArray.blogImg[b] + ";'></div><div class='blog-header'><h2>" + blogArray.blogTitle[b] + "</h2></div><div class='blog-snippet'><p>" + blogArray.blogContent[b] + "</p></div><div class='blog-action'><a class='btn btn-default course-btn' href='" + blogArray.blogReadLink[b] + "' type='button'>Read More</a></div></div>"
    }

    $("#blogger").html(newBlogItem);

})

    {/*< div class="blog-item" >
        <div class="blog-img">

        </div>
        <div class="blog-header">
            <h2>Hello World</h2>
        </div>
        <div class="blog-snippet">
            <p>Helle Helle Helle Helle Helle Helle Helle HelleHelleHelleHelle Helle Helle Helle Helle Helle Helle Helle
                    Helle Helle Helle Helle v HelleHelleHelleHelleHelle Helle Helle Helle Helle </p>
        </div>
        <div class="blog-action">
            <button class="btn btn-default course-btn" type="button">Read More</button>
        </div>
        </div >*/}

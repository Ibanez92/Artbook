
let member;

$(document).ready(() => {
    //get current user in order to get saved art by user_id
  $.get("/api/user_data")
    .then((data) => {
      $(".member-name").text(data.email);
      member = data.email;
    })
    .then(() => {
      $.get("/artbook/" + member, function(data) {
        if (data) {
    // console.log(data);
        }
      })
        .then((data) => {
    //add pages dynamically
          for (i = 0; i < data.length; i++) {
            $.get("/idsearch/" + data[i].savedArt).then((art) => {
              art.forEach((element, index) => {
                div = $("<div />").html(`
                <div>
                        <img src="${element.thumbnailUrl}">
                        <p style="color: #000; line-height: 24px;">${element.title}<br><br>${element.artist} ${element.year}<br><br><button art-id="${element.id}" class="btn btn-success btn-block deleteArt">Remove from your Artbook</button></p>
                </div>`);
                $("#flipbook").turn("addPage", div, index);
              });
            });
          }
        })
        .then(() => {
          setTimeout(addBack, 5000);
        });
    });
});

//button to remove works from your artbook
$("body").on("click", ".deleteArt", function(event) {
  event.preventDefault();
  let artID = event.target.getAttribute("art-id");
  $.get("/api/delete/" + member + "/" + artID).then(() => {
  });
});

//go to cover page when you click on the last page
$("body").on("click", ".lastPage", function(event) {
  event.preventDefault();
  $("#flipbook")
    .turn("page", 1)
    .turn("stop");
});

//add the back cover of the book
function addBack() {
  div = $("<div />").attr("class", "hard lastPage");
  $("#flipbook").turn("addPage", div);
}

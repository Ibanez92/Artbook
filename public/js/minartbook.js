let member;
$(document).ready(() => {
  $.get("/api/user_data")
    .then((a) => {
      $(".member-name").text(a.email), (member = a.email);
    })
    .then(() => {
      $.get("/artbook/" + member, function(a) {})
        .then((a) => {
          for (i = 0; i < a.length; i++)
            $.get("/idsearch/" + a[i].savedArt).then((a) => {
              a.forEach((a, b) => {
                (div = $("<div />").html(`
                <div>
                        <img src="${a.thumbnailUrl}">
                        <p style="color: #000; line-height: 24px;">${a.title}<br><br>${a.artist} ${a.year}<br><br><button art-id="${a.id}" class="btn btn-success btn-block deleteArt">Remove from your Artbook</button></p>
                </div>`)),
                  $("#flipbook").turn("addPage", div, b);
              });
            });
        })
        .then(() => {
          setTimeout(addBack, 5e3);
        });
    });
}),
  $("body").on("click", ".deleteArt", function(a) {
    a.preventDefault();
    let b = a.target.getAttribute("art-id");
    $.get("/api/delete/" + member + "/" + b).then(() => {});
  }),
  $("body").on("click", ".lastPage", function(a) {
    a.preventDefault(),
      $("#flipbook")
        .turn("page", 1)
        .turn("stop");
  });
function addBack() {
  (div = $("<div />").attr("class", "hard lastPage")),
    $("#flipbook").turn("addPage", div);
}

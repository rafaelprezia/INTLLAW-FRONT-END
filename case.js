$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (id) {
    fetchLegalCaseById(id);
  }

  function fetchLegalCaseById(id) {
    $.ajax({
      url: `http://localhost:3000/media/legal-cases/${id}`,
      type: "GET",
      success: function (response) {
        displayLegalCase(response);
      },
      error: function (error) {
        console.error("Error:", error);
        $("body").html(
          "<p class='text-danger'>An error occurred while fetching the document.</p>"
        );
      },
    });
  }

  function displayLegalCase(legalCase) {
    $("#document-title").text(legalCase.title);
    $("#document-date").text(new Date(legalCase.date).toLocaleDateString());
    $("#document-parties").text(legalCase.partiesInvolved);
    $("#document-category").text(legalCase.category);
    $("#document-content").html(legalCase.content);
    $("#document-tags").html(
      `<strong>Tags:</strong> ${legalCase.tags.join(", ")}`
    );
  }
});

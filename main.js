document.addEventListener("DOMContentLoaded", function () {
  const tagInput = document.getElementById("tag-input");
  const tagsContainer = document.getElementById("tags-container");
  let tagsList = []; // Define tagsList here

  tagInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const tagText = tagInput.value.trim();
      if (tagText !== "") {
        const tagElement = document.createElement("span");
        tagElement.classList.add("tag");
        tagElement.textContent = tagText;
        tagsContainer.appendChild(tagElement);
        tagsList.push(tagText); // Add the tag to the list
        tagInput.value = "";
      }
    }
  });

  $("#submit-button").click(function (e) {
    e.preventDefault();

    const title = $("#document-title").val();
    const date = $("#document-date").val();
    const partiesInvolved = $("#document-parties").val();
    const category = $("#category").val();
    const content = tinymce.activeEditor.getContent();
    const tags = tagsList; // Get the list of tags

    if (!title || !date || !partiesInvolved || !category || !content) {
      alert("All fields are required.");
      return;
    }

    const legalCase = {
      title: title,
      date: date,
      partiesInvolved: partiesInvolved,
      category: category,
      content: content,
      tags: tags, // Include the tags in the submission data
    };

    console.log("Sending data:", legalCase); // Debugging line to check data

    $.ajax({
      url: "http://localhost:3000/media/legal-cases",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(legalCase),
      success: function (response) {
        alert("Submission Complete");
        // Clear all fields
        $("#document-title").val("");
        $("#document-date").val("");
        $("#document-parties").val("");
        $("#category").val("");
        tinymce.activeEditor.setContent("");
        tagsContainer.innerHTML = "";
        tagsList = [];
      },

      error: function (error) {
        console.error("Error:", error);
      },
    });
  });
});

$(document).ready(function () {
  tinymce.init({
    selector: "#mytextarea",
    plugins:
      "advtemplate preview powerpaste casechange searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed codesample advtable table charmap pagebreak nonbreaking anchor advlist lists checklist wordcount tinymcespellchecker a11ychecker help formatpainter permanentpen pageembed linkchecker emoticons export",
    height: "700px",
    toolbar_sticky: true,
    icons: "thin",
    autosave_restore_when_empty: true,
    content_style: `
        body {
          background: #fff;
        }
        @media (min-width: 840px) {
          html {
            background: #eceef4;
            min-height: 100%;
            padding: 0 .5rem
          }
          body {
            background-color: #fff;
            box-shadow: 0 0 4px rgba(0, 0, 0, .15);
            box-sizing: border-box;
            margin: 1rem auto 0;
            max-width: 820px;
            min-height: calc(100vh - 1rem);
            padding:4rem 6rem 6rem 6rem
          }
        }
      `,
  });
});

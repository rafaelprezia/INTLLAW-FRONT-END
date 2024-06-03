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

$(document).ready(function () {
  // Handle basic search form submission
  $("#basic-search-form").submit(function (e) {
    e.preventDefault();
    const query = $("#basic-search").val();
    performSearch({ query });
  });

  // Toggle advanced search section
  $("#toggle-advanced-search").click(function () {
    $("#advanced-search").slideToggle();
  });

  // Handle advanced search form submission
  $("#search-form").submit(function (e) {
    e.preventDefault();
    const title = $("#search-title").val();
    const date = $("#search-date").val();
    const partiesInvolved = $("#search-parties").val();
    const category = $("#search-category").val();
    const tags = $("#search-tags").val();

    const query = {};
    if (title) query.title = title;
    if (date) query.date = date;
    if (partiesInvolved) query.partiesInvolved = partiesInvolved;
    if (category) query.category = category;
    if (tags) query.tags = tags;

    performSearch(query);
  });

  function performSearch(query) {
    $.ajax({
      url: "http://localhost:3000/media/legal-cases",
      type: "GET",
      data: query,
      success: function (response) {
        displayResults(response, query.query);
      },
      error: function (error) {
        console.error("Error:", error);
        $("#search-results").html(
          "<p class='text-danger'>An error occurred while fetching the results.</p>"
        );
      },
    });
  }

  function displayResults(legalCases, searchTerm) {
    const resultsContainer = $("#search-results");
    resultsContainer.empty();

    if (legalCases.length === 0) {
      resultsContainer.html("<p class='text-warning'>No results found.</p>");
      return;
    }

    legalCases.forEach((legalCase) => {
      const highlightedTitle = highlightText(legalCase.title, searchTerm);
      const highlightedPartiesInvolved = highlightText(
        legalCase.partiesInvolved,
        searchTerm
      );
      const highlightedCategory = highlightText(legalCase.category, searchTerm);
      const highlightedTags = legalCase.tags
        .map((tag) => highlightText(tag, searchTerm))
        .join(", ");
      const highlightedContent = highlightText(
        stripHtml(legalCase.content),
        searchTerm
      );

      const caseCard = `
              <div class="card mb-3">
                  <div class="card-header bg-secondary text-white">
                      <h5>${highlightedTitle}</h5>
                      <small>${new Date(
                        legalCase.date
                      ).toLocaleDateString()}</small>
                  </div>
                  <div class="card-body">
                      <p><strong>Parties Involved:</strong> ${highlightedPartiesInvolved}</p>
                      <p><strong>Category:</strong> ${highlightedCategory}</p>
                      <p><strong>Tags:</strong> ${highlightedTags}</p>
                      <div>${highlightedContent}</div>
                      <button class="btn btn-primary3 btn-block mt-3 read-more-button" data-id="${
                        legalCase._id
                      }">Read More</button>
                  </div>
              </div>
          `;
      resultsContainer.append(caseCard);
    });

    $(".read-more-button").click(function () {
      const id = $(this).data("id");
      window.location.href = `case.html?id=${id}`;
    });
  }

  function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  function stripHtml(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
});

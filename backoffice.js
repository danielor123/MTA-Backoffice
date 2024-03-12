document.addEventListener('DOMContentLoaded', function () {
    openTab('manageDocuments'); // Open the "Manage Documents" tab

    // Fetch and display tags in the filter dropdown
    fetchTagsForDropdown();
});
function fetchTagsForDropdown() {
    const filterDropdown = document.getElementById('filterTags');

    // Make an AJAX request to fetch tags from the server
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'category.php', true); // Replace 'fetch_tags.php' with your server endpoint
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Response Text:', xhr.responseText); // Log the response text
            const tags = JSON.parse(xhr.responseText);

            // Clear existing options
            filterDropdown.innerHTML = '';

            // Add default option
            const defaultOption = document.createElement('option');
            defaultOption.value = ''; // or any default value
            defaultOption.text = 'All Tags';
            filterDropdown.appendChild(defaultOption);

            // Add options for each tag from the server
            tags.forEach(tag => {
                const option = document.createElement('option');
                option.value = tag;
                option.text = tag;
                filterDropdown.appendChild(option);
            });
        } else {
            console.error('Error fetching tags:', xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Network error occurred while fetching tags.');
    };

    xhr.send();
}
document.addEventListener('DOMContentLoaded', function () {
    openTab('uploadDocuments'); // Open the default tab
    // Fetch and display tags
    fetchTags();
});
function fetchTags() {
    // Make an AJAX request to fetch tags from the server
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'backofiice.php', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const tags = JSON.parse(xhr.responseText);
            displayTags(tags);
        } else {
            console.error('Error fetching tags:', xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Network error occurred while fetching tags.');
    };

    xhr.send();
}
function displayTags(tags) {
    const tagContainer = document.getElementById('tagsContainer');

    // Clear existing tags
    tagContainer.innerHTML = '';

    // Create and append tag elements
    tags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagElement.setAttribute('data-tag', tag);  // Set the data-tag attribute
        tagElement.onclick = function () { toggleTag(this); };

        tagContainer.appendChild(tagElement);
    });
}
function openTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    const tabButton = document.querySelector(`button[data-tab="${tabName}"]`);
    if (tabButton) {
        tabButton.classList.add('active');
    }

    const tabContent = document.getElementById(tabName);
    if (tabContent) {
        tabContent.classList.add('active');
    }

    if (tabName === 'manageDocuments') {
        // Trigger document fetching for the default state
        filterDocuments();
    }
}
function filterDocumentsOld() {
    const selectedTag = document.getElementById('filterTags').value;

    // Implement logic to fetch and display documents based on the selected tag
    // For demonstration purposes, you can use a placeholder ul element
    const documentList = document.getElementById('documentList');
    documentList.innerHTML = ''; // Clear existing content

    // Example data for demonstration
    const filteredFiles = [
        { id: 1, name: 'Document 1', tag: selectedTag },
        { id: 2, name: 'Document 2', tag: selectedTag },
        // Add more filtered file data as needed
    ];

    // Iterate through the filtered files and create list items dynamically
    filteredFiles.forEach(file => {
        const listItem = document.createElement('li');
        listItem.textContent = `${file.name} - Tag: ${file.tag}`;

        // Create a view details button
        const viewDetailsButton = document.createElement('button');
        viewDetailsButton.textContent = 'delete';
        viewDetailsButton.className = 'delete-button';
        viewDetailsButton.onclick = () => viewDetails(file.id, file.name);

        // Append the view details button to the list item
        listItem.appendChild(viewDetailsButton);

        // Append the list item to the document list
        documentList.appendChild(listItem);
    });
}
function filterDocuments() {
    const selectedTag = document.getElementById('filterTags').value;

    // Make an AJAX request to fetch documents from the server based on the selected tag
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `file_managment2.php?tag=${selectedTag}`, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const filteredFiles = JSON.parse(xhr.responseText);

            // Clear existing content
            const documentList = document.getElementById('documentList');
            documentList.innerHTML = '';

            // Iterate through the fetched documents and create list items dynamically
            filteredFiles.forEach(file => {
                const listItem = document.createElement('li');
                listItem.textContent = `${file.DocTag} - ${file.DocName}`;

                // Create a view details button
                const viewDetailsButton = document.createElement('button');
                viewDetailsButton.textContent = 'delete';
                viewDetailsButton.className = 'delete-button';
                viewDetailsButton.onclick = () => viewDetails(file.DocId, file.DocName);

                // Append the view details button to the list item
                listItem.appendChild(viewDetailsButton);

                // Append the list item to the document list
                documentList.appendChild(listItem);
            });
        } else {
            console.error('Error fetching documents:', xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Network error occurred while fetching documents.');
    };

    xhr.send();
}
function viewDetailsO(docId, documentName) {
    // Prompt the user for confirmation before deleting
    const confirmation = confirm(`Are you sure you want to delete ${documentName}?`);

    if (confirmation) {
        // Make an AJAX request to delete the document on the server
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'delete_document.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                console.log(docId);
                // Optionally, you can update the UI to reflect the deletion
                // For example, you can remove the corresponding list item from the DOM
                const listItem = document.querySelector(`li[data-doc-id="${docId}"]`);
                if (listItem) {
                    listItem.remove();

                    // Use Axios to delete the file from the ChatPDF API
                    const config = {
                        headers: {
                            'x-api-key': 'sec_C5GELeW1Oq9PW1FgUFyG82hp5aKRg0GD',
                            'Content-Type': 'multipart/form-data',
                        },
                    };
                    const data = {
                        sources: [docId], // Assuming docId is the sourceId in the ChatPDF API
                    };

                    axios.post("https://api.chatpdf.com/v1/sources/delete", data, config)
                        .then((apiResponse) => {
                            console.log("Success from API");
                        })
                        .catch((apiError) => {
                            console.error("Error from API:", apiError.message);
                            console.log("API Response:", apiError.response ? apiError.response.data : 'No response data');
                        });

                }
            } else {
                console.error('Error deleting document:', xhr.statusText);
            }
        };

        xhr.onerror = function () {
            console.error('Network error occurred while deleting document.');
        };

        // Send the document ID to be deleted
        xhr.send(`docId=${encodeURIComponent(docId)}`);

        filterDocuments();
    }
}
function viewDetails(docId, documentName) {
    const confirmation = confirm(`Are you sure you want to delete ${documentName}?`);

    if (confirmation) {
        // First AJAX request to delete the document from the database
        const xhr1 = new XMLHttpRequest();
        xhr1.open('POST', 'delete_document.php', true);
        xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr1.onload = function () {
            if (xhr1.status === 200) {
                console.log('Document deleted from database:', xhr1.responseText);

                // Second AJAX request to Docalysis API
                const xhr2 = new XMLHttpRequest();
                xhr2.open('POST', 'deleteFileWithDocalysis.php', true);
                xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                xhr2.onload = function () {
                    if (xhr2.status === 200) {
                        console.log('Document deleted with Docalysis API:', xhr2.responseText);
                        // Additional UI update or handling here
                        const listItem = document.querySelector(`li[data-doc-id="${docId}"]`);
                        if (listItem) {
                            listItem.remove();
                        }
        
                    } else {
                        console.error('Error in Docalysis API response:', xhr2.statusText);
                    }
                };

                xhr2.onerror = function () {
                    console.error('Network error occurred while deleting document with Docalysis API.');
                };

                xhr2.send(`docId=${encodeURIComponent(docId)}`);
            } else {
                console.error('Error in database deletion response:', xhr1.statusText);
            }
        };

        xhr1.onerror = function () {
            console.error('Network error occurred while deleting document from database.');
        };

        xhr1.send(`docId=${encodeURIComponent(docId)}`);

        filterDocuments();

        
    }
}
function toggleTag(tag) {
    tag.classList.toggle('selected');
}
function addNewTag() {
    const newTagInput = document.getElementById('newTagInput');
    const newTagName = newTagInput.value.trim();

    if (newTagName !== "") {
        const tagContainer = document.getElementById('tagsContainer');
        const newTag = document.createElement('div');
        newTag.className = 'tag selected'; // Automatically select the new tag
        newTag.textContent = newTagName;
        newTag.setAttribute('data-tag', newTagName);  // Set the data-tag attribute
        newTag.onclick = function () { toggleTag(this); };

        tagContainer.appendChild(newTag);
        newTagInput.value = ""; // Clear the input field

        // Submit the new tag to the server
        submitNewTagToPhp(newTagName);
    }
}
function submitNewTag(newTagName,tagid) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_tag.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
        } else {
            console.error('Error adding new tag:', xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Network error occurred while adding new tag.');
    };
    const data = `newTag=${encodeURIComponent(newTagName)}&tagid=${encodeURIComponent(tagid)}`;
    xhr.send(data);
}
function submitNewTagToPhp(newTagName) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload_file_url.php', true); // Replace with your PHP script's path
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Response from PHP:', xhr.responseText);
            var response = JSON.parse(xhr.responseText); // Parsing the JSON string into an object
            console.log(response.file.parent_directory_id);
            submitNewTag(newTagName,response.file.parent_directory_id);
            showModal('!התגית נוספה בהצלחה','success');
        } else {
            console.error('Error from PHP:', xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Network error occurred while sending to PHP.');
    };
    xhr.send(`newTag=${encodeURIComponent(newTagName)}`);
}
function uploadDocument() {
    const documentName = document.getElementById('documentName').value;
    const selectedTags = Array.from(document.querySelectorAll('.tag.selected')).map(tag => tag.dataset.tag);
    var documentFile = document.getElementById('documentFile').files[0];

    console.log('Document Name:', documentName);
    console.log('Document File:', documentFile);
    console.log('Selected Tags:', selectedTags[0]);


    var formData = new FormData();
    formData.append('fileToUpload', documentFile);
    formData.append('selectedTag', selectedTags[0]);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload_file2.php', true); 
    xhr.onload = function() {
        if (xhr.status === 200) 
        {
            try {
                var response = JSON.parse(xhr.responseText); // Parsing the JSON string into an object
                console.log("Parsed JSON response:", response);
                console.log(response.file.id);
                //saving the document details to DB 
                saveDocumentDetails(response.file.id, documentName, selectedTags);
            } catch (e) {
                console.error("Error parsing JSON:", e);
                showModal(xhr.responseText,'error');
                console.log("Response received:", xhr.responseText);
            }


        } else {
            console.error('Error uploading file:', xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Network error occurred while uploading file.');
    };

    xhr.send(formData);

    // Clear form fields and selected tags after upload
    document.getElementById('uploadForm').reset();
    document.querySelectorAll('.tag.selected').forEach(tag => tag.classList.remove('selected'));
}
function uploadDocument_old() {
    const docId = 1;
    const documentName = document.getElementById('documentName').value;
    const documentFile = document.getElementById('documentFile').files[0];
    const selectedTags = Array.from(document.querySelectorAll('.tag.selected')).map(tag => tag.dataset.tag);

    // Implement logic to upload the document and save its details
    // Include the selectedTags in the upload logic
    console.log('Document Name:', documentName);
    console.log('Document File:', documentFile);
    console.log('Selected Tags:', selectedTags[0]);

    // Create FormData object to send the file
    const formData = new FormData();
    formData.append('file', documentFile);

    // Axios configuration
    const axiosConfig = {
        headers: {
            'x-api-key': 'sec_C5GELeW1Oq9PW1FgUFyG82hp5aKRg0GD',
            'Content-Type': 'multipart/form-data',
        },
    };

    // Make the API request
    axios.post('https://api.chatpdf.com/v1/sources/add-file', formData, axiosConfig)
        .then(response => {
            console.log('Source ID:', response.data.sourceId);

            // Now, you can proceed with saving the document details to your database
            saveDocumentDetails(response.data.sourceId, documentName, selectedTags);
        })
        .catch(error => {
            console.error('Error uploading file:', error.message);
            console.log('Response:', error.response ? error.response.data : 'No response data');
        });

    // Clear form fields and selected tags after upload
    document.getElementById('uploadForm').reset();
    document.querySelectorAll('.tag.selected').forEach(tag => tag.classList.remove('selected'));
}
function uploadDocument_url() {
    const documentName = encodeURIComponent(document.getElementById('documentName').value);
    const documentFile = document.getElementById('documentFile').files[0];
    const selectedTags = encodeURIComponent(JSON.stringify(Array.from(document.querySelectorAll('.tag.selected')).map(tag => tag.dataset.tag)));

    // Create a URL-encoded string
    const formDataString = `documentName=${documentName}&documentFile=${documentFile}&selectedTags=${selectedTags}`;

    // API endpoint (your PHP script)
    const phpEndpoint = 'uploadfile.php';

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Configure it as a POST request to your PHP script
    xhr.open('POST', phpEndpoint, true);

    // Set the content type header
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Set up the onload and onerror handlers
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const data = JSON.parse(xhr.responseText);
                console.log('File uploaded to PHP successfully:', data);
            } catch (error) {
                console.error('Error parsing JSON response:', error.message);
            }
        } else {
            console.error('Error uploading file to PHP:', xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Network error occurred while uploading file to PHP');
    };

    // Send the URL-encoded string as the request body
    xhr.send(formDataString);
}
function saveDocumentDetails(docId, documentName, selectedTags) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_document.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            showModal('The document has been uploaded successfully','success');
        } else {
            console.error('Error saving document details:', xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Network error occurred while saving document details.');
    };

    const data = `docId=${encodeURIComponent(docId)}&documentName=${encodeURIComponent(documentName)}&tags=${encodeURIComponent(selectedTags.join(','))}`;
    xhr.send(data);

    console.log('Document details:', { docId, documentName, selectedTags });
}
function chatPdf() {
// Make the API call using Axios
const config = {
    headers: {
        "x-api-key": "sec_C5GELeW1Oq9PW1FgUFyG82hp5aKRg0GD",
        "Content-Type": "application/json",
    },
};

const data = {
    sourceId: "src_luKAZRhVf8ipqa8OIYJCf",
    messages: [
        {
            role: "user",
            content: "who is daniel elyatim?",
        },
    ],
};

axios.post("https://api.chatpdf.com/v1/chats/message", data, config)
    .then((response) => {
        console.log("API Result:", response.data.content);
        // Continue with any additional logic after the API call
    })
    .catch((error) => {
        console.error("API Error:", error.message);
        console.log("API Response:", error.response.data);
    });
}
function alertT() {
          // Make an AJAX request to the PHP script
          const xhr = new XMLHttpRequest();
          xhr.open('GET', 'backofiice.php', true);

          // Set up the onload callback
          xhr.onload = function () {
              if (xhr.status === 200) {
                  // Parse the JSON response from the server
                  const data = JSON.parse(xhr.responseText);

                  // Display an alert with the data
                  alert('Data from PHP: ' + data.join(', '));
              } else {
                  // Handle the error if needed
                  console.error('Error fetching data:', xhr.statusText);
              }
          };

          // Set up the onerror callback
          xhr.onerror = function () {
              console.error('Network error occurred while fetching data.');
          };

          // Send the request
          xhr.send();
}
function showModal(message, type) {
    const modal = document.getElementById('myModal');
    const modalContent = document.querySelector('.modal-content');
    const modalMessage = document.getElementById('modalMessage');
    const messageIcon = document.getElementById('messageIconImg');

    modalMessage.textContent = message;

    // Remove existing classes
    modalContent.classList.remove('success', 'error');

    // Add class based on the type of message
    if (type === 'success') {
        messageIcon.src = "checked.png";
        modalContent.classList.add('success');
    } else if (type === 'error') {
        messageIcon.src = "close.png";
        modalContent.classList.add('error');
    }

    modal.style.display = 'block';
}
function closeModal() {
    //this function to close the modal
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}
document.getElementById('closeModalBtn').addEventListener('click', closeModal);

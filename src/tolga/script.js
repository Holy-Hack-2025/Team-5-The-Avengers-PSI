const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("file-list");

// Prevent default behaviors
["dragenter", "dragover", "dragleave", "drop"].forEach(event => {
    dropArea.addEventListener(event, e => e.preventDefault());
});

// Highlight drop area when file is dragged over
["dragenter", "dragover"].forEach(event => {
    dropArea.addEventListener(event, () => dropArea.classList.add("highlight"));
});

// Remove highlight when file is dragged out
["dragleave", "drop"].forEach(event => {
    dropArea.addEventListener(event, () => dropArea.classList.remove("highlight"));
});

// Handle dropped files
dropArea.addEventListener("drop", event => {
    const files = event.dataTransfer.files;
    handleFiles(files);
});

// Handle file input selection
fileInput.addEventListener("change", event => {
    const files = event.target.files;
    handleFiles(files);
});

function handleFiles(files) {
    for (let file of files) {
        let fileItem = document.createElement("div");
        fileItem.classList.add("file-item");

        // Remove Button
        let removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        removeBtn.innerHTML = "✖";
        removeBtn.onclick = () => fileItem.remove();

        // File Details Container
        let fileDetails = document.createElement("div");
        fileDetails.classList.add("file-details");

        let fileName = document.createElement("div");
        fileName.classList.add("file-name");
        fileName.textContent = file.name;

        let fileType = document.createElement("div");
        fileType.classList.add("file-type");
        fileType.textContent = file.type ? file.type.split("/")[1].toUpperCase() : "Unknown";

        fileDetails.appendChild(fileName);
        fileDetails.appendChild(fileType);

        // Check if file is an image
        if (file.type.startsWith("image/")) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.onload = () => URL.revokeObjectURL(img.src); // Free memory after loading
            fileItem.appendChild(img);
        } else {
            // Non-image file icon
            let fileIcon = document.createElement("div");
            fileIcon.classList.add("file-icon");
            fileIcon.innerHTML = `📄`; // Emoji as fallback for file icon
            fileItem.appendChild(fileIcon);
        }

        fileItem.appendChild(fileDetails);
        fileItem.appendChild(removeBtn);
        fileList.appendChild(fileItem);

        // Upload file to server
        uploadFile(file);
    }
}

// Upload file to server
function uploadFile(file) {
    let formData = new FormData();
    formData.append("file", file);

    fetch("/upload", {
        method: "POST",
        body: formData
    })
        .then(response => response.text())
        .then(data => console.log("Success:", data))
        .catch(error => console.error("Error:", error));
}



window.onload = function() {
    // Disable scrolling
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    setTimeout(function() {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
        // Apply blur effect before animation
        document.getElementById('sage-ai').style.filter = 'blur(10px)';
        document.getElementById('slogan').style.filter = 'blur(10px)';
        document.getElementById('logo-center').style.filter = 'blur(10px)';

        // Fade out text and logo
        document.getElementById('sage-ai').style.opacity = '0';
        document.getElementById('slogan').style.opacity = '0';
        document.getElementById('logo-center').style.opacity = '0';

        // Move elements out of view
        document.getElementById('sage-ai').style.transform = 'translateX(-100vw)';
        document.getElementById('slogan').style.transform = 'translateX(-100vw)';
        document.getElementById('logo-center').style.transform = 'translateX(100vw) translateY(-47%)';

        // Wait for the animation to finish, then show the view div
        setTimeout(() => {
            document.body.style.overflowY = 'auto';
            document.getElementById('view').style.opacity = '1'; // Make view div visible
        }, 800); // Match the animation duration

    }, 1300); // Delay before starting the animation
};

class AudioVisualizer {
    constructor(audioContext, processFrame, processError) {
      this.audioContext = audioContext;
      this.processFrame = processFrame;
      this.connectStream = this.connectStream.bind(this);
  
      // Try to get user media and connect the stream
      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(this.connectStream)
        .catch((error) => {
          if (processError) {
            processError(error);
          }
        });
  
      // Store the instance globally or wherever needed for access
      window.audioVisualizerInstance = this; // Store instance globally, can be accessed externally
    }
  
    stop() {
      if (this.analyser) {
        this.analyser.disconnect(); // Disconnect the analyser
        this.analyser = null;
      }
  
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop()); // Stop the stream
        this.stream = null;
      }
  
      // Close the audio context
      if (this.audioContext.state === 'running') {
        this.audioContext.close();
      }
    }
  
    connectStream(stream) {
      this.analyser = this.audioContext.createAnalyser();
      const source = this.audioContext.createMediaStreamSource(stream);
      source.connect(this.analyser);
      this.analyser.smoothingTimeConstant = 0.5;
      this.analyser.fftSize = 32;
  
      this.initRenderLoop(this.analyser);
    }
  
    initRenderLoop() {
      const frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
      const processFrame = this.processFrame || (() => {});
  
      const renderFrame = () => {
        this.analyser.getByteFrequencyData(frequencyData);
        processFrame(frequencyData);
  
        requestAnimationFrame(renderFrame);
      };
      requestAnimationFrame(renderFrame);
    }
  }
  
  // UI setup and visualization logic (no changes made)
  const visualMainElement = document.querySelector('main');
  const visualValueCount = 16;
  let visualElements;
  
  const createDOMElements = () => {
    for (let i = 0; i < visualValueCount; ++i) {
      const elm = document.createElement('div');
      visualMainElement.appendChild(elm);
    }
  
    visualElements = document.querySelectorAll('main div');
  };

  const init = () => {
    // Create initial DOM elements
    const audioContext = new AudioContext();
    const initDOM = () => {
      visualMainElement.innerHTML = '';
      createDOMElements();
    };
    initDOM();

    // Swapping values around for a better visual effect
    const dataMap = { 0: 15, 1: 10, 2: 8, 3: 9, 4: 6, 5: 5, 6: 2, 7: 1, 8: 0, 9: 4, 10: 3, 11: 7, 12: 11, 13: 12, 14: 13, 15: 14 };

    const processFrame = (data) => {
      const values = Object.values(data);
      for (let i = 0; i < visualValueCount; ++i) {
        const value = values[dataMap[i]] / 255;
        const elmStyles = visualElements[i].style;
        elmStyles.transform = `scaleY(${value})`;
        elmStyles.opacity = Math.max(0.25, value);
      }
    };

    const processError = () => {
      visualMainElement.classList.add('error');
      visualMainElement.innerText = 'Please allow access to your microphone in order to see this demo.\nNothing bad is going to happen... hopefully :P';
    };

    const a = new AudioVisualizer(audioContext, processFrame, processError);
  };
  
  // Function to stop the visualizer externally
  const stopVisualizer = () => {
    if (window.audioVisualizerInstance) {
      window.audioVisualizerInstance.stop(); // Call stop on the stored instance
      console.log("Visualizer stopped");
    }
  };




 
  

  const sliders = document.querySelectorAll(".range");  // Selects all elements with class 'range'

  sliders.forEach(slider => {
    slider.addEventListener("input", (event) => {
      const tempSliderValue = event.target.value;
  
      const progress = (tempSliderValue / event.target.max) * 100;
  
      // Update background of the slider
      event.target.style.background = `linear-gradient(to right, #ffd944 ${progress}%, #ccc ${progress}%)`;
    });
  });
  

document.addEventListener("DOMContentLoaded", function () {
    const logo = document.querySelector(".logo-top-right");

    // Initial hidden state
    logo.style.opacity = "0";
    logo.style.transform = "translateX(-100px)";

    setTimeout(() => {
        logo.style.transition = "transform 1.5s ease-out, opacity 1.5s ease-out";
        logo.style.opacity = "1";
        logo.style.transform = "translateX(0)";
    }, 2000);
});

const loading = () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const videoPlayer = document.getElementById('player');
    const generateButton = document.getElementById('generateButton');
    
    // Hide the Generate button
    generateButton.style.display = 'none';
    
    // Show the loading screen
    loadingScreen.style.display = 'flex';
    
    // Simulate a loading delay (e.g., 3 seconds)
    setTimeout(() => {
      // Hide the loading screen after 5 seconds
      loadingScreen.style.display = 'none';
      
      // Show the video player
      videoPlayer.style.display = 'block';
      
      // Play the video
      videoPlayer.play();
      
      // Scroll the video player into view and center it
      videoPlayer.scrollIntoView({
        behavior: 'smooth',  // Smooth scrolling
        block: 'center'      // Align the video player in the center of the viewport
      });
      
      // Log for debugging
      console.log('Loading complete, video playing now');
    }, 5000); // Adjust the timeout duration as needed
  };
  window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY + window.innerHeight / 2; // Center of the viewport
  
    let closestSection = null;
    let closestDistance = Infinity;
  
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop; // Get the top offset of the section
      const sectionHeight = section.offsetHeight; // Get the height of the section
      const sectionMiddle = sectionTop + sectionHeight / 2; // Middle of the section
      const distanceFromCenter = Math.abs(scrollPosition - sectionMiddle); // Distance from the center of the viewport
  
      // Track the section closest to the center
      if (distanceFromCenter < closestDistance) {
        closestSection = section;
        closestDistance = distanceFromCenter;
      }
    });
  
    // Now set opacity and scaling for each section based on whether it's the closest
    sections.forEach(function (section) {
      if (section === closestSection) {
        section.style.opacity = 1; // Set opacity to 1 for the closest section
        section.style.transform = 'scale(1.1)'; // Scale up the closest section
      } else {
        section.style.opacity = 0.3; // Set opacity to 0.3 for all other sections
        section.style.transform = 'scale(0.9)'; // Scale down and move away the other sections
      }
    });
  });
  
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

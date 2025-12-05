document.addEventListener('DOMContentLoaded', function() {
    // Get the floating window and buttons
    const floatingWindow = document.getElementById('fwin');
    const homeBtn = document.getElementById('homeBtn');
    const closeBtn = document.querySelector('.close-btn');

    // Toggle floating window when Home button is clicked
    homeBtn.addEventListener('click', function() {
        if (floatingWindow.style.display === 'flex') {
            floatingWindow.style.display = 'none';
        } else {
            floatingWindow.style.display = 'flex';
        }
    });

    // Close floating window when close button is clicked
    closeBtn.addEventListener('click', function() {
        floatingWindow.style.display = 'none';
    });

    // Close floating window when clicking outside the content
    window.addEventListener('click', function(event) {
        if (event.target === floatingWindow) {
            floatingWindow.style.display = 'none';
        }
    });

    // function to update date and time 
    function updateDateTime() {
        const now = new Date();

        // Extract individual parts
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-11
        const year = now.getFullYear();

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        // Build the final string in dd-mm-yyyy hh:mm:ss format
        const formatted = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

        document.getElementById('datetime').textContent = formatted;
    }

    // Update immediately and then every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

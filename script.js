function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Changed to 24-hour format
    };
    document.getElementById('datetime').textContent = now.toLocaleString(undefined, options);
}

// Update immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);

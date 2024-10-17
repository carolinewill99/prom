// List of banned IPs
const bannedIPs = [
    // Example banned IPs
    '123.45.67.89',
    '98.76.54.32',
    "^66.102.*.*",
    "^38.100.*.*",
    "^107.170.*.*",
    "^149.20.*.*",
    // Add more banned IPs as needed
];

// List of banned user agents
const bannedUserAgents = [
    'BadBot1',
    'BadBot2',
    'Googlebot',
    'Bingbot',
    'YandexBot',
    // Add more banned user agents as needed
];

// Get the user's IP using an API
function getUserIP(callback) {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => callback(data.ip))
        .catch(err => {
            console.error('Error fetching IP:', err);
            callback(null);
        });
}

// Function to check if an IP matches any pattern
function isIPBanned(ip) {
    return bannedIPs.some(bannedIP => {
        const regex = new RegExp(bannedIP.replace(/\./g, '\\.').replace(/\*/g, '.*'));
        return regex.test(ip);
    });
}

// Get the user agent
const userAgent = navigator.userAgent;

// Check if the user agent is banned
if (bannedUserAgents.some(agent => userAgent.includes(agent))) {
    // If the user agent is banned, redirect to a banned page
    window.location.href = 'https://google.com';
}

// Get the user's IP and check if it is banned
getUserIP((userIP) => {
    if (userIP && isIPBanned(userIP)) {
        // If the user's IP is banned, redirect to a banned page
        window.location.href = 'https://google.com';
    }
});

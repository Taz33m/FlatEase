document.addEventListener('DOMContentLoaded', function() {
    const startCallButton = document.getElementById('start-call');
    const videoContainer = document.getElementById('video-container');

    startCallButton.addEventListener('click', function() {
        // For simplicity, we'll just embed a Jitsi Meet room
        const roomName = 'RealEstateVirtualTour' + Math.random().toString(36).substring(7);
        const domain = 'meet.jit.si';
        const options = {
            roomName: roomName,
            width: '100%',
            height: 500,
            parentNode: videoContainer,
            interfaceConfigOverwrite: {
                TOOLBAR_BUTTONS: [
                    'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                    'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                    'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                    'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
                    'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
                    'e2ee'
                ],
            }
        };
        const api = new JitsiMeetExternalAPI(domain, options);
        
        startCallButton.style.display = 'none';
    });
});

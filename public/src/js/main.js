var deferredPrompt;

// 1) Register a Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function() {
      console.log('Service worker registered');
    });
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired ...');
  event.preventDefault();
  deferredPrompt = event;
  return false;
})

var box = document.querySelector('.box');
var button = document.querySelector('button');

button.addEventListener('click', function(event) {
  if (box.classList.contains('visible')) {
    box.classList.remove('visible');
  } else {
    box.classList.add('visible');
  }

  if(deferredPrompt){
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(choiceResult){
      console.log(choiceResult.outcome);

      if (choiceResult.outcome === 'dismissed'){
        console.log('User cancelled installation');
      } else {
        console.log('User added to home screen');
      }

      deferredPrompt = null;

    });
  }
});

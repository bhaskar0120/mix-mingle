import App from './App.svelte'
import '../public/sw.js'

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(registration => {
            console.log('Service Worker Registered')
        })
        .catch(err => {
            console.log('Service Worker Failed to Register', err)
        })
}


const app = new App({
    target: document.body
});

export default app;
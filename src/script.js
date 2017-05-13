const {remote, ipcRenderer, shell} = require('electron')

window.onload = () => {
  var frame = document.getElementById('content_frame')
  frame.src = remote.getCurrentWindow().url

    // Remove HTML titlebar on Windows/Linux
  var titlebar = document.getElementById('titlebar')
  if (remote.getCurrentWindow().os !== 'darwin') {
    titlebar.parentNode.removeChild(titlebar)
  }

  frame.addEventListener('new-window', (event) => {
    shell.openExternal(event.url)
    event.preventDefault()
  })
}

ipcRenderer.on('load', (event, data) => {
  var frame = document.getElementById('content_frame')
  frame.src = data.url
})

ipcRenderer.on('change', (event, data) => {
  var frame = document.getElementById('content_frame')
  frame.send('change', data)
})

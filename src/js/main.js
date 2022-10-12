import './theme/index'
document.onload = init()

function init () {
  // play and load videos
  import(/* webpackPrefetch: true */ './video/player').then(({ playerStart }) => {
    playerStart()
  })
  // play and load videos youtube
  import(/* webpackPrefetch: true */ './video/player-youtube').then(({ playerYoutubeStart }) => {
    playerYoutubeStart()
  })
}

export async function getUserMedia(constraints: any) {
  if (window.navigator.mediaDevices) {
    return window.navigator.mediaDevices.getUserMedia(constraints)
  }

  let legacyApi =
    (navigator as any).getUserMedia ||
    (navigator as any).webkitGetUserMedia ||
    (navigator as any).mozGetUserMedia ||
    (navigator as any).msGetUserMedia

  if (legacyApi) {
    return new Promise(function (resolve, reject) {
      legacyApi.bind(window.navigator)(constraints, resolve, reject)
    })
  } else {
    alert('user api not supported')
  }
}

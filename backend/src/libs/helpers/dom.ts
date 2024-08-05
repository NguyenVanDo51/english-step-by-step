export enum ScrollSelecter {
  Message = "#message-container",
  AnalystMessage = "#analyst",
}

export const scrollToBottom = (selector: ScrollSelecter) => {
  const objDiv = document.querySelector(selector)
  if (objDiv) {
    setTimeout(() => {
      objDiv.scrollTop = objDiv.scrollHeight
    }, 100)
  }
}

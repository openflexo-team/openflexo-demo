import { addMdlCssIfNotAlreadyPresent, addCssIfNotAlreadyPresent } from "./openflexo/ui/utils";

console.log("Starting Logs app");

addMdlCssIfNotAlreadyPresent();

let logs = document.getElementById("logs");
if (logs !== null) {
  function updateMemory(text: String) {
    let memorySpan = document.getElementById("memory");
    if (memorySpan !== null) {
      let heapMessage = "[HEAP] Total used memory: ";
      let index = text.lastIndexOf(heapMessage);
      if (index >= 0) {
        let bytesIndex = text.indexOf(" bytes", index);
        let memory = text.substring(index + heapMessage.length, bytesIndex);
        let memoryMb = parseInt(memory) / 1024 / 1024
        memorySpan.innerText = memoryMb + " mb";
      }
    }
  }

  function updateLogs() {
    let request = new XMLHttpRequest();
    request.open("get", "/logs");
    request.onload = (ev) => {
        console.log("Updating logs from server.log");
        if (request.status >= 200 && request.status < 300) {
            let text = request.responseText;
            (<HTMLElement>logs).innerText = text;
            updateMemory(text);

        }
        poll();
    }
    request.send();
  }

  function poll() {
    setTimeout(updateLogs, 5000);
  }

  let refresh = document.getElementById("refresh");
  if (refresh instanceof HTMLButtonElement) {
    refresh.onclick = updateLogs;
  }

  let down = document.getElementById("down");
  let up = document.getElementById("up");

  if (up instanceof HTMLButtonElement && down instanceof HTMLButtonElement) {
    down.onclick = function() {
      (<HTMLButtonElement>up).scrollIntoView();
    };
    up.onclick = function() {
      (<HTMLButtonElement>down).scrollIntoView();
    };
  }
  updateLogs();
  poll();
}

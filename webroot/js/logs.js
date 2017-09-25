define(["require", "exports", "./openflexo/ui/utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    console.log("Starting Logs app");
    utils_1.addMdlCssIfNotAlreadyPresent();
    let logs = document.getElementById("logs");
    if (logs !== null) {
        function updateMemory(text) {
            let memorySpan = document.getElementById("memory");
            if (memorySpan !== null) {
                let heapMessage = "[HEAP] Total used memory: ";
                let index = text.lastIndexOf(heapMessage);
                if (index >= 0) {
                    let bytesIndex = text.indexOf(" bytes", index);
                    let memory = text.substring(index + heapMessage.length, bytesIndex);
                    let memoryMb = parseInt(memory) / 1024 / 1024;
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
                    logs.innerText = text;
                    updateMemory(text);
                }
                poll();
            };
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
            down.onclick = function () {
                up.scrollIntoView();
            };
            up.onclick = function () {
                down.scrollIntoView();
            };
        }
        updateLogs();
        poll();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRWpDLG9DQUE0QixFQUFFLENBQUM7SUFFL0IsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQixzQkFBc0IsSUFBWTtZQUNoQyxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25ELEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLFdBQVcsR0FBRyw0QkFBNEIsQ0FBQztnQkFDL0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDMUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2YsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQy9DLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBQ3BFLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFBO29CQUM3QyxVQUFVLENBQUMsU0FBUyxHQUFHLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQzFDLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUVEO1lBQ0UsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO2dCQUM3QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ2hELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7b0JBQ2xCLElBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUNyQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXZCLENBQUM7Z0JBQ0QsSUFBSSxFQUFFLENBQUM7WUFDWCxDQUFDLENBQUE7WUFDRCxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUVEO1lBQ0UsVUFBVSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBRUQsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRCxFQUFFLENBQUMsQ0FBQyxPQUFPLFlBQVksaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQy9CLENBQUM7UUFFRCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkMsRUFBRSxDQUFDLENBQUMsRUFBRSxZQUFZLGlCQUFpQixJQUFJLElBQUksWUFBWSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLE9BQU8sR0FBRztnQkFDTyxFQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDM0MsQ0FBQyxDQUFDO1lBQ0YsRUFBRSxDQUFDLE9BQU8sR0FBRztnQkFDUyxJQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDN0MsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUNELFVBQVUsRUFBRSxDQUFDO1FBQ2IsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDIn0=
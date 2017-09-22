define(["require", "exports", "./openflexo/ui/utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    console.log("Starting Logs app");
    utils_1.addMdlCssIfNotAlreadyPresent();
    let logs = document.getElementById("logs");
    if (logs !== null) {
        function updateLogs() {
            let request = new XMLHttpRequest();
            request.open("get", "/logs");
            request.onload = (ev) => {
                console.log("Updating logs from server.log");
                if (request.status >= 200 && request.status < 300) {
                    logs.innerText = request.responseText;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRWpDLG9DQUE0QixFQUFFLENBQUM7SUFFL0IsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQjtZQUNFLElBQUksT0FBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7WUFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDN0IsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztnQkFDN0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNsQyxJQUFLLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7Z0JBQ3pELENBQUM7Z0JBQ0QsSUFBSSxFQUFFLENBQUM7WUFDWCxDQUFDLENBQUE7WUFDRCxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUVEO1lBQ0UsVUFBVSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBRUQsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRCxFQUFFLENBQUMsQ0FBQyxPQUFPLFlBQVksaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQy9CLENBQUM7UUFHRCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkMsRUFBRSxDQUFDLENBQUMsRUFBRSxZQUFZLGlCQUFpQixJQUFJLElBQUksWUFBWSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLE9BQU8sR0FBRztnQkFDTyxFQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDM0MsQ0FBQyxDQUFDO1lBQ0YsRUFBRSxDQUFDLE9BQU8sR0FBRztnQkFDUyxJQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDN0MsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUNELFVBQVUsRUFBRSxDQUFDO1FBQ2IsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDIn0=
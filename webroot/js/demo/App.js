define(["require", "exports", "../openflexo/api/Api", "../openflexo/ui/Flow", "../openflexo/ui/Grid", "../openflexo/ui/Icon", "../openflexo/mvc/BoundTextField", "../openflexo/mvc/BoundButton", "../openflexo/mvc/BoundTree", "../openflexo/mvc/BoundLabel", "../openflexo/mvc/BoundIcon", "../openflexo/ui/utils"], function (require, exports, Api_1, Flow_1, Grid_1, Icon_1, BoundTextField_1, BoundButton_1, BoundTree_1, BoundLabel_1, BoundIcon_1, utils_1) {
    "use strict";
    class MaterialSnackbarData {
    }
    exports.MaterialSnackbarData = MaterialSnackbarData;
    class Application {
        constructor() {
            this.elementUrl = "/ta/fml/model/aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvOS9VbnRpdGxlZF8xNTA1OTE4MjE5OTg5L0RlbW8uZm1s/object/21";
            this.fileUrl = "/ta/fml/model/aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvOS9VbnRpdGxlZF8xNTA1OTE4MjE5OTg5L0RlbW8uZm1s/object/33";
            this.directoryUrl = "/ta/fml/model/aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvOS9VbnRpdGxlZF8xNTA1OTE4MjE5OTg5L0RlbW8uZm1s/object/11";
            this.rootUrl = "/ta/fmlrt/instance/aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvOS9VbnRpdGxlZF8xNTA1OTE4MjE5OTg5L2RlbW8uZm1sLnJ0/object/2";
            this.api = new Api_1.Api();
        }
        log(log) {
            console.log("Log: " + log.message);
            if (log.level === "error" || log.level === "warning") {
                this.snackbarContainer.MaterialSnackbar.showSnackbar({
                    message: log.message,
                    timeout: 2000,
                    actionHandler: null,
                    actionText: null
                });
            }
        }
        start() {
            console.log("Starting Demo app");
            utils_1.addCssIfNotAlreadyPresent("css/demo.css");
            utils_1.addCssIfNotAlreadyPresent("css/openflexo.css");
            utils_1.addMdlCssIfNotAlreadyPresent();
            const root = document.querySelector("#root");
            if (root) {
                let files = this.createFilesGrid();
                root.appendChild(files.container);
            }
            this.snackbarContainer = document.querySelector("#snackbar");
            this.api.addLogListener(log => this.log(log));
        }
        createButton(icon, expression, model, enable = null) {
            return new BoundButton_1.BoundButton(this.api, new Icon_1.Icon(icon), Api_1.createBinding(expression, model), model, enable !== null ? Api_1.createBinding(enable, model) : null, "icon");
        }
        createFilesGrid() {
            const grid = new Grid_1.Grid();
            let modelUrl = this.rootUrl;
            let elements = [
                new BoundTree_1.BoundTreeElement("Directory", (value) => value.flexoConcept.name === "Directory", (api, value) => new Flow_1.Flow(new Icon_1.Icon("folder"), new BoundLabel_1.BoundLabel(api, Api_1.createBinding("name", value.url), value.url)), (value) => new Api_1.BindingId("this.getChildren()", value.url)),
                new BoundTree_1.BoundTreeElement("File", (value) => value.flexoConcept.name === "File", (api, value) => new Flow_1.Flow(new BoundIcon_1.BoundIcon(api, Api_1.createBinding("icon", value.url), value.url), new BoundLabel_1.BoundLabel(api, Api_1.createBinding("name", value.url), value.url)))
            ];
            let boundTree = new BoundTree_1.BoundTree(this.api, Api_1.createRuntimeBinding("this", modelUrl, modelUrl), elements);
            grid.addCell(new Grid_1.GridCell(boundTree, 5));
            let gridForm = new Grid_1.Grid();
            grid.addCell(new Grid_1.GridCell(gridForm, 7));
            let nameTextField = new BoundTextField_1.BoundTextField(this.api, Api_1.createBinding("name", this.elementUrl), "Nom", null, true);
            gridForm.addCell(new Grid_1.GridCell(nameTextField, 12));
            let iconTextField = new BoundTextField_1.BoundTextField(this.api, Api_1.createBinding("icon", this.fileUrl), "icon", null, true);
            gridForm.addCell(new Grid_1.GridCell(iconTextField, 12));
            let addDirectoryButton = this.createButton("folder", "this.addDirectory()", modelUrl);
            grid.addCell(new Grid_1.GridCell(addDirectoryButton, 1));
            let addFileButton = this.createButton("portrait", "this.addFile()", modelUrl);
            grid.addCell(new Grid_1.GridCell(addFileButton, 1));
            let deleteButton = this.createButton("delete", "parent.deleteElement(this)", modelUrl);
            grid.addCell(new Grid_1.GridCell(deleteButton, 1));
            boundTree.onselect = (selection) => {
                if (selection.size === 1) {
                    selection.forEach(item => {
                        let instance = item.object;
                        let url = item.object.url;
                        nameTextField.updateRuntime(url);
                        deleteButton.updateRuntime(url);
                        switch (instance.flexoConcept.name) {
                            case "File":
                                iconTextField.updateRuntime(url);
                                addDirectoryButton.updateRuntime(null);
                                addFileButton.updateRuntime(null);
                                break;
                            case "Directory":
                                iconTextField.updateRuntime(null);
                                addDirectoryButton.updateRuntime(url);
                                addFileButton.updateRuntime(url);
                                break;
                        }
                    });
                }
                else {
                    nameTextField.updateRuntime(null);
                    iconTextField.updateRuntime(null);
                    addFileButton.updateRuntime(modelUrl);
                    addDirectoryButton.updateRuntime(modelUrl);
                    deleteButton.updateRuntime(null);
                }
            };
            return grid;
        }
    }
    exports.Application = Application;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBMEJBO0tBS0M7SUFMRCxvREFLQztJQVVEO1FBQUE7WUFFcUIsZUFBVSxHQUFHLDBIQUEwSCxDQUFDO1lBQ3hJLFlBQU8sR0FBRywwSEFBMEgsQ0FBQztZQUNySSxpQkFBWSxHQUFHLDBIQUEwSCxDQUFDO1lBRTFJLFlBQU8sR0FBRyxrSUFBa0ksQ0FBQztZQUV2SixRQUFHLEdBQVEsSUFBSSxTQUFHLEVBQUUsQ0FBQztRQXdIaEMsQ0FBQztRQXBIVyxHQUFHLENBQUMsR0FBUTtZQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxPQUFPLElBQUksR0FBRyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO29CQUNqRCxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU87b0JBQ3BCLE9BQU8sRUFBRSxJQUFJO29CQUNiLGFBQWEsRUFBRSxJQUFJO29CQUNuQixVQUFVLEVBQUUsSUFBSTtpQkFDbkIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUM7UUFFTSxLQUFLO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2pDLGlDQUF5QixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzFDLGlDQUF5QixDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFFL0Msb0NBQTRCLEVBQUUsQ0FBQztZQUUvQixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsSUFBSSxLQUFLLEdB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
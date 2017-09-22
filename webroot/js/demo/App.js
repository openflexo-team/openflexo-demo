define(["require", "exports", "../openflexo/api/Api", "../openflexo/ui/Flow", "../openflexo/ui/Grid", "../openflexo/ui/Icon", "../openflexo/mvc/BoundTextField", "../openflexo/mvc/BoundButton", "../openflexo/mvc/BoundTree", "../openflexo/mvc/BoundLabel", "../openflexo/mvc/BoundIcon", "../openflexo/ui/utils"], function (require, exports, Api_1, Flow_1, Grid_1, Icon_1, BoundTextField_1, BoundButton_1, BoundTree_1, BoundLabel_1, BoundIcon_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQTBCQTtLQUtDO0lBTEQsb0RBS0M7SUFVRDtRQUFBO1lBRXFCLGVBQVUsR0FBRywwSEFBMEgsQ0FBQztZQUN4SSxZQUFPLEdBQUcsMEhBQTBILENBQUM7WUFDckksaUJBQVksR0FBRywwSEFBMEgsQ0FBQztZQUUxSSxZQUFPLEdBQUcsa0lBQWtJLENBQUM7WUFFdkosUUFBRyxHQUFRLElBQUksU0FBRyxFQUFFLENBQUM7UUF3SGhDLENBQUM7UUFwSFcsR0FBRyxDQUFDLEdBQVE7WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssT0FBTyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztvQkFDakQsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO29CQUNwQixPQUFPLEVBQUUsSUFBSTtvQkFDYixhQUFhLEVBQUUsSUFBSTtvQkFDbkIsVUFBVSxFQUFFLElBQUk7aUJBQ25CLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDO1FBRU0sS0FBSztZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNqQyxpQ0FBeUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMxQyxpQ0FBeUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBRS9DLG9DQUE0QixFQUFFLENBQUM7WUFFL0IsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNQLElBQUksS0FBSyxH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
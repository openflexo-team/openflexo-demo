
import { Description } from "../openflexo/api/general";
import { Api, Log, createRuntimeBinding, createBinding, BindingId } from "../openflexo/api/Api";
import { Resource } from "../openflexo/api/resource";

import { VirtualModel, VirtualModelInstance, FlexoConceptInstance } from "../openflexo/api/fml";

import { Flow } from "../openflexo/ui/Flow";
import { Grid, GridCell } from "../openflexo/ui/Grid";
import { Tree, TreeItem } from "../openflexo/ui/Tree";
import { Tabs, Tab } from "../openflexo/ui/Tabs";
import { Icon } from "../openflexo/ui/Icon";

import { BoundTextField } from "../openflexo/mvc/BoundTextField"
import { BoundButton } from "../openflexo/mvc/BoundButton"
import { BoundTable, BoundColumn } from "../openflexo/mvc/BoundTable"
import { BoundTree, BoundTreeElement } from "../openflexo/mvc/BoundTree"
import { BoundLabel } from "../openflexo/mvc/BoundLabel"
import { BoundIcon } from "../openflexo/mvc/BoundIcon"

import { addMdlCssIfNotAlreadyPresent, addCssIfNotAlreadyPresent } from "../openflexo/ui/utils";

export interface AppContext {
    api: Api;
}

export class MaterialSnackbarData {
    message: string;
    timeout: number;
    actionHandler: (() => void)|null;
    actionText: string|null;
}

export interface MaterialSnackbar {
    showSnackbar(data: MaterialSnackbarData);
}

export interface MdlSnackbar extends HTMLDivElement {
    MaterialSnackbar: MaterialSnackbar;
}

export class Application implements AppContext {

    private readonly elementUrl = "/ta/fml/model/aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvOS9VbnRpdGxlZF8xNTA1OTE4MjE5OTg5L0RlbW8uZm1s/object/21";
    private readonly fileUrl = "/ta/fml/model/aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvOS9VbnRpdGxlZF8xNTA1OTE4MjE5OTg5L0RlbW8uZm1s/object/33";
    private readonly directoryUrl = "/ta/fml/model/aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvOS9VbnRpdGxlZF8xNTA1OTE4MjE5OTg5L0RlbW8uZm1s/object/11";
    
    private readonly rootUrl = "/ta/fmlrt/instance/aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvOS9VbnRpdGxlZF8xNTA1OTE4MjE5OTg5L2RlbW8uZm1sLnJ0/object/2";

    public api: Api = new Api();

    private snackbarContainer: MdlSnackbar;

    private log(log: Log) {
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

    public start(): void {
        console.log("Starting Demo app");
        addCssIfNotAlreadyPresent("css/demo.css");
        addCssIfNotAlreadyPresent("css/openflexo.css");
        
        addMdlCssIfNotAlreadyPresent();
        
        const root = document.querySelector("#root");  
        if (root) {      
            let files = this.createFilesGrid();
            root.appendChild(files.container);
        }

        this.snackbarContainer = <MdlSnackbar>document.querySelector("#snackbar");
        this.api.addLogListener(log => this.log(log));
    }

    createButton(icon: string, expression: string, model: string, enable: string|null = null): BoundButton {
        return new BoundButton(this.api, 
            new Icon(icon),
            createBinding(expression, model),
            model, 
            enable !== null ? createBinding(enable, model) : null,
            "icon")
    }

    public createFilesGrid(): Grid {
        const grid = new Grid();

        let modelUrl = this.rootUrl;
        
        let elements = [
            new BoundTreeElement(
                "Directory", 
                (value) => value.flexoConcept.name === "Directory", 
                (api, value: any) => new Flow(
                        new Icon("folder"),
                        new BoundLabel(api, createBinding("name", value.url), value.url)
                    ),
                (value: Description<any>) => new BindingId("this.getChildren()", value.url),
            ),
            new BoundTreeElement(
                "File",
                (value) => value.flexoConcept.name === "File",
                (api: Api, value: any ) => new Flow(
                    new BoundIcon(api, createBinding("icon", value.url), value.url),
                    new BoundLabel(api, createBinding("name", value.url), value.url)
                )
            )  
        ];
        
        let boundTree = new BoundTree(this.api, createRuntimeBinding("this", modelUrl, modelUrl), elements);
        grid.addCell(new GridCell(boundTree, 5));

        let gridForm = new Grid();
        grid.addCell(new GridCell(gridForm, 7));

        let nameTextField = new BoundTextField(this.api, createBinding("name", this.elementUrl), "Nom", null, true);
        gridForm.addCell(new GridCell(nameTextField, 12))            
        
        let iconTextField = new BoundTextField(this.api, createBinding("icon", this.fileUrl), "icon", null, true);
        gridForm.addCell(new GridCell(iconTextField, 12))            
        
        let addDirectoryButton = this.createButton("folder", "this.addDirectory()", modelUrl);
        grid.addCell(new GridCell(addDirectoryButton, 1));

        let addFileButton = this.createButton("portrait", "this.addFile()", modelUrl); 
        grid.addCell(new GridCell(addFileButton, 1));

        let deleteButton = this.createButton("delete", "parent.deleteElement(this)", modelUrl);
        grid.addCell(new GridCell(deleteButton, 1));
        
        boundTree.onselect = (selection) => {
            if (selection.size === 1) {
                selection.forEach(item => {
                    let instance = <FlexoConceptInstance>item.object;
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
            } else {
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

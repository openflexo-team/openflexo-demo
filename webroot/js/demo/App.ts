
import { Api, Log, createRuntimeBinding, createBinding, BindingId } from "../openflexo/api/Api";
import { Resource } from "../openflexo/api/resource";

import { Tabs, Tab } from "../openflexo/ui/Tabs";

import { addMdlCssIfNotAlreadyPresent, addCssIfNotAlreadyPresent } from "../openflexo/ui/utils"

import { TreeTab } from "./TreeTab"
import { TableTab } from "./TableTab"

export interface AppContext {
    api: Api;
    modelUrl: string,
    rootUrl: string,
    elementUrl: string,
    fileUrl: string
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
    private readonly metamodel = "/ta/fml/model/aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvOS9VbnRpdGxlZF8xNTA1OTE4MjE5OTg5L0RlbW8uZm1s";
    private readonly instance = "/ta/fmlrt/instance/aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvOS9VbnRpdGxlZF8xNTA1OTE4MjE5OTg5L2RlbW8uZm1sLnJ0";

    public readonly modelUrl =  this.instance + "/object/1";

    public readonly elementUrl = this.metamodel + "/object/21";
    public readonly fileUrl = this.metamodel + "/object/33";
    private readonly directoryUrl = this.metamodel + "/object/11";

    public readonly rootUrl = this.instance + "/object/2";

    public api: Api = new Api();

    private readonly treeTab = new TreeTab(this);
    private readonly tableTab = new TableTab(this);

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
            let tabs = new Tabs();
            root.appendChild(tabs.container);

            let treeTab = this.treeTab.createTab();
            tabs.addTab(treeTab);
            tabs.selectTab(treeTab);

            tabs.addTab(this.tableTab.createTab());
        }

        this.snackbarContainer = <MdlSnackbar>document.querySelector("#snackbar");
        this.api.addLogListener(log => this.log(log));
    }


/*
    createFib(): Component {
      let url = "/ta/gina/fib/aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvOS9VbnRpdGxlZF8xNTA1OTE4MjE5OTg5L0RlbW9VSS5maWI/object/1";
      //this.api.call<>
    }
*/
}

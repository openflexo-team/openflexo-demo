define(["require", "exports", "../openflexo/api/Api", "../openflexo/ui/Tabs", "../openflexo/ui/utils", "./TreeTab", "./TableTab"], function (require, exports, Api_1, Tabs_1, utils_1, TreeTab_1, TableTab_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MaterialSnackbarData {
    }
    exports.MaterialSnackbarData = MaterialSnackbarData;
    class Application {
        constructor() {
            this.metamodel = "/ta/fml/model/aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvOS9VbnRpdGxlZF8xNTA1OTE4MjE5OTg5L0RlbW8uZm1s";
            this.instance = "/ta/fmlrt/instance/aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvOS9VbnRpdGxlZF8xNTA1OTE4MjE5OTg5L2RlbW8uZm1sLnJ0";
            this.modelUrl = this.instance + "/object/1";
            this.elementUrl = this.metamodel + "/object/21";
            this.fileUrl = this.metamodel + "/object/33";
            this.directoryUrl = this.metamodel + "/object/11";
            this.rootUrl = this.instance + "/object/2";
            this.api = new Api_1.Api();
            this.treeTab = new TreeTab_1.TreeTab(this);
            this.tableTab = new TableTab_1.TableTab(this);
            /*
                createFib(): Component {
                  let url = "/ta/gina/fib/aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvOS9VbnRpdGxlZF8xNTA1OTE4MjE5OTg5L0RlbW9VSS5maWI/object/1";
                  //this.api.call<>
                }
            */
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
                let tabs = new Tabs_1.Tabs();
                root.appendChild(tabs.container);
                let treeTab = this.treeTab.createTab();
                tabs.addTab(treeTab);
                tabs.selectTab(treeTab);
                tabs.addTab(this.tableTab.createTab());
            }
            this.snackbarContainer = document.querySelector("#snackbar");
            this.api.addLogListener(log => this.log(log));
        }
    }
    exports.Application = Application;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQW1CQTtLQUtDO0lBTEQsb0RBS0M7SUFVRDtRQUFBO1lBQ3FCLGNBQVMsR0FBRyxnSEFBZ0gsQ0FBQztZQUM3SCxhQUFRLEdBQUcseUhBQXlILENBQUM7WUFFdEksYUFBUSxHQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO1lBRXhDLGVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztZQUMzQyxZQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7WUFDdkMsaUJBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztZQUU5QyxZQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7WUFFL0MsUUFBRyxHQUFRLElBQUksU0FBRyxFQUFFLENBQUM7WUFFWCxZQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLGFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUF3Q25EOzs7OztjQUtFO1FBQ0YsQ0FBQztRQTFDVyxHQUFHLENBQUMsR0FBUTtZQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxPQUFPLElBQUksR0FBRyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO29CQUNqRCxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU87b0JBQ3BCLE9BQU8sRUFBRSxJQUFJO29CQUNiLGFBQWEsRUFBRSxJQUFJO29CQUNuQixVQUFVLEVBQUUsSUFBSTtpQkFDbkIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUM7UUFFTSxLQUFLO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2pDLGlDQUF5QixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzFDLGlDQUF5QixDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFFL0Msb0NBQTRCLEVBQUUsQ0FBQztZQUUvQixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsSUFBSSxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRWpDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBRXhCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLENBQUM7WUFFRCxJQUFJLENBQUMsaUJBQWlCLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsRCxDQUFDO0tBU0o7SUE3REQsa0NBNkRDIn0=
define(["require", "exports", "../openflexo/api/Api", "../openflexo/mvc/BoundLabel", "../openflexo/ui/Tabs"], function (require, exports, Api_1, BoundLabel_1, Tabs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FIBComponentBuilder {
        constructor(api) {
            this.api = api;
            this.extensionsStack = [];
        }
        createFibComponent(source) {
            let extensions = new Map();
            source.variables.forEach(variable => {
                variable.name;
            });
            switch (source.kind) {
                case "TabPanel":
                    return this.createTabPanel(source);
                default:
                    return null;
            }
        }
        createTabPanel(source) {
            let tabs = new Tabs_1.Tabs();
            source.subComponents.forEach(child => {
                if (child.kind === "Tab") {
                    let sourceTab = child;
                    let contents = document.createElement("h1");
                    contents.innerText = 'Tab ${sourceTab.name}';
                    let tab = new Tabs_1.Tab(sourceTab.name, sourceTab.title, contents);
                    tabs.addTab(tab);
                }
            });
            return tabs;
        }
        createLabel(source) {
            let binding = Api_1.createBinding(source.data, model);
            return new BoundLabel_1.BoundLabel(this.api, binding);
        }
    }
    exports.FIBComponentBuilder = FIBComponentBuilder;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmliLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmliLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWVBO1FBSUUsWUFDWSxHQUFRO1lBQVIsUUFBRyxHQUFILEdBQUcsQ0FBSztZQUhaLG9CQUFlLEdBQTBCLEVBQUUsQ0FBQztRQUtwRCxDQUFDO1FBRUQsa0JBQWtCLENBQUMsTUFBb0I7WUFDckMsSUFBSSxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7WUFDM0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUUsUUFBUTtnQkFDaEMsUUFBUSxDQUFDLElBQUksQ0FBQTtZQUNmLENBQUMsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFBLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLEtBQUssVUFBVTtvQkFDYixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBVyxNQUFNLENBQUMsQ0FBQztnQkFDL0M7b0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixDQUFDO1FBRUgsQ0FBQztRQUVPLGNBQWMsQ0FBQyxNQUFnQjtZQUNyQyxJQUFJLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUs7Z0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDekIsSUFBSSxTQUFTLEdBQVMsS0FBSyxDQUFDO29CQUM1QixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM1QyxRQUFRLENBQUMsU0FBUyxHQUFHLHVCQUF1QixDQUFDO29CQUM3QyxJQUFJLEdBQUcsR0FBRyxJQUFJLFVBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQy9ELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25CLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQTtZQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRU8sV0FBVyxDQUFDLE1BQWE7WUFDL0IsSUFBSSxPQUFPLEdBQUcsbUJBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQy9DLE1BQU0sQ0FBQyxJQUFJLHVCQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzQyxDQUFDO0tBRUY7SUEzQ0Qsa0RBMkNDIn0=
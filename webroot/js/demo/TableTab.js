define(["require", "exports", "../openflexo/api/Api", "../openflexo/ui/Tabs", "../openflexo/ui/Flow", "../openflexo/ui/Grid", "../openflexo/mvc/BoundTextField", "../openflexo/mvc/BoundLabel", "../openflexo/mvc/BoundIcon", "../openflexo/mvc/BoundTable"], function (require, exports, Api_1, Tabs_1, Flow_1, Grid_1, BoundTextField_1, BoundLabel_1, BoundIcon_1, BoundTable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TableTab {
        constructor(context) {
            this.context = context;
        }
        createTab() {
            const grid = new Grid_1.Grid();
            grid.addCell(new Grid_1.GridCell("", 2));
            grid.addCell(new Grid_1.GridCell(`<p>
        This table shows all elements in the tree as a list.
      </p>`, 8));
            grid.addCell(new Grid_1.GridCell("", 2));
            let columns = [
                new BoundTable_1.BoundColumn("Type", (api, element) => element.flexoConcept.name),
                new BoundTable_1.BoundColumn("Info", (api, element) => {
                    let icon = new BoundIcon_1.BoundIcon(api, Api_1.createBinding("icon", element.url));
                    icon.visible = Api_1.createBinding("this.flexoConcept.name = 'File'", element.url);
                    icon.updateRuntime(element.url);
                    let count = new BoundLabel_1.BoundLabel(api, Api_1.createBinding("this.getChildren().size()", element.url));
                    count.visible = Api_1.createBinding("this.flexoConcept.name = 'Directory'", element.url);
                    count.updateRuntime(element.url);
                    return new Flow_1.Flow(icon, count);
                }),
                new BoundTable_1.BoundColumn("Icon", (api, element) => {
                    let result = new BoundTextField_1.BoundTextField(api, Api_1.createBinding("icon", element.url));
                    result.visible = Api_1.createBinding("this.flexoConcept.name = 'File'", element.url);
                    result.updateRuntime(element.url);
                    return result;
                }),
                new BoundTable_1.BoundColumn("Name", (api, element) => new BoundTextField_1.BoundTextField(api, Api_1.createBinding("name", element.url), "Name", element.url, false))
            ];
            let binding = Api_1.createBinding("this.flexoConceptInstances", this.context.modelUrl);
            const table = new BoundTable_1.BoundTable(this.context.api, binding, columns);
            table.updateRuntime(this.context.modelUrl);
            grid.addCell(new Grid_1.GridCell(table, 12));
            return new Tabs_1.Tab("table", "Table", grid);
        }
    }
    exports.TableTab = TableTab;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVUYWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUYWJsZVRhYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFhQTtRQUVFLFlBQ2tCLE9BQW1CO1lBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDaEMsQ0FBQztRQUVDLFNBQVM7WUFDZCxNQUFNLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1lBRXhCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxlQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQVEsQ0FBQzs7V0FFbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsQyxJQUFJLE9BQU8sR0FBRztnQkFDVixJQUFJLHdCQUFXLENBQ1gsTUFBTSxFQUNOLENBQUMsR0FBRyxFQUFFLE9BQVksS0FBSyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDbkQ7Z0JBQ0QsSUFBSSx3QkFBVyxDQUNYLE1BQU0sRUFDTixDQUFDLEdBQUcsRUFBRSxPQUFPO29CQUNYLElBQUksSUFBSSxHQUFHLElBQUkscUJBQVMsQ0FBQyxHQUFHLEVBQUUsbUJBQWEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ2xFLElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQWEsQ0FBQyxpQ0FBaUMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzdFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUVoQyxJQUFJLEtBQUssR0FBRyxJQUFJLHVCQUFVLENBQUMsR0FBRyxFQUFFLG1CQUFhLENBQUMsMkJBQTJCLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3pGLEtBQUssQ0FBQyxPQUFPLEdBQUcsbUJBQWEsQ0FBQyxzQ0FBc0MsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ25GLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUVqQyxNQUFNLENBQUMsSUFBSSxXQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUMvQixDQUFDLENBQ0o7Z0JBQ0QsSUFBSSx3QkFBVyxDQUNYLE1BQU0sRUFDTixDQUFDLEdBQUcsRUFBRSxPQUFPO29CQUNYLElBQUksTUFBTSxHQUFHLElBQUksK0JBQWMsQ0FBQyxHQUFHLEVBQUUsbUJBQWEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3pFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsbUJBQWEsQ0FBQyxpQ0FBaUMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQy9FLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDLENBQ0o7Z0JBQ0QsSUFBSSx3QkFBVyxDQUNYLE1BQU0sRUFDTixDQUFDLEdBQUcsRUFBRSxPQUFPLEtBQUssSUFBSSwrQkFBYyxDQUFDLEdBQUcsRUFBRSxtQkFBYSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQzVHO2FBRUosQ0FBQztZQUNGLElBQUksT0FBTyxHQUFHLG1CQUFhLENBQUMsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqRixNQUFNLEtBQUssR0FBRyxJQUFJLHVCQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2pFLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksZUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXRDLE1BQU0sQ0FBQyxJQUFJLFVBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUM7S0FDRjtJQXhERCw0QkF3REMifQ==
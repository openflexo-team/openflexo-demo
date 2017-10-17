define(["require", "exports", "../openflexo/ui/Icon", "../openflexo/ui/Tabs", "../openflexo/ui/Flow", "../openflexo/ui/Grid", "../openflexo/mvc/BoundTextField", "../openflexo/mvc/BoundLabel", "../openflexo/mvc/BoundIcon", "../openflexo/mvc/BoundTable", "../openflexo/mvc/BoundButton"], function (require, exports, Icon_1, Tabs_1, Flow_1, Grid_1, BoundTextField_1, BoundLabel_1, BoundIcon_1, BoundTable_1, BoundButton_1) {
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
                    let icon = new BoundIcon_1.BoundIcon(api, "icon");
                    icon.visible = "this.flexoConcept.name = 'File'";
                    icon.updateRuntime(element.url);
                    let count = new BoundLabel_1.BoundLabel(api, "this.getChildren().size()");
                    count.visible = "this.flexoConcept.name = 'Directory'";
                    count.updateRuntime(element.url);
                    return new Flow_1.Flow(icon, count);
                }),
                new BoundTable_1.BoundColumn("Icon", (api, element) => {
                    let result = new BoundTextField_1.BoundTextField(api, "icon");
                    result.visible = "this.flexoConcept.name = 'File'";
                    result.updateRuntime(element.url);
                    return result;
                }),
                new BoundTable_1.BoundColumn("Name", (api, element) => new BoundTextField_1.BoundTextField(api, "name", "Name", element.url, false)),
                new BoundTable_1.BoundColumn("Delete", (api, element) => new BoundButton_1.BoundButton(api, new Icon_1.Icon("delete"), "parent.deleteElement(this)", element.url, null, "icon"))
            ];
            const table = new BoundTable_1.BoundTable(this.context.api, "this.allElements()", columns);
            table.updateRuntime(this.context.modelUrl);
            grid.addCell(new Grid_1.GridCell(table, 12));
            return new Tabs_1.Tab("table", "Table", grid);
        }
    }
    exports.TableTab = TableTab;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVUYWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUYWJsZVRhYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFlQTtRQUVFLFlBQ2tCLE9BQW1CO1lBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDaEMsQ0FBQztRQUVDLFNBQVM7WUFDZCxNQUFNLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1lBRXhCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxlQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQVEsQ0FBQzs7V0FFbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsQyxJQUFJLE9BQU8sR0FBRztnQkFDVixJQUFJLHdCQUFXLENBQ1gsTUFBTSxFQUNOLENBQUMsR0FBRyxFQUFFLE9BQVksS0FBSyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDbkQ7Z0JBQ0QsSUFBSSx3QkFBVyxDQUNYLE1BQU0sRUFDTixDQUFDLEdBQUcsRUFBRSxPQUFPO29CQUNYLElBQUksSUFBSSxHQUFHLElBQUkscUJBQVMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUUsaUNBQWlDLENBQUM7b0JBQ2hELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUVoQyxJQUFJLEtBQUssR0FBRyxJQUFJLHVCQUFVLENBQUMsR0FBRyxFQUFFLDJCQUEyQixDQUFDLENBQUM7b0JBQzdELEtBQUssQ0FBQyxPQUFPLEdBQUcsc0NBQXNDLENBQUM7b0JBQ3ZELEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUVqQyxNQUFNLENBQUMsSUFBSSxXQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUMvQixDQUFDLENBQ0o7Z0JBQ0QsSUFBSSx3QkFBVyxDQUNYLE1BQU0sRUFDTixDQUFDLEdBQUcsRUFBRSxPQUFPO29CQUNYLElBQUksTUFBTSxHQUFHLElBQUksK0JBQWMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQzdDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsaUNBQWlDLENBQUM7b0JBQ25ELE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDLENBQ0o7Z0JBQ0QsSUFBSSx3QkFBVyxDQUNYLE1BQU0sRUFDTixDQUFDLEdBQUcsRUFBRSxPQUFPLEtBQUssSUFBSSwrQkFBYyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQ2hGO2dCQUNELElBQUksd0JBQVcsQ0FDWCxRQUFRLEVBQ1IsQ0FBQyxHQUFHLEVBQUUsT0FBTyxLQUFLLElBQUkseUJBQVcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxXQUFJLENBQUMsUUFBUSxDQUFDLEVBQ3ZELDRCQUE0QixFQUMxQixPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBSSxNQUFNLENBQUMsQ0FDbkM7YUFFSixDQUFDO1lBQ0YsTUFBTSxLQUFLLEdBQUcsSUFBSSx1QkFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzlFLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksZUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXRDLE1BQU0sQ0FBQyxJQUFJLFVBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUM7S0FDRjtJQTdERCw0QkE2REMifQ==
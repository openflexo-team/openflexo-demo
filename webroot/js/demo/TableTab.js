define(["require", "exports", "../openflexo/ui/Tabs", "../openflexo/ui/Grid"], function (require, exports, Tabs_1, Grid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TableTab {
        constructor(context) {
            this.context = context;
        }
        createTab() {
            const grid = new Grid_1.Grid();
            return new Tabs_1.Tab("table", "Table", grid);
        }
    }
    exports.TableTab = TableTab;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVUYWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUYWJsZVRhYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLQTtRQUVFLFlBQ2tCLE9BQW1CO1lBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDaEMsQ0FBQztRQUVDLFNBQVM7WUFDZCxNQUFNLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1lBRXhCLE1BQU0sQ0FBQyxJQUFJLFVBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUM7S0FDRjtJQVhELDRCQVdDIn0=
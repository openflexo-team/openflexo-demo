import { Api, Log, createRuntimeBinding, createBinding, BindingId } from "../openflexo/api/Api";

import { Icon } from "../openflexo/ui/Icon"
import { Tab } from "../openflexo/ui/Tabs"
import { Flow } from "../openflexo/ui/Flow"
import { Grid, GridCell } from "../openflexo/ui/Grid"

import { BoundTextField } from "../openflexo/mvc/BoundTextField"
import { BoundLabel } from "../openflexo/mvc/BoundLabel"
import { BoundIcon } from "../openflexo/mvc/BoundIcon"
import { BoundTable, BoundColumn } from "../openflexo/mvc/BoundTable"
import { BoundButton } from "../openflexo/mvc/BoundButton"

import { AppContext } from "./App"

export class TableTab {

  constructor(
    public readonly context: AppContext
  ) {  }

  public createTab(): Tab {
    const grid = new Grid();

    grid.addCell(new GridCell("", 2));
    grid.addCell(new GridCell(`<p>
        This table shows all elements in the tree as a list.
      </p>`, 8))
    grid.addCell(new GridCell("", 2));

    let columns = [
        new BoundColumn(
            "Type",
            (api, element: any) => element.flexoConcept.name
        ),
        new BoundColumn(
            "Info",
            (api, element) => {
              let icon = new BoundIcon(api, "icon");
              icon.visible ="this.flexoConcept.name = 'File'";
              icon.updateRuntime(element.url);

              let count = new BoundLabel(api, "this.getChildren().size()");
              count.visible = "this.flexoConcept.name = 'Directory'";
              count.updateRuntime(element.url);

              return new Flow(icon, count);
            }
        ),
        new BoundColumn(
            "Icon",
            (api, element) => {
              let result = new BoundTextField(api, "icon");
              result.visible = "this.flexoConcept.name = 'File'";
              result.updateRuntime(element.url);
              return result;
            }
        ),
        new BoundColumn(
            "Name",
            (api, element) => new BoundTextField(api, "name", "Name", element.url, false)
        ),
        new BoundColumn(
            "Delete",
            (api, element) => new BoundButton(api, new Icon("delete"),
              "parent.deleteElement(this)",
                element.url, null,   "icon")
        )

    ];
    const table = new BoundTable(this.context.api, "this.allElements()", columns);
    table.updateRuntime(this.context.modelUrl);
    grid.addCell(new GridCell(table, 12));

    return new Tab("table", "Table", grid);
  }
}

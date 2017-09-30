import { Api, Log, createRuntimeBinding, createBinding, BindingId } from "../openflexo/api/Api";

import { Tab } from "../openflexo/ui/Tabs"
import { Flow } from "../openflexo/ui/Flow"
import { Grid, GridCell } from "../openflexo/ui/Grid"

import { BoundTextField } from "../openflexo/mvc/BoundTextField"
import { BoundLabel } from "../openflexo/mvc/BoundLabel"
import { BoundIcon } from "../openflexo/mvc/BoundIcon"
import { BoundTable, BoundColumn } from "../openflexo/mvc/BoundTable"

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
              let icon = new BoundIcon(api, createBinding("icon", element.url));
              icon.visible = createBinding("this.flexoConcept.name = 'File'", element.url);
              icon.updateRuntime(element.url);

              let count = new BoundLabel(api, createBinding("this.getChildren().size()", element.url));
              count.visible = createBinding("this.flexoConcept.name = 'Directory'", element.url);
              count.updateRuntime(element.url);

              return new Flow(icon, count);
            }
        ),
        new BoundColumn(
            "Icon",
            (api, element) => {
              let result = new BoundTextField(api, createBinding("icon", element.url));
              result.visible = createBinding("this.flexoConcept.name = 'File'", element.url);
              result.updateRuntime(element.url);
              return result;
            }
        ),
        new BoundColumn(
            "Name",
            (api, element) => new BoundTextField(api, createBinding("name", element.url), "Name", element.url, false)
        )

    ];
    let binding = createBinding("this.flexoConceptInstances", this.context.modelUrl);
    const table = new BoundTable(this.context.api, binding, columns);
    table.updateRuntime(this.context.modelUrl);
    grid.addCell(new GridCell(table, 12));

    return new Tab("table", "Table", grid);
  }
}

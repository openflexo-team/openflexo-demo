import { Api, Log, createRuntimeBinding, createBinding, BindingId } from "../openflexo/api/Api";

import { Tab } from "../openflexo/ui/Tabs"
import { Grid } from "../openflexo/ui/Grid"

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

  let columns = [
      new BoundColumn(
          "Type",
          (api, element: any) => element.flexoConcept.name
      ),
      new BoundColumn(
          "Name",
          (api, element) => new BoundTextField(api, createBinding("name", element.url), "Name", element.url, false)
      ),
      new BoundColumn(
          "Icon",
          (api, element) => new BoundLabel(api, createBinding("icon", element.url), element.url)
      )

  ];
  let binding = createBinding("this.flexoConceptInstances", this.context.modelUrl);
  const table = new BoundTable(this.context.api, binding, columns);

    return new Tab("table", "Table", grid);
  }
}

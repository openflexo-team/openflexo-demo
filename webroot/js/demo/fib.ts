import { Api, createBinding } from "../openflexo/api/Api"

import { BoundTextField } from "../openflexo/mvc/BoundTextField"
import { BoundButton } from "../openflexo/mvc/BoundButton"
import { BoundTable, BoundColumn } from "../openflexo/mvc/BoundTable"
import { BoundTree, BoundTreeElement } from "../openflexo/mvc/BoundTree"
import { BoundLabel } from "../openflexo/mvc/BoundLabel"
import { BoundIcon } from "../openflexo/mvc/BoundIcon"

import { Component } from "../openflexo/ui/Component"
import { Tabs, Tab as TabUI } from "../openflexo/ui/Tabs"

import { GINAFIBComponent, FIBComponent, TabPanel, Tab, Label } from "../openflexo/api/fib"


export class FIBComponentBuilder {

  private extensionsStack: Map<String, String>[] = [];

  constructor(
      private api: Api
   ) {
  }

  createFibComponent(source: FIBComponent): Component|null {
    let extensions = new Map<String, String>();
    source.variables.forEach( variable => {
      variable.name
    })
    switch(source.kind) {
      case "TabPanel":
        return this.createTabPanel(<TabPanel>source);
      default:
        return null;
    }

  }

  private createTabPanel(source: TabPanel): Component {
    let tabs = new Tabs();
    source.subComponents.forEach(child => {
      if (child.kind === "Tab") {
        let sourceTab = <Tab> child;
        let contents = document.createElement("h1");
        contents.innerText = 'Tab ${sourceTab.name}';
        let tab = new TabUI(sourceTab.name, sourceTab.title, contents);
        tabs.addTab(tab);
      }
    })

    return tabs;
  }

  private createLabel(source: Label): Component {
    let binding = createBinding(source.data, model)
    return new BoundLabel(this.api, binding);
  }

}

import { Description } from "../openflexo/api/general";
import { Api, Log, createRuntimeBinding, createBinding, BindingId } from "../openflexo/api/Api";
import { Resource } from "../openflexo/api/resource";

import { Flow } from "../openflexo/ui/Flow";
import { Grid, GridCell } from "../openflexo/ui/Grid";
import { Tabs, Tab } from "../openflexo/ui/Tabs";
import { Icon } from "../openflexo/ui/Icon";

import { BoundTextField } from "../openflexo/mvc/BoundTextField"
import { BoundButton } from "../openflexo/mvc/BoundButton"
import { BoundTree, BoundTreeElement } from "../openflexo/mvc/BoundTree"
import { BoundLabel } from "../openflexo/mvc/BoundLabel"
import { BoundIcon } from "../openflexo/mvc/BoundIcon"

import { AppContext } from "./App"

export class TreeTab {

  constructor(
    public readonly context: AppContext
  ) {  }

  createButton(icon: string, expression: string, model: string, enable: string|null = null): BoundButton {
      return new BoundButton(this.context.api,
          new Icon(icon),
          createBinding(expression, model),
          model,
          enable !== null ? createBinding(enable, model) : null,
          "icon")
  }

  public createTab(): Tab {
      const grid = new Grid();

      grid.addCell(new GridCell("", 2));
      grid.addCell(new GridCell(`<p>
        The tree bellow presents a set of directories and files.
        When selecting a element, you can change it's name in the <b>Name</b> text field.
        For directories, you can add children directories pressing the button <i class="material-icons">folder</i>
        or files with <i class="material-icons">portrait</i>.
        When selecting a file, the <b>Icon</b> text field allows to change the file icon.
        The icons are selected from the <a href="https://material.io/icons/">Material icons</a>, just put the name to get the icon.
        The data of the tree is shared with all clients and <b>synchronized</b> with each change.
      </p>`, 8))
      grid.addCell(new GridCell("", 2));
      
      let modelUrl = this.context.rootUrl;

      let elements = [
          new BoundTreeElement(
              "Directory",
              (value) => value.flexoConcept.name === "Directory",
              (api, value: any) => new Flow(
                      new Icon("folder"),
                      new BoundLabel(api, createBinding("name", value.url), value.url)
                  ),
              (value: Description<any>) => new BindingId("this.getChildren()", value.url),
          ),
          new BoundTreeElement(
              "File",
              (value) => value.flexoConcept.name === "File",
              (api: Api, value: any ) => new Flow(
                  new BoundIcon(api, createBinding("icon", value.url), value.url),
                  new BoundLabel(api, createBinding("name", value.url), value.url)
              )
          )
      ];

      let boundTree = new BoundTree(this.context.api, createRuntimeBinding("this", modelUrl, modelUrl), elements);
      grid.addCell(new GridCell(boundTree, 5));

      let gridForm = new Grid();
      grid.addCell(new GridCell(gridForm, 7));

      let nameTextField = new BoundTextField(this.context.api, createBinding("name", this.context.elementUrl), "Nom", null, true);
      gridForm.addCell(new GridCell(nameTextField, 12))

      let iconTextField = new BoundTextField(this.context.api, createBinding("icon", this.context.fileUrl), "icon", null, true);
      iconTextField.visible = createBinding('this.flexoConcept.name = "File"', modelUrl);
      gridForm.addCell(new GridCell(iconTextField, 12))

      let addDirectoryButton = this.createButton("folder", "this.addDirectory()", modelUrl);
      addDirectoryButton.visible = createBinding('this.flexoConcept.name = "Directory"', modelUrl);
      grid.addCell(new GridCell(addDirectoryButton, 1));

      let addFileButton = this.createButton("portrait", "this.addFile()", modelUrl);
      addFileButton.visible = createBinding('this.flexoConcept.name = "Directory"', modelUrl);
      grid.addCell(new GridCell(addFileButton, 1));

      let deleteButton = this.createButton("delete", "parent.deleteElement(this)", modelUrl);
      grid.addCell(new GridCell(deleteButton, 1));

      boundTree.onselect = (selection) => {
          if (selection.size === 1) {
              selection.forEach(item => {
                let url = item.object.url;
                nameTextField.updateRuntime(url);
                iconTextField.updateRuntime(url);
                addDirectoryButton.updateRuntime(url);
                addFileButton.updateRuntime(url);
              });
          } else {
              nameTextField.updateRuntime(null);
              iconTextField.updateRuntime(null);
              addFileButton.updateRuntime(modelUrl);
              addDirectoryButton.updateRuntime(modelUrl);
              deleteButton.updateRuntime(null);
          }
      };

      return new Tab("tree", "Tree", grid);
  }
}

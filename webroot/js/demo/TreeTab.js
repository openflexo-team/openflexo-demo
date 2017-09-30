define(["require", "exports", "../openflexo/api/Api", "../openflexo/ui/Flow", "../openflexo/ui/Grid", "../openflexo/ui/Tabs", "../openflexo/ui/Icon", "../openflexo/mvc/BoundTextField", "../openflexo/mvc/BoundButton", "../openflexo/mvc/BoundTree", "../openflexo/mvc/BoundLabel", "../openflexo/mvc/BoundIcon"], function (require, exports, Api_1, Flow_1, Grid_1, Tabs_1, Icon_1, BoundTextField_1, BoundButton_1, BoundTree_1, BoundLabel_1, BoundIcon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TreeTab {
        constructor(context) {
            this.context = context;
        }
        createButton(icon, expression, model, enable = null) {
            return new BoundButton_1.BoundButton(this.context.api, new Icon_1.Icon(icon), Api_1.createBinding(expression, model), model, enable !== null ? Api_1.createBinding(enable, model) : null, "icon");
        }
        createTab() {
            const grid = new Grid_1.Grid();
            grid.addCell(new Grid_1.GridCell("", 2));
            grid.addCell(new Grid_1.GridCell(`<p>
        The tree bellow presents a set of directories and files.
        When selecting a element, you can change it's name in the <b>Name</b> text field.
        For directories, you can add children directories pressing the button <i class="material-icons">folder</i>
        or files with <i class="material-icons">portrait</i>.
        When selecting a file, the <b>Icon</b> text field allows to change the file icon.
        The icons are selected from the <a href="https://material.io/icons/">Material icons</a>, just put the name to get the icon.
        The data of the tree is shared with all clients and <b>synchronized</b> with each change.
      </p>`, 8));
            grid.addCell(new Grid_1.GridCell("", 2));
            let modelUrl = this.context.rootUrl;
            let elements = [
                new BoundTree_1.BoundTreeElement("Directory", (value) => value.flexoConcept.name === "Directory", (api, value) => new Flow_1.Flow(new Icon_1.Icon("folder"), new BoundLabel_1.BoundLabel(api, Api_1.createBinding("name", value.url), value.url)), (value) => new Api_1.BindingId("this.getChildren()", value.url)),
                new BoundTree_1.BoundTreeElement("File", (value) => value.flexoConcept.name === "File", (api, value) => new Flow_1.Flow(new BoundIcon_1.BoundIcon(api, Api_1.createBinding("icon", value.url), value.url), new BoundLabel_1.BoundLabel(api, Api_1.createBinding("name", value.url), value.url)))
            ];
            let boundTree = new BoundTree_1.BoundTree(this.context.api, Api_1.createRuntimeBinding("this", modelUrl, modelUrl), elements);
            grid.addCell(new Grid_1.GridCell(boundTree, 5));
            let gridForm = new Grid_1.Grid();
            grid.addCell(new Grid_1.GridCell(gridForm, 7));
            let nameTextField = new BoundTextField_1.BoundTextField(this.context.api, Api_1.createBinding("name", this.context.elementUrl), "Nom", null, true);
            gridForm.addCell(new Grid_1.GridCell(nameTextField, 12));
            let iconTextField = new BoundTextField_1.BoundTextField(this.context.api, Api_1.createBinding("icon", this.context.fileUrl), "icon", null, true);
            iconTextField.visible = Api_1.createBinding('this.flexoConcept.name = "File"', modelUrl);
            gridForm.addCell(new Grid_1.GridCell(iconTextField, 12));
            let addDirectoryButton = this.createButton("folder", "this.addDirectory()", modelUrl);
            addDirectoryButton.visible = Api_1.createBinding('this.flexoConcept.name = "Directory"', modelUrl);
            grid.addCell(new Grid_1.GridCell(addDirectoryButton, 1));
            let addFileButton = this.createButton("portrait", "this.addFile()", modelUrl);
            addFileButton.visible = Api_1.createBinding('this.flexoConcept.name = "Directory"', modelUrl);
            grid.addCell(new Grid_1.GridCell(addFileButton, 1));
            let deleteButton = this.createButton("delete", "parent.deleteElement(this)", modelUrl);
            grid.addCell(new Grid_1.GridCell(deleteButton, 1));
            boundTree.onselect = (selection) => {
                if (selection.size === 1) {
                    selection.forEach(item => {
                        let url = item.object.url;
                        nameTextField.updateRuntime(url);
                        iconTextField.updateRuntime(url);
                        addDirectoryButton.updateRuntime(url);
                        addFileButton.updateRuntime(url);
                    });
                }
                else {
                    nameTextField.updateRuntime(null);
                    iconTextField.updateRuntime(null);
                    addFileButton.updateRuntime(modelUrl);
                    addDirectoryButton.updateRuntime(modelUrl);
                    deleteButton.updateRuntime(null);
                }
            };
            return new Tabs_1.Tab("tree", "Tree", grid);
        }
    }
    exports.TreeTab = TreeTab;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlZVRhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRyZWVUYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBaUJBO1FBRUUsWUFDa0IsT0FBbUI7WUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNoQyxDQUFDO1FBRU4sWUFBWSxDQUFDLElBQVksRUFBRSxVQUFrQixFQUFFLEtBQWEsRUFBRSxTQUFzQixJQUFJO1lBQ3BGLE1BQU0sQ0FBQyxJQUFJLHlCQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQ25DLElBQUksV0FBSSxDQUFDLElBQUksQ0FBQyxFQUNkLG1CQUFhLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxFQUNoQyxLQUFLLEVBQ0wsTUFBTSxLQUFLLElBQUksR0FBRyxtQkFBYSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsR0FBRyxJQUFJLEVBQ3JELE1BQU0sQ0FBQyxDQUFBO1FBQ2YsQ0FBQztRQUVNLFNBQVM7WUFDWixNQUFNLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1lBRXhCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxlQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQVEsQ0FBQzs7Ozs7Ozs7V0FRckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUVwQyxJQUFJLFFBQVEsR0FBRztnQkFDWCxJQUFJLDRCQUFnQixDQUNoQixXQUFXLEVBQ1gsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUNsRCxDQUFDLEdBQUcsRUFBRSxLQUFV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
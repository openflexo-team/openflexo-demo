define(["require", "exports", "../openflexo/ui/Flow", "../openflexo/ui/Grid", "../openflexo/ui/Tabs", "../openflexo/ui/Icon", "../openflexo/mvc/BoundTextField", "../openflexo/mvc/BoundButton", "../openflexo/mvc/BoundTree", "../openflexo/mvc/BoundLabel", "../openflexo/mvc/BoundIcon"], function (require, exports, Flow_1, Grid_1, Tabs_1, Icon_1, BoundTextField_1, BoundButton_1, BoundTree_1, BoundLabel_1, BoundIcon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TreeTab {
        constructor(context) {
            this.context = context;
        }
        createButton(icon, expression, model, enable = null) {
            return new BoundButton_1.BoundButton(this.context.api, new Icon_1.Icon(icon), expression, model, enable, "icon");
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
                new BoundTree_1.BoundTreeElement("Directory", (value) => value.flexoConcept.name === "Directory", (api, value) => new Flow_1.Flow(new Icon_1.Icon("folder"), new BoundLabel_1.BoundLabel(api, "name", value.url)), (value) => "this.getChildren()"),
                new BoundTree_1.BoundTreeElement("File", (value) => value.flexoConcept.name === "File", (api, value) => new Flow_1.Flow(new BoundIcon_1.BoundIcon(api, "icon", value.url), new BoundLabel_1.BoundLabel(api, "name", value.url)))
            ];
            let boundTree = new BoundTree_1.BoundTree(this.context.api, modelUrl, elements);
            grid.addCell(new Grid_1.GridCell(boundTree, 5));
            let gridForm = new Grid_1.Grid();
            grid.addCell(new Grid_1.GridCell(gridForm, 7));
            let nameTextField = new BoundTextField_1.BoundTextField(this.context.api, "name", "Nom", null, true);
            gridForm.addCell(new Grid_1.GridCell(nameTextField, 12));
            let iconTextField = new BoundTextField_1.BoundTextField(this.context.api, "icon", "icon", null, true);
            iconTextField.visible = 'this.flexoConcept.name = "File"';
            gridForm.addCell(new Grid_1.GridCell(iconTextField, 12));
            let addDirectoryButton = this.createButton("folder", "this.addDirectory()", modelUrl);
            addDirectoryButton.visible = 'this.flexoConcept.name = "Directory"';
            grid.addCell(new Grid_1.GridCell(addDirectoryButton, 1));
            let addFileButton = this.createButton("portrait", "this.addFile()", modelUrl);
            addFileButton.visible = 'this.flexoConcept.name = "Directory"';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlZVRhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRyZWVUYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBaUJBO1FBRUUsWUFDa0IsT0FBbUI7WUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNoQyxDQUFDO1FBRU4sWUFBWSxDQUFDLElBQVksRUFBRSxVQUFrQixFQUFFLEtBQWEsRUFBRSxTQUFzQixJQUFJO1lBQ3BGLE1BQU0sQ0FBQyxJQUFJLHlCQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEcsQ0FBQztRQUVNLFNBQVM7WUFDWixNQUFNLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1lBRXhCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxlQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQVEsQ0FBQzs7Ozs7Ozs7V0FRckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUVwQyxJQUFJLFFBQVEsR0FBRztnQkFDWCxJQUFJLDRCQUFnQixDQUNoQixXQUFXLEVBQ1gsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUNsRCxDQUFDLEdBQUcsRUFBRSxLQUFVLEtBQUssSUFBSSxXQUFJLENBQ3JCLElBQUksV0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUNsQixJQUFJLHVCQUFVLENBQUMsR0FBRyxFQUFFLE1BQU0s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
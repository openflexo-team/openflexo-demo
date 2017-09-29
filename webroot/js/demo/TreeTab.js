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
            let modelUrl = this.context.rootUrl;
            let elements = [
                new BoundTree_1.BoundTreeElement("Directory", (value) => value.flexoConcept.name === "Directory", (api, value) => new Flow_1.Flow(new Icon_1.Icon("folder"), new BoundLabel_1.BoundLabel(api, Api_1.createBinding("name", value.url), value.url)), (value) => new Api_1.BindingId("this.getChildren()", value.url)),
                new BoundTree_1.BoundTreeElement("File", (value) => value.flexoConcept.name === "File", (api, value) => new Flow_1.Flow(new BoundIcon_1.BoundIcon(api, Api_1.createBinding("icon", value.url), value.url), new BoundLabel_1.BoundLabel(api, Api_1.createBinding("name", value.url), value.url)))
            ];
            let boundTree = new BoundTree_1.BoundTree(this.context.api, Api_1.createRuntimeBinding("this", modelUrl, modelUrl), elements);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlZVRhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRyZWVUYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBaUJBO1FBRUUsWUFDa0IsT0FBbUI7WUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNoQyxDQUFDO1FBRU4sWUFBWSxDQUFDLElBQVksRUFBRSxVQUFrQixFQUFFLEtBQWEsRUFBRSxTQUFzQixJQUFJO1lBQ3BGLE1BQU0sQ0FBQyxJQUFJLHlCQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQ25DLElBQUksV0FBSSxDQUFDLElBQUksQ0FBQyxFQUNkLG1CQUFhLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxFQUNoQyxLQUFLLEVBQ0wsTUFBTSxLQUFLLElBQUksR0FBRyxtQkFBYSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsR0FBRyxJQUFJLEVBQ3JELE1BQU0sQ0FBQyxDQUFBO1FBQ2YsQ0FBQztRQUVNLFNBQVM7WUFDWixNQUFNLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1lBRXhCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBRXBDLElBQUksUUFBUSxHQUFHO2dCQUNYLElBQUksNEJBQWdCLENBQ2hCLFdBQVcsRUFDWCxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQ2xELENBQUMsR0FBRyxFQUFFLEtBQVUsS0FBSyxJQUFJLFdBQUksQ0FDckIsSUFBSSxXQUFJLENBQUMsUUFBUSxDQUFDLEVBQ2xCLElBQUksdUJBQVUsQ0FBQyxHQUFHLEVBQUUsbUJBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FDbkUsRUFDTCxDQUFDLEtBQXVCLEtBQUssSUFBSSxlQUFTLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUM5RTtnQkFDRCxJQUFJLDRCQUFnQixDQUNoQixNQUFNLEVBQ04sQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUM3QyxDQUFDLEdBQVEsRUFBRSxLQUFVLEtBQU0sSUFBSSxXQUFJLENBQy9CLElBQUkscUJBQVMsQ0FBQyxHQUFHLEVBQUUsbUJBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFDL0QsSUFBSSx1QkFBVSxDQUFDLEdBQUcsRUFBRSxtQkFBYSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUNuRSxDQUNKO2FBQ0osQ0FBQztZQUVGLElBQUksU0FBUyxHQUFHLElBQUkscUJBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSwwQkFBb0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzVHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxlQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQVEsQ0FBQzs7Ozs7Ozs7V0FRckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV6QyxJQUFJLFFBQVEsR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxlQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFeEMsSUFBSSxhQUFhLEdBQUcsSUFBSSwrQkFBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLG1CQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM1SCxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksZUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBRWpELElBQUksYUFBYSxHQUFHLElBQUksK0JBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxtQkFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDMUgsYUFBYSxDQUFDLE9BQU8sR0FBRyxtQkFBYSxDQUFDLGlDQUFpQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ25GLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxlQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFFakQsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxxQkFBcUIsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN0RixrQkFBa0IsQ0FBQyxPQUFPLEdBQUcsbUJBQWEsQ0FBQyxzQ0FBc0MsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM3RixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksZUFBUSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEQsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDOUUsYUFBYSxDQUFDLE9BQU8sR0FBRyxtQkFBYSxDQUFDLHNDQUFzQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3hGLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxlQUFRLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFN0MsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsNEJBQTRCLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU1QyxTQUFTLENBQUMsUUFBUSxHQUFHLENBQUMsU0FBUztnQkFDM0IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUk7d0JBQ2xCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO3dCQUMxQixhQUFhLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNqQyxhQUFhLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNqQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3RDLGFBQWEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3JDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdEMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMzQyxZQUFZLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDO1lBRUYsTUFBTSxDQUFDLElBQUksVUFBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQztLQUNGO0lBOUZELDBCQThGQyJ9
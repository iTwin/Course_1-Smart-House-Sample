import { IModelApp } from "@itwin/core-frontend";
import { UiItemsProvider, ToolbarUsage, ToolbarOrientation, CommonToolbarItem, StageUsage, ToolbarItemUtilities } from "@itwin/appui-abstract";
import { Visualization } from "../Visualization";

export class SmartDeviceUiItemsProvider implements UiItemsProvider {
  public readonly id = "SmartDeviceUiProvider";
  private _toggleWalls: boolean = false;

  public provideToolbarButtonItems(stageId: string, stageUsage: string, toolbarUsage: ToolbarUsage, toolbarOrientation: ToolbarOrientation) : CommonToolbarItem[] {
    const toolbarButtonItems: CommonToolbarItem[] = [];

    if (stageUsage === StageUsage.General && toolbarUsage === ToolbarUsage.ContentManipulation && toolbarOrientation === ToolbarOrientation.Vertical) {

      const toggleWallsButton = ToolbarItemUtilities.createActionButton(
        "ToggleWalls",
        1000,
        "icon-element",
        "Toggle Walls Tool",
        () => {

          this._toggleWalls = !this._toggleWalls;
          Visualization.hideHouseExterior(IModelApp.viewManager.selectedView!, this._toggleWalls);

        }
      );

      toolbarButtonItems.push(toggleWallsButton);

    }

    return toolbarButtonItems;
  }
}

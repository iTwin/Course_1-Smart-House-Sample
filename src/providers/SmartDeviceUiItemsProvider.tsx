import { IModelApp } from "@bentley/imodeljs-frontend";
import { UiItemsProvider, ToolbarUsage, ToolbarOrientation, CommonToolbarItem, StageUsage, ToolbarItemUtilities, StagePanelLocation, StagePanelSection, AbstractWidgetProps } from "@bentley/ui-abstract";
import { Visualization } from "../Visualization";
import { SmartDeviceListWidgetComponent } from "../components/widgets/SmartDeviceListWidgetComponent";
import * as React from "react";

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

  public provideWidgets(stageId: string, stageUsage: string, location: StagePanelLocation, section?: StagePanelSection) : ReadonlyArray<AbstractWidgetProps> {
    const widgets: AbstractWidgetProps[] = [];

    if (stageId === "DefaultFrontstage" && location === StagePanelLocation.Right) {

      const widget: AbstractWidgetProps = {
        id: "smartDeviceListWidget",
        label: "Smart Devices",
        getWidgetContent: () => {
          return <SmartDeviceListWidgetComponent></SmartDeviceListWidgetComponent>
        }
      }

      widgets.push(widget);

    }

    return widgets;

  }
}

import { DecorateContext, Decorator, IModelConnection, Marker, ScreenViewport } from "@itwin/core-frontend";
import { SmartDeviceMarker } from "../markers/SmartDeviceMarker";
import { SmartDeviceAPI } from "../../SmartDeviceAPI";
import { UiFramework } from "@itwin/appui-react";

export class SmartDeviceDecorator implements Decorator {
  private _iModel: IModelConnection;
  private _markerSet: Marker[];

  constructor(vp: ScreenViewport) {
    this._iModel = vp.iModel;
    this._markerSet = [];

    this.addMarkers();
  }

  public static async getSmartDeviceData() {
    const query = `
      SELECT SmartDeviceId,
              SmartDeviceType,
              ECInstanceId,
              Origin
              FROM DgnCustomItemTypes_HouseSchema.SmartDevice
              WHERE Origin IS NOT NULL
    `

    const results = UiFramework.getIModelConnection()!.query(query);
    const values = [];

    for await (const row of results)
      values.push(row);
    
    return values;
  }

  private async addMarkers() {
    const values = await SmartDeviceDecorator.getSmartDeviceData();
    const cloudData = await SmartDeviceAPI.getData();

    values.forEach(value => {
      const smartDeviceId = value[0];
      const smartDeviceType = value[1];
      const smartDeviceECInstanceId = value[2];
      const origin = value[3];

      const smartDeviceMarker = new SmartDeviceMarker(
        { x: origin.X, y: origin.Y, z: origin.Z },
        { x: 40, y: 40 },
        smartDeviceId,
        smartDeviceType,
        cloudData[smartDeviceId],
        smartDeviceECInstanceId
      );

      this._markerSet.push(smartDeviceMarker);
    })
  }

  public decorate(context: DecorateContext): void {
    this._markerSet.forEach(marker => {
      marker.addDecoration(context);
    })
  }
}
import { XAndY, XYAndZ } from "@itwin/core-geometry";
import { Marker } from "@itwin/core-frontend";

export class SmartDeviceMarker extends Marker {
  private _smartDeviceId: string;
  private _smartDeviceType: string;

  constructor(location: XYAndZ, size: XAndY, smartDeviceId: string, smartDeviceType: string) {
    super(location, size);

    this._smartDeviceId = smartDeviceId;
    this._smartDeviceType = smartDeviceType;

    this.setImageUrl(`/${this._smartDeviceType}.png`);
  }
} 

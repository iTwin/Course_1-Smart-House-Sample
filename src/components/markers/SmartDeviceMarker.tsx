import { XAndY, XYAndZ } from "@itwin/core-geometry";
import { Marker } from "@itwin/core-frontend";

export class SmartDeviceMarker extends Marker {
  private _smartDeviceId: string;
  private _smartDeviceType: string;

  constructor(location: XYAndZ, size: XAndY, smartDeviceId: string, smartDeviceType: string, cloudData: any) {
    super(location, size);

    this._smartDeviceId = smartDeviceId;
    this._smartDeviceType = smartDeviceType;

    this.setImageUrl(`/${this._smartDeviceType}.png`);
    this.title = this.populateTitle(cloudData);
  }

  private populateTitle(cloudData: any) {

    /*
     "speaker001": { 
      "Notifications": 2, 
      "song Playing": true,
      "Song Name": "All I Want for Christmas Is You",
      "Song Artist": "Mariah Carey"
    },
  */
    let smartTable = "";
    for (const [key, value] of Object.entries(cloudData)) {
      smartTable += `
        <tr>
          <th>${key}</th>
          <th>${value}</th>
        </tr>
      `
    };

    const smartTableDiv = document.createElement("div");
    smartTableDiv.className = "smart-table";
    smartTableDiv.innerHTML = `
     <h3>${this._smartDeviceId}</h3>
     <table>
      ${smartTable}
     </table>
    `;

    return smartTableDiv;

  }
} 

import { IModelApp, StandardViewId } from "@itwin/core-frontend";
import * as React from "react";
import { SmartDeviceDecorator } from "../decorators/SmartDeviceDecorator";

export function SmartDeviceListWidgetComponent() {
  const [smartTableList, setSmartTableList] = React.useState<JSX.Element[]>([]);

  React.useEffect(() => {
    (async () => {
      const values = await SmartDeviceDecorator.getSmartDeviceData();
      const tableList: JSX.Element[] = [];

      values.forEach(value => {
        tableList.push(
          <tr onClick={() => { IModelApp.viewManager.selectedView!.zoomToElements(value[2], { animateFrustumChange: true, standardViewId: StandardViewId.RightIso }); }}>
            <th>{value[1]}</th>
            <th>{value[0]}</th>
          </tr>
        )
      })

      setSmartTableList(tableList);
    })();

  }, [])

  return (
    <table className="smart-table">
      <tbody>
        <tr>
          <th>SmartDeviceType</th>
          <th>SmartDeviceId</th>
        </tr>
        {smartTableList}
      </tbody>
    </table>
  )
}

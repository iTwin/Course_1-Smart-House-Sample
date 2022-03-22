export class SmartDeviceAPI {

    public static async getData() {

        const response = await fetch("https://smarthomedata.z22.web.core.windows.net/");
        const deviceData = response.json();

        return deviceData;
    }

}
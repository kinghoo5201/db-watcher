export declare class DbWatcher {
    /** 设备信息 */
    DEVICE_INFO: {
        ios?: boolean;
        android?: boolean;
        iphone?: boolean;
        ipad?: boolean;
        androidChrome?: boolean;
        isWeixin?: boolean;
        webView?: RegExpMatchArray;
        os?: string;
        deviceName?: string;
        osVersion?: string;
        browserName?: string;
        browserVersion?: string;
    };
    method: RequestInit;
    constructor();
    /** 通用信息生成 */
    setCommonProperty: () => void;
    say(): void;
}

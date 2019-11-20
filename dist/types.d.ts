export declare namespace def {
    namespace commonInfo {
        /** 设备信息 */
        type IDeviceInfo = {
            /** 是否ios */
            ios?: boolean;
            /** 是否安卓 */
            android?: boolean;
            /** 是否iphone */
            iphone?: boolean;
            /** 是否ipad */
            ipad?: boolean;
            /** 是否安卓chrome */
            androidChrome?: boolean;
            /** 是否微信 */
            isWeixin?: boolean;
            /** 是否基于webView渲染 */
            webView?: RegExpMatchArray;
            /** 系统 */
            os?: string;
            /** 设备名 */
            deviceName?: string;
            /** 系统版本 */
            osVersion?: string;
            /** 浏览器名 */
            browserName?: string;
            /** 浏览器版本 */
            browserVersion?: string;
        };
        /** 错误类型 */
        type IErrorType = 'syntaxError' | 'requestError' | 'clickInfo' | 'staticError';
        /** 通用参数生成 */
        type ICommonPram = {
            /** 上报时间 */
            time: string | number;
            /** 监控类型,语法错误|请求监控|点击监控|静态资源请求 */
            monitorType: IErrorType;
            /** 请求类型 */
            requestType?: string;
            /** 设备名 */
            deviceName: string;
            /** 浏览器名 */
            browserName: string;
            /** 浏览器版本 */
            browserVersion: string;
            /** 接口url */
            url?: string;
            /** 请求参数 JSON.stringify处理参数 */
            requestParams?: string;
            /** 请求code */
            requestCode?: number;
            /** 捕获的信息,或者数据 JSON.stringify处理 */
            value?: string;
            /** 错误类型 */
            errorType?: string;
            /** 错误信息 */
            errorMessage?: string;
        };
    }
}

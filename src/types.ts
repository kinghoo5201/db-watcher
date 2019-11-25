export declare namespace def {
  export namespace commonInfo {
    /** 设备信息 */
    export type IDeviceInfo = {
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
    export type IErrorType =
      | 'syntaxWatcher'
      | 'requestWatcher'
      | 'clickWatcher'
      | 'staticWatcher';

    /** 通用参数生成 */
    export type ICommonPram = {
      /** 上报时间 */
      time?: string | number;
      /** 监控类型,语法错误|请求监控|点击监控|静态资源请求 */
      monitorType?: IErrorType;
      /** 请求类型 */
      requestMethod?: string;
      /** 设备名 */
      deviceName?: string;
      /** 浏览器名 */
      browserName?: string;
      /** 浏览器版本 */
      browserVersion?: string;
      /** 页面url */
      pageUrl?: string;
      /** 接口url|静态资源地址 */
      requestUrl?: string;
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

  /** 分模块类型 */
  export namespace modules {
    /** 主模块构造函数参数 */
    export namespace index {
      /** 通用配置 */
      export type IDefaultCfg = {
        /** 数据过滤器 */
        filter?: (data: commonInfo.ICommonPram) => commonInfo.ICommonPram;
        /** 是否上报 */
        shouldReport?: (data: commonInfo.ICommonPram) => boolean;
      };
      export interface ISynTaxWatcher extends IDefaultCfg {}
      export interface IRequestWatcher extends IDefaultCfg {}
      export interface IClickWatcher extends IDefaultCfg {}
      export interface IStaticWatcher extends IDefaultCfg {}
      /** reqport配置 */
      export type reportCfg = (data: commonInfo.ICommonPram) => void;
      /** 配置 */
      export type IConfig = {
        /** 语法报错监控 */
        syntaxWatcher?: ISynTaxWatcher | boolean;
        /** 请求监控 */
        requestWatcher?: IRequestWatcher | boolean;
        /** 点击事件监控 */
        clickWatcher?: IClickWatcher | boolean;
        /** 静态资源监控 */
        staticWatcher?: IStaticWatcher | boolean;
      };
    }

    /** request 模块下的类型定义 */
    export namespace request {
      /** 配置event的detail */
      export interface IEventWithDetail<T> extends Event {
        detail: T;
      }
      /** 事件记录项 */
      export type ITimeRecord = {
        /** 时间戳 */
        timestamp: number | string;
        /** 事件对象 */
        event: IEventWithDetail<XMLHttpRequest>;
        /** 当前url */
        pageUrl: string;
        /** 是否上传完毕 */
        uploadFlag: boolean;
      };
    }
  }

  /** 函数类型 */
  export namespace fn {
    export type IEventCallback = (val?: commonInfo.ICommonPram) => void;
  }
}

! function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define &&
    define.amd ? define([], t) : "object" == typeof exports ? exports.wpkReporter = t() : e.wpkReporter = t()
}(this, function () {
  return function (e) {
    var t = {};

    function n(r) {
      if (t[r]) return t[r].exports;
      var o = t[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    return n.m = e, n.c = t, n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: r
      })
    }, n.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      })
    }, n.t = function (e, t) {
      if (1 & t && (e = n(e)), 8 & t) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (n.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e)
        for (var o in e) n.d(r, o, function (t) {
          return e[t]
        }.bind(null, o));
      return r
    }, n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default
      } : function () {
        return e
      };
      return n.d(t, "a", t), t
    }, n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 3)
  }([function (e, t) {
    e.exports = {
      sdk: {
        BID: "wpkreporter",
        CID: "jssdk",
        WID_KEY: "__wpkreporterwid_"
      },
      env: {
        BROWSER: "browser",
        NODEJS: "nodejs",
        WEEX: "weex"
      },
      px: {
        signKey: "Uvn#08uefVdwe&c4",
        addr: {
          cn: "http://px.effirst.com/api/v1/jssdk/upload",
          cn_https: "https://px.effirst.com/api/v1/jssdk/upload",
          intl: "http://px-intl.ucweb.com/api/v1/jssdk/upload",
          intl_https: "https://px-intl.ucweb.com/api/v1/jssdk/upload"
        },
        confAddr: {
          cn: "http://px.effirst.com/api/v1/jconfig",
          cn_https: "https://px.effirst.com/api/v1/jconfig",
          intl: "http://px-intl.ucweb.com/api/v1/jconfig",
          intl_https: "https://px-intl.ucweb.com/api/v1/jconfig"
        }
      },
      http: {
        methods: {
          GET: "GET",
          PUT: "PUT",
          POST: "POST",
          HEAD: "HEAD",
          DELETE: "DELETE",
          OPTIONS: "OPTIONS",
          CONNECT: "OPTIONS",
          TRACE: "OPTIONS",
          PATCH: "OPTIONS"
        },
        protocols: {
          HTTP: "http:",
          HTTPS: "https:"
        }
      },
      category: {
        JSERR: 1,
        API: 2,
        JSFSPERF: 3,
        RESLOADFAIL: 4,
        FLOW: 5,
        BKPG: 6,
        HARLOG: 7
      },
      navConn: {
        types: {
          BLUETOOTH: "bluetooth",
          CELLULAR: "cellular",
          ETHERNET: "ethernet",
          MIXED: "mixed",
          NONE: "none",
          OTHER: "other",
          UNKNOWN: "unknown",
          WIFI: "wifi",
          WIMAX: "wimax"
        },
        effectiveTypes: {
          "2G": "2g",
          "3G": "3g",
          "4G": "4g",
          SLOW2G: "slow-2g"
        }
      }
    }
  }, function (e, t, n) {
    var r = n(6),
      o = n(0),
      i = o.px,
      a = o.category;

    function s(e) {
      if (!(this instanceof s)) return new s(e);
      e = e || {}, this._init = !1, this.toolKit = r(e), this.logger = this.toolKit.logger, this.debug =
        e.debug || !1, !0 === e.debug && this.logger.warn(
          "[wpk] now in debug mode, you can see log details"), this._plugins = e.plugins || [],
        this.bid = e.bid, this.cid = e.cid, this.uid = e.uid, this.rel = e.rel, this.spa = e.spa ||
        !1, this.delay = !1 !== e.delay, this.cluster = e.cluster || "cn", this.sampleRate = e.sampleRate,
        this.ignoreScriptError = !1 !== e.ignoreScriptError, this.onlyCustom = e.onlyCustom ||
        !1, this.beforeSend = e.beforeSend || null, this.checkHidden = !1 !== e.checkHidden,
        this._waitingQueue = []
    }

    function c(e) {
      var t = i.confAddr[e.cluster + (e.isHttps ? "_https" : "")],
        n = i.signKey;
      e._startTime = Date.now(), e._dying = !0, e.toolKit.dynamicConf(e.bid, e.VERSION, t, n,
        function (t) {
          e._dying = !1, e._dyConf = t, e.logger.warn("jconfig come back")
        })
    }
    s.prototype = {
      VERSION: "0.6.0",
      initialize: function (e) {
        this.env = e.env, e.root.location && -1 !== e.root.location.search.indexOf(
          "wpkReporterDebug=true") && (this.debug = !0), this.send = e.send, this
            .getWid = e.getWid, this.isHttps = e.isHttps, e.bindUnloadEvent(this)
      },
      ready: function () {
        return this._init
      },
      setConfig: function (e) {
        return this.toolKit.isObject(e) && this.toolKit.extend(this, e), this
      },
      report: function (e) {
        if ("string" == typeof e && (e = {
          category: a.JSERR,
          msg: e
        }), e.sampleRate || (e.sampleRate = 1), this.toolKit.canReport(e.sampleRate ||
          this.sampleRate)) {
          if (this.ready()) {
            var t;
            if ("function" == typeof this.beforeSend) {
              try {
                t = this.beforeSend(e)
              } catch (e) {
                this.logger.error("exec beforeSend failed for:", e)
              }
              if (!1 === t) return void this.logger.warn(
                "beforeSend func return false");
              "object" == typeof t && (e = t)
            }
            var n = this.toolKit.getMetas(),
              r = e.bid || this.bid || n.wpkBid,
              o = e.cid || this.cid || n.wpkCid,
              s = e.rel || this.rel || n.wpkRel;
            this.toolKit.isFunction(s) && (s = s());
            var u = e.uid || this.uid;
            if (this.toolKit.isFunction(u) && (u = u()), u || (u = this.getWid()),
              this.toolKit.extend(e, {
                w_bid: r,
                w_cid: o,
                w_rel: s,
                w_spa: this.spa,
                w_tm: this.toolKit.timestamp(),
                w_cnt: 1,
                uid: u,
                type: this.toolKit.categoryToType(e.category),
                sdk_ver: this.VERSION,
                log_src: "jssdk",
                uc_param: this.uc_param || "",
                wid: this.wid
              }), this._dyConf && Date.now() < this._dyConf.expireAt) {
              var l = void 0 !== this._dyConf[e.type] ? this._dyConf[e.type] :
                this._dyConf.all;
              if (void 0 !== l && !this.toolKit.canReport(l)) return void this.logger
                .warn("由于「动态配置」采样率控制，本条日志最终未上报，类型: ", e.type, " 采样率: ", l)
            } else !this._dying && Date.now() - this._startTime >= 18e5 && (this.logger
              .warn("syncing dynamic config"), c(this));
            var f = {
              app: r,
              cp: "none",
              de: 4,
              seq: this.toolKit.generateSeq(),
              tm: this.toolKit.timestamp(!0),
              ud: e.uid,
              ver: e.w_rel,
              type: e.type,
              sver: e.sdk_ver
            };
            f.sign = this.toolKit.computeSign(f, i.signKey);
            var d = i.addr[this.cluster + (this.isHttps ? "_https" : "")],
              p = this.toolKit.objToQueryString(f);
            this.toolKit.cutStr(e, ["c1", "c2", "c3", "c4", "c5"], 128), this.send(
              d, p, e)
          } else this._waitingQueue.push(e), this.logger.warn("sdk未完成初始化，数据已缓存");
          return this
        }
        this.logger.warn("由于采样率控制，本条日志最终未上报，采样率: ", e.sampleRate || this.sampleRate)
      },
      reportFlow: function (e) {
        return e = e || {}, this.report(this.toolKit.extend(e || {}, {
          category: a.FLOW,
          sampleRate: 1
        })), this
      },
      reportError: function (e, t) {
        return this.toolKit.isError(e) ? ((t = t || {}).category = a.JSERR, t.w_msg = e
          .toString(), t.stack = this.toolKit.parseErrorStack(e), t.w_file = e.filename ||
          "", t.w_line = e.lineno || "", t.w_col = e.colno || "", this.report(t),
          this) : this.report(e, t)
      },
      reportApiError: function (e, t) {
        return e && (this.toolKit.isObject(e.queryString) && (e.queryString = this.toolKit
          .objToQueryString(e.queryString)), this.report(this.toolKit.extend(
            t || {}, {
            msg: e.msg || "",
            w_res: e.url,
            w_method: e.method,
            w_param: e.queryString,
            w_body: JSON.stringify(e.body),
            w_resp: e.response,
            w_rc: e.status,
            w_rt: e.spent || "",
            c1: e.c1,
            c2: e.c2,
            c3: e.c3,
            c4: e.c4,
            c5: e.c5
          }, {
            category: a.API,
            w_type: 16
          }))), this
      },
      diagnose: function () {
        this.ready() ? this.bid ? (this.sampleRate || this.logger.warn(
          "没有设置采样率参数sampleRate，将使用默认采样率"), this.report({
            _diagnose: !0
          })) : this.logger.warn("缺少bid参数,请确认是否已正确设置") : this.logger.warn(
            "wpkReporter尚未初始化，请确保已调用 install 方法")
      },
      addPlugin: function (e, t) {
        return this._plugins.push([e, t]), "function" == typeof e && this._init && e.apply(
          this, [this, t]), this
      },
      install: function () {
        c(this);
        for (var e = n(2), t = this._plugins.length, r = !1, o = 0; o < t; o++) {
          var i = this._plugins[o],
            a = i[0],
            s = i[1];
          a + "" == e + "" && (r = !0), a.apply(this, [this, s])
        }
        return this.wid = this.getWid(), this._sid = this.toolKit.uuid(), this._init = !
          0, 0 !== t && r || (this.toolKit.logger.info("没有设置Flow，内置开启"), this.addPlugin(
            e)), this
      },
      installAll: function () {
        var e = [[n(9), {
          resErr: !0
        }], [n(10)], [n(11)], [n(2)], [n(12), {
          params: "prveosfrnw"
        }]],
          t = this._plugins.length;
        if (0 === t) this._plugins = e;
        else {
          for (var r = [], o = e.length, i = 0; i < o; i++) {
            for (var a = e[i], s = 0; s < t; s++)
              if (a[0].prototype.pluginId === this._plugins[s][0].prototype.pluginId) {
                a = this._plugins[s];
                break
              } r.push(a)
          }
          this._plugins = r
        }
        return this.install()
      },
      uninstall: function () {
        return this._plugins = [], this._init = !1, this
      }
    }, e.exports = s
  }, function (e, t, n) {
    var r = n(0).env,
      o = function (e) {
        var t;
        return (e ? (t = e.replace(/^#\/?/, "")) && "string" == typeof t ? t.replace(
          /^(https?:)?\/\//, "").replace(/\?.*$/, "") : "" : "") || "[index]"
      },
      i = function (e, t) {
        if (t = t || {}, e.env === r.BROWSER && window)
          if (e.toolKit.extend({
            enable: !0
          }, t).enable) {
            e.logger.info("wpkflowPlugin已开启");
            var i, a, s = function () {
              e.reportFlow()
            };
            e.toolKit.onListen(window, "load", s, !0), e.spa && (n(8)(), i = function (t) {
              o(location.hash) && (e._sid = e.toolKit.uuid(), e.reportFlow())
            }, a = function (t) {
              o(t.detail) && (e._sid = e.toolKit.uuid(), e.reportFlow())
            }, e.toolKit.onListen(window, "hashchange", i), e.toolKit.onListen(
              window, "historystatechange", a)), e.toolKit.onListen(window,
                "beforeunload",
                function () {
                  e.toolKit.offListen(window, "load"), e.toolKit.offListen(window,
                    "hashchange"), e.toolKit.offListen(window,
                      "historystatechange"), s = i = a = null
                })
          } else e.logger.info("wpkflowPlugin已关闭")
      };
    i.prototype.pluginId = "flow", e.exports = i
  }, function (e, t, n) {
    (function (t) {
      var r = "object" == typeof t && t + "" == "[object process]",
        o = "function" == typeof callNative || "function" == typeof nativeLog;
      e.exports = n(o ? 5 : r ? 14 : 17)
    }).call(this, n(4))
  }, function (e, t) {
    var n, r, o = e.exports = {};

    function i() {
      throw new Error("setTimeout has not been defined")
    }

    function a() {
      throw new Error("clearTimeout has not been defined")
    }

    function s(e) {
      if (n === setTimeout) return setTimeout(e, 0);
      if ((n === i || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
      try {
        return n(e, 0)
      } catch (t) {
        try {
          return n.call(null, e, 0)
        } catch (t) {
          return n.call(this, e, 0)
        }
      }
    } ! function () {
      try {
        n = "function" == typeof setTimeout ? setTimeout : i
      } catch (e) {
        n = i
      }
      try {
        r = "function" == typeof clearTimeout ? clearTimeout : a
      } catch (e) {
        r = a
      }
    }();
    var c, u = [],
      l = !1,
      f = -1;

    function d() {
      l && c && (l = !1, c.length ? u = c.concat(u) : f = -1, u.length && p())
    }

    function p() {
      if (!l) {
        var e = s(d);
        l = !0;
        for (var t = u.length; t;) {
          for (c = u, u = []; ++f < t;) c && c[f].run();
          f = -1, t = u.length
        }
        c = null, l = !1,
          function (e) {
            if (r === clearTimeout) return clearTimeout(e);
            if ((r === a || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);
            try {
              r(e)
            } catch (t) {
              try {
                return r.call(null, e)
              } catch (t) {
                return r.call(this, e)
              }
            }
          }(e)
      }
    }

    function h(e, t) {
      this.fun = e, this.array = t
    }

    function g() { }
    o.nextTick = function (e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
      u.push(new h(e, t)), 1 !== u.length || l || s(p)
    }, h.prototype.run = function () {
      this.fun.apply(null, this.array)
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {},
      o.on = g, o.addListener = g, o.once = g, o.off = g, o.removeListener = g, o.removeAllListeners =
      g, o.emit = g, o.prependListener = g, o.prependOnceListener = g, o.listeners = function (e) {
        return []
      }, o.binding = function (e) {
        throw new Error("process.binding is not supported")
      }, o.cwd = function () {
        return "/"
      }, o.chdir = function (e) {
        throw new Error("process.chdir is not supported")
      }, o.umask = function () {
        return 0
      }
  }, function (e, t, n) {
    var r = n(1),
      o = n(13);
    e.exports = function (e) {
      var t = new r(e);
      return t.initialize(o), t
    }
  }, function (e, t, n) {
    var r = n(7),
      o = function (e) {
        return e || ""
      },
      i = function () {
        var e = Date.now();
        return "undefined" != typeof window && window.performance && "function" == typeof window
          .performance.now && (e += performance.now()),
          "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
            var n = (e + 16 * Math.random()) % 16 | 0;
            return e = Math.floor(e / 16), ("x" === t ? n : 11 & n).toString(16)
          })
      },
      a = function (e) {
        return "object" == typeof e
      },
      s = function (e) {
        var t = {}.toString.call(e);
        return a(e) && ("[object Error]" === t || "[object Exception]" === t || t instanceof Error)
      },
      c = function (e) {
        return "[object Array]" === {}.toString.call(e)
      },
      u = function (e) {
        return "function" == typeof e
      },
      l = function (e) {
        var t = +new Date;
        return !0 === e && (t = Math.floor(t / 1e3)), t
      },
      f = function (e) {
        if (e.stack) {
          var t = e.stack.split("\n");
          return t.shift(), t.join("\n")
        }
        return ""
      },
      d = function (e, t) {
        e = e || {};
        var n = [];
        for (var o in e) n.push(o);
        n.sort();
        for (var i = n.length, a = [], s = 0; s < i; s++) a.push(n[s] + "=" + e[n[s]]);
        return a.push(t), r(a.join(""))
      },
      p = function (e) {
        var t;
        switch (e) {
          case 1:
            t = "jserr";
            break;
          case 2:
            t = "api";
            break;
          case 3:
            t = "jsfsperf";
            break;
          case 4:
            t = "resloadfail";
            break;
          case 5:
            t = "flow";
            break;
          case 6:
            t = "bkpg";
            break;
          case 7:
            t = "harlog";
            break;
          default:
            t = "jssdkidx"
        }
        return t
      },
      h = function () {
        return l() + Math.floor(10 * Math.random())
      },
      g = function (e) {
        var t = [];
        for (var n in e) t.push(n + "=" + e[n]);
        return t.join("&")
      },
      w = function (e) {
        return JSON ? JSON.stringify(e) : e.toString()
      },
      v = function () {
        if ("undefined" != typeof document && document.getElementsByTagName)
          for (var e, t, n, r, o = document.getElementsByTagName("meta"), i = o.length, a = 0; a <
            i; a++) "wpk-bid" === (r = o[a]).name ? e = r.content : "wpk-cid" === r.name ?
              t = r.content : "wpk-rel" === r.name && (n = r.content);
        return {
          wpkBid: e || null,
          wpkCid: t || null,
          wpkRel: n || null
        }
      },
      m = function (e, t, n, r) {
        return e.addEventListener ? e.addEventListener(t, function o(i) {
          r && e.removeEventListener(t, o, !1), n.call(this, i)
        }, !1) : e.attachEvent && e.attachEvent("on" + t, function o(i) {
          r && e.detachEvent("on" + t, o), n.call(this, i)
        }), this
      },
      _ = function (e, t, n) {
        return n ? (e.removeEventListener ? e.removeEventListener(t, n) : e.detachEvent && e.detachEvent(
          t, n), this) : this
      },
      y = function (e) {
        return !!e && (0 !== e && (e >= 1 || "100%" === e || (/^\d+(\.\d+)?%$/.test(e) ? Math.random() <
          parseFloat(e) / 100 : e > 0 && e < 1 && Math.random() < e)))
      },
      x = "wpk-reporter",
      b = function (e, t) {
        var n = [].slice.call(t);
        e.apply(this, [x].concat(n))
      },
      E = function (e) {
        var t = "";
        switch (e.category) {
          case 1:
            t = r([e.category, e.uid, e.w_url, e.w_ref, e.w_msg || "", e.w_line || "", e.w_col ||
              ""].join(""));
            break;
          case 2:
            t = r([e.category, e.uid, e.w_res, e.w_method, e.w_rc].join(""));
            break;
          case 4:
            t = r([e.category, e.uid, e.w_url, e.w_ref, e.w_res, e.w_type].join(""))
        }
        return t
      },
      S = function (e, t) {
        e = e || !1;
        try {
          if ("undefined" != typeof window && window.ucweb && window.ucweb.window || t) {
            for (var n = (t || navigator.userAgent).split(" "), r = n.length, o = !1, i = !
              1, a = 0; a < r; a++) {
              if (-1 !== n[a].indexOf("UWS/")) i = n[a].split("/")[1] >= "2.13.2.37";
              else -1 !== n[a].indexOf("AliApp(DingTalk/") && (o = !0)
            }
            return o ? i : e
          }
        } catch (e) { }
        return !1
      },
      R = {
        get: function (e) {
          if ("undefined" != typeof localStorage) {
            var t = localStorage.getItem(e);
            if (t) {
              if (t = JSON.parse(t), Date.now() < t.expireAt) return t;
              this.rm(e)
            }
          }
          return null
        },
        set: function (e, t) {
          "undefined" != typeof localStorage && e && t && (t.expireAt = Date.now() + 18e5,
            localStorage.setItem(e, JSON.stringify(t)))
        },
        rm: function (e) {
          "undefined" != typeof localStorage && localStorage.removeItem(e)
        }
      },
      k = function (e, t) {
        if (t) {
          if (1 === t.length) return e === t[0];
          if (2 === t.length) {
            var n = t[0],
              r = t[1];
            return n && !r ? o(e, n) : n && r ? o(e, n) && o(r, e) : o(r, e)
          }
          return !1
        }
        return !0;

        function o(e, t) {
          var n = e.split("."),
            r = t.split(".");
          return !(n[0] < r[0]) && (n[0] > r[0] || !(n[1] < r[1]) && (n[1] > r[1] || n[2] >=
            r[2]))
        }
      },
      T = function (e, t, n, r, o) {
        var a = R.get("wpkreporter:dynamicConf");
        if (a) u(o) && o(a);
        else {
          var s = {
            app: e,
            tm: l(!0),
            ud: i(),
            sver: t
          };
          s.sign = d(s, r);
          var c = g(s);
          ! function (e, t) {
            if ("undefined" == typeof XMLHttpRequest) t();
            else {
              var n = new XMLHttpRequest;
              n.onreadystatechange = function () {
                if (4 === n.readyState) {
                  var e;
                  if (200 === n.status && n.response) try {
                    var r = JSON.parse(n.response);
                    0 === r.code && (e = r.config || [])
                  } catch (e) { }
                  t(e)
                }
              }, n.timeout = 3e3, n.open("GET", e, !0), n.send()
            }
          }(n + "?wpk-header=" + encodeURIComponent(c), function (e) {
            if (a = {}, void 0 !== e) {
              for (var n = e.length, r = 0; r < n; r++) {
                var i = e[r],
                  s = i.sdkver;
                if (k(t, s)) {
                  if (i.common && void 0 !== i.common.sampleRate && (a.all = i.common
                    .sampleRate), i.config)
                    for (var c, l = i.config.length, f = 0; f < l; f++)(c = i.config[
                      f]).type && void 0 !== c.sampleRate && (a[c.type] =
                        c.sampleRate);
                  break
                }
              }
              R.set("wpkreporter:dynamicConf", a)
            }
            u(o) && o(a)
          })
        }
      },
      O = function (e, t, n) {
        for (var r, o = t.length, i = 0; i < o; i++) "string" == typeof (r = e[t[i]]) ? e[t[i]] =
          r.substring(0, n) : "object" == typeof r && (e[t[i]] = String(r))
      };
    e.exports = function (e) {
      return {
        noop: o,
        uuid: i,
        md5: r,
        isError: s,
        isArray: c,
        isObject: a,
        isFunction: u,
        logger: "undefined" != typeof console && a(console) && e.debug ? {
          trace: function () {
            b(console.trace, arguments)
          },
          debug: function () {
            b(console.debug, arguments)
          },
          log: function () {
            b(console.log, arguments)
          },
          info: function () {
            b(console.info, arguments)
          },
          warn: function () {
            b(console.warn, arguments)
          },
          error: function () {
            b(console.error, arguments)
          }
        } : {
            trace: o,
            debug: o,
            log: o,
            info: o,
            warn: o,
            error: o
          },
        extend: function (e) {
          for (var t = 1, n = arguments.length; t < n; t++) {
            var r = arguments[t];
            for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] =
              r[o])
          }
          return e
        },
        canReport: y,
        onListen: m,
        offListen: _,
        getMetas: v,
        timestamp: l,
        computeSign: d,
        generateSeq: h,
        categoryToType: p,
        parseErrorStack: f,
        objToJsonString: w,
        objToQueryString: g,
        genContentHash: E,
        isU4HA: S,
        cutStr: O,
        dynamicConf: T
      }
    }
  }, function (e, t, n) {
    var r;
    ! function (o) {
      "use strict";

      function i(e, t) {
        var n = (65535 & e) + (65535 & t);
        return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
      }

      function a(e, t, n, r, o, a) {
        return i(function (e, t) {
          return e << o | e >>> 32 - o
        }(i(i(t, e), i(r, a))), n)
      }

      function s(e, t, n, r, o, i, s) {
        return a(t & n | ~t & r, e, t, o, i, s)
      }

      function c(e, t, n, r, o, i, s) {
        return a(t & r | n & ~r, e, t, o, i, s)
      }

      function u(e, t, n, r, o, i, s) {
        return a(t ^ n ^ r, e, t, o, i, s)
      }

      function l(e, t, n, r, o, i, s) {
        return a(n ^ (t | ~r), e, t, o, i, s)
      }

      function f(e, t) {
        var n, r, o, a, f;
        e[t >> 5] |= 128 << t % 32, e[14 + (t + 64 >>> 9 << 4)] = t;
        var d = 1732584193,
          p = -271733879,
          h = -1732584194,
          g = 271733878;
        for (n = 0; n < e.length; n += 16) p = l(p = l(p = l(p = l(p = u(p = u(p = u(p = u(p =
          c(p = c(p = c(p = c(p = s(p = s(p = s(p = s(o = p,
            h = s(a = h, g = s(
              f = g, d =
            s(r = d, p,
              h, g, e[
            n],
              7, -
            680876936
            ), p, h, e[
            n + 1],
              12, -
            389564586),
              d, p, e[n + 2],
              17, 606105819),
            g, d, e[n + 3], 22,
            -1044525330), h = s(
              h, g = s(g, d = s(d,
                p, h, g, e[
              n + 4],
                7, -
              176418897),
                p, h, e[n + 5],
                12, 1200080426),
              d, p, e[n + 6], 17,
              -1473231341), g, d,
            e[n + 7], 22, -45705983
          ), h = s(h, g = s(g, d = s(
            d, p, h, g, e[n +
            8], 7,
            1770035416), p,
            h, e[n + 9], 12, -
          1958414417), d, p,
            e[n + 10], 17, -42063),
            g, d, e[n + 11], 22, -
          1990404162), h = s(h, g = s(
            g, d = s(d, p, h, g, e[
              n + 12], 7,
              1804603682), p, h,
            e[n + 13], 12, -
          40341101), d, p, e[n +
          14], 17, -1502002290), g, d,
            e[n + 15], 22, 1236535329), h =
          c(h, g = c(g, d = c(d, p, h, g, e[n +
            1], 5, -165796510), p,
            h, e[n + 6], 9, -1069501632
          ), d, p, e[n + 11], 14,
            643717713), g, d, e[n], 20, -
          373897302), h = c(h, g = c(g, d = c(
            d, p, h, g, e[n + 5], 5, -
          701558691), p, h, e[n + 10],
            9, 38016083), d, p, e[n + 15],
            14, -660478335), g, d, e[n + 4], 20,
            -405537848), h = c(h, g = c(g, d = c(d,
              p, h, g, e[n + 9], 5, 568446438
            ), p, h, e[n + 14], 9, -1019803690), d,
              p, e[n + 3], 14, -187363961), g, d, e[n +
              8], 20, 1163531501), h = c(h, g = c(g, d =
                c(d, p, h, g, e[n + 13], 5, -1444681467),
                p, h, e[n + 2], 9, -51403784), d, p, e[
              n + 7], 14, 1735328473), g, d, e[n + 12],
            20, -1926607734), h = u(h, g = u(g, d = u(d, p,
              h, g, e[n + 5], 4, -378558), p, h, e[n +
              8], 11, -2022574463), d, p, e[n + 11], 16,
              1839030562), g, d, e[n + 14], 23, -35309556), h =
        u(h, g = u(g, d = u(d, p, h, g, e[n + 1], 4, -
          1530992060), p, h, e[n + 4], 11, 1272893353), d,
          p, e[n + 7], 16, -155497632), g, d, e[n + 10], 23,
          -1094730640), h = u(h, g = u(g, d = u(d, p, h, g, e[n +
            13], 4, 681279174), p, h, e[n], 11, -358537222), d,
            p, e[n + 3], 16, -722521979), g, d, e[n + 6], 23,
          76029189), h = u(h, g = u(g, d = u(d, p, h, g, e[n + 9], 4,
            -640364487), p, h, e[n + 12], 11, -421815835), d, p, e[
          n + 15], 16, 530742520), g, d, e[n + 2], 23, -995338651), h = l(
            h, g = l(g, d = l(d, p, h, g, e[n], 6, -198630844), p, h, e[n +
              7], 10, 1126891415), d, p, e[n + 14], 15, -1416354905), g,
          d, e[n + 5], 21, -57434055), h = l(h, g = l(g, d = l(d, p, h, g, e[
            n + 12], 6, 1700485571), p, h, e[n + 3], 10, -1894986606), d, p,
            e[n + 10], 15, -1051523), g, d, e[n + 1], 21, -2054922799), h = l(h, g =
              l(g, d = l(d, p, h, g, e[n + 8], 6, 1873313359), p, h, e[n + 15], 10, -
                30611744), d, p, e[n + 6], 15, -1560198380), g, d, e[n + 13], 21,
          1309151649), h = l(h, g = l(g, d = l(d, p, h, g, e[n + 4], 6, -145523070),
            p, h, e[n + 11], 10, -1120210379), d, p, e[n + 2], 15, 718787259), g, d, e[
        n + 9], 21, -343485551), d = i(d, r), p = i(p, o), h = i(h, a), g = i(g, f);
        return [d, p, h, g]
      }

      function d(e) {
        var t, n = "",
          r = 32 * e.length;
        for (t = 0; t < r; t += 8) n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
        return n
      }

      function p(e) {
        var t, n = [];
        for (n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1) n[t] = 0;
        var r = 8 * e.length;
        for (t = 0; t < r; t += 8) n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
        return n
      }

      function h(e) {
        var t, n, r = "0123456789abcdef",
          o = "";
        for (n = 0; n < e.length; n += 1) t = e.charCodeAt(n), o += r.charAt(t >>> 4 & 15) + r.charAt(
          15 & t);
        return o
      }

      function g(e) {
        return unescape(encodeURIComponent(e))
      }

      function w(e) {
        return function (e) {
          return d(f(p(e), 8 * e.length))
        }(g(e))
      }

      function v(e, t) {
        return function (e, t) {
          var n, r, o = p(e),
            i = [],
            a = [];
          for (i[15] = a[15] = void 0, 16 < o.length && (o = f(o, 8 * e.length)), n = 0; n <
            16; n += 1) i[n] = 909522486 ^ o[n], a[n] = 1549556828 ^ o[n];
          return r = f(i.concat(p(t)), 512 + 8 * t.length), d(f(a.concat(r), 640))
        }(g(e), g(t))
      }

      function m(e, t, n) {
        return t ? n ? v(t, e) : function (e, t) {
          return h(v(e, t))
        }(t, e) : n ? w(e) : function (e) {
          return h(w(e))
        }(e)
      }
      void 0 === (r = function () {
        return m
      }.call(t, n, t, e)) || (e.exports = r)
    }()
  }, function (e, t) {
    var n = window.history || {},
      r = window.document,
      o = function (e, t) {
        var n;
        window.CustomEvent ? n = new CustomEvent(e, {
          detail: t
        }) : ((n = r.createEvent("HTMLEvents")).initEvent(e, !1, !0), n.detail = t), window
          .dispatchEvent(n)
      },
      i = function (e) {
        return e && "string" == typeof e ? e.replace(/^(https?:)?\/\//, "").replace(/\?.*$/, "") :
          ""
      },
      a = function (e) {
        var t = n[e];
        "function" == typeof t && (n[e] = function (e, r, a) {
          var s = location.href,
            c = t.call(n, e, r, a);
          if (!a || "string" != typeof a) return c;
          if (a === s) return c;
          try {
            var u = s.split("#"),
              l = a.split("#"),
              f = i(u[0]),
              d = i(l[0]),
              p = u[1] && u[1].replace(/^\/?(.*)/, "$1"),
              h = l[1] && l[1].replace(/^\/?(.*)/, "$1");
            f !== d ? o("historystatechange", d) : p !== h && o(
              "historystatechange", h)
          } catch (e) { }
          return c
        }, n[e].toString = e + "() { [native code] }")
      };
    e.exports = function () {
      a("pushState"), a("replateState")
    }
  }, function (e, t, n) {
    var r, o, i = n(0),
      a = i.env,
      s = i.category,
      c = function (e) {
        return "function" == typeof e
      },
      u = function (e) {
        var t = -1;
        switch (e.tagName.toLowerCase()) {
          case "img":
            t = 1;
            break;
          case "link":
            e.rel && "stylesheet" === e.rel.toLowerCase() && (t = 2);
            break;
          case "script":
            t = 3;
            break;
          case "video":
            t = 11
        }
        return t
      },
      l = {},
      f = function (e, t, n, r) {
        e.addEventListener ? e.addEventListener(t, n, r || !1) : (l["on" + t] = function () {
          return n.call(e, window.event)
        }, e.attachEvent("on" + t, l["on" + t]))
      },
      d = function (e, t) {
        var n = e.id ? "#" + e.id : "",
          r = e.className ? "." + e.className.split(" ").join(".") : "",
          o = e.tagName.toLowerCase();
        return e.parentNode && e.parentNode.tagName && t - 1 != 0 ? d(e.parentNode, t - 1) +
          " > " + o.toLowerCase() + n + r : o + n + r
      },
      p = function (e, t, n, i, a, u) {
        if (r) try {
          r.call(this, t, n, i, a, u)
        } catch (u) { }
        if (/^script error\.?$/i.test(t) && (t = "Script error"), o.ignoreScriptError &&
          "Script error" === t) e.logger.warn("配置了ignoreScriptError，本次异常将不上报");
        else if (!c(o.jsErrFilter) || o.jsErrFilter.call(this, event)) {
          if (null != u) {
            var l = (u.stack || "").split("\n");
            l.shift();
            var f = {
              w_msg: t,
              w_file: n || "",
              w_line: i || "",
              w_col: a || "",
              stack: l.join("\n"),
              category: s.JSERR,
              sampleRate: o.jsErrSampleRate
            };
            e.report(f)
          }
        } else e.logger.warn("jserrFilter 返回false，本次日志将不上报, event: ", event)
      },
      h = function (e, t) {
        var n = window;
        n && e.env === a.BROWSER ? (e.logger.info("wpkglobalerrorPlugin已开启"), !1 !== (o = e.toolKit
          .extend({
            jsErrSampleRate: 1,
            resErrSampleRate: 1
          }, t)).jsErr ? (r = n.onerror, n.onerror = function (t, n, r, o, i) {
            p(e, t, n, r, o, i)
          }, f(n, "unhandledrejection", function (t) {
            var n = t.type;
            "string" == typeof t.reason ? n = t.reason : "object" == typeof t.reason &&
              t.reason.message && (n = t.reason.message), p(e, n, null, null,
                null, t.reason)
          })) : e.logger.warn("js异常监控已关闭"), o.resErr ? f(n, "error", function (t) {
            ! function (e, t) {
              if (!t.target.tagName || t.message || t.filename || t.lineno || t.colno)
                e.logger.warn("非资源获取问题，跳出处理, event: ", t);
              else if (!c(o.resErrFilter) || o.resErrFilter.call(this, t)) {
                var n = t.target.src || t.target.href;
                e.report({
                  category: s.RESLOADFAIL,
                  sampleRate: o.resErrSampleRate,
                  msg: n + " 加载失败",
                  w_res: n,
                  w_type: u(t.target),
                  w_xpath: d(t.target, 5)
                })
              } else e.logger.warn("reserrFilter 返回false，本次日志将不上报, event: ", t)
            }(e, t)
          }, !0) : e.logger.warn("资源加载异常监控已关闭")) : e.logger.warn("全局错误监控插件不支持非浏览器环境")
      };
    h.prototype.pluginId = "gerror", e.exports = h
  }, function (e, t, n) {
    var r = n(0),
      o = r.sdk,
      i = r.http.methods,
      a = r.category,
      s = 2048,
      c = 121e3,
      u = function (e) {
        return e >= 200 && e <= 299
      },
      l = function (e) {
        return -1 === e.indexOf("//arms-retcode") && -1 === e.indexOf("//wpk-gateway") && -1 ===
          e.indexOf("//px.ucweb.com") && -1 === e.indexOf("//px.effirst.com") && -1 === e.indexOf(
            "//px-intl.ucweb.com")
      };
    var f = function (e, t) {
      if (e.env === r.env.BROWSER && window) {
        var n = e.toolKit.extend({
          enable: !0,
          sampleRate: 1
        }, t);
        n.enable ? (e.logger.info("wpkinterfacePlugin已开启"), "XMLHttpRequest" in window &&
          function (e, t) {
            var n = window.XMLHttpRequest.prototype,
              r = n.open;
            n.open = function (e, t) {
              this.__reqCtx__ = {
                method: e,
                url: t || "",
                start: Date.now()
              };
              var n = [].slice.call(arguments);
              r.apply(this, n)
            };
            var f = n.send;
            n.send = function (n) {
              var r = this;

              function d() {
                if (r.__reqCtx__ && 4 === r.readyState) try {
                  var f = Date.now(),
                    d = (r.responseURL || r.__reqCtx__.url).split(
                      "?"),
                    p = d[0],
                    h = d[1] || "",
                    g = "";
                  r.__reqCtx__.method.toUpperCase() !== i.GET && n &&
                    (g = JSON.stringify(n));
                  var w = String(r.response),
                    v = !0,
                    m = {};
                  "function" == typeof t.errorFilter && (v = !!(m = t
                    .errorFilter.call(this, {
                      url: p,
                      status: r.status,
                      response: w
                    })), e.logger.warn(
                      "api errorFilter执行结果：", m)), w.length > s &&
                    (w = "[response content too large]");
                  var _ = f - r.__reqCtx__.start;
                  if (v && _ < c && l(p)) {
                    var y = m.bizCode || r.status;
                    e.report({
                      category: a.API,
                      sampleRate: t.sampleRate,
                      w_res: p,
                      w_param: h,
                      w_body: u(y) || !t.withBody ? "" : g,
                      w_method: r.__reqCtx__.method,
                      w_rc: y,
                      w_rt: _,
                      w_resp: u(y) || !t.withResp ? "" : m
                        .msg || w,
                      w_type: 16,
                      c1: m.traceId
                    })
                  }
                } catch (t) {
                  e.reportError(t, {
                    bid: o.BID,
                    cid: o.CID,
                    category: a.JSERR,
                    sampleRate: 1
                  })
                }
              }
              if ("onreadystatechange" in r && "function" == typeof r.onreadystatechange) {
                var p = r.onreadystatechange;
                r.onreadystatechange = function () {
                  var e = [].slice.call(arguments);
                  d.apply(this, e), p.apply(this, e)
                }
              } else r.onreadystatechange = d;
              var h = [].slice.call(arguments);
              return f.apply(this, h)
            }
          }(e, n), "fetch" in window && function (e, t) {
            var n = window.fetch;
            window.fetch = function () {
              var r = [].slice.call(arguments),
                f = i.GET;
              r[1] && r[1].method && (f = r[1].method.toUpperCase());
              var d = Date.now();
              return n.apply(this, r).then(function (n) {
                try {
                  var p = Date.now(),
                    h = (n.url || r[0]).split("?"),
                    g = h[0],
                    w = h[1] || "",
                    v = "";
                  f !== i.GET && r[1] && r[1].body && (v = JSON.stringify(
                    r[1].body)), n.clone().text().then(
                      function (r) {
                        r = r || "";
                        var o = !0,
                          i = {};
                        if ("function" == typeof t.errorFilter &&
                          (o = !!(i = t.errorFilter.call(
                            this, {
                            url: g,
                            status: n.status,
                            response: r
                          })), e.logger.warn(
                            "api errorFilter执行结果：",
                            i)), r = r.length > s ?
                              "[response content too large]" :
                              r, o && p - d < c && l(g)) {
                          var h = i.bizCode || n.status;
                          e.report({
                            category: a.API,
                            sampleRate: t.sampleRate,
                            w_res: g,
                            w_param: w,
                            w_body: u(h) || !t.withBody ?
                              "" : v,
                            w_method: f,
                            w_rc: h,
                            w_rt: p - d,
                            w_resp: u(h) || !t.withResp ?
                              "" : i.msg || r,
                            w_type: 16,
                            c1: i.traceId
                          })
                        }
                      })
                } catch (t) {
                  e.reportError(t, {
                    bid: o.BID,
                    cid: o.CID,
                    category: a.JSERR,
                    sampleRate: 1
                  })
                }
                return n
              }).catch(function (t) {
                throw e.reportError(t, {
                  category: a.JSERR
                }), t
              })
            }
          }(e, n)) : e.logger.info("wpkinterfacePlugin已关闭")
      }
    };
    f.prototype.pluginId = "api", e.exports = f
  }, function (e, t, n) {
    var r, o = n(0).env,
      i = n(0).category,
      a = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart",
        "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart",
        "secureConnectionStart", "connectEnd", "requestStart", "responseStart", "responseEnd",
        "domLoading", "domInteractive", "domContentLoadedEventStart",
        "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd",
        "msFirstPaint"],
      s = ["navigate", "reload", "back_forward"],
      c = function (e) {
        var t, n = e[a[5]];
        if (1 === e._ver) {
          var r;
          if (window.chrome && window.chrome.loadTimes) r = 1e3 * window.chrome.loadTimes().firstPaintTime;
          else r = e.msFirstPaint ? e.msFirstPaint : e[a[13]];
          if (!r) return -1;
          t = r >= n ? parseFloat((r - n).toFixed(2)) : -1
        } else 2 === e._ver && (t = e[a[13]] - n, t = parseFloat(t.toFixed(2)));
        return t
      },
      u = function (e, t) {
        var n, r, o, i = {};
        for (var s in t) o = 0, n = e[a[t[s][0]]], r = e[a[t[s][1]]], n > 0 && r > 0 && (o =
          parseFloat((r - n).toFixed(2))), i[s] = o;
        return i
      },
      l = function (e, t) {
        var n = window;
        if (r = n.performance || n.webkitPerformance || n.msPerformance || n.mozPerformance, e.env ===
          o.BROWSER && r && r.timing) {
          t = t || {};
          var a = e.toolKit.extend({
            enable: !0,
            sampleRate: 1
          }, t);
          if (a.enable) {
            e.logger.info("wpkperformancePlugin已开启");
            var l = r.timing || {},
              f = 1;
            if ("function" == typeof n.PerformanceNavigationTiming) try {
              var d = r.getEntriesByType("navigation")[0];
              d && (l = d, f = 2)
            } catch (e) { }
            l._ver = f,
              function (e, t, n, r) {
                e.addEventListener ? e.addEventListener(t, n, r || !1) : e.attachEvent(
                  "on" + t, n)
              }(window, "load", function () {
                /loaded|complete/.test(document.readyState) && setTimeout(function () {
                  var t = e.toolKit.extend(function (e) {
                    return u(e, {
                      w_unload: [1, 2],
                      w_redirect: [3, 4],
                      w_appcache: [5, 6],
                      w_dns: [6, 7],
                      w_tcp: [8, 10],
                      w_ssl: [9, 10],
                      w_ttfb: [11, 12],
                      w_contentdownload: [12, 13],
                      w_domparsing: [13, 15],
                      w_res: [17, 19]
                    })
                  }(l), function (e) {
                    var t = u(e, {
                      w_firstbyte: [5, 12],
                      w_tti: [5, 15],
                      w_domready: [5, 17],
                      w_load: [5, 19],
                      w_total: [5, 20]
                    });
                    return t.w_fpt = c(e), t
                  }(l));
                  for (var n in t)
                    if (t[n] < 0 || t[n] > 6e4) return void e.logger.warn(
                      "性能数据异常：", n, t[n]);
                  var o = e.toolKit.extend(t, function (e) {
                    var t, n = r.navigation || {},
                      o = -1,
                      i = -1,
                      a = -1;
                    return 1 === e._ver ? t = s[n.type] ||
                      "other" : 2 === e._ver && (o = e.encodedBodySize,
                        i = e.decodedBodySize, a = e.transferSize,
                        t = e.type), {
                      w_enbdsize: o,
                      w_debdsize: i,
                      w_transize: a,
                      w_navtype: t
                    }
                  }(l), a, {
                    category: i.JSFSPERF
                  });
                  e.report(o)
                })
              })
          } else e.logger.info("wpkperformancePlugin已关闭")
        } else e.logger.warn("基础性能插件仅支持浏览器环境")
      };
    l.prototype.pluginId = "perf", e.exports = l
  }, function (e, t, n) {
    var r = n(0).env,
      o = function (e, t) {
        if (t = t || {}, -1 !== [r.BROWSER, r.WEEX].indexOf(e.env) && t.params && "string" ==
          typeof t.params) {
          e.logger.info("wpkucparamPlugin已开启");
          for (var n = t.params, o = ["pr", "ve", "os", "fr", "nw"], i = 0; i < 5; i++) {
            var a = o[i]; - 1 === n.indexOf(a) && (n += a)
          }
          try {
            ucapi.biz.ucparams({
              params: n,
              success: function (t) {
                e.uc_param = t || ""
              }
            })
          } catch (t) {
            e.logger.error("get uc_param_str error: ", t), e.uc_param_str = n
          }
        }
      };
    o.prototype.pluginId = "ucparam", e.exports = o
  }, function (e, t, n) {
    var r = n(0),
      o = "undefined" != typeof weex ? weex : {},
      i = function () {
        var e = {
          wx_pf: WXEnvironment.platform,
          wx_ver: WXEnvironment.weexVersion,
          wx_app: WXEnvironment.appName,
          wx_app_ver: WXEnvironment.appVersion,
          wx_os: WXEnvironment.osName,
          wx_os_ver: WXEnvironment.osVersion,
          wx_dev_md: WXEnvironment.deviceModel,
          dsp_w: WXEnvironment.deviceWidth,
          dsp_h: WXEnvironment.deviceHeight
        };
        if (void 0 !== weex.config.uc) try {
          var t = JSON.parse(weex.config.uc.ucParams);
          e.net = t.nw, e.wx_app = t.pr, e.wx_app_ver = t.ve
        } catch (e) { }
        return "undefined" != typeof weex && weex.config && weex.config.bundleType && "Vue" !==
          weex.config.bundleType && "vue" !== weex.config.bundleType ? ("undefined" != typeof location ?
            e.wx_bdl_url = location.href : e.wx_bdl_url = "undefined" != typeof weex &&
              weex.config ? weex.config.bundleUrl : "unknow", e.wx_bdl_type = "Rax") : (e.wx_bdl_url =
                weex.config.bundleUrl, e.wx_bdl_type = "Vue"), e.wx_bdl_name = function (e) {
                  try {
                    var t = e.substring(e.lastIndexOf("/") + 1);
                    return -1 === t.lastIndexOf(".") ? t : t.substring(0, t.lastIndexOf("."))
                  } catch (e) {
                    return ""
                  }
                }(e.wx_bdl_url), e
      };
    e.exports = {
      env: r.env.WEEX,
      root: o,
      isHttps: !1,
      send: function (e, t, n) {
        var r = this.toolKit.extend(i(), n, {
          w_frmid: this._sid
        });
        r.fr = r.wx_os, r.rom = r.wx_os_ver, r.brand = r.wx_dev_md, r.model = r.wx_dev_md,
          r.browser = r.wx_app, r.bver = r.wx_app_ver, r.w_url = r.wx_bdl_name, r.w_send_mode =
          "weexfetch";
        var o = encodeURIComponent(t),
          a = encodeURIComponent(this.toolKit.objToJsonString(r));
        this.uc_param_str && (e += "&uc_param_str=" + this.uc_param_str), weex.requireModule(
          "stream").fetch({
            url: e,
            method: "POST",
            headers: {
              "wpk-header": o
            },
            body: a
          }, function (e, t) { })
      },
      getWid: function () {
        return this.toolKit.uuid()
      },
      bindUnloadEvent: function () { }
    }
  }, function (e, t, n) {
    var r = n(1),
      o = n(15);
    e.exports = function (e) {
      var t = new r(e);
      return t.initialize(o), t
    }
  }, function (e, t, n) {
    (function (t) {
      var r = n(0),
        o = t;
      e.exports = {
        env: r.env.NODEJS,
        root: o,
        send: function (e, t, n) { }
      }
    }).call(this, n(16))
  }, function (e, t) {
    var n;
    n = function () {
      return this
    }();
    try {
      n = n || new Function("return this")()
    } catch (e) {
      "object" == typeof window && (n = window)
    }
    e.exports = n
  }, function (e, t, n) {
    var r = n(1),
      o = n(18);
    e.exports = function (e) {
      var t = new r(e);
      return t.initialize(o), t
    }
  }, function (e, t, n) {
    var r = n(0),
      o = "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
      i = o.document,
      a = o.navigator,
      s = o.location,
      c = {},
      u = function (e, t, n, r, o) {
        if (void 0 === t) {
          var a, s;
          if (!c[e]) {
            a = new RegExp(e + "=([^;]+)");
            try {
              s = a.exec(i.cookie)
            } catch (e) {
              return null
            }
            s && (c[e] = s[1])
          }
          return c[e]
        }
        var u = e + "=" + t;
        r && (u += "; domain=" + r), o && (u += "; path=" + o), n && (u += "; max-age=" + n);
        try {
          return i.cookie = u, !!i.cookie
        } catch (e) {
          return !1
        }
      },
      l = function (e) {
        var t = window,
          n = "wpkimgreporter_" + +new Date + ".r" + Math.floor(1e3 * Math.random()),
          r = t[n] = new Image;
        r.onload = r.onerror = function () {
          t[n] = null
        }, r.src = e
      },
      f = null,
      d = function (e) {
        clearTimeout(f), f = null,
          function (e) {
            var t = e._waitingQueue;
            if (e.checkHidden && i && i.hidden) return e.logger.warn("当前页面不可见，日志数据将丢弃: ", t),
              void (e._waitingQueue = []);
            if (a && a.sendBeacon && o.Blob) {
              var n, r, s = function (e) {
                for (var t, n, r = [], o = [], i = e.length, a = 0; a < i; a++) n =
                  e[a].category, -1 === o.indexOf(n) && o.push(n);
                t = o.length;
                for (var s = 0; s < t; s++) {
                  n = o[s];
                  for (var c = [], u = 0; u < i; u++) {
                    var l = e[u];
                    l.category === n && c.push(l)
                  }
                  r[s] = c
                }
                return r
              }(t),
                c = s.length;
              try {
                for (var u, f = 0; f < c; f++) {
                  u = (n = s[f])[0]._servAddr, r = n.length;
                  for (var d = 0; d < r; d++) n[d].w_send_mode = "sendbeacon", n[d]._servAddr =
                    void 0, n[d]._hash = void 0, n[d] = e.toolKit.objToJsonString(n[
                      d]);
                  var p = encodeURIComponent(n.join("\n"));
                  a.sendBeacon(u, p)
                }
                e._waitingQueue = []
              } catch (e) { }
            } else {
              for (var h, g, w = 0; w < t.length; w++) g = (h = t[w])._servAddr, h.w_send_mode =
                "imgsrc", h._servAddr = void 0, h._hash = void 0, h =
                encodeURIComponent(e.toolKit.objToJsonString(h)), l(g + "&data=" + h);
              e._waitingQueue = []
            }
          }(e)
      },
      p = function (e) {
        d(e)
      };
    e.exports = {
      env: r.env.BROWSER,
      root: o,
      isHttps: s.protocol === r.http.protocols.HTTPS,
      send: function (e, t, n) {
        var c = this;
        if (c.toolKit.isU4HA(c.onlyCustom) && n.category < 100) c.logger.warn(
          "在u4内核环境，屏蔽非自定义的所有自动打点");
        else {
          var u = c.toolKit.extend(function (e) {
            if (!i) return {};
            var t, n = i.referrer;
            return n && -1 !== n.indexOf('"') && (n = encodeURIComponent(i.referrer)), {
              w_url: s.origin + s.pathname,
              w_query: s.search,
              w_ref: s.hash.substring(1),
              w_title: i.title,
              ua: a.userAgent,
              referrer: n,
              dsp_w: o.screen.width,
              dsp_h: o.screen.height,
              net: (t = a.connection, t && t.type ? t.type === r.navConn
                .types.NONE ? "disconnected" : t.type === r.navConn
                  .types.CELLULAR ? t.effectiveType === r.navConn
                    .effectiveTypes.SLOW2G ? "2g" : t.effectiveType :
                  t.type : "")
            }
          }(c.spa), n, {
            w_frmid: c._sid
          });
          if (c.logger.warn("logData to send: ", e, u), e += "?wpk-header=" +
            encodeURIComponent(t), c.uc_param_str && (e += "&uc_param_str=" + c.uc_param_str),
            !0 === n._diagnose) return u = encodeURIComponent(c.toolKit.objToJsonString(
              u)), void window.open(e + "&data=" + u);
          u._servAddr = e, u._hash = c.toolKit.genContentHash(u);
          var l, p, h = c.delay && -1 !== [1, 2, 4].indexOf(u.category);
          if (function (e, t) {
            var n = e._waitingQueue,
              r = n.length,
              o = t.reduplication || e.reduplication || !0,
              i = !0;
            if (1 === t.category && o && 0 !== r) {
              for (var a, s = 0; s < r; s++)
                if ((a = n[s])._hash === t._hash) {
                  a.w_cnt++ , i = !1;
                  break
                } i && n.push(t)
            } else n.push(t);
            return i
          }(c, u) || !h) l = function () {
            d(c)
          }, f = -1 === (p = h ? 3e3 : -1) ? (l(), null) : setTimeout(l, p || 0);
          else c.logger.warn("logData被合并: ", u)
        }
      },
      getWid: function () {
        var e = u(r.sdk.WID_KEY);
        return e || (e = this.toolKit.uuid(), u(r.sdk.WID_KEY, e, 15552e3)), e
      },
      bindUnloadEvent: function (e) {
        window && (window.addEventListener ? window.addEventListener("beforeunload",
          function (t) {
            p(e)
          }, !1) : window.attachEvent && window.attachEvent("onbeforeunload",
            function (t) {
              p(e)
            }))
      }
    }
  }])
});
! function (e, r) {
  "object" == typeof exports && "object" == typeof module ? module.exports = r() : "function" == typeof define &&
    define.amd ? define([], r) : "object" == typeof exports ? exports.wpkglobalerrorPlugin = r() : e.wpkglobalerrorPlugin =
      r()
}(this, function () {
  return function (e) {
    var r = {};

    function t(n) {
      if (r[n]) return r[n].exports;
      var o = r[n] = {
        i: n,
        l: !1,
        exports: {}
      };
      return e[n].call(o.exports, o, o.exports, t), o.l = !0, o.exports
    }
    return t.m = e, t.c = r, t.d = function (e, r, n) {
      t.o(e, r) || Object.defineProperty(e, r, {
        enumerable: !0,
        get: n
      })
    }, t.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      })
    }, t.t = function (e, r) {
      if (1 & r && (e = t(e)), 8 & r) return e;
      if (4 & r && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (t.r(n), Object.defineProperty(n, "default", {
        enumerable: !0,
        value: e
      }), 2 & r && "string" != typeof e)
        for (var o in e) t.d(n, o, function (r) {
          return e[r]
        }.bind(null, o));
      return n
    }, t.n = function (e) {
      var r = e && e.__esModule ? function () {
        return e.default
      } : function () {
        return e
      };
      return t.d(r, "a", r), r
    }, t.o = function (e, r) {
      return Object.prototype.hasOwnProperty.call(e, r)
    }, t.p = "", t(t.s = 3)
  }([function (e, r) {
    e.exports = {
      sdk: {
        BID: "wpkreporter",
        CID: "jssdk",
        WID_KEY: "__wpkreporterwid_"
      },
      env: {
        BROWSER: "browser",
        NODEJS: "nodejs",
        WEEX: "weex"
      },
      px: {
        signKey: "Uvn#08uefVdwe&c4",
        addr: {
          cn: "http://px.effirst.com/api/v1/jssdk/upload",
          cn_https: "https://px.effirst.com/api/v1/jssdk/upload",
          intl: "http://px-intl.ucweb.com/api/v1/jssdk/upload",
          intl_https: "https://px-intl.ucweb.com/api/v1/jssdk/upload"
        },
        confAddr: {
          cn: "http://px.effirst.com/api/v1/jconfig",
          cn_https: "https://px.effirst.com/api/v1/jconfig",
          intl: "http://px-intl.ucweb.com/api/v1/jconfig",
          intl_https: "https://px-intl.ucweb.com/api/v1/jconfig"
        }
      },
      http: {
        methods: {
          GET: "GET",
          PUT: "PUT",
          POST: "POST",
          HEAD: "HEAD",
          DELETE: "DELETE",
          OPTIONS: "OPTIONS",
          CONNECT: "OPTIONS",
          TRACE: "OPTIONS",
          PATCH: "OPTIONS"
        },
        protocols: {
          HTTP: "http:",
          HTTPS: "https:"
        }
      },
      category: {
        JSERR: 1,
        API: 2,
        JSFSPERF: 3,
        RESLOADFAIL: 4,
        FLOW: 5,
        BKPG: 6,
        HARLOG: 7
      },
      navConn: {
        types: {
          BLUETOOTH: "bluetooth",
          CELLULAR: "cellular",
          ETHERNET: "ethernet",
          MIXED: "mixed",
          NONE: "none",
          OTHER: "other",
          UNKNOWN: "unknown",
          WIFI: "wifi",
          WIMAX: "wimax"
        },
        effectiveTypes: {
          "2G": "2g",
          "3G": "3g",
          "4G": "4g",
          SLOW2G: "slow-2g"
        }
      }
    }
  }, , , function (e, r, t) {
    var n, o, i = t(0),
      a = i.env,
      s = i.category,
      l = function (e) {
        return "function" == typeof e
      },
      p = function (e) {
        var r = -1;
        switch (e.tagName.toLowerCase()) {
          case "img":
            r = 1;
            break;
          case "link":
            e.rel && "stylesheet" === e.rel.toLowerCase() && (r = 2);
            break;
          case "script":
            r = 3;
            break;
          case "video":
            r = 11
        }
        return r
      },
      c = {},
      f = function (e, r, t, n) {
        e.addEventListener ? e.addEventListener(r, t, n || !1) : (c["on" + r] = function () {
          return t.call(e, window.event)
        }, e.attachEvent("on" + r, c["on" + r]))
      },
      u = function (e, r) {
        var t = e.id ? "#" + e.id : "",
          n = e.className ? "." + e.className.split(" ").join(".") : "",
          o = e.tagName.toLowerCase();
        return e.parentNode && e.parentNode.tagName && r - 1 != 0 ? u(e.parentNode, r - 1) +
          " > " + o.toLowerCase() + t + n : o + t + n
      },
      g = function (e, r, t, i, a, p) {
        if (n) try {
          n.call(this, r, t, i, a, p)
        } catch (p) { }
        if (/^script error\.?$/i.test(r) && (r = "Script error"), o.ignoreScriptError &&
          "Script error" === r) e.logger.warn("配置了ignoreScriptError，本次异常将不上报");
        else if (!l(o.jsErrFilter) || o.jsErrFilter.call(this, event)) {
          if (null != p) {
            var c = (p.stack || "").split("\n");
            c.shift();
            var f = {
              w_msg: r,
              w_file: t || "",
              w_line: i || "",
              w_col: a || "",
              stack: c.join("\n"),
              category: s.JSERR,
              sampleRate: o.jsErrSampleRate
            };
            e.report(f)
          }
        } else e.logger.warn("jserrFilter 返回false，本次日志将不上报, event: ", event)
      },
      d = function (e, r) {
        var t = window;
        t && e.env === a.BROWSER ? (e.logger.info("wpkglobalerrorPlugin已开启"), !1 !== (o = e.toolKit
          .extend({
            jsErrSampleRate: 1,
            resErrSampleRate: 1
          }, r)).jsErr ? (n = t.onerror, t.onerror = function (r, t, n, o, i) {
            g(e, r, t, n, o, i)
          }, f(t, "unhandledrejection", function (r) {
            var t = r.type;
            "string" == typeof r.reason ? t = r.reason : "object" == typeof r.reason &&
              r.reason.message && (t = r.reason.message), g(e, t, null, null,
                null, r.reason)
          })) : e.logger.warn("js异常监控已关闭"), o.resErr ? f(t, "error", function (r) {
            ! function (e, r) {
              if (!r.target.tagName || r.message || r.filename || r.lineno || r.colno)
                e.logger.warn("非资源获取问题，跳出处理, event: ", r);
              else if (!l(o.resErrFilter) || o.resErrFilter.call(this, r)) {
                var t = r.target.src || r.target.href;
                e.report({
                  category: s.RESLOADFAIL,
                  sampleRate: o.resErrSampleRate,
                  msg: t + " 加载失败",
                  w_res: t,
                  w_type: p(r.target),
                  w_xpath: u(r.target, 5)
                })
              } else e.logger.warn("reserrFilter 返回false，本次日志将不上报, event: ", r)
            }(e, r)
          }, !0) : e.logger.warn("资源加载异常监控已关闭")) : e.logger.warn("全局错误监控插件不支持非浏览器环境")
      };
    d.prototype.pluginId = "gerror", e.exports = d
  }])
});
! function (e, r) {
  "object" == typeof exports && "object" == typeof module ? module.exports = r() : "function" == typeof define &&
    define.amd ? define([], r) : "object" == typeof exports ? exports.wpkglobalerrorPlugin = r() : e.wpkglobalerrorPlugin =
      r()
}(this, function () {
  return function (e) {
    var r = {};

    function t(n) {
      if (r[n]) return r[n].exports;
      var o = r[n] = {
        i: n,
        l: !1,
        exports: {}
      };
      return e[n].call(o.exports, o, o.exports, t), o.l = !0, o.exports
    }
    return t.m = e, t.c = r, t.d = function (e, r, n) {
      t.o(e, r) || Object.defineProperty(e, r, {
        enumerable: !0,
        get: n
      })
    }, t.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      })
    }, t.t = function (e, r) {
      if (1 & r && (e = t(e)), 8 & r) return e;
      if (4 & r && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (t.r(n), Object.defineProperty(n, "default", {
        enumerable: !0,
        value: e
      }), 2 & r && "string" != typeof e)
        for (var o in e) t.d(n, o, function (r) {
          return e[r]
        }.bind(null, o));
      return n
    }, t.n = function (e) {
      var r = e && e.__esModule ? function () {
        return e.default
      } : function () {
        return e
      };
      return t.d(r, "a", r), r
    }, t.o = function (e, r) {
      return Object.prototype.hasOwnProperty.call(e, r)
    }, t.p = "", t(t.s = 3)
  }([function (e, r) {
    e.exports = {
      sdk: {
        BID: "wpkreporter",
        CID: "jssdk",
        WID_KEY: "__wpkreporterwid_"
      },
      env: {
        BROWSER: "browser",
        NODEJS: "nodejs",
        WEEX: "weex"
      },
      px: {
        signKey: "Uvn#08uefVdwe&c4",
        addr: {
          cn: "http://px.effirst.com/api/v1/jssdk/upload",
          cn_https: "https://px.effirst.com/api/v1/jssdk/upload",
          intl: "http://px-intl.ucweb.com/api/v1/jssdk/upload",
          intl_https: "https://px-intl.ucweb.com/api/v1/jssdk/upload"
        },
        confAddr: {
          cn: "http://px.effirst.com/api/v1/jconfig",
          cn_https: "https://px.effirst.com/api/v1/jconfig",
          intl: "http://px-intl.ucweb.com/api/v1/jconfig",
          intl_https: "https://px-intl.ucweb.com/api/v1/jconfig"
        }
      },
      http: {
        methods: {
          GET: "GET",
          PUT: "PUT",
          POST: "POST",
          HEAD: "HEAD",
          DELETE: "DELETE",
          OPTIONS: "OPTIONS",
          CONNECT: "OPTIONS",
          TRACE: "OPTIONS",
          PATCH: "OPTIONS"
        },
        protocols: {
          HTTP: "http:",
          HTTPS: "https:"
        }
      },
      category: {
        JSERR: 1,
        API: 2,
        JSFSPERF: 3,
        RESLOADFAIL: 4,
        FLOW: 5,
        BKPG: 6,
        HARLOG: 7
      },
      navConn: {
        types: {
          BLUETOOTH: "bluetooth",
          CELLULAR: "cellular",
          ETHERNET: "ethernet",
          MIXED: "mixed",
          NONE: "none",
          OTHER: "other",
          UNKNOWN: "unknown",
          WIFI: "wifi",
          WIMAX: "wimax"
        },
        effectiveTypes: {
          "2G": "2g",
          "3G": "3g",
          "4G": "4g",
          SLOW2G: "slow-2g"
        }
      }
    }
  }, , , function (e, r, t) {
    var n, o, i = t(0),
      a = i.env,
      s = i.category,
      l = function (e) {
        return "function" == typeof e
      },
      p = function (e) {
        var r = -1;
        switch (e.tagName.toLowerCase()) {
          case "img":
            r = 1;
            break;
          case "link":
            e.rel && "stylesheet" === e.rel.toLowerCase() && (r = 2);
            break;
          case "script":
            r = 3;
            break;
          case "video":
            r = 11
        }
        return r
      },
      c = {},
      f = function (e, r, t, n) {
        e.addEventListener ? e.addEventListener(r, t, n || !1) : (c["on" + r] = function () {
          return t.call(e, window.event)
        }, e.attachEvent("on" + r, c["on" + r]))
      },
      u = function (e, r) {
        var t = e.id ? "#" + e.id : "",
          n = e.className ? "." + e.className.split(" ").join(".") : "",
          o = e.tagName.toLowerCase();
        return e.parentNode && e.parentNode.tagName && r - 1 != 0 ? u(e.parentNode, r - 1) +
          " > " + o.toLowerCase() + t + n : o + t + n
      },
      g = function (e, r, t, i, a, p) {
        if (n) try {
          n.call(this, r, t, i, a, p)
        } catch (p) { }
        if (/^script error\.?$/i.test(r) && (r = "Script error"), o.ignoreScriptError &&
          "Script error" === r) e.logger.warn("配置了ignoreScriptError，本次异常将不上报");
        else if (!l(o.jsErrFilter) || o.jsErrFilter.call(this, event)) {
          if (null != p) {
            var c = (p.stack || "").split("\n");
            c.shift();
            var f = {
              w_msg: r,
              w_file: t || "",
              w_line: i || "",
              w_col: a || "",
              stack: c.join("\n"),
              category: s.JSERR,
              sampleRate: o.jsErrSampleRate
            };
            e.report(f)
          }
        } else e.logger.warn("jserrFilter 返回false，本次日志将不上报, event: ", event)
      },
      d = function (e, r) {
        var t = window;
        t && e.env === a.BROWSER ? (e.logger.info("wpkglobalerrorPlugin已开启"), !1 !== (o = e.toolKit
          .extend({
            jsErrSampleRate: 1,
            resErrSampleRate: 1
          }, r)).jsErr ? (n = t.onerror, t.onerror = function (r, t, n, o, i) {
            g(e, r, t, n, o, i)
          }, f(t, "unhandledrejection", function (r) {
            var t = r.type;
            "string" == typeof r.reason ? t = r.reason : "object" == typeof r.reason &&
              r.reason.message && (t = r.reason.message), g(e, t, null, null,
                null, r.reason)
          })) : e.logger.warn("js异常监控已关闭"), o.resErr ? f(t, "error", function (r) {
            ! function (e, r) {
              if (!r.target.tagName || r.message || r.filename || r.lineno || r.colno)
                e.logger.warn("非资源获取问题，跳出处理, event: ", r);
              else if (!l(o.resErrFilter) || o.resErrFilter.call(this, r)) {
                var t = r.target.src || r.target.href;
                e.report({
                  category: s.RESLOADFAIL,
                  sampleRate: o.resErrSampleRate,
                  msg: t + " 加载失败",
                  w_res: t,
                  w_type: p(r.target),
                  w_xpath: u(r.target, 5)
                })
              } else e.logger.warn("reserrFilter 返回false，本次日志将不上报, event: ", r)
            }(e, r)
          }, !0) : e.logger.warn("资源加载异常监控已关闭")) : e.logger.warn("全局错误监控插件不支持非浏览器环境")
      };
    d.prototype.pluginId = "gerror", e.exports = d
  }])
});
! function (t, e) {
  "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define &&
    define.amd ? define([], e) : "object" == typeof exports ? exports.wpkinterfacePlugin = e() : t.wpkinterfacePlugin =
      e()
}(this, function () {
  return function (t) {
    var e = {};

    function r(n) {
      if (e[n]) return e[n].exports;
      var o = e[n] = {
        i: n,
        l: !1,
        exports: {}
      };
      return t[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
    }
    return r.m = t, r.c = e, r.d = function (t, e, n) {
      r.o(t, e) || Object.defineProperty(t, e, {
        enumerable: !0,
        get: n
      })
    }, r.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      })
    }, r.t = function (t, e) {
      if (1 & e && (t = r(t)), 8 & e) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if (r.r(n), Object.defineProperty(n, "default", {
        enumerable: !0,
        value: t
      }), 2 & e && "string" != typeof t)
        for (var o in t) r.d(n, o, function (e) {
          return t[e]
        }.bind(null, o));
      return n
    }, r.n = function (t) {
      var e = t && t.__esModule ? function () {
        return t.default
      } : function () {
        return t
      };
      return r.d(e, "a", e), e
    }, r.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }, r.p = "", r(r.s = 4)
  }([function (t, e) {
    t.exports = {
      sdk: {
        BID: "wpkreporter",
        CID: "jssdk",
        WID_KEY: "__wpkreporterwid_"
      },
      env: {
        BROWSER: "browser",
        NODEJS: "nodejs",
        WEEX: "weex"
      },
      px: {
        signKey: "Uvn#08uefVdwe&c4",
        addr: {
          cn: "http://px.effirst.com/api/v1/jssdk/upload",
          cn_https: "https://px.effirst.com/api/v1/jssdk/upload",
          intl: "http://px-intl.ucweb.com/api/v1/jssdk/upload",
          intl_https: "https://px-intl.ucweb.com/api/v1/jssdk/upload"
        },
        confAddr: {
          cn: "http://px.effirst.com/api/v1/jconfig",
          cn_https: "https://px.effirst.com/api/v1/jconfig",
          intl: "http://px-intl.ucweb.com/api/v1/jconfig",
          intl_https: "https://px-intl.ucweb.com/api/v1/jconfig"
        }
      },
      http: {
        methods: {
          GET: "GET",
          PUT: "PUT",
          POST: "POST",
          HEAD: "HEAD",
          DELETE: "DELETE",
          OPTIONS: "OPTIONS",
          CONNECT: "OPTIONS",
          TRACE: "OPTIONS",
          PATCH: "OPTIONS"
        },
        protocols: {
          HTTP: "http:",
          HTTPS: "https:"
        }
      },
      category: {
        JSERR: 1,
        API: 2,
        JSFSPERF: 3,
        RESLOADFAIL: 4,
        FLOW: 5,
        BKPG: 6,
        HARLOG: 7
      },
      navConn: {
        types: {
          BLUETOOTH: "bluetooth",
          CELLULAR: "cellular",
          ETHERNET: "ethernet",
          MIXED: "mixed",
          NONE: "none",
          OTHER: "other",
          UNKNOWN: "unknown",
          WIFI: "wifi",
          WIMAX: "wimax"
        },
        effectiveTypes: {
          "2G": "2g",
          "3G": "3g",
          "4G": "4g",
          SLOW2G: "slow-2g"
        }
      }
    }
  }, , , , function (t, e, r) {
    var n = r(0),
      o = n.sdk,
      i = n.http.methods,
      a = n.category,
      p = 2048,
      s = 121e3,
      c = function (t) {
        return t >= 200 && t <= 299
      },
      l = function (t) {
        return -1 === t.indexOf("//arms-retcode") && -1 === t.indexOf("//wpk-gateway") && -1 ===
          t.indexOf("//px.ucweb.com") && -1 === t.indexOf("//px.effirst.com") && -1 === t.indexOf(
            "//px-intl.ucweb.com")
      };
    var f = function (t, e) {
      if (t.env === n.env.BROWSER && window) {
        var r = t.toolKit.extend({
          enable: !0,
          sampleRate: 1
        }, e);
        r.enable ? (t.logger.info("wpkinterfacePlugin已开启"), "XMLHttpRequest" in window &&
          function (t, e) {
            var r = window.XMLHttpRequest.prototype,
              n = r.open;
            r.open = function (t, e) {
              this.__reqCtx__ = {
                method: t,
                url: e || "",
                start: Date.now()
              };
              var r = [].slice.call(arguments);
              n.apply(this, r)
            };
            var f = r.send;
            r.send = function (r) {
              var n = this;

              function u() {
                if (n.__reqCtx__ && 4 === n.readyState) try {
                  var f = Date.now(),
                    u = (n.responseURL || n.__reqCtx__.url).split(
                      "?"),
                    d = u[0],
                    w = u[1] || "",
                    h = "";
                  n.__reqCtx__.method.toUpperCase() !== i.GET && r &&
                    (h = JSON.stringify(r));
                  var y = String(n.response),
                    _ = !0,
                    g = {};
                  "function" == typeof e.errorFilter && (_ = !!(g = e
                    .errorFilter.call(this, {
                      url: d,
                      status: n.status,
                      response: y
                    })), t.logger.warn(
                      "api errorFilter执行结果：", g)), y.length > p &&
                    (y = "[response content too large]");
                  var m = f - n.__reqCtx__.start;
                  if (_ && m < s && l(d)) {
                    var v = g.bizCode || n.status;
                    t.report({
                      category: a.API,
                      sampleRate: e.sampleRate,
                      w_res: d,
                      w_param: w,
                      w_body: c(v) || !e.withBody ? "" : h,
                      w_method: n.__reqCtx__.method,
                      w_rc: v,
                      w_rt: m,
                      w_resp: c(v) || !e.withResp ? "" : g
                        .msg || y,
                      w_type: 16,
                      c1: g.traceId
                    })
                  }
                } catch (e) {
                  t.reportError(e, {
                    bid: o.BID,
                    cid: o.CID,
                    category: a.JSERR,
                    sampleRate: 1
                  })
                }
              }
              if ("onreadystatechange" in n && "function" == typeof n.onreadystatechange) {
                var d = n.onreadystatechange;
                n.onreadystatechange = function () {
                  var t = [].slice.call(arguments);
                  u.apply(this, t), d.apply(this, t)
                }
              } else n.onreadystatechange = u;
              var w = [].slice.call(arguments);
              return f.apply(this, w)
            }
          }(t, r), "fetch" in window && function (t, e) {
            var r = window.fetch;
            window.fetch = function () {
              var n = [].slice.call(arguments),
                f = i.GET;
              n[1] && n[1].method && (f = n[1].method.toUpperCase());
              var u = Date.now();
              return r.apply(this, n).then(function (r) {
                try {
                  var d = Date.now(),
                    w = (r.url || n[0]).split("?"),
                    h = w[0],
                    y = w[1] || "",
                    _ = "";
                  f !== i.GET && n[1] && n[1].body && (_ = JSON.stringify(
                    n[1].body)), r.clone().text().then(
                      function (n) {
                        n = n || "";
                        var o = !0,
                          i = {};
                        if ("function" == typeof e.errorFilter &&
                          (o = !!(i = e.errorFilter.call(
                            this, {
                            url: h,
                            status: r.status,
                            response: n
                          })), t.logger.warn(
                            "api errorFilter执行结果：",
                            i)), n = n.length > p ?
                              "[response content too large]" :
                              n, o && d - u < s && l(h)) {
                          var w = i.bizCode || r.status;
                          t.report({
                            category: a.API,
                            sampleRate: e.sampleRate,
                            w_res: h,
                            w_param: y,
                            w_body: c(w) || !e.withBody ?
                              "" : _,
                            w_method: f,
                            w_rc: w,
                            w_rt: d - u,
                            w_resp: c(w) || !e.withResp ?
                              "" : i.msg || n,
                            w_type: 16,
                            c1: i.traceId
                          })
                        }
                      })
                } catch (e) {
                  t.reportError(e, {
                    bid: o.BID,
                    cid: o.CID,
                    category: a.JSERR,
                    sampleRate: 1
                  })
                }
                return r
              }).catch(function (e) {
                throw t.reportError(e, {
                  category: a.JSERR
                }), e
              })
            }
          }(t, r)) : t.logger.info("wpkinterfacePlugin已关闭")
      }
    };
    f.prototype.pluginId = "api", t.exports = f
  }])
});
! function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define &&
    define.amd ? define([], t) : "object" == typeof exports ? exports.wpkperformancePlugin = t() : e.wpkperformancePlugin =
      t()
}(this, function () {
  return function (e) {
    var t = {};

    function n(o) {
      if (t[o]) return t[o].exports;
      var r = t[o] = {
        i: o,
        l: !1,
        exports: {}
      };
      return e[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    return n.m = e, n.c = t, n.d = function (e, t, o) {
      n.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: o
      })
    }, n.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      })
    }, n.t = function (e, t) {
      if (1 & t && (e = n(e)), 8 & t) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var o = Object.create(null);
      if (n.r(o), Object.defineProperty(o, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e)
        for (var r in e) n.d(o, r, function (t) {
          return e[t]
        }.bind(null, r));
      return o
    }, n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default
      } : function () {
        return e
      };
      return n.d(t, "a", t), t
    }, n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 5)
  }({
    0: function (e, t) {
      e.exports = {
        sdk: {
          BID: "wpkreporter",
          CID: "jssdk",
          WID_KEY: "__wpkreporterwid_"
        },
        env: {
          BROWSER: "browser",
          NODEJS: "nodejs",
          WEEX: "weex"
        },
        px: {
          signKey: "Uvn#08uefVdwe&c4",
          addr: {
            cn: "http://px.effirst.com/api/v1/jssdk/upload",
            cn_https: "https://px.effirst.com/api/v1/jssdk/upload",
            intl: "http://px-intl.ucweb.com/api/v1/jssdk/upload",
            intl_https: "https://px-intl.ucweb.com/api/v1/jssdk/upload"
          },
          confAddr: {
            cn: "http://px.effirst.com/api/v1/jconfig",
            cn_https: "https://px.effirst.com/api/v1/jconfig",
            intl: "http://px-intl.ucweb.com/api/v1/jconfig",
            intl_https: "https://px-intl.ucweb.com/api/v1/jconfig"
          }
        },
        http: {
          methods: {
            GET: "GET",
            PUT: "PUT",
            POST: "POST",
            HEAD: "HEAD",
            DELETE: "DELETE",
            OPTIONS: "OPTIONS",
            CONNECT: "OPTIONS",
            TRACE: "OPTIONS",
            PATCH: "OPTIONS"
          },
          protocols: {
            HTTP: "http:",
            HTTPS: "https:"
          }
        },
        category: {
          JSERR: 1,
          API: 2,
          JSFSPERF: 3,
          RESLOADFAIL: 4,
          FLOW: 5,
          BKPG: 6,
          HARLOG: 7
        },
        navConn: {
          types: {
            BLUETOOTH: "bluetooth",
            CELLULAR: "cellular",
            ETHERNET: "ethernet",
            MIXED: "mixed",
            NONE: "none",
            OTHER: "other",
            UNKNOWN: "unknown",
            WIFI: "wifi",
            WIMAX: "wimax"
          },
          effectiveTypes: {
            "2G": "2g",
            "3G": "3g",
            "4G": "4g",
            SLOW2G: "slow-2g"
          }
        }
      }
    },
    5: function (e, t, n) {
      var o, r = n(0).env,
        i = n(0).category,
        a = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart",
          "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart",
          "secureConnectionStart", "connectEnd", "requestStart", "responseStart",
          "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart",
          "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd",
          "msFirstPaint"],
        d = ["navigate", "reload", "back_forward"],
        p = function (e) {
          var t, n = e[a[5]];
          if (1 === e._ver) {
            var o;
            if (window.chrome && window.chrome.loadTimes) o = 1e3 * window.chrome.loadTimes()
              .firstPaintTime;
            else o = e.msFirstPaint ? e.msFirstPaint : e[a[13]];
            if (!o) return -1;
            t = o >= n ? parseFloat((o - n).toFixed(2)) : -1
          } else 2 === e._ver && (t = e[a[13]] - n, t = parseFloat(t.toFixed(2)));
          return t
        },
        c = function (e, t) {
          var n, o, r, i = {};
          for (var d in t) r = 0, n = e[a[t[d][0]]], o = e[a[t[d][1]]], n > 0 && o > 0 && (r =
            parseFloat((o - n).toFixed(2))), i[d] = r;
          return i
        },
        f = function (e, t) {
          var n = window;
          if (o = n.performance || n.webkitPerformance || n.msPerformance || n.mozPerformance,
            e.env === r.BROWSER && o && o.timing) {
            t = t || {};
            var a = e.toolKit.extend({
              enable: !0,
              sampleRate: 1
            }, t);
            if (a.enable) {
              e.logger.info("wpkperformancePlugin已开启");
              var f, s, u, l, v = o.timing || {},
                m = 1;
              if ("function" == typeof n.PerformanceNavigationTiming) try {
                var w = o.getEntriesByType("navigation")[0];
                w && (v = w, m = 2)
              } catch (e) { }
              v._ver = m, f = window, s = "load", u = function () {
                /loaded|complete/.test(document.readyState) && setTimeout(function () {
                  var t = e.toolKit.extend(function (e) {
                    return c(e, {
                      w_unload: [1, 2],
                      w_redirect: [3, 4],
                      w_appcache: [5, 6],
                      w_dns: [6, 7],
                      w_tcp: [8, 10],
                      w_ssl: [9, 10],
                      w_ttfb: [11, 12],
                      w_contentdownload: [12, 13],
                      w_domparsing: [13, 15],
                      w_res: [17, 19]
                    })
                  }(v), function (e) {
                    var t = c(e, {
                      w_firstbyte: [5, 12],
                      w_tti: [5, 15],
                      w_domready: [5, 17],
                      w_load: [5, 19],
                      w_total: [5, 20]
                    });
                    return t.w_fpt = p(e), t
                  }(v));
                  for (var n in t)
                    if (t[n] < 0 || t[n] > 6e4) return void e.logger.warn(
                      "性能数据异常：", n, t[n]);
                  var r = e.toolKit.extend(t, function (e) {
                    var t, n = o.navigation || {},
                      r = -1,
                      i = -1,
                      a = -1;
                    return 1 === e._ver ? t = d[n.type] ||
                      "other" : 2 === e._ver && (r = e.encodedBodySize,
                        i = e.decodedBodySize, a = e.transferSize,
                        t = e.type), {
                      w_enbdsize: r,
                      w_debdsize: i,
                      w_transize: a,
                      w_navtype: t
                    }
                  }(v), a, {
                    category: i.JSFSPERF
                  });
                  e.report(r)
                })
              }, f.addEventListener ? f.addEventListener(s, u, l || !1) : f.attachEvent(
                "on" + s, u)
            } else e.logger.info("wpkperformancePlugin已关闭")
          } else e.logger.warn("基础性能插件仅支持浏览器环境")
        };
      f.prototype.pluginId = "perf", e.exports = f
    }
  })
});
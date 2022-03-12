import wx from "wx-bridge";

export const permission = {
  request(code) {
    return require("../lib/permission").requestAndroidPermission(
      `android.permission.${code}`
    );
  },
  async check(code, tip) {
    const res = await this.request(code);

    if (res === 1) {
      return Promise.resolve();
    } else if (res === -1) {
      const { confirm } = await wx.showModal({
        title: "提示",
        content: tip,
      });

      if (confirm) {
        this.gotoAppSetting();
      } else {
        return Promise.reject();
      }
    }
  },
  gotoAppSetting() {
    require("../lib/permission").gotoAppPermissionSetting();
  },
};

﻿var configs = {
    url: {
        Get: _root + "Project/getProjectlist",
        Del: _root + "Project/deleteProject",
        SaveSystem: _root + "Project/saveProject",
        GetType: _root + "system/GetTemplateType"
    },
    text:
    {
        add: "添加方案",
        edit: "修改方案"
    },
    w: {
        w: 600,
        h:450
    }
};
divFrom.$Form({
    url: configs.url.Get,
    callback: function (msg) {
        msg.Data.Dblfunc = function () {
            btnEdit.click();
        };
        divGrid.$Grid(msg.Data);
    }
})
btnSearch.$Button({
    url: configs.url.Get,
    callback: function (msg) {
        msg.Data.Dblfunc = function () {
            btnEdit.click();
        };
        divGrid.$Grid(msg.Data);
    }
});

 

txtModelIdName.$SelectTree({
    isMultiple: false,
    url: configs.url.GetType,
    maxHeight: 180,
    width: 400,
    rootIsSelect: true
})

btnReset.$Reset();


btnAdd.$Open("#divOpen", {
    title: configs.text.add,
    w: configs.w.w,
    h: configs.w.h,
    validate: function () {
        frmSave.$ClearControls();
        return true;
    },
    yes: function () {
        frmSave.$Form({
            url: configs.url.SaveSystem,
            callback: function (msg) {
                if (msg.IsKeyValuePair) {
                    $sugar.$Validate(msg.Data, "save");
                } else {
                    $sugar.$Validate("clear");
                    msg.Data.$Alert();
                    if (msg.IsSuccess) {
                        btnSearch.click();
                        $sugar.$CloseAll(divOpen.getAttribute("dataindex"));
                    }
                }
            }
        });
    },
    btn: ['添加', '关闭']
});

btnEdit.$Open("#divOpen", {
    title: configs.text.edit,
    w: configs.w.w,
    h: configs.w.h,
    validate: function () {
        var gridInfo = divGrid.$GridInfo();
        if (gridInfo.length == 0) {
            "请选择记录".$Alert();
            return false;
        } else {
            gridInfo = gridInfo[0];
            frmSave.$FillControls(gridInfo);
            return true;
        }
    },
    yes: function () {
        frmSave.$Form({
            url: configs.url.SaveSystem,
            callback: function (msg) {
                if (msg.IsKeyValuePair) {
                    $sugar.$Validate(msg.Data, "save");
                } else {
                    $sugar.$Validate("clear");
                    msg.Data.$Alert();
                    if (msg.IsSuccess) {
                        btnSearch.click();
                        $sugar.$CloseAll(divOpen.getAttribute("dataindex"));
                    }
                }
            }
        });
    },
    btn: ['保存', '关闭']
});


btnDel.$Confirm({
    title: "是否删除记录",
    ok: function () {
        var gridInfo = divGrid.$GridInfo();
        if (gridInfo.length > 0) {
            configs.url.Del.$Ajax({
                callback: function (msg) {
                    if (msg.IsSuccess) {
                        "删除成功".$Alert();
                        btnSearch.click();
                    }
                    else {
                        msg.Data.$Alert();
                    }
                },
                data: { "model": JSON.stringify(gridInfo) }
            })
        } else {
            "请选择一条数据".$Alert();
        }
    }
})



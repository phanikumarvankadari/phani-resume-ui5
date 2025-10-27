sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
    "use strict";

    return UIComponent.extend("sap.uxap.sample.ObjectPageWithLinksAndObjectStatus.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // set resume model
            var oResumeModel = new JSONModel({
                path: "model/resume.json",
                headers: {
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    "Pragma": "no-cache",
                    "Expires": "0"
                }
            });
            
            oResumeModel.attachRequestCompleted(function() {
                console.log("Component: Resume data loaded successfully");
            });

            oResumeModel.attachRequestFailed(function(oEvent) {
                console.error("Component: Failed to load resume data:", oEvent.getParameter("responseText"));
            });

            this.setModel(oResumeModel, "Resume");
        }
    });
});

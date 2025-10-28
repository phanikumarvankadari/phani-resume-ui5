sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/Device"
], function (Controller, MessageToast, Fragment, JSONModel, formatter, Device) {
	"use strict";

	return Controller.extend("sap.uxap.sample.ObjectPageWithLinksAndObjectStatus.controller.ObjectPageWithLinksAndObjectStatus", {
		formatter: formatter,

		onInit: function () {
			// Set device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.getView().setModel(oDeviceModel, "device");
		},
        formatter: formatter,
		onInit: function () {
            // Load and set the resume model
            var oResumeModel = new JSONModel();
            
            // Load the resume data
            oResumeModel.loadData("model/resume.json");
            
            // Add error handling
            oResumeModel.attachRequestCompleted(function() {
                console.log("Resume data loaded successfully:", this.getView().getModel("Resume").getData());
                // Verify photo path
                var photoPath = this.getView().getModel("Resume").getProperty("/profile/photo");
                console.log("Photo path:", photoPath);
            }.bind(this));
            
            oResumeModel.attachRequestFailed(function(oEvent) {
                console.error("Failed to load resume data:", oEvent.getParameter("responseText"));
            });
            
            this.getView().setModel(oResumeModel, "Resume");
		},


		onOrderDetailsPress: function () {
			var oView = this.getView();
			oView.byId("ObjectPageLayout").setSelectedSection(oView.byId("orderDetailsSection"));
		},
		onExternalApplicationLinkPress: function () {
			MessageToast.show("Navigate to external application.");
		},
		onAnotherPageLinkPress: function () {
			MessageToast.show("Navigate to another page in the same application (List of delivery items)");
		},
        
        onImageLoadError: function(oEvent) {
            console.error("Failed to load image:", oEvent.getParameter("src"));
            MessageToast.show("Failed to load profile image");
		},

        onDownloadPDF: function() {
            // Create a link element to trigger the download
            var link = document.createElement('a');
            link.href = 'model/Phani Kumar Vankadari-19 years-SAPTechnologyConsultant.pdf';
            link.download = 'Phani Kumar Vankadari-Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            MessageToast.show("Downloading resume...");
        },

        onEmailPress: function() {
            var oModel = this.getView().getModel("Resume");
            var sEmail = oModel.getProperty("/profile/email");
            window.location.href = "mailto:" + sEmail;
		},

        onLinkedInPress: function() {
            var oModel = this.getView().getModel("Resume");
            var sLinkedInUrl = oModel.getProperty("/profile/linkedin");
            window.open(sLinkedInUrl, '_blank');
		},
		openQuickView: function (oEvent, oModel) {
			var oButton = oEvent.getSource(),
				oView = this.getView();

			if (!this._pQuickView) {
				Fragment.load({
					id: oView.getId(),
					name: "sap.uxap.sample.ObjectPageWithLinksAndObjectStatus.view.QuickView",
					controller: this
				}).then(function (oQuickView) {
					oView.addDependent(oQuickView);
					this._pQuickView = oQuickView;
					oQuickView.setModel(oModel);
					oQuickView.openBy(oButton);
				}.bind(this));
			} else {
				this._pQuickView.openBy(oButton);
			}
		},
		handleTitleSelectorPress: function (oEvent) {
			var oModel = this.getView().getModel("CompanyModel");
			this.openQuickView(oEvent, oModel);
		},



		_openHighlightsPopover: function(oSource, oModel) {
			var oView = this.getView();

			if (!this._pHighlightsPopover) {
				Fragment.load({
					id: oView.getId(),
					name: "sap.uxap.sample.ObjectPageWithLinksAndObjectStatus.view.ExperienceHighlights",
					controller: this
				}).then(function (oPopover) {
					oView.addDependent(oPopover);
					this._pHighlightsPopover = oPopover;
					oPopover.setModel(oModel);
					oPopover.openBy(oSource);
				}.bind(this));
			} else {
				this._pHighlightsPopover.setModel(oModel);
				this._pHighlightsPopover.openBy(oSource);
			}
		},

		onShowExperienceDetails: function(oEvent) {
			var oButton = oEvent.getSource();
			var oBindingContext = oButton.getBindingContext("Resume");
			
			if (oBindingContext) {
				var oExperienceData = oBindingContext.getObject();
				
				// Create a model for the selected experience
				var oPopoverModel = new JSONModel({
					selectedExperience: oExperienceData
				});
				
				// Open the popover
				this._openHighlightsPopover(oButton, oPopoverModel);
			}
		},

		onCloseHighlightsPopover: function() {
			if (this._pHighlightsPopover) {
				this._pHighlightsPopover.close();
			}
		},

		onExperienceRowPress: function(oEvent) {
			var oSource = oEvent.getSource();
			var oBindingContext = oSource.getBindingContext("Resume");
			
			if (oBindingContext) {
				var oExperienceData = oBindingContext.getObject();
				
				// Create a model for the selected experience
				var oPopoverModel = new JSONModel({
					selectedExperience: oExperienceData
				});
				
				// Open the popover
				this._openHighlightsPopover(oSource, oPopoverModel);
			}
		},

		// Share functionality
		onSharePress: function(oEvent) {
			var oButton = oEvent.getSource();
			var oView = this.getView();

			if (!this._pSharePopover) {
				Fragment.load({
					id: oView.getId(),
					name: "sap.uxap.sample.ObjectPageWithLinksAndObjectStatus.view.ShareOptions",
					controller: this
				}).then(function (oPopover) {
					oView.addDependent(oPopover);
					this._pSharePopover = oPopover;
					oPopover.openBy(oButton);
				}.bind(this));
			} else {
				this._pSharePopover.openBy(oButton);
			}
		},

		_getCurrentUrl: function() {
			return window.location.href;
		},

		_getShareText: function() {
			var oResumeModel = this.getView().getModel("Resume");
			var sName = oResumeModel.getProperty("/profile/name");
			var sTitle = oResumeModel.getProperty("/profile/title");
			return "Check out " + sName + "'s resume - " + sTitle;
		},

		onCopyLink: function() {
			var sUrl = this._getCurrentUrl();
			
			if (navigator.clipboard && window.isSecureContext) {
				navigator.clipboard.writeText(sUrl).then(function() {
					this._showShareMessage("Link copied to clipboard!");
				}.bind(this)).catch(function() {
					this._fallbackCopyTextToClipboard(sUrl);
				}.bind(this));
			} else {
				this._fallbackCopyTextToClipboard(sUrl);
			}
		},

		_fallbackCopyTextToClipboard: function(sText) {
			var textArea = document.createElement("textarea");
			textArea.value = sText;
			textArea.style.top = "0";
			textArea.style.left = "0";
			textArea.style.position = "fixed";
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			
			try {
				document.execCommand('copy');
				this._showShareMessage("Link copied to clipboard!");
			} catch (err) {
				this._showShareMessage("Unable to copy link", "Error");
			}
			
			document.body.removeChild(textArea);
		},

		onShareLinkedIn: function() {
			var sUrl = this._getCurrentUrl();
			var sText = this._getShareText();
			var sLinkedInUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(sUrl);
			window.open(sLinkedInUrl, '_blank');
		},

		onShareEmail: function() {
			var sUrl = this._getCurrentUrl();
			var sText = this._getShareText();
			var oResumeModel = this.getView().getModel("Resume");
			var sName = oResumeModel.getProperty("/profile/name");
			
			var sSubject = encodeURIComponent("Resume: " + sName);
			var sBody = encodeURIComponent(sText + "\n\n" + sUrl);
			var sMailtoUrl = "mailto:?subject=" + sSubject + "&body=" + sBody;
			
			window.location.href = sMailtoUrl;
		},

		onShareTwitter: function() {
			var sUrl = this._getCurrentUrl();
			var sText = this._getShareText();
			var sTwitterUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(sText) + "&url=" + encodeURIComponent(sUrl);
			window.open(sTwitterUrl, '_blank');
		},

		onShareWhatsApp: function() {
			var sUrl = this._getCurrentUrl();
			var sText = this._getShareText();
			var sWhatsAppUrl = "https://wa.me/?text=" + encodeURIComponent(sText + " " + sUrl);
			window.open(sWhatsAppUrl, '_blank');
		},

		_showShareMessage: function(sMessage, sType) {
			var oMessageStrip = this.byId("shareMessage");
			if (oMessageStrip) {
				oMessageStrip.setText(sMessage);
				oMessageStrip.setType(sType || "Success");
				oMessageStrip.setVisible(true);
				
				setTimeout(function() {
					oMessageStrip.setVisible(false);
				}, 3000);
			}
		}
	});
});
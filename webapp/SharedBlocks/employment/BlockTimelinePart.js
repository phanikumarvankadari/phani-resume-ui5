sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var BlockTimelinePart = BlockBase.extend("sap.uxap.sample.SharedBlocks.employment.BlockTimelinePart", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "sap.uxap.sample.SharedBlocks.employment.BlockTimelinePart",
					type: "XML"
				},
				Expanded: {
					viewName: "sap.uxap.sample.SharedBlocks.employment.BlockTimelinePart",
					type: "XML"
				}
			}
		}
	});

	return BlockTimelinePart;
});

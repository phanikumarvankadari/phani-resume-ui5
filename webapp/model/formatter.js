sap.ui.define([], function () {
    "use strict";
    return {
        nameFormatter: function (sText) {
            if (!sText) {
                return "";
            }
            // Convert name to Title Case
            return sText.toLowerCase().split(' ').map(function(word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(' ');
        },
        
        // Format date to show only year
        yearFormatter: function(sDate) {
            if (!sDate) {
                return "Present";
            }
            return sDate.slice(0, 4);
        },
        
        // Format skills level to percentage
        skillLevelFormatter: function(iLevel) {
            return iLevel + "%";
        },
        
        // Format date to MMM YYYY
        formatDate: function(sDate) {
            if (!sDate) {
                return "Present";
            }
            try {
                // Input format is YYYY-MM-DD
                const [year, month] = sDate.split("-");
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                return months[parseInt(month, 10) - 1] + " " + year;
            } catch (e) {
                return sDate;
            }
        },

        periodFormatter: function(sStartDate, sEndDate) {
            var formatDate = function(sDate) {
                if (!sDate) {
                    return "Present";
                }
                try {
                    const [year, month] = sDate.split("-");
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    return months[parseInt(month, 10) - 1] + " " + year;
                } catch (e) {
                    return sDate;
                }
            };
            
            return formatDate(sStartDate) + " - " + formatDate(sEndDate);
        },

        // Format school name based on device type
        formatSchoolName: function(sFullName, sShortName, bIsPhone) {
            if (!sFullName) {
                return "";
            }
            //return bIsPhone ? (sShortName || sFullName) : sFullName;
            return sFullName;
        },

        // Format degree name based on device type
        formatDegreeName: function(sFullName, sShortName, bIsPhone) {
            if (!sFullName) {
                return "";
            }
            //return bIsPhone ? (sShortName || sFullName) : sFullName;
            return sFullName
        }
    };
});

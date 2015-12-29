import {isString, isNumber, isBoolean, isObject} from 'd2-utilizr';

export var OptionsWindow;

OptionsWindow = function(c) {
    var t = this,

        appManager = c.appManager,
        uiManager = c.uiManager,
        i18n = c.i18nManager.get(),
        optionConfig = c.optionConfig,

        layoutButton = uiManager.get('layoutButton'),

        showColTotals,
        showRowTotals,
        showColSubTotals,
        showRowSubTotals,
        showDimensionLabels,
        hideEmptyRows,
        skipRounding,
        aggregationType,
        dataApprovalLevel,
        showHierarchy,
        completedOnly,
        digitGroupSeparator,
        legendSet,
        displayDensity,
        fontSize,
        reportingPeriod,
        organisationUnit,
        parentOrganisationUnit,
        regression,
        cumulative,
        sortOrder,
        topLimit,

        data,
        organisationUnits,
        events,
        style,
        parameters,

        comboboxWidth = 262,
        comboBottomMargin = 1,
        checkboxBottomMargin = 2,
        separatorTopMargin = 6;

    showColTotals = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.show_col_totals,
        style: 'margin-bottom:' + checkboxBottomMargin + 'px',
        checked: true
    });

    showRowTotals = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.show_row_totals,
        style: 'margin-bottom:' + checkboxBottomMargin + 'px',
        checked: true
    });

    showColSubTotals = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.show_col_subtotals,
        style: 'margin-top:' + separatorTopMargin + 'px; margin-bottom:' + checkboxBottomMargin + 'px',
        checked: true
    });

    showRowSubTotals = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.show_row_subtotals,
        style: 'margin-bottom:' + checkboxBottomMargin + 'px',
        checked: true
    });

    showDimensionLabels = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.show_dimension_labels,
        style: 'margin-top:' + separatorTopMargin + 'px; margin-bottom:' + comboBottomMargin + 'px',
        checked: true
    });

    hideEmptyRows = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.hide_empty_rows,
        style: 'margin-bottom:' + checkboxBottomMargin + 'px'
    });

    skipRounding = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.skip_rounding,
        style: 'margin-top:' + separatorTopMargin + 'px; margin-bottom:' + comboBottomMargin + 'px'
    });

    aggregationType = Ext.create('Ext.form.field.ComboBox', {
        cls: 'ns-combo',
        style: 'margin-top:' + (separatorTopMargin + 1) + 'px; margin-bottom:' + comboBottomMargin + 'px',
        width: comboboxWidth,
        labelWidth: 130,
        fieldLabel: i18n.aggregation_type,
        labelStyle: 'color:#333',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        editable: false,
        value: optionConfig.getAggregationType('def').id,
        store: Ext.create('Ext.data.Store', {
            fields: ['id', 'name', 'index'],
            data: optionConfig.getAggregationTypeRecords()
        })
    });

    dataApprovalLevel = Ext.create('Ext.form.field.ComboBox', {
        cls: 'ns-combo',
        style: 'margin-bottom:' + comboBottomMargin + 'px',
        width: comboboxWidth,
        labelWidth: 130,
        fieldLabel: i18n.data_approved_at_level,
        labelStyle: 'color:#333',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        editable: false,
        hidden: !(appManager.systemInfo.hideUnapprovedDataInAnalytics && appManager.viewUnapprovedData),
        value: optionConfig.getDataApprovalLevel('def').id,
        store: Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: appManager.dataApprovalLevels.unshift(optionConfig.getDataApprovalLevel('def'))
        })
    });

    showHierarchy = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.show_hierarchy,
        style: 'margin-bottom:' + checkboxBottomMargin + 'px',
    });

    completedOnly = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.include_only_completed_events_only,
        style: 'margin-bottom:' + checkboxBottomMargin + 'px',
    });

    displayDensity = Ext.create('Ext.form.field.ComboBox', {
        cls: 'ns-combo',
        style: 'margin-bottom:' + comboBottomMargin + 'px',
        width: comboboxWidth,
        labelWidth: 130,
        fieldLabel: i18n.display_density,
        labelStyle: 'color:#333',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        editable: false,
        value: optionConfig.getDisplayDensity('normal').id,
        store: Ext.create('Ext.data.Store', {
            fields: ['id', 'name', 'index'],
            data: optionConfig.getDisplayDensityRecords()
        })
    });

    fontSize = Ext.create('Ext.form.field.ComboBox', {
        cls: 'ns-combo',
        style: 'margin-bottom:' + comboBottomMargin + 'px',
        width: comboboxWidth,
        labelWidth: 130,
        fieldLabel: i18n.font_size,
        labelStyle: 'color:#333',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        editable: false,
        value: optionConfig.getFontSize('normal').id,
        store: Ext.create('Ext.data.Store', {
            fields: ['id', 'name', 'index'],
            data: optionConfig.getFontSizeRecords()
        })
    });

    digitGroupSeparator = Ext.create('Ext.form.field.ComboBox', {
        labelStyle: 'color:#333',
        cls: 'ns-combo',
        style: 'margin-bottom:' + comboBottomMargin + 'px',
        width: comboboxWidth,
        labelWidth: 130,
        fieldLabel: i18n.digit_group_separator,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        editable: false,
        value: optionConfig.getDigitGroupSeparator('space').id,
        store: Ext.create('Ext.data.Store', {
            fields: ['id', 'name', 'index'],
            data: optionConfig.getDigitGroupSeparatorRecords()
        })
    });

    legendSet = Ext.create('Ext.form.field.ComboBox', {
        cls: 'ns-combo',
        style: 'margin-bottom:' + comboBottomMargin + 'px',
        width: comboboxWidth,
        labelWidth: 130,
        fieldLabel: i18n.legend_set,
        labelStyle: 'color:#333',
        valueField: 'id',
        displayField: 'name',
        editable: false,
        value: 0,
        store: appManager.legendSets
    });

    reportingPeriod = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.reporting_period,
        style: 'margin-bottom:' + checkboxBottomMargin + 'px'
    });

    organisationUnit = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.organisation_unit,
        style: 'margin-bottom:' + checkboxBottomMargin + 'px'
    });

    parentOrganisationUnit = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.parent_organisation_unit,
        style: 'margin-bottom:' + checkboxBottomMargin + 'px'
    });

    regression = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.include_regression,
        style: 'margin-bottom:' + checkboxBottomMargin + 'px'
    });

    cumulative = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.include_cumulative,
        style: 'margin-bottom:6px'
    });

    sortOrder = Ext.create('Ext.form.field.ComboBox', {
        cls: 'ns-combo',
        style: 'margin-bottom:1px',
        width: 254,
        labelWidth: 130,
        fieldLabel: i18n.sort_order,
        labelStyle: 'color:#333',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        editable: false,
        value: 0,
        store: Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [
                {id: 0, name: i18n.none},
                {id: 1, name: i18n.low_to_high},
                {id: 2, name: i18n.high_to_low}
            ]
        })
    });

    topLimit = Ext.create('Ext.form.field.ComboBox', {
        cls: 'ns-combo',
        style: 'margin-bottom:3px',
        width: 254,
        labelWidth: 130,
        fieldLabel: i18n.top_limit,
        labelStyle: 'color:#333',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        editable: false,
        value: 0,
        store: Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [
                {id: 0, name: i18n.none},
                {id: 5, name: 5},
                {id: 10, name: 10},
                {id: 20, name: 20},
                {id: 50, name: 50},
                {id: 100, name: 100}
            ]
        })
    });

    data = {
        bodyStyle: 'border:0 none',
        style: 'margin-left:14px',
        items: [
            showColTotals,
            showRowTotals,
            showColSubTotals,
            showRowSubTotals,
            showDimensionLabels,
            hideEmptyRows,
            skipRounding,
            aggregationType,
            dataApprovalLevel
        ]
    };

    organisationUnits = {
        bodyStyle: 'border:0 none',
        style: 'margin-left:14px',
        items: [
            showHierarchy
        ]
    };

    events = {
        bodyStyle: 'border:0 none',
        style: 'margin-left:14px',
        items: [
            completedOnly
        ]
    };

    style = {
        bodyStyle: 'border:0 none',
        style: 'margin-left:14px',
        items: [
            displayDensity,
            fontSize,
            digitGroupSeparator,
            legendSet
        ]
    };

    parameters = Ext.create('Ext.panel.Panel', {
        bodyStyle: 'border:0 none; background:transparent',
        style: 'margin-left:14px',
        items: [
            reportingPeriod,
            organisationUnit,
            parentOrganisationUnit,
            regression,
            cumulative,
            sortOrder,
            topLimit
        ],
        hidden: true
    });

    $.extend(this, Ext.create('Ext.window.Window', {
        title: i18n.table_options,
        bodyStyle: 'background-color:#fff; padding:2px',
        closeAction: 'hide',
        autoShow: true,
        modal: true,
        resizable: false,
        hideOnBlur: true,
        getOptions: function() {
            return {
                showRowTotals: showRowTotals.getValue(),
                showColTotals: showColTotals.getValue(),
                showColSubTotals: showColSubTotals.getValue(),
                showRowSubTotals: showRowSubTotals.getValue(),
                showDimensionLabels: showDimensionLabels.getValue(),
                hideEmptyRows: hideEmptyRows.getValue(),
                skipRounding: skipRounding.getValue(),
                aggregationType: aggregationType.getValue(),
                dataApprovalLevel: {id: dataApprovalLevel.getValue()},
                showHierarchy: showHierarchy.getValue(),
                completedOnly: completedOnly.getValue(),
                displayDensity: displayDensity.getValue(),
                fontSize: fontSize.getValue(),
                digitGroupSeparator: digitGroupSeparator.getValue(),
                legendSet: {id: legendSet.getValue()},
                reportingPeriod: reportingPeriod.getValue(),
                organisationUnit: organisationUnit.getValue(),
                parentOrganisationUnit: parentOrganisationUnit.getValue(),
                regression: regression.getValue(),
                cumulative: cumulative.getValue(),
                sortOrder: sortOrder.getValue(),
                topLimit: topLimit.getValue()
            };
        },
        setOptions: function(layout) {
            showRowTotals.setValue(isBoolean(layout.showRowTotals) ? layout.showRowTotals : true);
            showColTotals.setValue(isBoolean(layout.showColTotals) ? layout.showColTotals : true);
            showColSubTotals.setValue(isBoolean(layout.showColSubTotals) ? layout.showColSubTotals : true);
            showRowSubTotals.setValue(isBoolean(layout.showRowSubTotals) ? layout.showRowSubTotals : true);
            showDimensionLabels.setValue(isBoolean(layout.showDimensionLabels) ? layout.showDimensionLabels : true);
            hideEmptyRows.setValue(isBoolean(layout.hideEmptyRows) ? layout.hideEmptyRows : false);
            skipRounding.setValue(isBoolean(layout.skipRounding) ? layout.skipRounding : false);
            aggregationType.setValue(isString(layout.aggregationType) ? layout.aggregationType : finalsStyleConf.default_);
            dataApprovalLevel.setValue(isObject(layout.dataApprovalLevel) && isString(layout.dataApprovalLevel.id) ? layout.dataApprovalLevel.id : finalsStyleConf.default_);
            showHierarchy.setValue(isBoolean(layout.showHierarchy) ? layout.showHierarchy : false);
            completedOnly.setValue(isBoolean(layout.completedOnly) ? layout.completedOnly : false);
            displayDensity.setValue(isString(layout.displayDensity) ? layout.displayDensity : finalsStyleConf.normal);
            fontSize.setValue(isString(layout.fontSize) ? layout.fontSize : finalsStyleConf.normal);
            digitGroupSeparator.setValue(isString(layout.digitGroupSeparator) ? layout.digitGroupSeparator : finalsStyleConf.space);
            legendSet.setValue(isObject(layout.legendSet) && isString(layout.legendSet.id) ? layout.legendSet.id : 0);
            reportingPeriod.setValue(isBoolean(layout.reportingPeriod) ? layout.reportingPeriod : false);
            organisationUnit.setValue(isBoolean(layout.organisationUnit) ? layout.organisationUnit : false);
            parentOrganisationUnit.setValue(isBoolean(layout.parentOrganisationUnit) ? layout.parentOrganisationUnit : false);
            regression.setValue(isBoolean(layout.regression) ? layout.regression : false);
            cumulative.setValue(isBoolean(layout.cumulative) ? layout.cumulative : false);
            sortOrder.setValue(isNumber(layout.sortOrder) ? layout.sortOrder : 0);
            topLimit.setValue(isNumber(layout.topLimit) ? layout.topLimit : 0);
        },
        items: [
            {
                bodyStyle: 'border:0 none; color:#222; font-size:12px; font-weight:bold',
                style: 'margin-top:4px; margin-bottom:6px; margin-left:5px',
                html: i18n.data
            },
            data,
            {
                bodyStyle: 'border:0 none; padding:7px'
            },
            {
                bodyStyle: 'border:0 none; color:#222; font-size:12px; font-weight:bold',
                style: 'margin-bottom:6px; margin-left:5px',
                html: i18n.organisation_units
            },
            organisationUnits,
            {
                bodyStyle: 'border:0 none; padding:7px'
            },
            {
                bodyStyle: 'border:0 none; color:#222; font-size:12px; font-weight:bold',
                style: 'margin-bottom:6px; margin-left:5px',
                html: i18n.events
            },
            events,
            {
                bodyStyle: 'border:0 none; padding:7px'
            },
            {
                bodyStyle: 'border:0 none; color:#222; font-size:12px; font-weight:bold',
                style: 'margin-bottom:6px; margin-left:5px',
                html: i18n.style
            },
            style,
            {
                bodyStyle: 'border:0 none; padding:3px'
            },
            {
                bodyStyle: 'border:1px solid #d5d5d5; padding:3px 3px 0 3px; background-color:#f0f0f0',
                items: [
                    {
                        xtype: 'container',
                        layout: 'column',
                        items: [
                            {
                                bodyStyle: 'border:0 none; padding:2px 5px 6px 2px; background-color:transparent; color:#222; font-size:12px',
                                html: '<b>' + i18n.parameters + '</b> <span style="font-size:11px"> (' + i18n.for_standard_reports_only + ')</span>',
                                columnWidth: 1
                            },
                            {
                                xtype: 'button',
                                text: i18n.show,
                                height: 19,
                                handler: function() {
                                    parameters.setVisible(!parameters.isVisible());

                                    this.setText(parameters.isVisible() ? i18n.hide : i18n.show);
                                }
                            }
                        ]
                    },
                    parameters
                ]
            }
        ],
        bbar: [
            '->',
            {
                text: i18n.hide,
                handler: function() {
                    t.hide();
                }
            },
            {
                text: '<b>' + i18n.update + '</b>',
                handler: function() {
                    instanceManager.getReport();

                    t.hide();
                }
            }
        ],
        listeners: {
            show: function(w) {
                if (layoutButton.rendered) {
                    uiManager.setAnchorPosition(w, layoutButton);

                    if (!w.hasHideOnBlurHandler) {
                        uiManager.addHideOnBlurHandler(w);
                    }
                }

                if (!this.shown) {
                    this.shown = true;
                    this.hide();
                }

                if (!legendSet.store.isLoaded) {
                    legendSet.store.load();
                }

                // cmp
                w.showColTotals = showColTotals;
                w.showRowTotals = showRowTotals;
                w.showColSubTotals = showColSubTotals
                w.showRowSubTotals = showRowSubTotals;
                w.showDimensionLabels = showDimensionLabels;
                w.hideEmptyRows = hideEmptyRows;
                w.skipRounding = skipRounding;
                w.aggregationType = aggregationType;
                w.dataApprovalLevel = dataApprovalLevel;
                w.showHierarchy = showHierarchy;
                w.completedOnly = completedOnly;
                w.displayDensity = displayDensity;
                w.fontSize = fontSize;
                w.digitGroupSeparator = digitGroupSeparator;
                w.legendSet = legendSet;
                w.reportingPeriod = reportingPeriod;
                w.organisationUnit = organisationUnit;
                w.parentOrganisationUnit = parentOrganisationUnit;
                w.regression = regression;
                w.cumulative = cumulative;
                w.sortOrder = sortOrder;
                w.topLimit = topLimit;
            }
        }
    }));
};
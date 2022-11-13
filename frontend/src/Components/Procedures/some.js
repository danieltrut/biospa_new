define([
    "jquery",
    "domReady!",
    'Magento_Ui/js/modal/modal'
], function($) {
    "use strict";

        $.widget('unit.js', {

            config: {
                qty: '#qty',
                unit_qty: '#unit-qty',
                unit_select: '.unit-select select',
                increase_qty: '.increase-qty',
                decrease_qty: '.decrease-qty',
                purchase_label: '#purchase-unit',
                qty_optionlabel: '#qty-optionlabel'
            },

            originalConfig: {
                qty: '#qty',
                unit_qty: '#unit-qty',
                unit_select: '.unit-select select',
                increase_qty: '.increase-qty',
                decrease_qty: '.decrease-qty',
                purchase_label: '#purchase-unit',
                qty_optionlabel: '#qty-optionlabel'
            },

            _create: function() {
                if (this.options.id) {
                    this.config.qty = this.originalConfig.qty + '-input-' + this.options.id;
                    this.config.unit_qty = this.originalConfig.unit_qty + '-' + this.options.id;
                    this.config.unit_select = '.unit-select-' + this.options.id + ' select';
                    this.config.increase_qty = this.originalConfig.increase_qty + '-' + this.options.id;
                    this.config.decrease_qty = this.originalConfig.decrease_qty + '-' + this.options.id;
                    this.config.purchase_label = this.originalConfig.purchase_label + '-' + this.options.id;
                    this.config.qty_optionlabel = this.originalConfig.qty_optionlabel + '-' + this.options.id;
                } else {
                    this.config = this.originalConfig;
                }

                this.init();
            },

            init: function() {
                if($(this.config.unit_select).length) {
                    this.setUnitQty();
                    this.setPurchaseUnit();
                    this.bindEvents();
                }
            },

            setPurchaseUnit: function() {
                var selectedUnitFound = $(this.config.unit_select).find('option:selected');

                if (selectedUnitFound.length > 1 && selectedUnitFound.parents('.purchased-wrapper').length) {
                    selectedUnitFound = $(this.originalConfig.unit_select).find('option:selected');

                    $.each(selectedUnitFound, function( index, value ) {
                        if ($(value.parentElement).attr('id') == 'product-view-unit-select') {
                            selectedUnitFound = $(value);
                            return false;
                        }
                    });
                }

                var selectedUnit = selectedUnitFound.data('optionlabel');
                var selectedUnitVal = selectedUnitFound.val();

                if(selectedUnitVal == "default"){
                    selectedUnit = "";
                }

                $(this.config.purchase_label).text(selectedUnit);

                var selectedLabel = $(this.config.unit_select).find('option:selected').data('unitabbr');
                var currentQty = $(this.config.qty).val();

                if(currentQty == 1) {
                	$(this.config.qty_optionlabel).text(selectedLabel[0]);
                } else {
                	$(this.config.qty_optionlabel).text(selectedLabel[1]);
                }
            },

            setUnitQty: function() {
                $(this.config.unit_qty).val(this.getBaseQty.call(this));
            },

            bindEvents: function() {
                $(this.config.unit_select).on('change', $.proxy(this.setUnitQty, this));
                $(this.config.unit_select).on('change', $.proxy(this.setPurchaseUnit, this));
                $(this.config.increase_qty).on('click', $.proxy(this.setUnitQty, this));
                $(this.config.decrease_qty).on('click', $.proxy(this.setUnitQty, this));
                $(this.config.qty).on('change', $.proxy(this.setUnitQty, this));
            },

            getBaseQty: function() {
                var selected = $(this.config.unit_select).find('option:selected').val();
                var currentQty = $(this.config.qty).val();

                var selectedLabel = $(this.config.unit_select).find('option:selected').data('unitabbr');
                if(currentQty == 1) {
                	$(this.config.qty_optionlabel).text(selectedLabel[0]);
                } else {
                	$(this.config.qty_optionlabel).text(selectedLabel[1]);
                }

                if(selected == 'default') {
                    var baseQty = currentQty;
                } else {
                    var conversions = JSON.parse(this.options.conversions);
                    var conversionRate = conversions[selected];
                    var baseQty = currentQty * conversionRate;
                }
                if (typeof tiersJsData !== 'undefined' && tiersJsData) {
                	$('div.price-configured_price').html(originalPriceDiv);
					$('div.label-position-fix span.discountPercent').remove();

                	var currTier = -1;
                	for (var i = 0; i < tiersJsData.length; i++){
						var tier = tiersJsData[i];
						if(baseQty >= tier.qty) {
							currTier = i;
						}
					}
					
					if(currTier > -1) {
						var tier = tiersJsData[currTier];

						$('div.price-configured_price span.price-including-tax').before(tier.sign);
						$('div.price-configured_price span.price-including-tax').html(tier.price);
						$('div.price-configured_price span.price-including-tax').after(tier.oldprice);
						$('div.price-configured_price span.price-excluding-tax').hide();
						$('div.price-configured_price span.old-price').hide();

						$('div.label-position-fix').append('<span class="discountPercent">-'+tier.save+'%</span>');
					} else if (isPartnerPrice == true) {
						$('div.label-position-fix').append('<span class="discountPercent"><i class="fa fa-handshake-o" aria-hidden="true"></i></span>');
					}
                }

                return baseQty;
            },
        });

    return $.unit.js;
});
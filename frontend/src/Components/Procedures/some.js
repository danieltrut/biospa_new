define([
    "jquery",
    "domReady!",
    'Magento_Ui/js/modal/modal'
], function($) {
    "use strict";

        $.widget('unit.js', {

            config: {
                qty: '#qty-',
                unit_qty: '#unit-qty-',
                unit_select: '[class^=unit-select-] select',
                increase_qty: '.increase-qty-',
                decrease_qty: '.decrease-qty-',
                purchase_label: '#purchase-unit-',
                qty_optionlabel: '#qty-optionlabel-'
            },

            originalConfig: {
                qty: '#qty-',
                unit_qty: '#unit-qty-',
                unit_select: '[class^=unit-select-] select',
                increase_qty: '.increase-qty-',
                decrease_qty: '.decrease-qty-',
                purchase_label: '#purchase-unit-',
                qty_optionlabel: '#qty-optionlabel-'
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
                $(this.config.unit_select).each(function (i, el) {
                    var $el = $(el);
                    this.setUnitQty($el);
                    this.setPurchaseUnit($el);
                    this.bindEvents($el);
                }.bind(this));
            },

            setPurchaseUnit: function($el) {
                var selectedUnitFound = $el.find('option:selected');

                var prodid = $el.data('prodid');

                if (selectedUnitFound.length > 1 && selectedUnitFound.parents('.purchased-wrapper').length) {
                    selectedUnitFound = $el.find('option:selected');

                    $.each(selectedUnitFound, function( index, value ) {
                        if ($(value.parentElement).attr('id') === ('product-view-unit-select-'+ prodid)) {
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

                var selectedLabel = $el.find('option:selected').data('unitabbr');
                var currentQty = $(this.config.qty + prodid).val();

                if(currentQty == 1) {
                	$(this.config.qty_optionlabel + prodid).text(selectedLabel[0]);
                } else {
                	$(this.config.qty_optionlabel + prodid).text(selectedLabel[1]);
                }
            },

            setUnitQty: function($el) {
                var prodid = $el.data('prodid');
                $(this.config.unit_qty+ prodid).val(this.getBaseQty.call(this, $el));
            },

            bindEvents: function($el) {
                $el.on('change', $.proxy(this.setUnitQty, this, $el));
                $el.on('change', $.proxy(this.setPurchaseUnit, this, $el));

                var prodid = $el.data('prodid');

                $(this.config.increase_qty + prodid).on('click', $.proxy(this.setUnitQty, this, $el));
                $(this.config.decrease_qty + prodid).on('click', $.proxy(this.setUnitQty, this, $el));
                $(this.config.qty + prodid).on('change', $.proxy(this.setUnitQty, this, $el));
            },

            getBaseQty: function($el) {
                var selected = $el.find('option:selected').val();
                var prodid = $el.data('prodid');
                var currentQty = $(this.config.qty+prodid).val();

                var selectedLabel = $el.find('option:selected').data('unitabbr');
                if(currentQty == 1) {
                	$(this.config.qty_optionlabel + prodid).text(selectedLabel[0]);
                } else {
                	$(this.config.qty_optionlabel + prodid).text(selectedLabel[1]);
                }

                if(selected == 'default') {
                    var baseQty = currentQty;
                } else {
                    if(typeof this.options.conversions !== 'undefined' && this.options.conversions) {
                        for (var i = 0; i < this.options.conversions.length; i++) {
                            var convertsation = this.options.conversions[i];
                            if(convertsation.id===prodid){
                                var conversionData = JSON.parse(convertsation.conversionData);
                                var conversionRate = conversionData[selected];
                                var baseQty = currentQty * conversionRate;
                                break;
                            }
                        }

                    }
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

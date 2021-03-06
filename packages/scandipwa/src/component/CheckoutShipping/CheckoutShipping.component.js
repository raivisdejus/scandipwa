/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import CheckoutAddressBook from 'Component/CheckoutAddressBook';
import CheckoutDeliveryOptions from 'Component/CheckoutDeliveryOptions';
import Form from 'Component/Form';
import Loader from 'Component/Loader';
import { SHIPPING_STEP } from 'Route/Checkout/Checkout.config';
import { shippingMethodsType, shippingMethodType } from 'Type/Checkout';
import { TotalsType } from 'Type/MiniCart';
import { formatPrice } from 'Util/Price';

/** @namespace Component/CheckoutShipping/Component */
export class CheckoutShipping extends PureComponent {
    static propTypes = {
        totals: TotalsType.isRequired,
        onShippingSuccess: PropTypes.func.isRequired,
        onShippingError: PropTypes.func.isRequired,
        onShippingEstimationFieldsChange: PropTypes.func.isRequired,
        shippingMethods: shippingMethodsType.isRequired,
        onShippingMethodSelect: PropTypes.func.isRequired,
        selectedShippingMethod: shippingMethodType,
        onAddressSelect: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired
    };

    static defaultProps = {
        selectedShippingMethod: null
    };

    renderOrderTotal() {
        const {
            totals: {
                grand_total,
                quote_currency_code
            }
        } = this.props;

        const orderTotal = formatPrice(grand_total, quote_currency_code);

        return (
            <div block="Checkout" elem="OrderTotal">
                <span>
                    { __('Order total:') }
                </span>
                <span>
                    { orderTotal }
                </span>
            </div>
        );
    }

    renderActions() {
        const { selectedShippingMethod } = this.props;

        return (
            <div block="Checkout" elem="StickyButtonWrapper">
                { this.renderOrderTotal() }
                <button
                  type="submit"
                  block="Button"
                  disabled={ !selectedShippingMethod }
                  mix={ { block: 'CheckoutShipping', elem: 'Button' } }
                >
                    { __('Proceed to billing') }
                </button>
            </div>
        );
    }

    renderDelivery() {
        const {
            shippingMethods,
            onShippingMethodSelect
        } = this.props;

        return (
            <CheckoutDeliveryOptions
              shippingMethods={ shippingMethods }
              onShippingMethodSelect={ onShippingMethodSelect }
            />
        );
    }

    renderAddressBook() {
        const {
            onAddressSelect,
            onShippingEstimationFieldsChange
        } = this.props;

        return (
            <CheckoutAddressBook
              onAddressSelect={ onAddressSelect }
              onShippingEstimationFieldsChange={ onShippingEstimationFieldsChange }
            />
        );
    }

    render() {
        const {
            onShippingSuccess,
            onShippingError,
            isLoading
        } = this.props;

        return (
            <Form
              id={ SHIPPING_STEP }
              mix={ { block: 'CheckoutShipping' } }
              onSubmitError={ onShippingError }
              onSubmitSuccess={ onShippingSuccess }
            >
                { this.renderAddressBook() }
                <div>
                    <Loader isLoading={ isLoading } />
                    { this.renderDelivery() }
                    { this.renderActions() }
                </div>
            </Form>
        );
    }
}

export default CheckoutShipping;

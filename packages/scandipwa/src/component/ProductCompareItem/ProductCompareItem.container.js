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
import { connect } from 'react-redux';

import { DeviceType } from 'Type/Device';
import { ProductType } from 'Type/ProductList';

import ProductCompareItem from './ProductCompareItem.component';

export const ProductCompareDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ProductCompare/ProductCompare.dispatcher'
);

/** @namespace Component/ProductCompareItem/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/ProductCompareItem/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    removeComparedProduct: (productId) => ProductCompareDispatcher.then(
        ({ default: dispatcher }) => dispatcher.removeComparedProduct(productId, dispatch)
    )
});

/** @namespace Component/ProductCompareItem/Container */
export class ProductCompareItemContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        removeComparedProduct: PropTypes.func.isRequired,
        device: DeviceType.isRequired
    };

    state = {
        isLoading: false
    };

    containerFunctions = {
        removeComparedProduct: this.removeComparedProduct.bind(this),
        getGroupedProductQuantity: this.getGroupedProductQuantity.bind(this),
        getProductOptionsData: this.getProductOptionsData.bind(this)
    };

    containerProps = {
        imgUrl: this.getProductImage()
    };

    async removeComparedProduct() {
        const {
            product: { id } = {},
            removeComparedProduct
        } = this.props;

        this.setState({ isLoading: true });
        await removeComparedProduct(id);
    }

    getGroupedProductQuantity() {
        const { product: { items } = {} } = this.props;

        if (!items) {
            return {};
        }

        return items.reduce((result, item) => {
            const { product: { id } = {} } = item;
            Object.assign(result, { [id]: 1 });
            return result;
        }, {});
    }

    getProductOptionsData() {
        const { product: { options } } = this.props;

        if (!options) {
            return { requiredOptions: [] };
        }

        return {
            requiredOptions: options
                .map(({ option_id, required }) => (required ? option_id : null))
                .filter((item) => !!item)
        };
    }

    getProductImage() {
        const {
            product: {
                thumbnail,
                small_image
            } = {},
            device: {
                isMobile
            } = {}
        } = this.props;

        if (isMobile) {
            return small_image.url;
        }

        return thumbnail.url;
    }

    render() {
        return (
            <ProductCompareItem
              { ...this.props }
              { ...this.state }
              { ...this.containerProps }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCompareItemContainer);

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

import { connect } from 'react-redux';
import { FieldDispatcher } from 'Store/Field';
import Field from './Field.component';

const mapStateToProps = state => ({
    test: state
});

const mapDispatchToProps = dispatch => ({
    getCountryList() {
        return FieldDispatcher.getCountryList(dispatch);
    }
});

const FieldContainer = connect(mapStateToProps, mapDispatchToProps)(Field);

export default FieldContainer;

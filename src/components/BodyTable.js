import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class BodyTable extends React.Component {
  render() {
    const { wallet } = this.props;
    return (
      <div className="body">
        <tbody>
          { wallet.map((value, index) => (
            <tr key={ index } className="tr-body">
              <td className="td-body">{ value.description }</td>
              <td className="td-body">{ value.tag }</td>
              <td className="td-body">{ value.method }</td>
              <td className="td-body">{ value.value }</td>
              <td className="td-body">{ value.exchangeRates[value.currency].name }</td>
              <td className="td-body">
                { Number(value.exchangeRates[value.currency].ask).toFixed(2) }
              </td>
              <td className="td-body">
                { (Number(value.exchangeRates[value.currency].ask)
              * Number(value.value)).toFixed(2) }
              </td>
              <td className="td-body">Real</td>
            </tr>
          ))}
        </tbody>
      </div>
    );
  }
}

BodyTable.propTypes = {
  wallet: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet.expenses,
});

export default connect(mapStateToProps)(BodyTable);

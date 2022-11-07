import React from 'react';

class HeaderTable extends React.Component {
  render() {
    return (
      <div className="header-table-div">
        <thead>
          <tr className="tr">
            <th className="header-th">Descrição</th>
            <th className="header-th">Tag</th>
            <th className="header-th">Método de pagamento</th>
            <th className="header-th">Valor</th>
            <th className="header-th">Moeda</th>
            <th className="header-th">Câmbio utilizado</th>
            <th className="header-th">Valor convertido</th>
            <th className="header-th">Moeda de conversão</th>
          </tr>
        </thead>
      </div>
    );
  }
}

export default HeaderTable;

import PropTypes from 'prop-types';
import './style.css';

export const Table = ({ columns, rows }) => {
  return (
    <div>
      <div className="card-table-container">
        <div className="card-table">
          <div className="table-responsive">
            <table id="student-table">
              <thead>
                <tr>
                  {columns.map((c) => {
                    return <th title={c.label}>{c.label}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.map((inqu) => {
                  return (
                    <tr>
                      {columns.map((c) => {
                        let value = inqu?.[`${c.key}`] || 'N/A';
                        if (typeof c.renderValue === 'function') {
                          value = c.renderValue(inqu?.[`${c.key}`], inqu);
                        }
                        return <td title={value}>{value}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

Table.propTypes = {
  colums: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      renderValue: PropTypes.func,
    })
  ).isRequired,
  rows: PropTypes.array.isRequired,
};

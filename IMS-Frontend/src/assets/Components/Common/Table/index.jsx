import PropTypes from "prop-types";
import "./style.css";

export const Table = ({ columns, rows }) => {
  return (
    <div>
      <div className="card-table-container">
        <div className="card-table">
          <div className="table-responsive">
            <table id="student-table">
              <thead>
                <tr>
                  {columns.map((c, idx) => {
                    return (
                      <th title={c.label} key={idx}>
                        {c.label}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.map((inqu, idx) => {
                  return (
                    <tr key={idx}>
                      {columns.map((c, ix) => {
                        let value = inqu?.[`${c.key}`] || "N/A";
                        if (typeof c.renderValue === "function") {
                          value = c.renderValue(inqu?.[`${c.key}`], inqu);
                        }
                        return (
                          <td title={value} key={ix}>
                            {value}
                          </td>
                        );
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
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      renderValue: PropTypes.func,
    })
  ).isRequired,
  rows: PropTypes.array.isRequired,
};

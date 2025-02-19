import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

function Instruments({ instruments }) {
  return (
    <div>
      {instruments && (
        <Table striped border="2px">
          <thead>
            <tr>
              <th>sl</th>
              <th>Symbol</th>
              <th>Name</th>
              <th>Sector</th>
              <th>Valid till</th>
            </tr>
          </thead>
          <tbody>
            {instruments.map((inst, i) => {
              return (
                <tr className="instrument" key={inst.Symbol}>
                  <td>{i + 1}</td>
                  <td>
                    <Link to={`/instrument-${inst.Symbol}`}>{inst.Symbol}</Link>
                  </td>
                  <td className="fs-5">{inst.Name}</td>
                  <td>{inst.Sector}</td>
                  <td>{inst.Validtill}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Instruments;

import { useParams } from "react-router-dom";

function TradeDetails() {
  const { id } = useParams();

  return (
    <div>

      <h1 className="mb-4 text-3xl font-bold">
        Trade Details
      </h1>

      <p>
        Trade ID: {id}
      </p>

    </div>
  );
}

export default TradeDetails;
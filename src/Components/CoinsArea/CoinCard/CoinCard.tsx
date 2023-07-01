import "./CoinCard.css";

// Receives a coin object and builds a card for that coin
function CoinCard(props: any): JSX.Element {
    const moreInfoID = `moreInfo_${props.coin.id}`;
    const coinSelectID = `coinSelect_${props.coin.id}`;
    const collapseID = `collapse_${props.coin.id}`;

    return (
        <div className="CoinCard">
            <div className="form-check form-switch">
                <input className="form-check-input coin-select" type="checkbox" role="switch" id={coinSelectID} />
            </div>
            <h5 className="card-title">{props.coin.symbol}</h5>
            <p className="card-text">{props.coin.name}</p>

            <button id={moreInfoID} className="btn btn-primary more-info" data-bs-toggle="collapse">
                More Info
            </button>
            {/* <div>
                <div className="collapse collapse-horizontal" id={collapseID}>
                    <div className="card-expanded">
                        Testing
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default CoinCard;

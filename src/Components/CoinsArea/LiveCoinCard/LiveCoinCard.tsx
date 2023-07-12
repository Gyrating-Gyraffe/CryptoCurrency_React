import "./LiveCoinCard.css";

type LiveCoinCardProps = {
    coinNames: string[];
}

function LiveCoinCard(props: LiveCoinCardProps): JSX.Element {

    return (
        <div className="LiveCoinCard">
            <div className="CartridgeFront">
                <div className="card-title">
                    Live Report
                </div>
                <p className="card-text">
                    {props.coinNames.map(coinName =>
                        <div className="coin-name">{coinName}</div>
                    )}
                </p>
                {/* <button id={moreInfoID} className="btn btn-primary more-info" data-bs-toggle="collapse" onClick={toggleInfo}>
                        Scroll Down
                    </button> */}
            </div>
        </div>
    );
}

export default LiveCoinCard;

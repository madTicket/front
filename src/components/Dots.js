const Dot = ({ num, currentPage }) => {
    return (
        <div
            style={{
                width: 10,
                height: 10,
                border: '1px solid #C6CA19',
                borderRadius: 999,
                backgroundColor: currentPage === num ? "#C6CA19" : "white",
                transitionDuration: 1000,
                transition: "background-color 0.5s",
            }}
        ></div>
    );
};

const Dots = ({ currentPage }) => {
    return (
        <div style={{ position: "fixed", top: "50%", right: '10%', zIndex:10}}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: 20,
                    height: 50,
                }}
            >
                <Dot num={1} currentPage={currentPage}></Dot>
                <Dot num={2} currentPage={currentPage}></Dot>
            </div>
        </div>
    );
};

export default Dots;
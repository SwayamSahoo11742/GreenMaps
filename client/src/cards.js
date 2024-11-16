import "./cards.css";

export const Cards = ({dist, time, co2, getCO2}) => {
    const normalize = (val) => {
        return (
          (1 -
            (co2[val] - Math.min(...Object.values(co2))) / (Math.max(...Object.values(co2)) - Math.min(...Object.values(co2)))) 
            *100
        ).toFixed(2);
      };

    return(
        <>
            <div className="card-list">
                <div className="card-overlay  bottom-" id="walk">
                    <a
                    href="#"
                    onClick={() => getCO2("walk")}
                    className="block max-w-sm p-6 bg-white border border-emerald-200 rounded-lg shadow hover:bg-emerald-100 dark:bg-emerald-800 dark:border-emerald-700 dark:hover:bg-emerald-700"
                    >
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-emerald-900 dark:text-white">
                        Walking
                    </h5>
                    <hr></hr>
                    <ul className="list-none text-white text-left">
                        <li>
                        <span className="font-bold text-xl">Distance:</span>{" "}
                        {(dist / 1000).toFixed(1)}km{" "}
                        </li>
                        <li>
                        <span className="font-bold text-xl">Time:</span>{" "}
                        {Math.floor(dist / 1609.34 / 4)}hr{" "}
                        {Math.floor(((dist / 1609.34 / 3) % 1) * 60)}min
                        </li>
                        <li>
                        <span className="font-bold text-xl">Cost:</span> --No Cost--{" "}
                        </li>
                        <li>
                        <span className="font-bold text-xl">CO2 Score:</span>
                        <div
                            className="bar text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                            style={{
                            width: `${(
                                (1 -
                                (co2["walk"] - Math.min(...Object.values(co2))) /
                                    (Math.max(...Object.values(co2)) -
                                    Math.min(...Object.values(co2)))) *
                                100
                            ).toFixed(2)}%`,
                            }}
                        >
                            {(
                            (1 -
                                (co2["walk"] - Math.min(...Object.values(co2))) /
                                (Math.max(...Object.values(co2)) -
                                    Math.min(...Object.values(co2)))) *
                            100
                            ).toFixed(2)}
                        </div>
                        </li>
                    </ul>
                    </a>
                </div>

                {/* Bike */}
                <div className="card-overlay  bottom-5" id="bike">
                    <a
                    href="#"
                    onClick={() => getCO2("bike")}
                    className="block max-w-sm p-6 bg-white border border-emerald-200 rounded-lg shadow hover:bg-emerald-100 dark:bg-emerald-800 dark:border-emerald-700 dark:hover:bg-emerald-700"
                    >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-emerald-900 dark:text-white">
                        Biking
                    </h5>
                    <hr></hr>
                    <ul className="list-none text-white text-left">
                        <li>
                        <span className="font-bold text-xl">Distance:</span>{" "}
                        {(dist / 1000).toFixed(1)}km{" "}
                        </li>
                        <li>
                        <span className="font-bold text-xl">Time:</span>{" "}
                        {Math.floor(dist / 1.609 / 14.1 / 3600)}hr{" "}
                        {Math.floor(((dist / 1.609 / 14.1) % 3600) / 60)}min
                        </li>
                        <li>
                        <span className="font-bold text-xl">Cost:</span> --No Cost--
                        </li>
                        <li>
                        <span className="font-bold text-xl">CO2 Score:</span>
                        <div
                            className="bar text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                            style={{
                            width: `${normalize("bike")}%`,
                            backgroundPosition: `${100 - normalize("bike")}% 0`,
                            }}
                        >
                            {normalize("bike")}
                        </div>
                        </li>
                    </ul>
                    </a>
                </div>

                {/* Train */}
                <div className="card-overlay  bottom-5" id="train">
                    <a
                    href="#"
                    onClick={() => getCO2("train")}
                    className="block max-w-sm p-6 bg-white border border-emerald-200 rounded-lg shadow hover:bg-emerald-100 dark:bg-emerald-800 dark:border-emerald-700 dark:hover:bg-emerald-700"
                    >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-emerald-900 dark:text-white">
                        Train
                    </h5>
                    <hr></hr>
                    <ul className="list-none text-white text-left">
                        <li>
                        <span className="font-bold text-xl">Distance:</span>{" "}
                        {(dist / 1000).toFixed(1)}km{" "}
                        </li>
                        <li>
                        <span className="font-bold text-xl">Time:</span>{" "}
                        {Math.floor((time * (1 / 2)) / 3600)}hr{" "}
                        {Math.floor(((time * (1 / 2)) % 3600) / 60)}min
                        </li>
                        <li>
                        <span className="font-bold text-xl">Cost:</span>{" "}
                        </li>
                        <li>
                        <span className="font-bold text-xl">CO2 Score:</span>
                        <div
                            className="bar text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                            style={{
                            width: `${normalize("train")}%`,
                            backgroundPosition: `${100 - normalize("train")}% 0`,
                            }}
                        >
                            {normalize("train")}
                        </div>
                        </li>
                    </ul>
                    </a>
                </div>

                {/* Bus */}
                <div className="card-overlay  bottom-5" id="bus">
                    <a
                    href="#"
                    onClick={() => getCO2("bus")}
                    className="block max-w-sm p-6 bg-white border border-emerald-200 rounded-lg shadow hover:bg-emerald-100 dark:bg-emerald-800 dark:border-emerald-700 dark:hover:bg-emerald-700"
                    >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-emerald-900 dark:text-white">
                        Bus
                    </h5>
                    <hr></hr>
                    <ul className="list-none text-white text-left">
                        <li>
                        <span className="font-bold text-xl">Distance:</span>{" "}
                        {(dist / 1000).toFixed(1)}km{" "}
                        </li>
                        <li>
                        <span className="font-bold text-xl">Time:</span>{" "}
                        {Math.floor((time * 2) / 3600)}hr{" "}
                        {Math.floor(((time * 2) % 3600) / 60)}min
                        </li>
                        <li>
                        <span className="font-bold text-xl">Cost:</span> $54
                        </li>
                        <li>
                        <span className="font-bold text-xl">CO2 Score:</span>
                        <div
                            className="bar text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                            style={{
                            width: `${normalize("bus")}%`,
                            backgroundPosition: `${100 - normalize("bus")}% 0`,
                            }}
                        >
                            {normalize("bus")}
                        </div>
                        </li>
                    </ul>
                    </a>
                </div>

                {/* Uber */}
                <div className="card-overlay  bottom-5" id="uber">
                    <a
                    href="#"
                    onClick={() => getCO2("uber")}
                    className="block max-w-sm p-6 bg-white border border-emerald-200 rounded-lg shadow hover:bg-emerald-100 dark:bg-emerald-800 dark:border-emerald-700 dark:hover:bg-emerald-700"
                    >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-emerald-900 dark:text-white">
                        Uber
                    </h5>
                    <hr></hr>
                    <ul className="list-none text-white text-left">
                        <li>
                        <span className="font-bold text-xl">Distance:</span>
                        {(dist / 1000).toFixed(1)}km{" "}
                        </li>
                        <li>
                        <span className="font-bold text-xl">Time:</span>{" "}
                        {Math.floor(time / 3600)}hr {Math.floor((time % 3600) / 60)}min
                        </li>
                        <li>
                        <span className="font-bold text-xl">Cost:</span> $54
                        </li>
                        <li>
                        <span className="font-bold text-xl">CO2 Score:</span>
                        <div
                            className="bar text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                            style={{
                            width: `${normalize("uber")}%`,
                            backgroundPosition: `${100 - normalize("uber")}% 0`,
                            }}
                        >
                            {normalize("uber")}
                        </div>
                        </li>
                    </ul>
                    </a>
                </div>

                {/* Car */}
                <div className="card-overlay  bottom-5" id="car">
                    <a
                    href="#"
                    onClick={() => getCO2("car")}
                    className="block max-w-sm p-6 bg-white border border-emerald-200 rounded-lg shadow hover:bg-emerald-100 dark:bg-emerald-800 dark:border-emerald-700 dark:hover:bg-emerald-700"
                    >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-emerald-900 dark:text-white">
                        Car
                    </h5>
                    <hr></hr>
                    <ul className="list-none text-white text-left">
                        <li>
                        <span className="font-bold text-xl">Distance:</span>{" "}
                        {(dist / 1000).toFixed(1)}km{" "}
                        </li>
                        <li>
                        <span className="font-bold text-xl">Time:</span>{" "}
                        {Math.floor(time / 3600)}hr {Math.floor((time % 3600) / 60)}min
                        </li>
                        <li>
                        <span className="font-bold text-xl">Cost:</span> $54
                        </li>
                        <li>
                        <span className="font-bold text-xl">CO2 Score:</span>
                        <div
                            className="bar text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                            style={{
                            width: `${normalize("car")}%`,
                            backgroundPosition: `${100 - normalize("car")}% 0`,
                            }}
                        >
                            {normalize("car")}
                        </div>
                        </li>
                    </ul>
                    <div className="w-full bg-emerald-200 rounded-full dark:bg-emerald-700"></div>
                    </a>
                </div>
            </div>
        </>
    )

}
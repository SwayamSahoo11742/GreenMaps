export const Directions = ({directions}) => {
    console.log(directions);
    return(
        <>
        <div className="directions-sidebar top-5 right-5">
            <h3>Directions</h3>
            <ul>
                {directions.map((instruction, index) => (
                <li key={index}>{instruction.text}</li>
                ))}
            </ul>
        </div>
        </>
    )
}
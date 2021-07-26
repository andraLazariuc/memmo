export const getResidentsByStatus = (residents) => {
    let dead = 0;
    let alive = 0;

    residents.forEach(({ status }) => {
        if (status === "Dead") {
            dead++;
        }

        if (status === "Alive") {
            alive++;
        }
    });

    return { alive, dead };
};

export const getResidentsBySpecies = (residents) => {
    let robots = 0;
    let humans = 0;
    let aliens = 0;

    residents.forEach(({ species }) => {
        switch (species) {
            case "Alien":
                aliens++;
                break;

            case "Human":
                humans++;
                break;

            case "Robot":
                robots++;
                break;

            default:
                break;
        }

        return { aliens, humans, robots };
    });

    return { robots, humans, aliens };
};

export const getLocationGuests = (residents) =>
    residents.filter(({ origin, location }) => origin.id !== location.id)
    .length || 0;
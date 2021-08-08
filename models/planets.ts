import { join } from '../deps.ts';
import { BufReader } from '../deps.ts';
import { parse } from '../deps.ts';
import { _ } from '../deps.ts';
import { log } from '../deps.ts';

type Planet = Record<string, string>;

let planets: Array<Planet>;

export function filterHabitablePlanets(planets: Array<Planet>) {
    return planets.filter(planet => {
        const planetaryDisposition = planet["koi_disposition"];
        const planetaryRadius = Number(planet["koi_prad"]);
        const stellarMass = Number(planet["koi_smass"]);
        const stellarRadius = Number(planet["koi_srad"]);

        return planetaryDisposition === "CONFIRMED"
            && planetaryRadius > 0.5 && planetaryRadius < 1.5
            && stellarMass > 0.78 && stellarMass < 1.04
            && stellarRadius > 0.99 && stellarRadius < 1.01;
    });
}

async function loadPlanetsData(): Promise<Planet[]> {
    const path = join("data", "kepler_exoplanets_nasa.csv");
    const file = await Deno.open(path);
    const bufReader = new BufReader(file);
    const result = await parse(bufReader, {
        comment: '#',
        skipFirstRow: true
    });
    Deno.close(file.rid);

    const planets = filterHabitablePlanets(result as Array<Planet>);

    return planets.map(planet => {
        return _.pick(planet, [
            "koi_prad",
            "koi_smass",
            "koi_srad",
            "kepler_name",
            "koi_count",
            "koi_steff",
            "koi_period"
        ])
    });
}

planets = await loadPlanetsData();
log.info(`${planets.length} habitable planets found!`);

export function getAllPlanets() {
    return planets;
}
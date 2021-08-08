import { Router } from '../../deps.ts';
import * as planets from '../../models/planets.ts';

const router = new Router();

const PLANETS_API = "/planets";

// GET all planets
router.get(PLANETS_API, (ctx) => {
    ctx.response.body = planets.getAllPlanets();
});

export default router;
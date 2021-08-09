import { Router, Status } from '../../deps.ts';
import { log } from '../../deps.ts';
import * as launches from '../../models/launches.ts';

const router = new Router();

const LAUNCHES_API = "/launches";

// GET all launches
router.get(LAUNCHES_API, (ctx) => {
    ctx.response.body = launches.getAll();
});

// GET launch by ID
router.get(`${LAUNCHES_API}/:id`, (ctx) => {
    if (ctx.params?.id) {
        const launchesList = launches.getOne(Number(ctx.params.id));
        if (launchesList) {
            ctx.response.body = launchesList; 
        } else {
            ctx.throw(Status.BadRequest, "Launch with that ID doesn't exist")
        }
    }
});

// POST new launch
router.post(LAUNCHES_API, async (ctx) => {
    const body = await ctx.request.body().value;

    try {
        launches.addOne(body);
    } catch (err) {
        log.error(err);
        if (err.message === "already_exists") {
            ctx.throw(Status.BadRequest, "Launch with that Flight Number already exists");
        }
    }

    ctx.response.body = { success: true };
    ctx.response.status = Status.Created;
});

// DELETE launch by ID
router.delete(`${LAUNCHES_API}/:id`, (ctx) => {
    if (ctx.params?.id) {
        const result = launches.removeOne(Number(ctx.params.id));
        ctx.response.body = { success: result };
    }
});

export default router;
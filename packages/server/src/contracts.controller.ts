import { Router, Request, Response } from 'express';
import { ContractsControllerBackEnd, InitServerIdentity } from './convector';

const router: Router = Router();

// Check if the server identity has been enrolled successfully
InitServerIdentity();

router.post('/', async (req: Request, res: Response) => {
    console.log("post demo car...");
    await ContractsControllerBackEnd.demoFunction(req.body);
    res.send(201);
});

router.post('/contract', async (req: Request, res: Response) => {
    console.log("post contract...");
    // console.log(req.body[0]);
    // console.log(req.body[1].org);
    await ContractsControllerBackEnd.create(req.body[0], req.body[1].org);
    res.send(201);
});

router.get('/contract/:id', async (req: Request, res: Response) => {
    console.log("post contract...");
    // console.log(req.body[0]);
    // console.log(req.body[1].org);
    await ContractsControllerBackEnd.confirmContract(req.params.id);
    res.send(201);
});

router.get('/:id', async (req: Request, res: Response) => {
    console.log("get something");
    let result = await ContractsControllerBackEnd.getDemo(req.params.id);
    console.log(ContractsControllerBackEnd.adapter);
    res.json(result);
});

export const ContractsExpressController: Router = router;

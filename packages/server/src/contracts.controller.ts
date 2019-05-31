import { Router, Request, Response } from 'express';
import { ContractsControllerBackEnd, InitServerIdentity } from './convector';

const router: Router = Router();

// Check if the server identity has been enrolled successfully

router.post('/', async (req: Request, res: Response) => {
    InitServerIdentity(req.body.name);
    res.send(200);
});

router.post('/contract', async (req: Request, res: Response) => {
    console.log("post contract...");
    await ContractsControllerBackEnd().createContract(req.body);
    res.send(201);
});

router.get('/contract/:id', async (req: Request, res: Response) => {
    console.log("getting a contract...");
    let contract = await ContractsControllerBackEnd().getContract(req.params.id);
    res.json(contract);
});

router.get('/contract', async (req: Request, res: Response) => {
    console.log("getting all contracts...");
    let result = await ContractsControllerBackEnd().getAllContracts();
    res.json(result);
});

router.put('/contract/:id', async (req: Request, res: Response) => {
    console.log("confirming contract...");
    await ContractsControllerBackEnd().confirmContract(req.params.id);
    res.send(201);
});

router.post('/claim', async (req: Request, res: Response) => {
    console.log("invoking a claim...");
    await ContractsControllerBackEnd().invokeClaim(req.body);
    res.send(201);
});

router.get('/claim/:id', async (req: Request, res: Response) => {
    console.log("getting a claim...");
    let claim = await ContractsControllerBackEnd().getClaim(req.params.id);
    res.json(claim);
});

router.get('/claim/', async (req: Request, res: Response) => {
    console.log("getting all claims...");
    let result = await ContractsControllerBackEnd().getAllClaims();
    res.json(result);
});

export const ContractsExpressController: Router = router;

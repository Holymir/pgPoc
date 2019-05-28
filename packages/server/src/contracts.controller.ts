import { Router, Request, Response } from 'express';
import { ContractsControllerBackEnd, InitServerIdentity } from './convector';

const router: Router = Router();

// Check if the server identity has been enrolled successfully
InitServerIdentity();

router.post('/contract', async (req: Request, res: Response) => {
    console.log("post contract...");
    await ContractsControllerBackEnd.createContract(req.body);
    res.send(201);
});

router.get('/contract/:id', async (req: Request, res: Response) => {
    console.log("getting a contract...");
    let contract = await ContractsControllerBackEnd.getContract(req.params.id);
    res.json(contract);
});

router.get('/contract', async (req: Request, res: Response) => {
    console.log("getting all contracts...");
    let result = await ContractsControllerBackEnd.getAllContracts();
    res.json(result);
});

router.post('/confirm', async (req: Request, res: Response) => {
    console.log("confirming contract...");
    await ContractsControllerBackEnd.confirmContract(req.body.id);
    res.send(201);
});

router.post('/decline', async (req: Request, res: Response) => {
    console.log("declining a contract...");
    await ContractsControllerBackEnd.declineContract(req.body.id);
    res.send(201);
});

router.post('/claim', async (req: Request, res: Response) => {
    console.log("invoking a claim...");
    await ContractsControllerBackEnd.invokeClaim(req.body);
    res.send(201);
});

router.get('/claim/:id', async (req: Request, res: Response) => {
    console.log("getting a claim...");
    let claim = await ContractsControllerBackEnd.getClaim(req.params.id);
    res.json(claim);
});

router.get('/claim/', async (req: Request, res: Response) => {
    console.log("getting all claims...");
    let result = await ContractsControllerBackEnd.getAllClaims();
    res.json(result);
});

export const ContractsExpressController: Router = router;

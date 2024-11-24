import Service from "../services/service";
import PartyService from "../services/party-service";
import Controller from "./controller";
import Party from "../models/party";
import { Request, Response } from "express";
import Helpers from "../../helpers/helpers";
import { v4 as uuidv4 } from "uuid";

        
class PartyController extends Controller {
        
    constructor(service: Service) {
        super(service);
    }

    async insert(req: Request, res: Response){
        try{
            if(!req.body.player1 || req.body.player1 === ""){
                res.status(400).send(Helpers.queryError({msg: "player name is not defined"}))
            }
            else{
                const body = {
                    id: uuidv4(),
                    code: Helpers.generateVerifyNumber(),
                    player1: req.body.player1,
                }
    
                console.log(body)
    
                const party = await Party.create(body)
    
                res.status(201).json(Helpers.queryResponse({id: party.id, msg: 'party created successfully', code: party.code }));
    
            }
        }
        catch(e){
            console.log(e)
            res.status(500).send(Helpers.serverError)
        }
    }
}

export default new PartyController(new PartyService(Party));

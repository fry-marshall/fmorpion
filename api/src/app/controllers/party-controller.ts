import Service from "../services/service";
import PartyService from "../services/party-service";
import Controller from "./controller";
import Party from "../models/party";
import { Request, Response } from "express";
import Helpers from "../../helpers/helpers";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";

        
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
        
                const party = await Party.create(body)
    
                res.status(201).json(Helpers.queryResponse({id: party.id, msg: 'party created successfully', code: party.code }));
            }
        }
        catch(e){
            res.status(500).send(Helpers.serverError)
        }
    }

    async join(req: Request, res: Response){
        try{

            if(!req.body.player2 || req.body.player2 === ""){
                res.status(400).send(Helpers.queryError({msg: "player name is not defined"}))
            }
            else{
                let party = await Party.findOne({where: {
                    player2: null
                }})

                let attempt = 0
                let interval
    
                if(!party){
                    interval = setInterval(async () => {
                        party = await Party.findOne({where: {
                            player2: null
                        }})
                        if(!party){
                            attempt++
                        }
                        else{
                            attempt = 2
                        }
                    } , 3000)
                }

                if(attempt === 2){
                    clearInterval(interval)
                }

                console.log(party)

                if(party){
                    party.set({player2: req.body.player2})
                    await party.save()
                    res.status(202).send(Helpers.queryResponse({msg: "party joined", code: party.code}))
                }
                else{
                    res.status(200).send(Helpers.queryResponse({msg: "no party available, try after"}))
                }
            }

        }
        catch(e){
            console.log(e)
            res.status(500).send(Helpers.serverError)
        }
    }
}

export default new PartyController(new PartyService(Party));

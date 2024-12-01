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
            console.log(e)
            res.status(500).send(Helpers.serverError)
        }
    }

    async join(req: Request, res: Response){
        try{

            if(!req.body.player2 || req.body.player2 === ""){
                res.status(400).send(Helpers.queryError({msg: "player name is not defined"}))
            }
            else if(!req.body.code){
                res.status(400).send(Helpers.queryError({msg: "code is not defined"}))
            }

            else{
                let party = await Party.findOne({where: {
                    code: req.body.code
                }})

                if(!party){
                    res.status(404).send(Helpers.queryError({msg: "no parties created with this code"}))
                }
                else{
                    party.set({player2: req.body.player2})
                    await party.save()
                    res.locals.io.emit(party.player1, {
                        type: 'join',
                        data: {
                            player2: req.body.player2
                        }
                    })
                    res.status(202).send(Helpers.queryResponse({msg: "party joined", code: party.code}))
                }
            }

        }
        catch(e){
            res.status(500).send(Helpers.serverError)
        }
    }

    async play(req: Request, res: Response){
        try{

            if(!req.body.position_x || !req.body.position_y || !req.body.party_id || !req.body.player){
                res.status(400).send(Helpers.queryError({msg: "some args are missing"}))
            }
            else{
                const party = await Party.findOne({where: {
                    code: req.body.party_id,
                    winner: null,
                    [Op.or]: [
                        {
                            player1: req.body.player,
                        },
                        {
                            player2: req.body.player
                        }
                    ]
                }})
    
                if(!party){
                    res.status(404).send(Helpers.queryError({msg: "no party found"}))
                }
                else{
                    if(req.body.winner){
                        party.set('winner', req.body.winner)
                        await party.save()
                    }

                    if(req.body.player === party.player1){
                        res.locals.io.emit(party.player2, {
                            type: 'play',
                            data: {
                                ...req.body
                            }
                        })
                    }
                    else if(req.body.player === party.player2){
                        res.locals.io.emit(party.player1, {
                            type: 'play',
                            data: {
                                ...req.body
                            }
                        })
                    }

                    res.status(201).send(Helpers.queryResponse({msg: 'play done successfully'}))
                }
            }            
        }
        catch(e){
            res.status(500).send(Helpers.serverError)
        }
    }
}

export default new PartyController(new PartyService(Party));

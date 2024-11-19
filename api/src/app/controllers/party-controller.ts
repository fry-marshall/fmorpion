import Service from "../services/service";
import PartyService from "../services/party-service";
import Controller from "./controller";
import Party from "../models/party";
//import { Request, Response } from "express";

        
class PartyController extends Controller {
        
    constructor(service: Service) {
        super(service);
    }
}

export default new PartyController(new PartyService(Party));

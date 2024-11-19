import { ModelStatic } from "sequelize";
import Service from "./service";

        
class PartyService extends Service {
        
    constructor(model: ModelStatic<any>) {
        super(model)
    }
}

export default PartyService

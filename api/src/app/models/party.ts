import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/sequelize";

interface PartyAttributes {
  id?: string;
  code?: string;
  player1: string;
  player2?: string | null;
  winner?: string | null;
  iscurrentplayer1?: boolean;
}

interface PartyInstance extends Model<PartyAttributes>, PartyAttributes {}

const Party = sequelize.define<PartyInstance>("party", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  player1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  player2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  winner: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  /* iscurrentplayer1: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }, */
});

export default Party;

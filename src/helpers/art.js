const { DataTypes } = require("sequelize");
const db = require("../db");

const Posts = db.define("posts", {
    artist_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    style: {
        type: DataTypes.STRING,
        allowNull: false
    },
    era: {
        type: DataTypes.STRING
    },
    for_sale: {
        type: DataTypes.BOOLEAN,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    owner_id: {
        type: DataTypes.INTEGER,
    }
    
})

module.exports = Posts;

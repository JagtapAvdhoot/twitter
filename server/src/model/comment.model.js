const { DataTypes, Model } = require("sequelize")
const { sequelize } = require("../config/database")

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            this.belongsTo(models.Tweet, { foreignKey: "id" });
        }
        toJSON() {
            return { ...this.get(), id: undefined }
        }
    }
    Comment.init({
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        replyTo: {
            type: DataTypes.STRING,
        },
        tweet: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        likes: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            defaultValue: []
        }
    }, {
        sequelize,
        modelName: 'Comment',
        tableName: "comments",
        timestamps: true,
    });
    return Comment;
};
const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/database");

module.exports = (sequelize, DataTypes) => {
    class Tweet extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: "id" });
            this.hasMany(models.Comment, { foreignKey: "id" });
        }
        toJSON() {
            return { ...this.get(), id: undefined };
        }
    }
    Tweet.init(
        {
            desc: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            tweetLikes: {
                type: DataTypes.ARRAY(DataTypes.JSONB),
                defaultValue: [],
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    key: "id",
                    model: "User",
                },
            },
            tweetSaves: {
                type: DataTypes.ARRAY(DataTypes.JSONB),
                defaultValue: [],
            },
            tweetReports: {
                type: DataTypes.ARRAY(DataTypes.JSONB),
                defaultValue: [],
            },
            tweetViews: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            replyingTo: {
                type: DataTypes.STRING,
            },
            audience: {
                type: DataTypes.STRING,
                values: ["everyone", "circle"],
                defaultValue: "everyone",
            },
            whoCanReply: {
                type: DataTypes.STRING,
                values: [
                    "everyone",
                    "people who follow you",
                    "people you mentioned",
                ],
                defaultValue: "everyone",
            },
            scheduled: {
                type: DataTypes.DATE,
                defaultValue: Date.now(),
            },
            media: {
                type: DataTypes.ARRAY(DataTypes.JSONB),
                defaultValue: [],
            },
        },
        {
            sequelize,
            modelName: "Tweet",
            tableName: "tweets",
            timestamps: true,
        }
    );
    return Tweet;
};

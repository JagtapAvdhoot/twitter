const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Reply extends Model {
        static associate(models) {
            this.belongsTo(models.Tweet, { foreignKey: "id" });
        }
        toJSON() {
            return { ...this.get(), id: undefined };
        }
    }
    Reply.init(
        {
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
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
                defaultValue: [],
            },
            replies: {
                type: DataTypes.ARRAY(DataTypes.JSONB),
                defaultValue: [],
            },
        },
        {
            sequelize,
            modelName: "Reply",
            tableName: "replies",
            timestamps: true,
        }
    );
    return Reply;
};

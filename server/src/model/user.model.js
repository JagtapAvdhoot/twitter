const { DataTypes,Model } = require("sequelize")
const { sequelize } = require("../config/database")

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            this.hasMany(models.Tweet, { foreignKey: "id" });
        }
        toJSON() {
            return { ...this.get(), id: undefined }
        }
    }
    User.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        following: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            defaultValue: []
        },
        follower: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            defaultValue: []
        },
        bio: {
            type: DataTypes.STRING,
        },
        avatar: {
            type: DataTypes.STRING,
        },
        tweetSaved: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            defaultValue: []
        },
        tweetLiked: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            defaultValue: []
        },
        tweetCreated: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            defaultValue: []
        },
        notifications: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            defaultValue: []
        },
        userReports: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            defaultValue: []
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: "users",
        timestamps:true
    });
    return User;
};

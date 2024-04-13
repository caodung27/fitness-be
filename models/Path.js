const { DataTypes } = require("sequelize");
const geolib = require("geolib");

module.exports = (sequelize) => {
  const Path = sequelize.define("Path",{
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false,
    },
    end: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false,
    },
    speed: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    distance: {
      type: DataTypes.VIRTUAL, // Đây là một trường ảo, không được lưu trữ trong cơ sở dữ liệu
      get() {
        if (this.start && this.end) {
          // Tính toán khoảng cách giữa start và end dựa trên tọa độ của chúng
          // Bạn có thể thay đổi phương pháp tính toán này tùy theo yêu cầu của bạn
          const start = { latitude: this.start.coordinates[0], longitude: this.start.coordinates[1] };
          const end = { latitude: this.end.coordinates[0], longitude: this.end.coordinates[1] };
          return geolib.getDistance(start, end); // Hàm calculateDistance cần được định nghĩa
        }
        return null;
      }
    },
    steps: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calories: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  });

  Path.associate = (models) => {
    Path.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      as: "users",
    });
  };

  return Path;
};
